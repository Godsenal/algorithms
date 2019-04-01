import { observable, action, computed, runInAction } from "mobx";
import * as postApi from "../api/post";
import { IPost, INewPost } from "../models/post";
import { IMode } from "../models/codemirror";
import { INewTag } from "../models/tag";

export class Post implements INewPost {
  @observable _id?: string = "";
  @observable title: string = "";
  @observable problem: string = "";
  @observable mode: IMode = "c++";
  @observable code: string = "";
  @observable description: string = "";
  @observable tags: INewTag[] = [];

  constructor(post: INewPost) {
    Object.assign(this, post);
  }
}

export class PostStore {
  @observable posts: IPost[] = [];
  @observable fetchState: State = "INIT";
  @observable addState: State = "INIT";

  @action
  async fetchPosts() {
    this.fetchState = "FETCHING";
    try {
      const {
        data: { payload }
      } = await postApi.getPosts();
      runInAction(() => {
        this.posts = payload;
        this.fetchState = "SUCCESS";
      });
    } catch (err) {
      runInAction(() => {
        this.fetchState = "FAILURE";
      });
    }
  }

  @action
  addPost(post: INewPost) {
    this.addState = "FETCHING";
    const newPost = new Post(post);
    setTimeout(
      action(() => {
        this.posts.push(newPost as IPost); // 서버 패치전 까지 임시
        this.addState = "SUCCESS";
      }),
      1000
    );
  }

  currentPost(postId: string): IPost {
    return this.posts.find(post => post._id === postId);
  }
}

export default PostStore;
