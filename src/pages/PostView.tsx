import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import postStore from "../store/postStore";
import { Layout } from "../styles/Common";
import { PageHeader } from "antd";
import { Codemirror } from "../components";

interface IMatchParams {
  postId: string;
}
const PostView: React.SFC<RouteComponentProps<IMatchParams>> = observer(
  ({ match }) => {
    const currentPost = useMemo(
      () => postStore.currentPost(match.params.postId),
      [match]
    );
    if (!currentPost) {
      return null;
    }
    const { title, problem, description, code, mode } = currentPost;
    return (
      <Layout>
        <PageHeader title={title} />
        <p>{problem}</p>
        <div>
          <span>{mode}</span>
        </div>
        <Codemirror value={code} mode={mode} readOnly />
        <p>{description}</p>
      </Layout>
    );
  }
);

export default PostView;
