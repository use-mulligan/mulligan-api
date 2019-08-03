import { getAccountId } from "../../utils";
import { CourseFragment } from "../Fragments/Course";
import { IDModel, Context } from "../../types";
import { QueryFailedError } from "../../errorhandling/customerrors";

export const CourseQueries = {
  /**
   * Retrieve a single course by the course record
   * primary key (ID)
   *
   * @param courseId -> type: string
   * @returns type: Course
   */
  course: async (_: any, { id: courseId }: IDModel, ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);

      return await ctx.prisma
        .course({ id: courseId })
        .$fragment(CourseFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  },
  /**
   * Retrieve all course records
   *
   * @returns type: [Course]
   */
  courses: async (_: any, __: any, ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);

      return await ctx.prisma.courses().$fragment(CourseFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  }
};
