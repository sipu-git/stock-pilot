import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Divider,
  Menu,
  Modal,
  Portal,
  RadioButton,
  Surface,
  TextInput,
  Button
} from "react-native-paper";

import { AppText } from "../../../../components/ui";
import { useAppTheme } from "../../../../core/theme/useAppTheme";
import { useCategories } from "../../../categories/hooks/useCategories";
import { ProductStatus } from "../../types";

type PriceType = "selling_price" | "purchase_price";

type Props = {
  visible: boolean;

  selectedCategory: string;

  selectedStatus: ProductStatus | "";

  selectedPriceType: PriceType;

  minPrice: string;

  maxPrice: string;

  onDismiss: () => void;

  onReset: () => void;

  onApply: (
    category: string,
    status: ProductStatus | "",
    priceType: PriceType,
    minPrice: string,
    maxPrice: string
  ) => void;
};

export default function FilterBottomSheet({
  visible,
  selectedCategory,
  selectedStatus,
  selectedPriceType,
  minPrice,
  maxPrice,
  onDismiss,
  onReset,
  onApply,
}: Props) {
  const { colors } = useAppTheme();

  const { data: categories = [] } = useCategories();


  const [categoryMenuVisible, setCategoryMenuVisible] =
    useState(false);

  const [category, setCategory] =
    useState(selectedCategory);

  const [status, setStatus] =
    useState<ProductStatus | "">(selectedStatus);

  const [priceType, setPriceType] =
    useState<PriceType>(selectedPriceType);

  const [min, setMin] = useState(minPrice);

  const [max, setMax] = useState(maxPrice);

  const selectedCategoryName = useMemo(() => {
    return (
      categories.find((item) => item.id === category)?.name ??
      ""
    );
  }, [categories, category]);

  useEffect(() => {
    if (!visible) return;

    setCategory(selectedCategory);
    setStatus(selectedStatus);
    setPriceType(selectedPriceType);
    setMin(minPrice);
    setMax(maxPrice);
  }, [
    visible,
    selectedCategory,
    selectedStatus,
    selectedPriceType,
    minPrice,
    maxPrice,
  ]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Surface
          style={[
            styles.container,
            {
              backgroundColor: colors.surface,
            },
          ]}
        >
          <View
            style={[
              styles.handle,
              {
                backgroundColor: colors.outlineVariant,
              },
            ]}
          />

          <AppText
            variant="titleMedium"
            style={styles.title}
          >
            Filter Products
          </AppText>

          <Divider style={styles.divider} />

          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            {/* Category */}

            <AppText
              variant="titleSmall"
              style={styles.sectionTitle}
            >
              Category
            </AppText>

            <Menu
              visible={categoryMenuVisible}
              onDismiss={() =>
                setCategoryMenuVisible(false)
              }
              anchor={
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    setCategoryMenuVisible(true)
                  }
                >
                  <View pointerEvents="none">
                    <TextInput
                      mode="outlined"
                      label="Category"
                      value={selectedCategoryName}
                      editable={false}
                      right={
                        <TextInput.Icon icon="menu-down" />
                      }
                    />
                  </View>
                </TouchableOpacity>
              }
            >
              <Menu.Item
                title="All Categories"
                onPress={() => {
                  setCategory("");
                  setCategoryMenuVisible(false);
                }}
              />

              {categories.map((item) => (
                <Menu.Item
                  key={item.id}
                  title={item.name}
                  onPress={() => {
                    setCategory(item.id);
                    setCategoryMenuVisible(false);
                  }}
                />
              ))}
            </Menu>

            <Divider style={styles.divider} />

            {/* Status */}

            <AppText
              variant="titleSmall"
              style={styles.sectionTitle}
            >
              Status
            </AppText>

            <RadioButton.Group
              value={status}
              onValueChange={(value) =>
                setStatus(value as ProductStatus | "")
              }
            >
              {[
                {
                  label: "All",
                  value: "",
                },
                {
                  label: "Active",
                  value: "ACTIVE",
                },
                {
                  label: "Low Stock",
                  value: "LOW_STOCK",
                },
                {
                  label: "Out of Stock",
                  value: "OUT_OF_STOCK",
                },
                {
                  label: "Archived",
                  value: "ARCHIVED",
                },
              ].map((item) => (
                <View
                  key={item.value}
                  style={styles.option}
                >
                  <AppText style={styles.optionText}>
                    {item.label}
                  </AppText>

                  <RadioButton value={item.value} />
                </View>
              ))}
            </RadioButton.Group>

            <Divider style={styles.divider} />

                        {/* Price Type */}

            <AppText
              variant="titleSmall"
              style={styles.sectionTitle}
            >
              Price Type
            </AppText>

            <RadioButton.Group
              value={priceType}
              onValueChange={(value) =>
                setPriceType(value as PriceType)
              }
            >
              <View style={styles.option}>
                <AppText style={styles.optionText}>
                  Selling Price
                </AppText>

                <RadioButton value="selling_price" />
              </View>

              <View style={styles.option}>
                <AppText style={styles.optionText}>
                  Purchase Price
                </AppText>

                <RadioButton value="purchase_price" />
              </View>
            </RadioButton.Group>

            <Divider style={styles.divider} />

            {/* Price Range */}

            <AppText
              variant="titleSmall"
              style={styles.sectionTitle}
            >
              Price Range
            </AppText>

            <View style={styles.row}>
              <TextInput
                mode="outlined"
                label="Min Price"
                keyboardType="numeric"
                value={min}
                onChangeText={setMin}
                style={styles.halfInput}
                left={<TextInput.Icon icon="currency-inr" />}
              />

              <TextInput
                mode="outlined"
                label="Max Price"
                keyboardType="numeric"
                value={max}
                onChangeText={setMax}
                style={styles.halfInput}
                left={<TextInput.Icon icon="currency-inr" />}
              />
            </View>

            <Divider style={styles.divider} />

            {/* Buttons */}

            <View style={styles.buttonRow}>
              <Button
  mode="outlined"
  style={styles.button}
  onPress={onReset}
>
  Reset
</Button>

              <Button
                mode="contained"
                style={styles.button}
                onPress={() =>
                  onApply(
                    category,
                    status,
                    priceType,
                    min,
                    max
                  )
                }
              >
                Apply
              </Button>
            </View>

          </ScrollView>
        </Surface>
      </Modal>
    </Portal>
  );
}



const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },

  container: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    maxHeight: "85%",
  },

  handle: {
    width: 50,
    height: 5,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 16,
  },

  title: {
    textAlign: "center",
    fontWeight: "700",
    marginBottom: 16,
  },

  divider: {
    marginVertical: 16,
  },

  sectionTitle: {
    marginBottom: 12,
    fontWeight: "600",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  optionText: {
    flex: 1,
    fontSize: 15,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  halfInput: {
    flex: 1,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 10,
  },

  button: {
    flex: 1,
    borderRadius: 10,
  },
});