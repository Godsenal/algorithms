export interface ITag {
  _id: string;
  name: string;
}

export type INewTag = PartialBy<ITag, "_id">;
