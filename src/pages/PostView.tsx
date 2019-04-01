import React, { useMemo, useContext } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Tag } from "antd";
import { Layout } from "../styles/Common";
import { Codemirror } from "../components";
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
    const { postStore } = useContext(storeContext);
    const currentPost = useMemo(
      () => postStore.currentPost(match.params.postId),
      [match]
    );
    if (!currentPost) {
      return null;
    }
    const { title, problem, description, code, mode, tags } = currentPost;
    return (
      <Layout>
        <h1>{title}</h1>
        <PostInfo>
          <Language>
            <span>Language: {mode}</span>
          </Language>
          <div>
            {tags.map((tag, i) => (
              <Tag key={i}>{tag.name}</Tag>
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
