import React from 'react';
import { graphql, Link } from 'gatsby';
import { Layout } from '../components/Layout';
import { css } from '@emotion/core';

const articleStyles = css({
  margin: '0 0 16px',
  h1: {
    fontWeight: 600,
    fontSize: 20,
  },
});

const metaStyles = css({
  h1: { margin: '0 0 8px' },
  margin: '0 0 32px',
});

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

const Meta = ({ title, description }) => (
  <div css={metaStyles}>
    {title && <h1>{title}</h1>}
    {description && <p>{description}</p>}
  </div>
);

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
        <article css={articleStyles}>
          <h1>
            <Link to={slug}>{title}</Link>
          </h1>
          <p>{excerpt}</p>
        </article>
      ),
    )}
  </Layout>
);
