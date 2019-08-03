import { getAccountId } from "../../utils";
import { ScorecardsFragment } from "../Fragments/Scorecards";
import { ProfileFragment } from "../Fragments/Profile";
import { IDModel, Context } from "../../types";
import { QueryFailedError } from "../../errorhandling/customerrors";

export const ProfileQueries = {
  /**
   * Get logged in users profile by using accountId
   * stored in auth token
   *
   * @returns type: Profile
   */
  myProfile: async (_: any, __: any, ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);

      return await ctx.prisma
        .account({ id: accountId })
        .profile()
        .$fragment(ProfileFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  },
  /**
   * Retrieve all profile records
   *
   * @returns type: [Profile]
   */
  allProfiles: async (_: any, __: any, ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);

      return await ctx.prisma.profiles().$fragment(ProfileFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  },
  /**
   * Retrieve a single profile record by the primary key (ID)
   *
   * @param profileId -> type: string
   *
   * @returns type: Profile
   */
  profileById: async (_: any, { id: profileId }: IDModel, ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);

      return await ctx.prisma
        .profile({ id: profileId })
        .$fragment(ProfileFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  }
};
