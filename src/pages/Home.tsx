import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { PageHeader, Button } from "antd";
import { Layout, AlignRight } from "../styles/Common";
import { PostList } from "../containers";
import postStore from "../store/postStore";
import { Link } from "react-router-dom";

const App = observer(() => {
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
