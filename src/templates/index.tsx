import React from 'react';

import { Layout } from '../components/Layout';
import { graphql } from 'gatsby';

// const templates = {
//   blog: BlogTemplate,
// };

export default ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, date },
    },
  },
  pathContext: { template },
}) => (
  <Layout>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`;
