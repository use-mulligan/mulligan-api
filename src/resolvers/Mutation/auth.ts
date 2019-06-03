import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Context, getAccountId } from "../../utils";
import { UniqueConstraintViolationError } from "../../errorhandling/customerrors";

export const Auth = {
  /**
   * Register mutation that takes account credentials
   * and creates a new account
   *
   * @param email => type: String
   * @param password => type: String
   * @param accountname => type: String
   * @param ctx - request context allows access to http headers
   */
  async signup(_, { email, password, firstName, lastName }, ctx: Context) {
    try {
      // make sure account doesn't exist before attempting
      // to create a new account
      const accountExists = await ctx.prisma.$exists.account({ email: email });

      if (accountExists) {
        throw new UniqueConstraintViolationError();
      }

      // hash the password and create the account
      password = await bcrypt.hash(password, 10);
      const account = await ctx.prisma.createAccount({
        email: email,
        password: password,
        role: "ADMIN",
        profile: {
          create: {
            firstName: firstName,
            lastName: lastName,
            fullName: firstName + " " + lastName
          }
        }
      });

      return {
        token: jwt.sign({ accountId: account.id }, process.env.APP_SECRET),
        account
      };
    } catch (err) {
      throw err;
    }
  },

  /**
   * Login mutation that takes the accounts email and password
   * and authenticates the credentials with the ones stored
   * in the database
   *
   * @param email => String
   * @param password => String
   * @param ctx - request context allows access to http headers
   */
  async login(_, { email, password }, ctx: Context) {
    try {
      // make sure the account exists first
      const account = await ctx.prisma.account({ email: email });
      if (!account) {
        throw new Error(
          `Cannot find account associated with the email: ${email}`
        );
      }

      // then validate their credentials
      const valid = await bcrypt.compare(password, account.password);

      if (!valid) {
        throw new Error("Invalid email or password");
      }

      // everything checks out, send them back some data
      return {
        token: jwt.sign({ accountId: account.id }, process.env.APP_SECRET),
        account
      };
    } catch (err) {
      throw err;
    }
  },
  /**
   * Delete mutation that removes a account from the database.
   * This action can only be performed by an admin.
   *
   * @param id - the ID of the account to be deleted
   * @param ctx - request context allows access to http headers
   */
  async deleteAccount(_, { id }, ctx: Context) {
    try {
      const accountId = getAccountId(ctx); // authenticate

      const account = await ctx.prisma.account({ id: accountId });
      if (account.role != "ADMIN") {
        // authorize
        // TODO: log this attempt
        throw new Error(
          `account does not have permission: Attempted By: ${account.email}`
        );
      }

      const accountExists = await ctx.prisma.$exists.account({ id });
      if (!accountExists) {
        throw new Error(`account was not found with ID: ${id}`);
      }

      return await ctx.prisma.deleteAccount({ id });
    } catch (err) {
      // TODO: log error
      throw err;
    }
  }
};
