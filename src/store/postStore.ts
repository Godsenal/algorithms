import { observable, action, computed } from "mobx";
import uuid from "node-uuid";
import { IPost, INewPost } from "../models/post";
import { IMode } from "../models/codemirror";

export class Post implements IPost {
  @observable _id: string = "";
  @observable title: string = "";
  @observable problem: string = "";
  @observable mode: IMode = "c++";
  @observable code: string = "";
  @observable description: string = "";

  constructor(post: INewPost) {
    this._id = uuid.v4();
    Object.assign(this, post);
  }
}

export class PostStore {
  @observable posts: IPost[] = [];
  @observable fetchState: State = "INIT";
  @observable addState: State = "INIT";

  @action
  fetchPosts() {
    this.fetchState = "FETCHING";
    setTimeout(
      action("fetchSuccess", () => {
        this.fetchState = "SUCCESS";
      }),
      1500
    );
  }

  @action
  addPost(post: INewPost) {
    this.addState = "FETCHING";
    const newPost = new Post(post);
    setTimeout(
      action(() => {
        this.posts.push(newPost);
        this.addState = "SUCCESS";
      }),
      1000
    );
  }

  currentPost(postId: string) {
    return this.posts.find(post => post._id === postId);
  }
}

export default PostStore;
