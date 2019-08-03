import { getAccountId } from "../../utils";
import AccountFragment from "../Fragments/Account";
import { Context, IDModel } from "../../types";
import { QueryFailedError } from "../../errorhandling/customerrors";

const AccountQueries = {
  /**
   * Retrieves a account by their ID
   * @param id - the ID of the account
   */
  account: async (_: any, { id: id }: IDModel, ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);

      if (accountId == null) {
        // TODO: do something after error is thrown
        // TODO: Wrap this in method somewhere - too much duplication
      }

      return await ctx.prisma.account({ id }).$fragment(AccountFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  },
  /**
   * Returns all accounts within the database
   */
  accounts: async (_: any, __: any, ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);

      if (accountId == null) {
        // TODO: do something after error is thrown
        // TODO: Wrap this in method somewhere - too much duplication
      }

      return await ctx.prisma.accounts().$fragment(AccountFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  },

  /**
   * Get the accounts own data
   * @param ctx -request context allows access to http headers
   */
  me: async (_: any, __: any, ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);

      if (accountId == null) {
        // TODO: do something after error is thrown
        // TODO: Wrap this in method somewhere - too much duplication
      }

      return await ctx.prisma
        .account({ id: accountId })
        .$fragment(AccountFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  }
};

export default AccountQueries;
