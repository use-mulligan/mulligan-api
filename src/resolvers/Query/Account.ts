import { getAccountId, Context } from "../../utils";
import AccountFragment from "../Fragments/Account";

const AccountQueries = {
  /**
   * Retrieves a account by their ID
   * @param id - the ID of the account
   */
  account: async (parent, { id }, ctx: Context) => {
    const userId = getAccountId(ctx);

    if (userId == null) {
      // TODO: do something after error is thrown
      // TODO: Wrap this in method somewhere - too much duplication
    }

    return await ctx.prisma.account({ id }).$fragment(AccountFragment);
  },
  /**
   * Returns all accounts within the database
   */
  accounts: async (_, __, ctx: Context) => {
    const userId = getAccountId(ctx);

    if (userId == null) {
      // TODO: do something after error is thrown
      // TODO: Wrap this in method somewhere - too much duplication
    }

    return await ctx.prisma.accounts().$fragment(AccountFragment);
  },

  /**
   * Get the accounts own data
   * @param ctx -request context allows access to http headers
   */
  me: async (_, __, ctx: Context) => {
    const userId = getAccountId(ctx);

    if (userId == null) {
      // TODO: do something after error is thrown
      // TODO: Wrap this in method somewhere - too much duplication
    }

    return await ctx.prisma.account({ id: userId }).$fragment(AccountFragment);
  }
};

export default AccountQueries;
