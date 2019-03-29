import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { PostList } from "./containers";
import postStore from "./store/postStore";

import { Editor } from "./containers";

const App = observer(() => {
  useEffect(() => {
    postStore.fetchPosts();
  }, []);
  return (
    <div>
      <Editor />
      <PostList state={postStore.fetchState} posts={postStore.posts} />
    </div>
  );
});

export default App;
