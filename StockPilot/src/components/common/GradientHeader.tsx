import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "../../core/theme/useAppTheme";
import { typography } from "../../core/theme/typography";
import SearchToolbar from "./SearchToolbar";

type Props = {
  search: string;
  onSearchChange: (text: string) => void;
};

export default function GradientHeader({ search, onSearchChange }: Props) {
  const navigation = useNavigation<any>();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.primaryDark, colors.primary, colors.primaryLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.container,
        {
          paddingTop: insets.top + 12,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text
            style={[
              typography.headlineLarge,
              {
                color: colors.onPrimary,
              },
            ]}
          >
            StockPilot
          </Text>

          <Text
            style={[
              typography.bodyMedium,
              {
                color: "rgba(255,255,255,0.85)",
                marginTop: 3,
              },
            ]}
          >
            Smart Inventory Management
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.avatar,
            {
              backgroundColor: colors.surface,
            },
          ]}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="person" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <SearchToolbar
          placeholder="Search products..."
          value={search}
          onChangeText={onSearchChange}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 25,

    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,

    justifyContent: "center",
    alignItems: "center",

    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  searchContainer: {
    marginTop: 22,

    height: 42,

    borderRadius: 14,

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 15,

    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  input: {
    flex: 1,

    marginLeft: 10,

    fontSize: 15,
  },
});
