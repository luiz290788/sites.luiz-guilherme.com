import React from 'react';
import { Global, css } from '@emotion/core';

import theme from '../styles/theme';
import { Header } from './Header';
import { SiteMenu } from './SiteMenu';

export const Layout = ({ children }) => (
  <React.Fragment>
    <Global
      styles={css({
        body: {
          color: theme.primaryColor,
          backgroundColor: 'white',
          fontFamily: "'Open Sans', sans-serif",
          maxWidth: 800,
          margin: '8px auto 0',
          padding: '0 4px',
        },
        h1: {
          fontWeight: 800,
          fontSize: 24,
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
  </React.Fragment>
);
