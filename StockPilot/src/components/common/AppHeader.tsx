import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { useAppTheme } from "../../core/theme/useAppTheme";

type AppHeaderProps = {
  title: string;
  showBackButton?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
};

export default function AppHeader({
  title,
  showBackButton = false,
  rightIcon,
  onRightPress,
}: AppHeaderProps) {
  const navigation = useNavigation();
  const { colors } = useAppTheme();

  return (
    <SafeAreaView
      edges={["top"]}
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
    >
      <View style={styles.container}>
        <View style={styles.left}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconButton}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={colors.onPrimary}
              />
            </TouchableOpacity>
          )}

          <Text style={[styles.title, { color: colors.onPrimary }]}>
            {title}
          </Text>
        </View>

        {rightIcon ? (
          <TouchableOpacity
            onPress={onRightPress}
            style={styles.iconButton}
          >
            <Ionicons
              name={rightIcon}
              size={24}
              color={colors.onPrimary}
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    elevation: 4,
  },

  container: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
  },

  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
});