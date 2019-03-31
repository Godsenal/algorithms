import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Editor } from "../containers";
import { Layout } from "../styles/Common";
import { reaction } from "mobx";
import storeContext from "../contexts/storeContext";

const PostEdit: React.SFC<RouteComponentProps> = observer(({ history }) => {
  const { postStore } = useContext(storeContext);
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
