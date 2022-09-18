import { Schema, model } from "mongoose";
import Post from "./post.interface";
// This is a schema, or a blueprint
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },
    author: {
      type:String,
      required: true,
    }
  },
  { timestamps: true }
);

export default model<Post>('Post',PostSchema);
