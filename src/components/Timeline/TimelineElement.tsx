import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { useStyles } from '../../styles/useStyles';

const getStyles = (theme) => {
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
    width: 'calc(50% + 10px)',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `${theme.grid * 6}px 0`,
    '@media (max-width: 420px)': {
      width: 'calc(100% - 10px)',
    },
  });

  const rightStyles = css({
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
    [`.css-${contentStyles.name}`]: {
      alignItems: 'flex-start',
      textAlign: 'start',
    },
  });

  const leftStyles = css({
    alignSelf: 'flex-start',
    flexDirection: 'row',
    [`.css-${contentStyles.name}`]: {
      alignItems: 'flex-end',
      textAlign: 'end',
    },
    '@media (max-width: 420px)': rightStyles,
  });

  return {
    contentStyles,
    bulletStyles,
    elementStyles,
    rightStyles,
    leftStyles,
  };
};

type Props = {
  position?: 'left' | 'right';
  children: React.ReactNode;
};

export const TimelineElement: React.FunctionComponent<Props> = ({
  position = 'left',
  children,
}) => {
  const {
    contentStyles,
    bulletStyles,
    elementStyles,
    rightStyles,
    leftStyles,
  } = useStyles(getStyles);
  return (
    <section
      css={css(position === 'left' ? leftStyles : rightStyles, elementStyles)}
    >
      <div css={contentStyles}>{children}</div>
      <div css={bulletStyles} />
    </section>
  );
};
