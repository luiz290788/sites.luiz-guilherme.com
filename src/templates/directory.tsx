import React from 'react';
import { graphql } from 'gatsby';

export default ({ data, pathContext: { directory } }) => <div>{directory}</div>;

export const query = graphql`
  query($regex: String!) {
    allMarkdownRemark(filter: { fields: { slug: { regex: $regex } } }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`;
