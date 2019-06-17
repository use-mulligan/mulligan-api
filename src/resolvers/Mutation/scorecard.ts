import { Context, getAccountId } from "../../utils";

interface Golfer {
  name: String;
  stroke: Number;
}

/**
 *
 *
 */
const ScoreCard = {
  async newScorecard(parent, { golfers, course }, ctx: Context) {
    const id = getAccountId(ctx);
    const profile = await ctx.prisma.account({ id }).profile();

    return await ctx.prisma.createScorecard({
      profile: {
        connect: {
          id: profile.id
        }
      },
      golfers: golfers,
      course: {
        connect: {
          id: course
        }
      }
    });
  },

  async updateScorecard(_, { golfers: Golfer });
};

export default ScoreCard;
