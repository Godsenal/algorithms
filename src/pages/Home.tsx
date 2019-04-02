import React, { useEffect, useContext, useCallback } from "react";
import { observer, useObservable } from "mobx-react-lite";
import { PageHeader, Button, Input } from "antd";
import queryString from "query-string";
import { Layout, AlignRight } from "../styles/Common";
import { PostList } from "../containers";
import { Link, RouteComponentProps } from "react-router-dom";
import storeContext from "../contexts/storeContext";

const App: React.SFC<RouteComponentProps> = observer(
  ({ location, history }) => {
    const state = useObservable({
      search: ""
    });
    const { postStore } = useContext(storeContext);
    useEffect(() => {
      const searchQuery = queryString.parse(location.search, { decode: false });
      postStore.fetchPosts({ ...searchQuery, limit: 10 });
    }, [location]);
    const fetchMore = useCallback(() => {
      postStore.posts.length !== 0 &&
        !postStore.isLast &&
        postStore.fetchPosts({
          ...queryString.parse(location.search),
          offset: postStore.posts[postStore.posts.length - 1]._id,
          limit: 10
        });
    }, [location]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      state.search = e.target.value;
    };
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
