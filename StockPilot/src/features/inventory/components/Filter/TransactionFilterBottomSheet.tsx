import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Divider,
  Modal,
  Portal,
  RadioButton,
  Surface,
} from "react-native-paper";

import { AppText } from "../../../../components/ui";
import { useAppTheme } from "../../../../core/theme/useAppTheme";

export type TransactionType =
  | ""
  | "STOCK_IN"
  | "STOCK_OUT";

type Props = {
  visible: boolean;
  selectedType: TransactionType;

  onDismiss: () => void;

  onReset: () => void;

  onApply: (
    type: TransactionType
  ) => void;
};

export default function TransactionFilterBottomSheet({
  visible,
  selectedType,
  onDismiss,
  onReset,
  onApply,
}: Props) {
  const { colors } = useAppTheme();

  const [type, setType] =
    useState<TransactionType>(selectedType);

  useEffect(() => {
    if (!visible) return;

    setType(selectedType);
  }, [visible, selectedType]);

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
                backgroundColor:
                  colors.outlineVariant,
              },
            ]}
          />

          <AppText
            variant="titleMedium"
            style={styles.title}
          >
            Filter Transactions
          </AppText>

          <Divider style={styles.divider} />

          <AppText
            variant="titleSmall"
            style={styles.sectionTitle}
          >
            Transaction Type
          </AppText>

          <RadioButton.Group
            value={type}
            onValueChange={(value) =>
              setType(
                value as TransactionType
              )
            }
          >
            <View style={styles.option}>
              <AppText>All</AppText>
              <RadioButton value="" />
            </View>

            <View style={styles.option}>
              <AppText>Stock In</AppText>
              <RadioButton value="STOCK_IN" />
            </View>

            <View style={styles.option}>
              <AppText>Stock Out</AppText>
              <RadioButton value="STOCK_OUT" />
            </View>
          </RadioButton.Group>

          <Divider style={styles.divider} />

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
              onPress={() => onApply(type)}
            >
              Apply
            </Button>
          </View>
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
    justifyContent: "space-between",
    alignItems: "center",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },

  button: {
    flex: 1,
  },
});



