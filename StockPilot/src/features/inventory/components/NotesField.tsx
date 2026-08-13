import React from "react";

import { TextInput } from "react-native-paper";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function NotesField({
  value,
  onChangeText,
}: Props) {
  return (
    <TextInput
      mode="outlined"
      label="Notes (Optional)"
      multiline
      numberOfLines={4}
      value={value}
      onChangeText={onChangeText}
    />
  );
}