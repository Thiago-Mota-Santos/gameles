import { GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { successField } from "@entria/graphql-mongo-helpers";
import { Posts, PostsModel } from "../PostsModel";
import { GraphQLContext } from "../../../graphql/context";
import { PostsConnection } from "../PostsType";
import { PostsLoader } from "../PostsLoader";

const postRegisterMutation = mutationWithClientMutationId({
  name: "PostRegisterMutation",
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    likes: { type: new GraphQLNonNull(GraphQLInt) },
  },
  mutateAndGetPayload: async (args: Posts, ctx: GraphQLContext) => {
    const { name, description, likes, comments } = args;

    if (!ctx.user) {
      throw new Error("You must to be logged to make a post");
    }

    const newPost = await new PostsModel({
      name,
      description,
      likes,
      comments,
    }).save();

    return {
      id: newPost._id.toString(),
      success: "New post has been created",
    };
  },
  outputFields: {
    postEdge: {
      type: PostsConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const post = await PostsLoader.load(context, id);
        if (!post) return null;

        return {
          cursor: toGlobalId("Post", post.id),
          node: post,
        };
      },
      ...successField,
    },
  },
});

export { postRegisterMutation };
