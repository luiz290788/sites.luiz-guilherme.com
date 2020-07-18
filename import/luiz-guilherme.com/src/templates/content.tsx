import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import 'prismjs/themes/prism-tomorrow.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from '../components/Layout';
import { Theme } from '../styles/theme';
import { useStyles } from '../styles/useStyles';

const getStyles = (theme: Theme) => {
  const styles = css({
    h1: { margin: `0 0 ${theme.grid * 8}px` },
    h2: { margin: `${theme.grid * 6}px 0 ${theme.grid * 4}px` },
    p: { margin: `0 0 ${theme.grid * 2}px` },
    '.info': {
      margin: `${theme.grid * 4}px ${theme.grid * 2}px`,
      padding: `${theme.grid * 2}px`,
      borderRadius: `${theme.grid * 3}px`,
      backgroundColor: theme.colors.tertiary,
      fontStyle: 'italic',
    },

    '*:not(pre) > code[class*="language-"]': {
      borderRadius: '2.3em',
      padding: '.05em 0.5em',
    },
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
    site: { siteMetadata: { title: string } };
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        date: Date;
        keywords: string;
        description: string;
      };
    };
  };
};

export default ({
  data: {
    site: {
      siteMetadata: { title: siteTitle },
    },
    markdownRemark: {
      html,
      frontmatter: { title, keywords, description },
    },
  },
}: Props) => (
  <Layout>
    <Helmet>
      <title>
        {title} - {siteTitle}
      </title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <Content title={title} html={html} />
  </Layout>
);

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        keywords
        description
      }
    }
  }
`;
