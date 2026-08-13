import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useAppTheme } from '../../core/theme/useAppTheme';

interface AppCardProps extends ViewProps {
  elevated?: boolean;
}

export default function AppCard({ elevated = true, style, children, ...rest }: AppCardProps) {
  const { colors } = useAppTheme();
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowOpacity: elevated ? 0.08 : 0,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
});
