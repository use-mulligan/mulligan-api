import { Context, getAccountId } from "../../utils";

const StrokeMutations = {
  createStroke: async (
    _,
    { golferId, profileId, holeId, strokes },
    ctx: Context
  ) => {
    try {
      const accountId = getAccountId(ctx);
      const profile = await ctx.prisma.account({ id: accountId }).profile();
      const scoreCard = await ctx.prisma.scorecard({ id: profile.id });

      await ctx.prisma.createStroke({
        golferId: golferId,
        profileId: profileId,
        hole: {
          connect: {
            id: holeId
          }
        },
        strokes: strokes,
        scoreCard: {
          connect: {
            id: scoreCard.id
          }
        }
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

export default StrokeMutations;
