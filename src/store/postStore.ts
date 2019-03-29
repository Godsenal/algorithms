import { observable, action } from "mobx";
import { Post } from "../models/post";

export class PostStore {
  @observable posts: Post[] = [];
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
  addPost(post: Post) {
    this.posts.push(post);
  }
}

const postStore = new PostStore();
export default postStore;
