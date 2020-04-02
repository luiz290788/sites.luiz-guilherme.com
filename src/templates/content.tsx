import React from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';

const styles = css({
  h1: {
    margin: '0 0 32px',
  },
});

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
    <div css={styles}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
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
