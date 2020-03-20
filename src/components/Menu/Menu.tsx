import React from 'react';
import { css } from '@emotion/core';

const menuStyles = css({
  display: 'flex',
  flexDirection: 'row',
  margin: '10px 0',
  '& > *': {
    margin: '0 5px',
  },
  '& :first-child': {
    margin: '0 5px 0 0',
  },
});

type Props = {
  children: React.ReactNodeArray;
};

export const Menu: React.FunctionComponent<Props> = ({ children }) => (
  <section css={menuStyles}>{children}</section>
);
