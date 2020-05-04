import React from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';
import { useStyles, StylesCreator } from '../styles/useStyles';

const getStyles: StylesCreator = (theme) => {
  const styles = css({
    h1: { margin: `0 0 ${theme.grid * 8}px` },
    p: { margin: `0 0 ${theme.grid * 2}px` },
  });

  return {
    styles,
  };
};

type ContentProps = {
  title: string;
  html: string;
};

const Content: React.FunctionComponent<ContentProps> = ({ title, html }) => {
  const { styles } = useStyles(getStyles);
  return (
    <div css={styles}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

type Props = {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: { title: string; date: Date };
    };
  };
};

export default ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title },
    },
  },
}: Props) => (
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
