import React from 'react';
import { Text, TextProps } from 'react-native';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { typography, TypographyVariant } from '../../core/theme/typography';

type TextColorRole = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'brand' | 'error' | 'success';

interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: TextColorRole;
}

export default function AppText({ variant = 'bodyMedium', color = 'primary', style, ...rest }: AppTextProps) {
  const { colors } = useAppTheme();

  const colorMap: Record<TextColorRole, string> = {
    primary: colors.textPrimary,
    secondary: colors.textSecondary,
    tertiary: colors.textTertiary,
    inverse: colors.textInverse,
    brand: colors.primary,
    error: colors.error,
    success: colors.success,
  };

  return <Text style={[typography[variant], { color: colorMap[color] }, style]} {...rest} />;
}
