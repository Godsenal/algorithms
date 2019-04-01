import React, { useRef, useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { List, Spin } from "antd";
import useIntersect from "../hooks/useIntersect";
import { IPost } from "../models/post";
import { Link } from "react-router-dom";
import storeContext from "../contexts/storeContext";

export interface IPostListProps {
  state: State;
  posts: IPost[];
}

const PostList: React.SFC<IPostListProps> = observer(({ posts, state }) => {
  const { postStore } = useContext(storeContext);
  const observeTarget = useRef<HTMLDivElement>(null);
  const intersectCallback: IntersectionObserverCallback = () => {
    postStore.posts.length !== 0 &&
      !postStore.isLast &&
      postStore.fetchPosts({
        offset: postStore.posts[postStore.posts.length - 1]._id
      });
  };
  useIntersect(observeTarget, {}, intersectCallback);
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={posts}
        renderItem={(post: IPost) => (
          <List.Item
            key={post._id}
            actions={[<Link to={`/post/${post._id}`}>More</Link>]}
          >
            <List.Item.Meta title={post.title} description={post.mode} />
          </List.Item>
        )}
      />
      {state === "FETCHING" && <Spin />}
      <div ref={observeTarget} style={{ height: 60 }} />
    </>
  );
});

export default PostList;
