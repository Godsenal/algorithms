import axios from "axios";
import { IPost, INewPost } from "../models/post";

const instance = axios.create({
  baseURL: "/api/post"
});

const getPosts = () => {
  return instance.get<ApiResponse<IPost[]>>("/");
};

const postPost = (newPost: INewPost) => {
  return instance.post<ApiResponse<boolean>>("/", newPost);
};

export { getPosts, postPost };
