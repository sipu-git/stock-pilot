import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../../core/theme/useAppTheme';
import { typography } from '../../core/theme/typography';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface AppButtonProps {
  label: string;
  onPress: (e: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const SIZE_MAP: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number; fontSize: number }> = {
  sm: { paddingVertical: 8, paddingHorizontal: 14, fontSize: typography.bodySmall.fontSize },
  md: { paddingVertical: 12, paddingHorizontal: 18, fontSize: typography.bodyMedium.fontSize },
  lg: { paddingVertical: 16, paddingHorizontal: 24, fontSize: typography.bodyLarge.fontSize },
};

export default function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
}: AppButtonProps) {
  const { colors } = useAppTheme();
  const isDisabled = disabled || loading;
  const sizeStyle = SIZE_MAP[size];

  // Every variant's colors come from theme tokens — nothing hardcoded here.
  // This is the pattern to copy into any other button-like component.
  const variantStyles: Record<ButtonVariant, { backgroundColor: string; borderColor?: string; textColor: string }> = {
    primary: { backgroundColor: colors.primary, textColor: colors.onPrimary },
    secondary: { backgroundColor: colors.secondary, textColor: colors.onSecondary },
    outline: { backgroundColor: 'transparent', borderColor: colors.primary, textColor: colors.primary },
    ghost: { backgroundColor: 'transparent', textColor: colors.primary },
    danger: { backgroundColor: colors.error, textColor: colors.onError },
  };

  const v = variantStyles[variant];

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      activeOpacity={0.8}
      disabled={isDisabled}
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor: isDisabled ? colors.disabled : v.backgroundColor,
          borderColor: v.borderColor ? (isDisabled ? colors.disabled : v.borderColor) : 'transparent',
          borderWidth: v.borderColor ? 1.5 : 0,
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          width: fullWidth ? '100%' : undefined,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isDisabled ? colors.onDisabled : v.textColor} size="small" />
      ) : (
        <Text
          style={{
            color: isDisabled ? colors.onDisabled : v.textColor,
            fontSize: sizeStyle.fontSize,
            fontWeight: typography.titleMedium.fontWeight,
          }}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
