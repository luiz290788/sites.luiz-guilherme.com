import React from 'react';
import { css } from '@emotion/core';

const linkStyles = css({
  '&:visited': {
    color: 'inherit',
  },
  textDecoration: 'underline',
});

type Props = {
  url: string;
  children: React.ReactNode;
};

export const Link: React.FunctionComponent<Props> = ({ url, children }) => (
  <a href={url} target="_blank" css={linkStyles}>
    {children}
  </a>
);
