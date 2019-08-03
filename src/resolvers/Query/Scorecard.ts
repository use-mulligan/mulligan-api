import { getAccountId } from "../../utils";
import { ScorecardsFragment } from "../Fragments/Scorecards";
import { IDModel, Context } from "../../types";
import { QueryFailedError } from "../../errorhandling/customerrors";

const ScorecardQueries = {
  /**
   * Retrieve scorecard record by its primary key (ID)
   *
   * @param id -> type: string
   *
   * @returns type: Scorecard
   */
  scoreCard: async (_: any, { id: id }: IDModel, ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);
      return await ctx.prisma.scorecard({ id }).$fragment(ScorecardsFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  },
  /**
   * Retrieve all scorecard records
   *
   * @returns type: [Scorecards]
   */
  scoreCards: async (ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);
      return await ctx.prisma.scorecards().$fragment(ScorecardsFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  },
  /**
   * Retrieve the currently logged in users scorecards
   * by the accountId stored in the auth token
   *
   * @returns type: [Scorecard]
   */
  myScorecards: async (ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);
      return await ctx.prisma
        .account({ id: accountId })
        .profile()
        .scoreCards()
        .$fragment(ScorecardsFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  },
  /**
   * Retrieve scorecards from profile by the profile primary key (ID)
   *
   * @param profileId -> type: string
   *
   * @returns type: [Scorecards]
   */
  getProfileScorecards: async (
    _: any,
    { id: profileId }: IDModel,
    ctx: Context
  ) => {
    try {
      const accountId = getAccountId(ctx);

      return await ctx.prisma
        .profile({ id: profileId })
        .scoreCards()
        .$fragment(ScorecardsFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  }
};

export default ScorecardQueries;
