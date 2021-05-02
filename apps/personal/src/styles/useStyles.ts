import { SerializedStyles } from '@emotion/react';
import { useTheme } from 'emotion-theming';
import type { Theme } from './theme';

export type Styles = Record<string, SerializedStyles>;

export type StylesCreator<C extends Styles> = (theme: Theme) => C;

export const useStyles = <C extends Styles>(creator: StylesCreator<C>): C => {
  const theme = useTheme<Theme>();

  return creator(theme);
};
