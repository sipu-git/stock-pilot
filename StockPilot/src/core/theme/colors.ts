/**
 * StockPilot Color System
 * -----------------------
 * Two layers:
 *  1. Raw palette  – numeric scales (50–900), never used directly in components.
 *  2. Semantic tokens – `light` / `dark` objects that components actually consume
 *     (via useAppTheme()). This is what lets the whole app re-color itself when
 *     the user flips dark mode, without touching a single screen.
 */

// ---------------------------------------------------------------------------
// 1. RAW PALETTE
// ---------------------------------------------------------------------------

export const palette = {
  // Brand — deep purple / violet ("premium SaaS")
  violet: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9', // brand base
    800: '#5B21B6',
    900: '#4C1D95',
  },
  // Accent — warm amber, used sparingly for highlights/badges (complements violet)
  amber: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    300: '#FCD34D',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },
  // Semantic — status colors (same hue family across the app)
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
  },
  // Neutrals — slightly violet-tinted grays so surfaces feel unified with the brand
  gray: {
    0: '#FFFFFF',
    50: '#FAFAFC',
    100: '#F3F1F8',
    200: '#E6E3EF',
    300: '#D4D0E0',
    400: '#A9A3BC',
    500: '#7C7593',
    600: '#5D5772',
    700: '#443F57',
    800: '#2C2838',
    900: '#1A1724',
    950: '#100E17',
  },
} as const;

// ---------------------------------------------------------------------------
// 2. SEMANTIC TOKENS
// ---------------------------------------------------------------------------

export const lightColors = {
  // Brand
  primary: palette.violet[700],
  primaryLight: palette.violet[500],
  primaryDark: palette.violet[800],
  onPrimary: palette.gray[0],
  primaryContainer: palette.violet[100],
  onPrimaryContainer: palette.violet[900],

  secondary: palette.amber[600],
  onSecondary: palette.gray[0],
  secondaryContainer: palette.amber[100],
  onSecondaryContainer: palette.amber[700],

  // Surfaces
  background: palette.gray[50],
  surface: palette.gray[0],
  surfaceVariant: palette.gray[100],
  onSurface: palette.gray[900],
  onSurfaceVariant: palette.gray[600],
  border: palette.gray[200],
  divider: palette.gray[200],
  disabled: palette.gray[300],
  onDisabled: palette.gray[500],
  overlay: 'rgba(26, 23, 36, 0.5)',

  // Text
  textPrimary: palette.gray[900],
  textSecondary: palette.gray[600],
  textTertiary: palette.gray[500],
  textInverse: palette.gray[0],

  // Status — each has a "container" (soft background) + "on" (text/icon on top)
  success: palette.green[600],
  onSuccess: palette.gray[0],
  successContainer: palette.green[50],
  onSuccessContainer: palette.green[700],

  warning: palette.amber[500],
  onWarning: palette.gray[900],
  warningContainer: palette.amber[50],
  onWarningContainer: palette.amber[700],

  error: palette.red[600],
  onError: palette.gray[0],
  errorContainer: palette.red[50],
  onErrorContainer: palette.red[700],

  info: palette.blue[600],
  onInfo: palette.gray[0],
  infoContainer: palette.blue[50],
  onInfoContainer: palette.blue[700],
};

export const darkColors = {
  primary: palette.violet[400],
  primaryLight: palette.violet[300],
  primaryDark: palette.violet[600],
  onPrimary: palette.gray[950],
  primaryContainer: palette.violet[800],
  onPrimaryContainer: palette.violet[100],

  secondary: palette.amber[300],
  onSecondary: palette.gray[950],
  secondaryContainer: palette.amber[700],
  onSecondaryContainer: palette.amber[50],

  background: palette.gray[950],
  surface: palette.gray[900],
  surfaceVariant: palette.gray[800],
  onSurface: palette.gray[50],
  onSurfaceVariant: palette.gray[400],
  border: palette.gray[700],
  divider: palette.gray[800],
  disabled: palette.gray[700],
  onDisabled: palette.gray[500],
  overlay: 'rgba(0, 0, 0, 0.6)',

  textPrimary: palette.gray[50],
  textSecondary: palette.gray[400],
  textTertiary: palette.gray[500],
  textInverse: palette.gray[900],

  success: palette.green[500],
  onSuccess: palette.gray[950],
  successContainer: '#0F3320',
  onSuccessContainer: palette.green[100],

  warning: palette.amber[500],
  onWarning: palette.gray[950],
  warningContainer: '#3A2A08',
  onWarningContainer: palette.amber[100],

  error: palette.red[500],
  onError: palette.gray[950],
  errorContainer: '#3F1414',
  onErrorContainer: palette.red[100],

  info: palette.blue[500],
  onInfo: palette.gray[950],
  infoContainer: '#0F2747',
  onInfoContainer: palette.blue[100],
};

export type AppColorScheme = typeof lightColors;
