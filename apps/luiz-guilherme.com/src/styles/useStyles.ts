import { SerializedStyles, useTheme, Theme } from '@emotion/react';

export type Styles = Record<string, SerializedStyles>;

export type StylesCreator<C extends Styles> = (theme: Theme) => C;

export const useStyles = <C extends Styles>(creator: StylesCreator<C>): C => {
  const theme = useTheme();

  return creator(theme);
};
