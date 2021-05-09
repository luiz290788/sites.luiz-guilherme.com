import { css } from '@emotion/react';
import { graphql, Link } from 'gatsby';
import moment from 'moment';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
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
    span: {
      fontSize: 14,
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
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { regex: $regex } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
          }
        }
      }
    }
  }
`;

const Meta: React.FunctionComponent<{
  title: string;
  description: string;
  siteTitle: string;
}> = ({ title, description, siteTitle }) => {
  const { metaStyles } = useStyles(getStyles);
  return (
    <Fragment>
      <Helmet>
        <title>
          {title} - {siteTitle}
        </title>
        <meta name="description" content={description} />
      </Helmet>
      <div css={metaStyles}>
        {title && <h1>{title}</h1>}
        {description && <p>{description}</p>}
      </div>
    </Fragment>
  );
};

const Article: React.FunctionComponent<{
  slug: string;
  title: string;
  excerpt: string;
  date: Date;
}> = ({ slug, title, excerpt, date }) => {
  const { articleStyles } = useStyles(getStyles);
  return (
    <article css={articleStyles}>
      <h1>
        <Link to={slug}>{title}</Link>
      </h1>
      <span>{moment(date).format('DD, MMM YYYY')}</span>
      <p>{excerpt}</p>
    </article>
  );
};

type Props = {
  data: {
    site: { siteMetadata: { title: string } };
    allMarkdownRemark: {
      edges: {
        node: {
          fields: { slug: string };
          frontmatter: { title: string; date: string; description: string };
        };
      }[];
    };
  };
  pageContext: { meta: { title: string; description: string } };
};

export default ({
  data: { allMarkdownRemark, site },
  pageContext: { meta },
}: Props) => (
  <Layout>
    {meta && <Meta {...meta} siteTitle={site.siteMetadata.title} />}
    {allMarkdownRemark.edges.map(
      ({
        node: {
          fields: { slug },
          frontmatter: { title, date, description },
        },
      }) => (
        <Article
          slug={slug}
          title={title}
          excerpt={description}
          date={new Date(date)}
        />
      )
    )}
  </Layout>
);
