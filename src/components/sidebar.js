import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import "./sidebar.css" // Import the CSS for sidebar

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
      totalCount
        group(field: {fields: {category: SELECT}}) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return (
    <div className="sidebar-wrapper">
      <h2>Categories</h2>
      <ul>
        {/* All Posts item */}
        <li>
          <Link className="sidebar-allpost" to="/">
            All Posts ({data.allMarkdownRemark.totalCount})
          </Link>
        </li>
        {/* <hr></hr> */}
        {/* Category items */}
        {data.allMarkdownRemark.group.map(category => (
          <li key={category.fieldValue}>
            <Link to={`/category/${category.fieldValue}/`}>
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
