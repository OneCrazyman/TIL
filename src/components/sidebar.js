import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        group(field: {fields: {category: SELECT}}) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  return (
    <aside>
      <h2>Categories</h2>
      <ul>
        {data.allMarkdownRemark.group.map(category => (
          <li key={category.fieldValue}>
            <Link to={`/category/${category.fieldValue}/`}>
              {category.fieldValue} ({category.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
