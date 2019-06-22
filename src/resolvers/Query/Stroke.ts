import { Context, getAccountId } from "../../utils";

const StrokeQueries = {
  stroke: async ({ id }: any, ctx: Context) => {
    const accountId = getAccountId(ctx);
    return await ctx.prisma.stroke({ id });
  },

  strokes: async (ctx: Context) => {
    const accountId = getAccountId(ctx);
    return await ctx.prisma.strokes();
  }
};

export default StrokeQueries;
