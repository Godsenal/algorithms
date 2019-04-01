import axios from "axios";
import { IPost, INewPost, IPostQuery } from "../models/post";

const instance = axios.create({
  baseURL: "/api/post"
});

const getPost = (postId: string) => {
  return instance.get<ApiResponse<IPost>>(`?postId=${postId}`);
};
const getPosts = (query?: IPostQuery) => {
  let url = "";
  if (query) {
    url = "?";
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        url += `${key}=${value}&`;
      }
    });
    url = url.slice(0, -1); // remove last character(must be & or ?)
  }
  return instance.get<ApiResponse<IPost[]>>(`/list${url}`);
};

const postPost = (newPost: INewPost) => {
  return instance.post<ApiResponse<boolean>>("/", newPost);
};

export { getPost, getPosts, postPost };
