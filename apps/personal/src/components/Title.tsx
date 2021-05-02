import React from 'react';
import { css } from '@emotion/react';

const titleStyles = css({
  fontSize: 30,
  margin: '30px 0 10px',
});

export type Props = {
  children: string;
};

export const Title: React.FunctionComponent<Props> = ({ children }) => (
  <h1 css={titleStyles}>{children}</h1>
);
