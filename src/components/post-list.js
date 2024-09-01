import React from 'react';
import { Link } from 'gatsby';

const PostList = ({ posts }) => (
  <ul>
    {posts.map(({ node }) => (
      <li key={node.fields.slug}>
        <Link to={node.fields.slug}>
          <h2>{node.frontmatter.title}</h2>
        </Link>
        <p>{node.frontmatter.date}</p>
        <p>{node.excerpt}</p>
      </li>
    ))}
  </ul>
);

export default PostList;
