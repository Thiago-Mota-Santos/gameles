import type { Document, Types } from "mongoose";
import mongoose from "mongoose";

export interface Posts extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  likes: number;
  comments: string;
}

export type PostsDocument = Document & Posts;

const PostSchema = new mongoose.Schema<Posts>(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      index: { unique: true },
    },
    description: {
      type: String,
      required: true,
      min: 5,
      max: 60,
    },
    likes: {
      type: Number,
      required: true,
    },
    comments: {
      name: {
        type: String,
      },
      message: {
        type: String,
      },
      likes: {
        type: Number,
      },
    },
  },
  {
    collection: "Posts",
  },
);

export const PostsModel = mongoose.model("Posts", PostSchema);
