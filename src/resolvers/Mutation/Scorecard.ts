import { getAccountId } from "../../utils";
import { ProfileFragment } from "../Fragments/Profile";
import { NewScorecardModel, Context } from "../../types";
import { MutationFailedError } from "../../errorhandling/customerrors";

/**
 * When a user starts a new game a new scorecard will be
 * created which will have the golfers playing in the round
 * and the course where the game is being held
 *
 * @param golfers -> type: [Golfer]
 * @param course -> type: Course
 *
 * @returns tpe: Scorecard
 */
const ScorecardMutations = {
  newScorecard: async (_: any, { course }: NewScorecardModel, ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);
      const profile: any = await ctx.prisma
        .account({ id: accountId })
        .profile()
        .$fragment(ProfileFragment);

      return await ctx.prisma.createScorecard({
        profile: {
          connect: {
            id: profile.id
          }
        },
        golfers: {
          create: {
            id: accountId,
            name: profile.fullName
          }
        },
        course: {
          connect: {
            id: course.id
          }
        }
      });
    } catch (ex) {
      throw new MutationFailedError(ex);
    }
  },
  addGolfersToScorecard: async (
    _: any,
    { profiles: [Profile], nonMembers },
    ctx: Context
  ) => {
    const accountId = getAccountId(ctx);

    // Get the current users scorecards so we can determine the currently active one
    const profile: any = await ctx.prisma.account({ id: accountId })
      .$fragment(`fragment ProfileScorecards on Profile {
      id, scoreCards
    }`);
    const allUsersScorecards = profile.scoreCards;

    // TODO: fix this, I don't think sorting by
    // datetime like this works properly
    allUsersScorecards.sort((a, b) => {
      return b.createdOn - a.createdOn;
    });

    if (nonMembers != null) {
      if (nonMembers.length != 0) {
        nonMembers.map(async nonMember => {
          await ctx.prisma.updateScorecard({
            where: {
              id: allUsersScorecards[0]
            },
            data: {
              golfers: {
                create: {
                  name: nonMember.name
                }
              }
            }
          });
        });
      }
      // TODO: not done yet... Need to add logic to determine for
      // actual registered members on the app and non registered
    }
  }
};

export default ScorecardMutations;
