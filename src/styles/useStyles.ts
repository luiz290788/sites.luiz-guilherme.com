import { useTheme } from 'emotion-theming';

export const useStyles = (creator) => {
  const theme = useTheme();

  return creator(theme);
};
