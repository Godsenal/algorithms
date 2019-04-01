import { IMode } from "./codemirror";
import { ITag, INewTag } from "./tag";

export interface IPost {
  _id: string;
  title: string;
  problem: string;
  description: string;
  mode: IMode;
  code: string;
  tags: ITag[];
}

export type INewPost = Omit<PartialBy<IPost, "_id">, "tags"> & {
  tags: INewTag[];
};
