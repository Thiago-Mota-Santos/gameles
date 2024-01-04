import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { connectionArgs } from "@entria/graphql-mongo-helpers";
import { nodeField, nodesField } from "../node/typeRegister";
import { UserType } from "../modules/User/UserType";
import { UserLoader } from "../modules/User/UserLoader";
import { PostsConnection } from "../modules/Posts/PostsType";
import { PostsLoader } from "../modules/Posts/PostsLoader";

const posts: GraphQLFieldConfig<any, any> = {
  type: new GraphQLNonNull(PostsConnection.connectionType),
  args: { ...connectionArgs },
  resolve: (_root, _args, context) => PostsLoader.loadAll(context, _args),
};

const me: GraphQLFieldConfig<any, any> = {
  type: UserType,
  description: "user logged",
  resolve: (_root, _args, context) =>
    UserLoader.load(context, context.user?._id),
};

export const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "root of all queries",
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    posts,
    me,
  }),
});
