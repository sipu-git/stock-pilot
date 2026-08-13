import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  password: string;
};

const COLORS = {
  weak: "#EF4444",
  medium: "#F59E0B",
  good: "#3B82F6",
  strong: "#6D28D9",
  empty: "#E5E7EB",
};

export default function PasswordStrength({
  password,
}: Props) {
  const getStrength = () => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password))
      score++;

    return score;
  };

  const score = getStrength();

  let label = "Weak";
  let color = COLORS.weak;
  let activeBars = 1;

  if (password.length === 0) {
    label = "";
    activeBars = 0;
  } else if (score <= 2) {
    label = "Weak";
    color = COLORS.weak;
    activeBars = 1;
  } else if (score === 3) {
    label = "Medium";
    color = COLORS.medium;
    activeBars = 2;
  } else if (score === 4) {
    label = "Good";
    color = COLORS.good;
    activeBars = 3;
  } else {
    label = "Strong";
    color = COLORS.strong;
    activeBars = 4;
  }

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        {[1, 2, 3, 4].map((item) => (
          <View
            key={item}
            style={[
              styles.bar,
              {
                backgroundColor:
                  item <= activeBars
                    ? color
                    : COLORS.empty,
              },
            ]}
          />
        ))}
      </View>

      {!!label && (
        <Text
          variant="bodySmall"
          style={[
            styles.label,
            { color },
          ]}
        >
          Password Strength : {label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    marginBottom: 10,
  },

  barContainer: {
    flexDirection: "row",
    gap: 6,
  },

  bar: {
    flex: 1,
    height: 6,
    borderRadius: 10,
  },

  label: {
    marginTop: 6,
    fontWeight: "600",
  },
});