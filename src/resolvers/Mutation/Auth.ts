import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { getAccountId } from "../../utils";
import {
  UniqueConstraintViolationError,
  MutationFailedError
} from "../../errorhandling/customerrors";
import AccountFragment from "../Fragments/Account";
import { Account } from "../../generated/prisma-client";
import { Context } from "../../types";

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
  async signup(_: any, { email, password, firstName, lastName }, ctx: Context) {
    try {
      // make sure account doesn't exist before attempting
      // to create a new account
      const accountExists = await ctx.prisma.$exists.account({ email: email });

      if (accountExists) {
        throw new UniqueConstraintViolationError();
      }

      // hash the password and create the account
      password = await bcrypt.hash(password, 10);
      const account = (await ctx.prisma
        .createAccount({
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
        })
        .profile()
        .$fragment(AccountFragment)) as Account;

      return {
        token: jwt.sign({ accountId: account.id }, process.env.APP_SECRET),
        account
      };
    } catch (ex) {
      throw new MutationFailedError(ex);
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
  async login(_: any, { email, password }, ctx: Context) {
    try {
      // make sure the account exists first
      const account = (await ctx.prisma
        .account({ email: email })
        .$fragment(AccountFragment)) as Account;
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
    } catch (ex) {
      throw new MutationFailedError(ex);
    }
  },
  /**
   * Delete mutation that removes a account from the database.
   * This action can only be performed by an admin.
   *
   * @param id - the ID of the account to be deleted
   * @param ctx - request context allows access to http headers
   */
  async deleteAccount(_: any, { id }, ctx: Context) {
    try {
      const accountId = getAccountId(ctx); // authenticate

      const account = (await ctx.prisma.account({ id: accountId })) as Account;
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
    } catch (ex) {
      // TODO: log error
      throw new MutationFailedError(ex);
    }
  }
};
