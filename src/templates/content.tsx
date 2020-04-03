import React from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';
import { useStyles } from '../styles/useStyles';

const getStyles = (theme) => {
  const styles = css({
    h1: { margin: `0 0 ${theme.grid * 8}px` },
    p: { margin: `0 0 ${theme.grid * 2}px` },
  });

  return {
    styles,
  };
};

const Content = ({ title, html }) => {
  const { styles } = useStyles(getStyles);
  return (
    <div css={styles}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, date },
    },
  },
}) => (
  <Layout>
    <Content title={title} html={html} />
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
