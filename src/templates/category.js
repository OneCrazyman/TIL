import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const CategoryTemplate = ({
  data: { allMarkdownRemark, site },
  pageContext,
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const posts = allMarkdownRemark.nodes
  const totalCount = data.allMarkdownRemark.totalCount
  const { category } = pageContext

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>No blog posts found for the category "{category}".</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      {/* <Seo title={`${category} 카테고리`} /> */}
      <h2>Posts in category: "{category}"</h2>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryPage($category: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { category: { eq: $category } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
        }
        excerpt
      }
    }
  }
`
