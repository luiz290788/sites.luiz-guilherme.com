import React from 'react';
import { css } from '@emotion/core';

const menuStyles = css({
  display: 'flex',
  flexDirection: 'row',
  margin: '0 0 16px',
  '& > *': {
    margin: '0 8px',
  },
  '& :first-child': {
    margin: '0 8px 0 0',
  },
});

type Props = {
  children: React.ReactNodeArray;
};

export const Menu: React.FunctionComponent<Props> = ({ children }) => (
  <section css={menuStyles}>{children}</section>
);
