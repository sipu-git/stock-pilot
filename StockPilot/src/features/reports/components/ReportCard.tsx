import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


import { useAppTheme } from "../../../core/theme/useAppTheme";
import { AppCard, AppText } from "../../../components/ui";

interface ReportCardProps {
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
}

export default function ReportCard({
  title,
  description,
  icon,
  onPress,
}: ReportCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: colors.surfaceVariant,
      }}
      style={({ pressed }) => [
        styles.pressable,
        pressed && styles.pressed,
      ]}
    >
      <AppCard>
        <View style={styles.container}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor:
                  colors.primaryContainer,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={icon}
              size={28}
              color={colors.primary}
            />
          </View>

          <View style={styles.content}>
            <AppText variant="titleMedium">
              {title}
            </AppText>

            <AppText
              variant="bodyMedium"
              color="secondary"
              style={styles.description}
            >
              {description}
            </AppText>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={colors.onSurfaceVariant}
          />
        </View>
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 16,
  },

  pressed: {
    opacity: 0.9,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    marginHorizontal: 16,
  },

  description: {
    marginTop: 4,
  },
});