import type { Document, Types } from "mongoose";
import mongoose from "mongoose";

export interface Posts extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  imageUrl: string;
  likes: number;
  comments: string;
  rt: boolean;
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
    imageUrl: {
      type: String,
    },
    likes: {
      type: Number,
    },
    rt: {
      type: Boolean,
    },
  },
  {
    collection: "Posts",
  },
);

export const PostsModel = mongoose.model("Posts", PostSchema);
