import React from 'react';
import { Global, css } from '@emotion/core';

import theme from '../styles/theme';
import { Header } from './Header';

export const Layout = ({ children }) => (
  <React.Fragment>
    <Global
      styles={css({
        body: {
          color: theme.primaryColor,
          backgroundColor: 'white',
          fontFamily: "'Open Sans', sans-serif",
          maxWidth: 600,
          margin: '30px auto 0',
          padding: '0 5px',
        },
      })}
    />
    <Header />
    {children}
  </React.Fragment>
);
