import React, {
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  Button,
  Portal,
  Surface,
} from "react-native-paper";

import { AxiosError } from "axios";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ProductStackParamList } from "../../../core/navigation/types";

import { useAppTheme } from "../../../core/theme/useAppTheme";

import {
  AppLoader,
  ErrorView,
} from "../../../components/ui";

import { AppSnackbar } from "../../../components/common/AppSnackbar";

import ConfirmationDialog from "../../../components/common/ConfirmationDialog";

import { useProduct } from "../../products/hooks/useProduct";

import StockSummaryCard from "../components/StockSummaryCard";
import StockTypeSelector from "../components/StockTypeSelector";
import QuantityField from "../components/QuantityField";
import NotesField from "../components/NotesField";

import { StockOperation } from "../types";

import { useUpdateStock } from "../hooks/useUpdateStock";

type Props = NativeStackScreenProps<
  ProductStackParamList,
  "UpdateStock"
>;

export default function UpdateStockScreen({
  navigation,
  route,
}: Props) {
  const { colors } = useAppTheme();

  const { productId } = route.params;

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useProduct(productId);

  const product = data?.data;

  const [operation, setOperation] =
    useState<StockOperation>("STOCK_IN");

  const [quantity, setQuantity] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [snackbarVisible, setSnackbarVisible] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("");

  const [snackbarType, setSnackbarType] =
    useState<
      "success" | "error" | "info"
    >("info");

  const [showOverstockDialog, setShowOverstockDialog] =
    useState(false);

  const updateStock =
    useUpdateStock();

  const showSnackbar = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
  };

  const updateInventory = () => {
    updateStock.mutate(
      {
        productId,
        type: operation,
        quantity: Number(quantity),
        notes,
      },
      {
        onError: (error) => {
          const axiosError =
            error as AxiosError<{
              message?: string;
            }>;

          showSnackbar(
            axiosError.response?.data
              ?.message ??
              "Unable to update stock.",
            "error"
          );
        },
      }
    );
  };

 useEffect(() => {
  if (!updateStock.isSuccess) return;

  showSnackbar(
    "Stock updated successfully.",
    "success"
  );

  const timer = setTimeout(() => {
    navigation.goBack();
  }, 1000);

  return () => clearTimeout(timer);
}, [updateStock.isSuccess, navigation]);

  const handleUpdateStock = () => {
    if (!product) return;

    if (!quantity.trim()) {
      showSnackbar(
        "Please enter quantity.",
        "error"
      );
      return;
    }

    const qty = Number(quantity);

    if (Number.isNaN(qty)) {
      showSnackbar(
        "Please enter a valid quantity.",
        "error"
      );
      return;
    }

    if (qty <= 0) {
      showSnackbar(
        "Quantity must be greater than zero.",
        "error"
      );
      return;
    }

    if (
      operation === "STOCK_OUT" &&
      qty > product.currentQuantity
    ) {
      showSnackbar(
        "Insufficient stock available.",
        "error"
      );
      return;
    }

    if (operation === "STOCK_IN") {
      const finalQuantity =
        product.currentQuantity + qty;

      if (
        finalQuantity >
        product.maximumQuantity
      ) {
        setShowOverstockDialog(true);
        return;
      }
    }

    updateInventory();
  };

    if (isLoading) {
    return (
      <AppLoader message="Loading product..." />
    );
  }

  if (isError || !product) {
    return (
      <ErrorView
        title="Unable to load product"
        message="Please try again."
        onRetry={refetch}
      />
    );
  }

  return (
    <Surface
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={
          false
        }
      >
        <StockSummaryCard
          product={product}
        />

        <StockTypeSelector
          value={operation}
          onChange={setOperation}
        />

        <QuantityField
          value={quantity}
          onChangeText={setQuantity}
        />

        <NotesField
          value={notes}
          onChangeText={setNotes}
        />

        <Button
          mode="contained"
          onPress={
            handleUpdateStock
          }
          loading={
            updateStock.isPending
          }
          disabled={
            updateStock.isPending
          }
          style={styles.button}
        >
          Update Stock
        </Button>
      </ScrollView>

      <ConfirmationDialog
        visible={showOverstockDialog}
        title="Maximum Stock Warning"
        message={`Adding ${quantity} items will exceed the maximum stock limit (${product.maximumQuantity}).

Do you want to continue?`}
        loading={
          updateStock.isPending
        }
        confirmText="Continue"
        onDismiss={() =>
          setShowOverstockDialog(
            false
          )
        }
        onConfirm={() => {
          setShowOverstockDialog(
            false
          );

          updateInventory();
        }}
      />

      <Portal>

      <AppSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        type={snackbarType}
        onDismiss={() =>
          setSnackbarVisible(false)
        }
      />
      </Portal>
    </Surface>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },

  button: {
    marginTop: 8,
    borderRadius: 8,
  },
});