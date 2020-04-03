import React from 'react';
import { css } from '@emotion/core';

import { TimelineElement } from './TimelineElement';
import { useStyles } from '../../styles/useStyles';

const containerStyles = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  margin: '5px 0',
});

const getTimelineStyles = (theme) =>
  css({
    position: 'absolute',
    top: 0,
    left: 'calc(50% - 3px)',
    height: '100%',
    width: 6,
    background: theme.colors.tertiary,
    borderRadius: 20,
    zIndex: -1,
    '@media (max-width: 420px)': {
      left: '17px',
    },
  });

type Props = {
  children: React.ReactNodeArray;
};

const isReactElement = (child: any): child is React.ReactElement =>
  typeof child.type !== undefined;

export const Timeline: React.FunctionComponent<Props> = ({ children }) => {
  const timelineStyles = useStyles(getTimelineStyles);
  return (
    <div css={containerStyles}>
      <div css={timelineStyles} />
      {React.Children.toArray(children)
        .filter(
          (child) => isReactElement(child) && child.type === TimelineElement,
        )
        .map(
          (child, index) =>
            isReactElement(child) &&
            React.cloneElement(child, {
              position: index % 2 === 0 ? 'left' : 'right',
              ...child.props,
            }),
        )}
    </div>
  );
};
