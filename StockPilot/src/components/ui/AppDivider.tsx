import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { useAppTheme } from "../../core/theme/useAppTheme";

interface Props {
  style?: ViewStyle;
  marginVertical?: number;
}

export default function AppDivider({
  style,
  marginVertical = 8,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: colors.outlineVariant,
          marginVertical,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },
});