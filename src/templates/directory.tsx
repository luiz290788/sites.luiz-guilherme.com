import { css } from '@emotion/core';
import { graphql, Link } from 'gatsby';
import React from 'react';
import { Layout } from '../components/Layout';
import { Theme } from '../styles/theme';
import { useStyles } from '../styles/useStyles';

const getStyles = (theme: Theme) => {
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

const Meta: React.FunctionComponent<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  const { metaStyles } = useStyles(getStyles);
  return (
    <div css={metaStyles}>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
    </div>
  );
};

const Article: React.FunctionComponent<{
  slug: string;
  title: string;
  excerpt: string;
}> = ({ slug, title, excerpt }) => {
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

type Props = {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          fields: { slug: string };
          frontmatter: { title: string };
          excerpt: string;
        };
      }[];
    };
  };
  pathContext: { meta: { title: string; description: string } };
};

export default ({ data, pathContext: { meta } }: Props) => (
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
