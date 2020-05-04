import { css } from '@emotion/core';
import React from 'react';
import { useStyles, StylesCreator } from '../../styles/useStyles';

const getStyles: StylesCreator = (theme) => {
  const contentStyles = css({
    margin: `0 ${theme.grid * 2}px`,
    display: 'flex',
    flexShrink: 1,
    flexGrow: 1,
    flexDirection: 'column',
  });

  const bulletStyles = css({
    backgroundColor: theme.colors.tertiary,
    boxShadow: `0px 0px 2px 8px ${theme.colors.color1}`,
    width: 20,
    height: 20,
    flexShrink: 0,
    flexGrow: 0,
    borderRadius: '50%',
  });

  const elementStyles = css({
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `${theme.grid * 4}px 0`,
    width: 'calc(100% - 10px)',
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  });

  return {
    contentStyles,
    bulletStyles,
    elementStyles,
  };
};

type Props = {
  children: React.ReactNode;
};

export const TimelineElement: React.FunctionComponent<Props> = ({
  children,
}) => {
  const { contentStyles, bulletStyles, elementStyles } = useStyles(getStyles);
  return (
    <section css={css(elementStyles)}>
      <div css={contentStyles}>{children}</div>
      <div css={bulletStyles} />
    </section>
  );
};
