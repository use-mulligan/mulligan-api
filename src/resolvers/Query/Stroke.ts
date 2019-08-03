import { getAccountId } from "../../utils";
import { Context, IDModel } from "../../types";
import { StrokeFragment } from "../Fragments/Stroke";
import { QueryFailedError } from "../../errorhandling/customerrors";

const StrokeQueries = {
  /**
   * Retrieve stroke record by its primary key (ID)
   *
   * @param id -> type: string
   *
   * @returns type: Stroke
   */
  stroke: async (_: any, { id: id }: IDModel, ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);
      return await ctx.prisma.stroke({ id }).$fragment(StrokeFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  },

  /**
   * Retrieves all stroke records
   *
   * @returns type: [Stroke]
   */
  strokes: async (ctx: Context) => {
    try {
      const accountId = getAccountId(ctx);
      return await ctx.prisma.strokes().$fragment(StrokeFragment);
    } catch (ex) {
      throw new QueryFailedError(ex);
    }
  }
};

export default StrokeQueries;
