import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { PageHeader, Button } from "antd";
import { Layout, AlignRight } from "../styles/Common";
import { PostList } from "../containers";
import { Link } from "react-router-dom";
import storeContext from "../contexts/storeContext";

const App = observer(() => {
  const { postStore } = useContext(storeContext);
  useEffect(() => {
    if (postStore.fetchState === "INIT") {
      postStore.fetchPosts();
    }
  }, []);
  return (
    <Layout>
      <PageHeader
        title="Algorithms"
        subTitle="Collection of algorithms"
        style={{ padding: 0 }}
      />
      <AlignRight>
        <Button>
          <Link to="/editor">Add a new algorithm</Link>
        </Button>
      </AlignRight>
      <PostList state={postStore.fetchState} posts={postStore.posts} />
    </Layout>
  );
});

export default App;
