import { IMode } from "./codemirror";

export interface IPost {
  _id: string;
  title: string;
  problem: string;
  description: string;
  mode: IMode;
  code: string;
}

export type INewPost = Omit<IPost, "_id">;
