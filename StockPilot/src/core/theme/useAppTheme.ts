import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, AppTheme } from './theme';

/**
 * Single source of truth for "what colors should this component use right now".
 * Defaults to the OS appearance setting. When you build real dark-mode-toggle
 * support in the settings feature, swap `useColorScheme()` below for your
 * Redux `theme` preference (e.g. useAppSelector(state => state.settings.themeMode))
 * — every component using this hook will update automatically, nothing else
 * needs to change.
 */
export function useAppTheme(): AppTheme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}
