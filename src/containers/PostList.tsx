import React, { useRef, useContext } from "react";
import { observer } from "mobx-react-lite";
import { List, Spin } from "antd";
import useIntersect from "../hooks/useIntersect";
import { IPost } from "../models/post";
import { PostItem } from "../components";

export interface IPostListProps {
  state: State;
  posts: IPost[];
  fetchMore?: () => void;
}

const PostList: React.SFC<IPostListProps> = observer(
  ({ posts, state, fetchMore }) => {
    const observeTarget = useRef<HTMLDivElement>(null);
    const intersectCallback: IntersectionObserverCallback = () => {
      fetchMore && fetchMore();
    };
    useIntersect(observeTarget, {}, intersectCallback);
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={posts}
          renderItem={(post: IPost) => <PostItem key={post._id} {...post} />}
        />
        {state === "FETCHING" && <Spin />}
        <div ref={observeTarget} style={{ height: 60 }} />
      </>
    );
  }
);

export default PostList;
