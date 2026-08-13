import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Card, Divider, List, Text } from "react-native-paper";

export default function AboutScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Avatar.Icon
          size={80}
          icon="package-variant-closed"
        />

        <Text
          variant="headlineMedium"
          style={styles.title}
        >
          StockPilot
        </Text>

        <Text
          variant="bodyMedium"
          style={styles.subtitle}
        >
          Inventory Management System
        </Text>
      </View>

      <Card mode="contained">
        <Card.Content>

          <List.Item
            title="Version"
            description="1.0.0"
            left={(props) => (
              <List.Icon
                {...props}
                icon="tag-outline"
              />
            )}
          />

          <Divider />

          <List.Item
            title="Developer"
            description="Biswajeet Sahoo"
            left={(props) => (
              <List.Icon
                {...props}
                icon="account-outline"
              />
            )}
          />

          <Divider />

          {/* <List.Item
            title="Company"
            description="Sparkradix Technologies Pvt. Ltd."
            left={(props) => (
              <List.Icon
                {...props}
                icon="office-building-outline"
              />
            )}
          /> */}

        </Card.Content>
      </Card>

      <Card
        mode="contained"
        style={styles.descriptionCard}
      >
        <Card.Content>

          <Text variant="titleMedium">
            About
          </Text>

          <Text style={styles.description}>
            StockPilot is an inventory management
            application that helps businesses manage
            products, categories, inventory, and stock
            efficiently with a simple and modern
            interface.
          </Text>

        </Card.Content>
      </Card>

      <Text style={styles.footer}>
        © 2026 StockPilot
      </Text>

      <Text style={styles.footerSmall}>
        All Rights Reserved
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    marginTop: 16,
    fontWeight: "700",
  },

  subtitle: {
    opacity: 0.7,
    marginTop: 4,
  },

  descriptionCard: {
    marginTop: 20,
  },

  description: {
    marginTop: 10,
    lineHeight: 22,
  },

  footer: {
    marginTop: 32,
    textAlign: "center",
    fontWeight: "600",
  },

  footerSmall: {
    textAlign: "center",
    opacity: 0.6,
    marginTop: 4,
  },
});