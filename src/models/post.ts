import { IMode } from "./codemirror";
import { observable, action } from "mobx";
import { PostStore } from "../store/postStore";

export interface IPost {
  title: string;
  description: string;
  mode: IMode;
  code: string;
}
export class Post {
  @observable post: IPost;

  store: PostStore;

  constructor(store: PostStore, post: IPost) {
    this.store = store;
    this.post = post;
  }
  @action save() {
    this.store.addPost(this);
  }
}
