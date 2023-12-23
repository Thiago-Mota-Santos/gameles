import type { ParameterizedContext } from "koa";
import { Maybe } from "@repo/types";
import type { UserDocument } from "../modules/User/UserModel";
import type { DataLoaders } from "../modules/loader/loaderRegister";

export interface GraphQLContext {
  ctx: ParameterizedContext;
  user?: Maybe<UserDocument>;
  dataloaders: DataLoaders;
}
