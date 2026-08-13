import React from "react";

import { TextInput } from "react-native-paper";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function QuantityField({
  value,
  onChangeText,
}: Props) {
  return (
    <TextInput
      mode="outlined"
      label="Quantity"
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
      style={{
        marginBottom: 20,
      }}
    />
  );
}