import axios from "axios";
import queryString from "query-string";
import { IPost, INewPost, IPostQuery } from "../models/post";

const instance = axios.create({
  baseURL: "/api/post"
});

const getPost = (postId: string) => {
  return instance.get<ApiResponse<IPost>>(`?postId=${postId}`);
};
const getPosts = (query?: IPostQuery) => {
  const url = query ? `?${queryString.stringify(query)}` : "";
  console.log(url);
  return instance.get<ApiResponse<IPost[]>>(`/list${url}`);
};

const postPost = (newPost: INewPost) => {
  return instance.post<ApiResponse<boolean>>("/", newPost);
};

export { getPost, getPosts, postPost };
