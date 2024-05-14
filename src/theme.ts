// src/theme.ts
import { DefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from '@react-navigation/native';

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E90FF',
    background: '#ffffff',
    card: '#ffffff',
    text: '#000000',
    border: '#cccccc',
  },
};

const DarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: '#1E90FF',
    background: '#000000',
    card: '#1a1a1a',
    text: '#ffffff',
    border: '#333333',
  },
};

export { LightTheme, DarkTheme };
