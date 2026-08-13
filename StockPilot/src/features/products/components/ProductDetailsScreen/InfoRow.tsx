import React from "react";
import { StyleSheet, View } from "react-native";
import { useAppTheme } from "../../../../core/theme/useAppTheme";
import { AppText } from "../../../../components/ui";



interface Props {
  label: string;
  value?: string | number | null;
  valueColor?: string;
}

export default function InfoRow({
  label,
  value,
  valueColor,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <AppText
        variant="bodyMedium"
        style={{
          color: colors.onSurfaceVariant,
        }}
      >
        {label}
      </AppText>

      <AppText
        variant="bodyMedium"
        style={{
          color: valueColor ?? colors.onSurface,
          fontWeight: "600",
          textAlign: "right",
          flex: 1,
          marginLeft: 16,
        }}
        numberOfLines={2}
      >
        {value ?? "-"}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});