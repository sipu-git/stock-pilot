import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

import { AppCard, AppText } from "../../../components/ui";
import { useAppTheme } from "../../../core/theme/useAppTheme";

type Action = {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  backgroundColor: string;
  onPress: () => void;
};

export default function QuickActionsCard() {
  const navigation = useNavigation<any>();
  const { colors } = useAppTheme();

  const actions: Action[] = [
    {
      title: "Add Product",
      subtitle: "Create a new inventory item",
      icon: "package-variant-plus",
      color: colors.primary,
      backgroundColor: colors.primaryContainer,
      onPress: () =>
        navigation.navigate("Products", {
          screen: "AddProduct",
        }),
    },
    {
      title: "Categories",
      subtitle: "Manage product categories",
      icon: "shape-outline",
      color: colors.info,
      backgroundColor: colors.infoContainer,
      onPress: () => navigation.navigate("Categories"),
    },
  ];

  return (
    <View style={styles.wrapper}>
      <AppText
        variant="label"
        color="tertiary"
        style={styles.heading}
      >
        QUICK ACTIONS
      </AppText>

      <View style={styles.row}>
        {actions.map((action) => (
          <Pressable
            key={action.title}
            style={styles.item}
            onPress={action.onPress}
          >
            <AppCard style={styles.card}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: action.backgroundColor,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={action.icon}
                  size={28}
                  color={action.color}
                />
              </View>

              <AppText
                variant="titleSmall"
                style={styles.title}
              >
                {action.title}
              </AppText>

              <AppText
                variant="caption"
                color="secondary"
                style={styles.subtitle}
              >
                {action.subtitle}
              </AppText>
            </AppCard>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 18,
    marginTop: 18,
  },

  heading: {
    marginBottom: 10,
    marginLeft: 2,
    letterSpacing: 0.4,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  item: {
    flex: 1,
  },

  card: {
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 14,
    alignItems: "center",
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  title: {
    textAlign: "center",
  },

  subtitle: {
    marginTop: 6,
    textAlign: "center",
    lineHeight: 18,
  },
});