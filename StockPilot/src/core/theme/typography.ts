/**
 * StockPilot Typography Scale
 * Keep every screen consistent — always pull sizes from here, never hardcode fontSize.
 */

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const typography = {
  displayLarge: { fontSize: 32, lineHeight: 40, fontWeight: fontWeight.bold },
  displayMedium: { fontSize: 28, lineHeight: 36, fontWeight: fontWeight.bold },
  headlineLarge: { fontSize: 24, lineHeight: 32, fontWeight: fontWeight.semibold },
  headlineMedium: { fontSize: 20, lineHeight: 28, fontWeight: fontWeight.semibold },
  titleLarge: { fontSize: 18, lineHeight: 24, fontWeight: fontWeight.semibold },
  titleMedium: { fontSize: 16, lineHeight: 22, fontWeight: fontWeight.medium },
  bodyLarge: { fontSize: 16, lineHeight: 24, fontWeight: fontWeight.regular },
  bodyMedium: { fontSize: 14, lineHeight: 20, fontWeight: fontWeight.regular },
  bodySmall: { fontSize: 12, lineHeight: 18, fontWeight: fontWeight.regular },
  label: { fontSize: 13, lineHeight: 16, fontWeight: fontWeight.medium },
  caption: { fontSize: 11, lineHeight: 14, fontWeight: fontWeight.regular },
} as const;

export type TypographyVariant = keyof typeof typography;
