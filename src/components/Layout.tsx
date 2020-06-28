import React from 'react';
import { Global, css } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';

import { theme } from '../styles/theme';
import { Header } from './Header';
import { SiteMenu } from './SiteMenu';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

export type Props = {
  children: React.ReactNode;
};

type ResponseType = {
  site: { siteMetadata: { title: string } };
};

export const Layout: React.FunctionComponent<Props> = ({ children }) => {
  const {
    site: {
      siteMetadata: { title },
    },
  }: ResponseType = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <Global
          styles={css({
            body: {
              color: theme.colors.primary,
              backgroundColor: theme.colors.color1,
              fontFamily: theme.fontFamily,
              maxWidth: 800,
              margin: `${theme.grid * 2}px auto 0`,
              padding: `0 ${theme.grid}px`,
            },
            h1: {
              fontWeight: 800,
              fontSize: 24,
            },
            h2: {
              fontWeight: 400,
              fontSize: 20,
            },
            a: {
              '&:visited': {
                color: 'inherit',
              },
              textDecoration: 'underline',
            },
          })}
        />
        <SiteMenu />
        <Header />
        {children}
      </ThemeProvider>
    </React.Fragment>
  );
};
