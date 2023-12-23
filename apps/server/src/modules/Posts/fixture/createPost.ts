import { DeepPartial } from "@repo/types";
import { getCounter } from "../../../../test/counters";
import { createUser } from "../../User/fixture/createUser";
import { Posts, PostsDocument, PostsModel } from "../PostsModel";

export const createAppointment = async (
  args?: DeepPartial<Posts>,
): Promise<PostsDocument> => {
  const i = getCounter("appointment");

  const user = await createUser();

  return new PostsModel({
    name: `fulano#${i}`,
    description: `this game was so cool-${i}`,
    comments: `haha this so cool, right?${i}`,
    hour: `${i}`,
    _id: user._id,
    ...args,
  }).save();
};
