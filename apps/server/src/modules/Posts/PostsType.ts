import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { connectionDefinitions, globalIdField } from "graphql-relay";
import { nodeInterface, registerTypeLoader } from "../../node/typeRegister";
import { Posts } from "./PostsModel";
import { PostsLoader } from "./PostsLoader";

export const PostsType = new GraphQLObjectType<Posts>({
  name: "Posts",
  description: "Represent an Posts list",
  fields: () => ({
    id: globalIdField("Posts"),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.name,
    },

    description: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.description,
    },

    likes: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (post) => post.likes,
    },
    comments: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: (post) => post.comments,
    },
  }),
  interfaces: () => [nodeInterface],
});

export const PostsConnection = connectionDefinitions({
  name: "Appointment",
  nodeType: PostsType,
});

registerTypeLoader(PostsType, PostsLoader.load);
