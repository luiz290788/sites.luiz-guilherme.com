export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    color1: string;
  };
  grid: number;
  fontFamily: string;
};

export const theme: Theme = {
  colors: {
    primary: '#383F51',
    secondary: '#EAEAEA',
    tertiary: '#bdbdbd',
    color1: '#FBFCFF',
  },
  grid: 4,
  fontFamily: "'Open Sans', sans-serif",
};
