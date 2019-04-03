import React, { useEffect, useContext, useCallback } from "react";
import { observer, useObservable } from "mobx-react-lite";
import { PageHeader, Button, Input } from "antd";
import { Layout, AlignRight } from "../styles/Common";
import { PostList } from "../containers";
import { Link, RouteComponentProps } from "react-router-dom";
import storeContext from "../contexts/storeContext";

function getUrlParameter(location: any, name: string) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1]);
}

const App: React.SFC<RouteComponentProps> = observer(
  ({ location, history }) => {
    const state = useObservable({
      search: ""
    });
    const getCurrentUrlParam = getUrlParameter.bind(null, location);
    const { postStore } = useContext(storeContext);
    /* Fetch posts whenever location changes */
    useEffect(() => {
      postStore.fetchPosts({ search: getCurrentUrlParam("search"), limit: 10 });
    }, [location]);
    /* fetch more (lazy load) */
    const fetchMore = useCallback(() => {
      postStore.posts.length !== 0 &&
        !postStore.isLast &&
        postStore.fetchPosts({
          search: getCurrentUrlParam("search"),
          offset: postStore.posts[postStore.posts.length - 1]._id,
          limit: 10
        });
    }, [location]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      state.search = e.target.value;
    };
    /* push search query string to url on Enter */
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.keyCode === 13) {
        history.push(`/posts?search=${state.search}`);
      }
    };
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
        <Input
          size="large"
          placeholder="Search problem titles, tags or languages"
          value={state.search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <PostList
          state={postStore.fetchState}
          posts={postStore.posts}
          fetchMore={fetchMore}
        />
      </Layout>
    );
  }
);

export default App;
