import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

type Props = {
  title: string;
  children: ReactNode;
};

export default function SettingSection({
  title,
  children,
}: Props) {
  return (
    <View style={styles.container}>
      <Text
        variant="titleSmall"
        style={styles.title}
      >
        {title}
      </Text>

      <Card mode="contained">
        {children}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  title: {
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: "700",
  },
});