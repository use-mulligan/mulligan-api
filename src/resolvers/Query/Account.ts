import { getAccountId, Context } from "../../utils";

export const Account = {
  /**
   * Retrieves a account by their ID
   * @param id - the ID of the account
   */
  account: async ({ id }, args, ctx: Context) => {
    const userId = getAccountId(ctx);

    if (userId == null) {
      // TODO: do something after error is thrown
      // TODO: Wrap this in method somewhere - too much duplication
    }

    return await ctx.prisma.account({ id }).profile();
  },
  /**
   * Returns all accounts within the database
   */
  accounts: async (parent, args, ctx: Context) => {
    const userId = getAccountId(ctx);

    if (userId == null) {
      // TODO: do something after error is thrown
      // TODO: Wrap this in method somewhere - too much duplication
    }

    return await ctx.prisma.accounts();
  },

  /**
   * Get the accounts own data
   * @param ctx -request context allows access to http headers
   */
  me(ctx: Context) {
    const userId = getAccountId(ctx);

    if (userId == null) {
      // TODO: do something after error is thrown
      // TODO: Wrap this in method somewhere - too much duplication
    }

    return ctx.prisma.account({ id: userId }).profile();
  }
};
