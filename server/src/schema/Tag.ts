import { Document, Schema, Model, model } from "mongoose";
import { ITag } from "@interface/tag";

export interface ITagDocument extends Document {
  name: string;
}
export const TagSchema: Schema = new Schema<ITag>({
  name: { type: String, index: { unique: true } }
});

export default model<ITagDocument>("Tag", TagSchema);
