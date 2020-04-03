import React from 'react';
import { graphql, Link } from 'gatsby';
import { Layout } from '../components/Layout';
import { css } from '@emotion/core';
import { useStyles } from '../styles/useStyles';

const getStyles = (theme) => {
  const articleStyles = css({
    margin: `0 0 ${theme.grid * 4}px`,
    h1: {
      fontWeight: 600,
      fontSize: 20,
      margin: `0 0 ${theme.grid * 2}px`,
    },
  });

  const metaStyles = css({
    h1: { margin: `0 0 ${theme.grid * 2}px` },
    margin: `0 0 ${theme.grid * 8}px`,
  });

  return {
    articleStyles,
    metaStyles,
  };
};

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

const Meta = ({ title, description }) => {
  const { metaStyles } = useStyles(getStyles);
  return (
    <div css={metaStyles}>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
    </div>
  );
};

const Article = ({ slug, title, excerpt }) => {
  const { articleStyles } = useStyles(getStyles);
  return (
    <article css={articleStyles}>
      <h1>
        <Link to={slug}>{title}</Link>
      </h1>
      <p>{excerpt}</p>
    </article>
  );
};

export default ({ data, pathContext: { meta } }) => (
  <Layout>
    {meta && <Meta {...meta} />}
    {data.allMarkdownRemark.edges.map(
      ({
        node: {
          fields: { slug },
          frontmatter: { title },
          excerpt,
        },
      }) => (
        <Article slug={slug} title={title} excerpt={excerpt} />
      ),
    )}
  </Layout>
);
