import React from "react";
import { Codemirror } from ".";
import { IPost } from "../models/post";

const PostItem: React.SFC<IPost> = ({
  title,
  description,
  code,
  mode,
  tags
}) => {
  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
      <Codemirror value={code} mode={mode} readOnly />
      <ul>
        {tags.map(tag => (
          <li>{tag}</li>
        ))}
      </ul>
    </>
  );
};

export default PostItem;
