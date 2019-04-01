import axios from "axios";
import { ITag } from "../models/tag";

const instance = axios.create({
  baseURL: "/api/tag"
});

const getTags = () => {
  return instance.get<ApiResponse<ITag[]>>("/");
};

export { getTags };
