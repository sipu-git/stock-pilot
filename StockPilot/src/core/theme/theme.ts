import { MD3LightTheme, MD3DarkTheme, configureFonts } from 'react-native-paper';
import { lightColors, darkColors, AppColorScheme } from './colors';
import { fontWeight } from './typography';

const fontConfig = configureFonts({
  config: {
    fontFamily: 'System',
  },
});

/**
 * `colors` here is the full semantic set (AppColorScheme). React Native Paper
 * only reads the MD3 keys it knows about (primary, onPrimary, background, ...);
 * the extra keys (success, warning, info, textSecondary, ...) ride along
 * unused by Paper but are exactly what our own components read through
 * useAppTheme() below. This means ONE color object drives both Paper's
 * built-in components (Button, Card, TextInput, etc.) and our custom ones.
 */
export const lightTheme = {
  ...MD3LightTheme,
  fonts: fontConfig,
  colors: {
    ...MD3LightTheme.colors,
    ...lightColors,
  } as typeof MD3LightTheme.colors & AppColorScheme,
};

export const darkTheme = {
  ...MD3DarkTheme,
  fonts: fontConfig,
  colors: {
    ...MD3DarkTheme.colors,
    ...darkColors,
  } as typeof MD3DarkTheme.colors & AppColorScheme,
};

export type AppTheme = typeof lightTheme;

// Back-compat default export some files may still import
export const theme = lightTheme;

export { fontWeight };
