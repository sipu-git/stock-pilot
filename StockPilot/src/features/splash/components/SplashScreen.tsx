import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function SplashScreen() {
  // Logo Animation
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  // Title Animation
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslate = useRef(new Animated.Value(20)).current;

  // Subtitle Animation
  const subtitleOpacity = useRef(new Animated.Value(0)).current;

  // Loader Rotation
  const loaderRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),

        Animated.timing(titleTranslate, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(loaderRotate, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = loaderRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: logoOpacity,
          transform: [{ scale: logoScale }],
        }}
      >
        <MaterialCommunityIcons
          name="package-variant-closed"
          size={90}
          color="#2563EB"
        />
      </Animated.View>

      <Animated.View
        style={{
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslate }],
        }}
      >
        <Text variant="headlineLarge" style={styles.title}>
          StockPilot
        </Text>
      </Animated.View>

      <Animated.View
        style={{
          opacity: subtitleOpacity,
        }}
      >
        <Text variant="bodyMedium" style={styles.subtitle}>
          Inventory Management System
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.loader,
          {
            transform: [{ rotate }],
          },
        ]}
      >
        <MaterialCommunityIcons
          name="loading"
          size={32}
          color="#2563EB"
        />
      </Animated.View>

      <Text variant="bodySmall" style={styles.loading}>
        Checking session...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  title: {
    marginTop: 18,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 8,
    color: "#6B7280",
  },

  loader: {
    marginTop: 50,
  },

  loading: {
    marginTop: 16,
    color: "#9CA3AF",
  },
});