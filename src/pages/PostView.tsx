import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { observer, useObservable } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Tag, Spin } from "antd";
import { Layout } from "../styles/Common";
import { Codemirror, SearchLink } from "../components";
import storeContext from "../contexts/storeContext";

const SubTitle = styled.h2`
  font-style: italic;
`;
const PostInfo = styled.div`
  text-align: right;
`;
const Language = styled.div`
  margin-right: 8px;
`;
const Mode = styled.h3``;
interface IMatchParams {
  postId: string;
}
const PostView: React.SFC<RouteComponentProps<IMatchParams>> = observer(
  ({ match }) => {
    const fetchState = useObservable({ initialLoad: false });
    const { postStore } = useContext(storeContext);
    useEffect(() => {
      postStore.getPost(match.params.postId).then(() => {
        fetchState.initialLoad = true;
      });
    }, []);
    if (!fetchState.initialLoad || !postStore.post) {
      return null;
    }
    if (postStore.getState === "FETCHING") {
      return (
        <Layout>
          <Spin />
        </Layout>
      );
    }
    const { title, problem, description, code, mode, tags } = postStore.post;
    return (
      <Layout>
        <h1>{title}</h1>
        <PostInfo>
          <Language>
            <SearchLink query={mode}>
              <span>Language: {mode}</span>
            </SearchLink>
          </Language>
          <div>
            {tags.map((tag, i) => (
              <Tag key={i}>
                <SearchLink query={tag} />
              </Tag>
            ))}
          </div>
        </PostInfo>
        <SubTitle>Problem</SubTitle>
        <p>{problem}</p>
        <SubTitle>Code</SubTitle>
        <Mode>{mode}</Mode>
        <Codemirror value={code} mode={mode} readOnly />
        <SubTitle>description</SubTitle>
        <p>{description}</p>
      </Layout>
    );
  }
);

export default PostView;
