import { Document, Schema, Model, model } from "mongoose";
import { IPost } from "@interface/post";

export interface IPostDocument extends Document {
  title: string;
  code: string;
  problem: string;
  description?: string;
  mode: string;
  tags: string[];
  createAt: string;
}
export const PostSchema: Schema = new Schema<IPost>({
  title: String,
  code: String,
  problem: String,
  description: String,
  mode: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default model<IPostDocument>("Post", PostSchema);
