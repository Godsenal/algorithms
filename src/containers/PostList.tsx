import React from "react";
import { observer } from "mobx-react-lite";
import { PostItem } from "../components";
import { Post } from "../models/post";

export interface IPostListProps {
  state: State;
  posts: Post[];
}

const PostList: React.SFC<IPostListProps> = observer(({ posts, state }) => {
  if (state === "FETCHING") {
    return <div>loading...</div>;
  }
  return (
    <>
      {posts.map((post, i) => {
        return <PostItem key={i} {...post.post} />;
      })}
    </>
  );
});

export default PostList;
