import React from 'react';
import { css } from '@emotion/core';

const contentStyles = css({
  margin: '0 10px',
  display: 'flex',
  flexShrink: 1,
  flexGrow: 1,
  flexDirection: 'column',
});

const bulletStyles = css({
  backgroundColor: 'black',
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
  padding: '25px 0',
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

type Props = {
  position?: 'left' | 'right';
  children: React.ReactNode;
};

export const TimelineElement: React.FunctionComponent<Props> = ({
  position = 'left',
  children,
}) => (
  <section
    css={css(position === 'left' ? leftStyles : rightStyles, elementStyles)}
  >
    <div css={contentStyles}>{children}</div>
    <div css={bulletStyles} />
  </section>
);
