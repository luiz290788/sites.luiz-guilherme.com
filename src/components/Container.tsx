import React from 'react';
import { css } from '@emotion/core';
import { theme } from '../styles/theme';

const style = css({
  border: `4px solid ${theme.colors.primary}`,
  backgroundColor: theme.colors.secondary,
  h2: {
    fontSize: 20,
  },
});

export type Props = {
  children: React.ReactNode;
  title: React.ReactNode;
};

export const Container = ({ children, title }: Props) => (
  <section css={style}>
    <h2>{title}</h2>
    {children}
  </section>
);
