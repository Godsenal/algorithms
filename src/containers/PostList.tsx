import React from "react";
import { observer } from "mobx-react-lite";
import { List } from "antd";
import { IPost } from "../models/post";
import { Link } from "react-router-dom";

export interface IPostListProps {
  state: State;
  posts: IPost[];
}

const PostList: React.SFC<IPostListProps> = observer(({ posts, state }) => {
  if (state === "INIT") {
    return null;
  }
  if (state === "FETCHING") {
    return <div>loading...</div>;
  }
  return (
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
  );
});

export default PostList;
