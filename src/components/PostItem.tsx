import React, { useMemo } from "react";
import styled from "styled-components";
import { Tag } from "antd";
import { format } from "date-fns";
import { SearchLink } from ".";
import { IPost } from "../models/post";
import { Link } from "react-router-dom";

const LinkBox = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: inherit;
  }
`;
const Container = styled.div`
  width: 100%;
  min-height: 200px;

  border: 1px solid #eee;
  border-radius: 2px;

  padding: 10px 20px;
  box-sizing: border-box;

  margin-top: 1rem;
`;
const Title = styled.h2`
  padding: 10px 0;
`;
const Problem = styled.p``;
const Created = styled.div``;
const Footer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const Tags = styled.div`
  flex: 1;
  text-align: right;
`;
const Mode = styled.div`
  flex: 0 1;
`;
const PostItem: React.SFC<IPost> = ({
  _id,
  title,
  problem,
  description,
  code,
  mode,
  tags,
  createdAt
}) => {
  const formattedDate = useMemo(() => {
    return format(createdAt, "YYYY-MM-DD");
  }, [createdAt]);
  return (
    <Container>
      <Created>{formattedDate}</Created>
      <Title>
        <Link to={`/post/${_id}`}>{title}</Link>
      </Title>
      <Problem>{problem}</Problem>
      <Footer>
        <Mode>
          <span>{mode}</span>
        </Mode>
        <Tags>
          {tags.map(tag => (
            <Tag key={tag}>
              <SearchLink query={tag} />
            </Tag>
          ))}
        </Tags>
      </Footer>
    </Container>
  );
};

export default React.memo(PostItem);
