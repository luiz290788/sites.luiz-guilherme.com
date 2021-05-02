import React from 'react';
import { css } from '@emotion/react';
import { useStaticQuery, graphql } from 'gatsby';

const headerStyles = css({
  h1: {
    fontSize: 30,
    fontWeight: 800,
  },
  p: {
    fontSize: 14,
  },
  margin: '0 0 32px',
});

type Props = {};

export const Header: React.FunctionComponent<Props> = () => {
  const {
    site: {
      siteMetadata: { title, headline },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            headline
          }
        }
      }
    `
  );

  return (
    <section css={headerStyles}>
      <h1>{title}</h1>
      <p>{headline}</p>
    </section>
  );
};
