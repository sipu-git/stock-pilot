import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CategoryPayload } from "../types";
import { categorySchema } from "../validation/categorySchema";

interface Props {
  loading?: boolean;
  defaultValues?: CategoryPayload;
  onSubmit: (data: CategoryPayload) => void;
}

export function CategoryForm({
  loading = false,
  defaultValues,
  onSubmit,
}: Props) {
  const {
    control,
    handleSubmit,
  } = useForm<CategoryPayload>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
    },
  });

  return (
    <View>

      <Controller
        control={control}
        name="name"
        render={({
          field: { value, onChange },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              label="Category Name"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              error={!!error}
              style={styles.input}
            />

            {!!error && (
              <HelperText type="error">
                {error.message}
              </HelperText>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({
          field: { value, onChange },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              label="Description"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={4}
              style={styles.input}
            />

            {!!error && (
              <HelperText type="error">
                {error.message}
              </HelperText>
            )}
          </>
        )}
      />

      <Button
        mode="contained"
        loading={loading}
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
      >
        Save Category
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
  },
});