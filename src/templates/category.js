import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';

const CategoryTemplate = ({ data, pageContext }) => {
  const { category } = pageContext;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <h1>{category}</h1>
      <PostList posts={posts} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      filter: { fields: { category: { eq: $category } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default CategoryTemplate;