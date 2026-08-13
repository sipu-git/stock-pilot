import React, { memo } from "react";
import {
  StyleSheet,
  View,
  useColorScheme,
  Pressable,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { useAppTheme } from "../../../core/theme/useAppTheme";
import { AppCard, AppText } from "../../../components/ui";

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  backgroundColor: string;
  index?: number;
  onPress?: () => void;
}

function SummaryCard({
  title,
  value,
  icon,
  color,
  backgroundColor,
  index = 0,
  onPress,
}: SummaryCardProps) {
  const { colors } = useAppTheme();
  const isDark = useColorScheme() === "dark";

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).duration(350).springify()}
      style={styles.wrapper}
    >
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: "rgba(0,0,0,0.08)",
          borderless: false,
        }}
        style={({ pressed }) => [
          styles.pressable,
          pressed && styles.pressed,
        ]}
      >
        <AppCard
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              shadowColor: isDark ? "#000" : colors.primaryDark,
            },
          ]}
        >
          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={icon}
              size={13}
              color={color}
            />
          </View>

          <AppText
            variant="titleMedium"
            style={styles.value}
            numberOfLines={1}
          >
            {value}
          </AppText>

          <AppText
            variant="caption"
            color="tertiary"
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </AppText>
        </AppCard>
      </Pressable>
    </Animated.View>
  );
}

export default memo(SummaryCard);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  pressable: {
    borderRadius: 12,
  },

  pressed: {
    opacity: 0.85,
  },

  card: {
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 4,
    alignItems: "center",

    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },

  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  value: {
    lineHeight: 18,
  },

  title: {
    marginTop: 3,
  },
});