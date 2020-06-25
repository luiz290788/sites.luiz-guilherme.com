import { css } from '@emotion/core';
import React from 'react';
import { Theme } from '../../styles/theme';
import { useStyles } from '../../styles/useStyles';
import { TimelineElement } from './TimelineElement';

const containerStyles = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  margin: '5px 0',
});

const getTimelineStyles = (theme: Theme) => ({
  timelineStyles: css({
    position: 'absolute',
    top: 0,
    height: '100%',
    width: 6,
    background: theme.colors.tertiary,
    borderRadius: 20,
    zIndex: -1,
    left: '17px',
  }),
});

type Props = {
  children: React.ReactNodeArray;
};

const isReactElement = (child: any): child is React.ReactElement =>
  typeof child.type !== undefined;

export const Timeline: React.FunctionComponent<Props> = ({ children }) => {
  const { timelineStyles } = useStyles(getTimelineStyles);
  return (
    <div css={containerStyles}>
      <div css={timelineStyles} />
      {React.Children.toArray(children)
        .filter(
          (child) => isReactElement(child) && child.type === TimelineElement,
        )
        .map((child) => isReactElement(child) && child)}
    </div>
  );
};
