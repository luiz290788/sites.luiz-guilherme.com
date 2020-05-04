import { useTheme } from 'emotion-theming';
import type { Theme } from './theme';
import { SerializedStyles } from '@emotion/core';

export type StylesCreator = (
  theme: Theme,
) => {
  [Key in string]: SerializedStyles;
};

export const useStyles = (creator: StylesCreator) => {
  const theme = useTheme<Theme>();

  return creator(theme);
};
