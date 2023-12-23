import { createLoader } from "@entria/graphql-mongo-helpers";
import { registerLoader } from "../loader/loaderRegister";
import { PostsModel } from "./PostsModel";

const { Wrapper, getLoader, clearCache, load, loadAll } = createLoader({
  model: PostsModel,
  loaderName: "PostsLoader",
});

export const PostsLoader = {
  Appointment: Wrapper,
  getLoader,
  clearCache,
  load,
  loadAll,
};

registerLoader("PostsLoader", getLoader);
