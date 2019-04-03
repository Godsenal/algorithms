import React from "react";
import { Link } from "react-router-dom";

const SearchLink: React.SFC<{ query: string }> = ({ children, query }) => {
  return <Link to={`/posts?search=${query}`}>{children || query}</Link>;
};

export default SearchLink;
