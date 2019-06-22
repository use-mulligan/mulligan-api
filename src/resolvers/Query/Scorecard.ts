import { Context, getAccountId } from "../../utils";
import AccountFragment from "../Fragments/Account";

const ScorecardQueries = {
  scoreCard: async ({ id }, ctx: Context) => {
    const accountId = getAccountId(ctx);
    return await ctx.prisma.scorecard({ id });
  },
  scoreCards: async (ctx: Context) => {
    const accountId = getAccountId(ctx);
    return await ctx.prisma.scorecards();
  },
  myScorecards: async (ctx: Context) => {
    const accountId = getAccountId(ctx);
    return await ctx.prisma
      .account({ id: accountId })
      .$fragment(AccountFragment);
  }
};

export default ScorecardQueries;
