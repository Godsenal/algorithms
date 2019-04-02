import { IMode } from "./codemirror";
import { ITag, INewTag } from "./tag";

export interface IPost {
  _id: string;
  title: string;
  problem: string;
  description: string;
  mode: IMode;
  code: string;
  tags: string[];
  createdAt: string;
}

export type INewPost = Omit<PartialBy<IPost, "_id" | "createdAt">, "tags"> & {
  tags: INewTag[];
};

export interface IPostQuery {
  limit?: number;
  offset?: string; // Object ID
  search?: string; // Search Query
}
