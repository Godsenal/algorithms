import { observable, action, computed, runInAction } from "mobx";
import * as postApi from "../api/post";
import { IPost, INewPost, IPostQuery } from "../models/post";
import { IMode } from "../models/codemirror";
import { INewTag } from "../models/tag";

export class Post implements INewPost {
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
  @observable post: IPost | null = null;
  @observable posts: IPost[] = [];
  @observable getState: State = "INIT"; // get current postview
  @observable fetchState: State = "INIT"; // get post list
  @observable addState: State = "INIT"; // add post

  @observable isLast = false;

  @action
  async fetchPosts(query?: IPostQuery) {
    const isInit = !query || !query.offset;
    // 초기 로드일 때 isLast를 원상태로.
    if (isInit) {
      this.isLast = false;
    }
    this.fetchState = "FETCHING";
    try {
      const {
        data: { payload }
      } = await postApi.getPosts(query);
      runInAction(() => {
        // length 0이면 isLast = true
        if (payload.length === 0) {
          this.isLast = true;
        }
        isInit
          ? (this.posts = payload)
          : (this.posts = [...this.posts, ...payload]);
        this.fetchState = "SUCCESS";
      });
    } catch (err) {
      runInAction(() => {
        this.fetchState = "FAILURE";
      });
    }
  }

  @action
  async addPost(post: INewPost) {
    this.addState = "FETCHING";
    const newPost = new Post(post);
    try {
      const {
        data: { payload }
      } = await postApi.postPost(newPost);
      if (payload) {
        this.addState = "SUCCESS";
      }
    } catch (err) {
      this.addState = "FAILURE";
    }
  }

  @action
  async getPost(postId: string) {
    try {
      const {
        data: { payload }
      } = await postApi.getPost(postId);
      this.post = null;
      this.getState = "FETCHING";
      runInAction(() => {
        if (!payload) {
          this.getState = "FAILURE";
        } else {
          this.post = payload;
          this.getState = "SUCCESS";
        }
      });
    } catch (err) {
      runInAction(() => {
        this.getState = "FAILURE";
      });
    }
  }
}

export default PostStore;
