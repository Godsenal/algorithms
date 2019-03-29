import React from "react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Editor } from "../containers";
import { Layout } from "../styles/Common";
import postStore from "../store/postStore";
import { reaction } from "mobx";

const PostEdit: React.SFC<RouteComponentProps> = observer(({ history }) => {
  reaction(
    () => postStore.addState,
    addState => {
      addState === "SUCCESS" && history.push("/");
    }
  );
  return (
    <Layout>
      <h1>Editor</h1>
      <Editor />
    </Layout>
  );
});

export default PostEdit;
