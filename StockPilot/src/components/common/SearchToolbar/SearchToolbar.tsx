import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Badge } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useAppTheme } from "../../../core/theme/useAppTheme";
import { styles } from "./SearchToolbar.styles";

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;

  showFilter?: boolean;
  showSort?: boolean;

  activeFilterCount?: number;
  isSortActive?: boolean;

  onFilterPress?: () => void;
  onSortPress?: () => void;
};

export default function SearchToolbar({
  placeholder,
  value,
  onChangeText,

  showFilter = false,
  showSort = false,

  activeFilterCount = 0,
  isSortActive = false,

  onFilterPress,
  onSortPress,
}: Props) {
  const { colors } = useAppTheme();

  const [isFocused, setIsFocused] = useState(false);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <View style={styles.container}>
      {/* ================= Search ================= */}

      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: colors.surface,
            borderColor: isFocused
              ? colors.primary
              : colors.border,

            shadowColor: colors.primary,
            shadowOpacity: isFocused ? 0.18 : 0,
            elevation: isFocused ? 5 : 0,
          },
        ]}
      >
        <MaterialCommunityIcons
          name="magnify"
          size={22}
          color={colors.onSurfaceVariant}
          style={styles.searchIcon}
        />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.onSurfaceVariant}
          style={[
            styles.input,
            {
              color: colors.textPrimary,
            },
          ]}
          cursorColor={colors.primary}
          selectionColor={colors.primary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {value.length > 0 && (
          <TouchableOpacity
            onPress={() => onChangeText("")}
            style={styles.clearButton}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* ================= Filter ================= */}

      {showFilter && (
        <View style={styles.actionWrapper}>
          {hasActiveFilters && (
            <Badge
              style={[
                styles.badge,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              {activeFilterCount}
            </Badge>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onFilterPress}
            style={[
              styles.actionButton,
              {
                backgroundColor: hasActiveFilters
                  ? colors.primaryContainer
                  : colors.surface,

                borderColor: hasActiveFilters
                  ? colors.primary
                  : colors.border,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="tune"
              size={22}
              color={
                hasActiveFilters
                  ? colors.primary
                  : colors.onSurface
              }
            />
          </TouchableOpacity>
        </View>
      )}

      {/* ================= Sort ================= */}

      {showSort && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onSortPress}
          style={[
            styles.actionButton,
            {
              backgroundColor: isSortActive
                ? colors.primaryContainer
                : colors.surface,

              borderColor: isSortActive
                ? colors.primary
                : colors.border,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="swap-vertical"
            size={22}
            color={
              isSortActive
                ? colors.primary
                : colors.onSurface
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
}