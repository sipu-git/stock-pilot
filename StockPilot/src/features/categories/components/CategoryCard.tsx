import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  Card,
  Text,
  IconButton,
  Menu,
} from "react-native-paper";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Category } from "../types";
import { useAppTheme } from "../../../core/theme/useAppTheme";

interface Props {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: Props) {
  const { colors } = useAppTheme();

  const [visible, setVisible] = useState(false);

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      <Card.Content>
        {/* Header */}

        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.titleRow}>
              <MaterialCommunityIcons
                name="folder-outline"
                size={18}
                color={colors.primary}
              />

              <Text
                variant="titleMedium"
                style={[
                  styles.title,
                  {
                    color: colors.textPrimary,
                  },
                ]}
                numberOfLines={1}
              >
                {category.name}
              </Text>
            </View>

            {!!category.description && (
              <Text
                variant="bodySmall"
                numberOfLines={2}
                style={[
                  styles.description,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                {category.description}
              </Text>
            )}
          </View>

          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={20}
                onPress={() => setVisible(true)}
              />
            }
          >
            <Menu.Item
              leadingIcon="pencil-outline"
              title="Edit"
              onPress={() => {
                setVisible(false);
                onEdit(category);
              }}
            />

            <Menu.Item
              leadingIcon="delete-outline"
              title="Delete"
              onPress={() => {
                setVisible(false);
                onDelete(category);
              }}
            />
          </Menu>
        </View>

        {/* Footer */}

        <View style={styles.footer}>
          <View style={styles.footerItem}>
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={16}
              color={colors.primary}
            />

            <Text
              variant="bodySmall"
              style={[
                styles.footerText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              {category.product_count} Products
            </Text>
          </View>

          <View style={styles.footerItem}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={16}
              color={colors.textSecondary}
            />

            <Text
              variant="bodySmall"
              style={[
                styles.footerText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              {new Date(
                category.created_at
              ).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 16,
    elevation: 2,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  titleContainer: {
    flex: 1,
    paddingRight: 4,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    marginLeft: 8,
    fontWeight: "700",
    flex: 1,
  },

  description: {
    marginTop: 6,
    lineHeight: 18,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  footerItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  footerText: {
    marginLeft: 6,
    fontWeight: "500",
  },
});