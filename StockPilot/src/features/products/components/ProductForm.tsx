import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Button,
  Divider,
  HelperText,
  Menu,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import ProductImagePicker from "./ProductImagePicker";

import { ProductFormData, productSchema } from "../validation/productSchema";

import { Product } from "../types";

import { useCategories } from "../../categories/hooks/useCategories";
import { useQueryClient } from "@tanstack/react-query";

interface ProductFormProps {
  loading?: boolean;

  defaultValues?: Partial<Product>;

  submitButtonText?: string;

  showOpeningStock?: boolean;

  onSubmit: (
    data: ProductFormData,
    images: string[]
  ) => void;
}

export default function ProductForm({
  loading = false,
  defaultValues,
  submitButtonText = "Save Product",
  showOpeningStock = true,
  onSubmit,
}: ProductFormProps) {
  const [images, setImages] = useState<string[]>(defaultValues?.images ?? []);

  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);

const { data: categories = [] } = useCategories();

  const categoryName = useMemo(() => {
    return (
      categories.find((item) => item.id === defaultValues?.categoryId)?.name ??
      ""
    );
  }, [categories, defaultValues]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: defaultValues?.name ?? "",

      sku: defaultValues?.sku ?? "",

      categoryId: defaultValues?.categoryId ?? "",

      purchasePrice: Number(defaultValues?.purchasePrice ?? 0),
sellingPrice: Number(defaultValues?.sellingPrice ?? 0),
discount: Number(defaultValues?.discount ?? 0),
tax: Number(defaultValues?.tax ?? 0),

      currentQuantity: defaultValues?.currentQuantity ?? 0,

      minimumQuantity: defaultValues?.minimumQuantity ?? 5,

      maximumQuantity: defaultValues?.maximumQuantity ?? 100,

      description: defaultValues?.description ?? "",
    },
  });

  const selectedCategoryId = watch("categoryId");

  const selectedCategoryName =
    categories.find((c) => c.id === selectedCategoryId)?.name ??
    categoryName ??
    "";

  const submitForm = (data: ProductFormData) => {

  onSubmit(data, images);
};

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        {/* Images */}

        <Surface style={styles.section} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Product Images
          </Text>

          <ProductImagePicker images={images} onImagesChange={setImages} />
        </Surface>

        {/* Basic Information */}

        <Surface style={styles.section} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Basic Information
          </Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Product Name"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.name}
                  style={styles.input}
                />

                {!!errors.name && (
                  <HelperText type="error">{errors.name.message}</HelperText>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="sku"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="SKU"
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.sku}
                  style={styles.input}
                />

                {!!errors.sku && (
                  <HelperText type="error">{errors.sku.message}</HelperText>
                )}
              </>
            )}
          />

          {/* Category */}

          <Menu
            visible={categoryMenuVisible}
            onDismiss={() => setCategoryMenuVisible(false)}
            anchor={
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setCategoryMenuVisible(true)}
              >
                <View pointerEvents="none">
                  <TextInput
                    mode="outlined"
                    label="Category"
                    value={selectedCategoryName}
                    editable={false}
                    right={<TextInput.Icon icon="menu-down" />}
                    error={!!errors.categoryId}
                    style={styles.input}
                  />
                </View>
              </TouchableOpacity>
            }
          >
            {categories.map((category) => (
              <Menu.Item
                key={category.id}
                title={category.name}
                onPress={() => {
                  setValue("categoryId", category.id, {
                    shouldValidate: true,
                  });

                  setCategoryMenuVisible(false);
                }}
              />
            ))}
          </Menu>

          {!!errors.categoryId && (
            <HelperText type="error">{errors.categoryId.message}</HelperText>
          )}
        </Surface>

        {/* Pricing */}

        <Surface style={styles.section} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Pricing
          </Text>

          <Controller
            control={control}
            name="purchasePrice"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Purchase Price"
                  keyboardType="numeric"
                  value={String(value)}
                  onChangeText={(text) => onChange(Number(text) || 0)}
                  error={!!errors.purchasePrice}
                  left={<TextInput.Icon icon="currency-inr" />}
                  style={styles.input}
                />

                {!!errors.purchasePrice && (
                  <HelperText type="error">
                    {errors.purchasePrice.message}
                  </HelperText>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="sellingPrice"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Selling Price"
                  keyboardType="numeric"
                  value={String(value)}
                  onChangeText={(text) => onChange(Number(text) || 0)}
                  error={!!errors.sellingPrice}
                  left={<TextInput.Icon icon="currency-inr" />}
                  style={styles.input}
                />

                {!!errors.sellingPrice && (
                  <HelperText type="error">
                    {errors.sellingPrice.message}
                  </HelperText>
                )}
              </>
            )}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <Controller
                control={control}
                name="discount"
                render={({ field: { value, onChange } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      label="Discount %"
                      keyboardType="numeric"
                      value={String(value)}
                      onChangeText={(text) => onChange(Number(text) || 0)}
                    />
                  </>
                )}
              />
            </View>

            <View style={styles.halfInput}>
              <Controller
                control={control}
                name="tax"
                render={({ field: { value, onChange } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      label="Tax %"
                      keyboardType="numeric"
                      value={String(value)}
                      onChangeText={(text) => onChange(Number(text) || 0)}
                    />
                  </>
                )}
              />
            </View>
          </View>
        </Surface>

        {/* Inventory */}

        <Surface style={styles.section} elevation={1}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Inventory
          </Text>

          {showOpeningStock && (
  <Controller
    control={control}
    name="currentQuantity"
    render={({ field: { value, onChange } }) => (
      <TextInput
        mode="outlined"
        label="Opening Stock"
        keyboardType="numeric"
        value={String(value)}
        onChangeText={(text) => onChange(Number(text) || 0)}
        style={styles.input}
      />
    )}
  />
)}

          <Controller
            control={control}
            name="minimumQuantity"
            render={({ field: { value, onChange } }) => (
              <TextInput
                mode="outlined"
                label="Minimum Quantity"
                keyboardType="numeric"
                value={String(value)}
                onChangeText={(text) => onChange(Number(text) || 0)}
                style={styles.input}
              />
            )}
          />

          <Controller
            control={control}
            name="maximumQuantity"
            render={({ field: { value, onChange } }) => (
              <TextInput
                mode="outlined"
                label="Maximum Quantity"
                keyboardType="numeric"
                value={String(value)}
                onChangeText={(text) => onChange(Number(text) || 0)}
                style={styles.input}
              />
            )}
          />

          <Divider style={styles.divider} />

          {/* Description */}

          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange } }) => (
              <>
                <TextInput
                  mode="outlined"
                  label="Description"
                  multiline
                  numberOfLines={4}
                  value={value}
                  onChangeText={onChange}
                  error={!!errors.description}
                  style={styles.input}
                />

                {!!errors.description && (
                  <HelperText type="error">
                    {errors.description.message}
                  </HelperText>
                )}
              </>
            )}
          />
        </Surface>

        {/* Submit */}

        <Button
          mode="contained"
          icon="content-save"
          loading={loading}
          disabled={loading}
          onPress={handleSubmit(submitForm)}
          style={styles.submitButton}
          contentStyle={styles.submitContent}
        >
          {submitButtonText}
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#F7F8FA",
  },

  section: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 18,
    backgroundColor: "#FFFFFF",
  },

  sectionTitle: {
    marginBottom: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  input: {
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },

  divider: {
    marginVertical: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  halfInput: {
    flex: 1,
  },

  submitButton: {
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 20,
  },

  submitContent: {
    height: 52,
  },
});
