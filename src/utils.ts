import * as jwt from "jsonwebtoken";
import { AuthError } from "./errorhandling/customerrors";
import { Context } from "./types";

export function getAccountId(ctx: Context) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { accountId } = jwt.verify(token, process.env.APP_SECRET) as {
      accountId: string;
    };
    return accountId;
  }

  throw new AuthError();
}
