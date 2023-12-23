import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId, toGlobalId } from "graphql-relay";
import { successField } from "@entria/graphql-mongo-helpers";
import { Posts, PostsModel } from "../PostsModel";
import { GraphQLContext } from "../../../graphql/context";
import { PostsConnection } from "../PostsType";
import { PostsLoader } from "../PostsLoader";

const postRegisterMutation = mutationWithClientMutationId({
  name: "PostRegisterMutation",
  inputFields: {
    clientName: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    hour: { type: new GraphQLNonNull(GraphQLString) },
    graphicLocation: { type: new GraphQLNonNull(GraphQLString) },
    service: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async (args: Posts, ctx: GraphQLContext) => {
    const { name, description, likes, comments } = args;

    if (!ctx.user) {
      throw new Error("You must be logged in to register an appointment");
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
    appointmentEdge: {
      type: PostsConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const post = await PostsLoader.load(context, id);
        if (!post) return null;

        return {
          cursor: toGlobalId("Appointment", post.id),
          node: post,
        };
      },
      ...successField,
    },
  },
});

export { postRegisterMutation };
