import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { RouteProp, useRoute } from "@react-navigation/native";

import { SettingsStackParamList } from "../../../types/navigation";

type LegalRouteProp = RouteProp<
  SettingsStackParamList,
  "Legal"
>;

export default function LegalScreen() {
  const route = useRoute<LegalRouteProp>();

  const { title, content } = route.params;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Card mode="contained">
        <Card.Content>

          <Text
            variant="headlineSmall"
            style={styles.title}
          >
            {title}
          </Text>

          <Text style={styles.content}>
            {content}
          </Text>

        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  title: {
    marginBottom: 20,
    fontWeight: "700",
  },

  content: {
    lineHeight: 24,
  },
});