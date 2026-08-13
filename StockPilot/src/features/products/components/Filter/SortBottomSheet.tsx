import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Divider,
  Modal,
  Portal,
  RadioButton,
  Surface,
} from "react-native-paper";
import { useAppTheme } from "../../../../core/theme/useAppTheme";
import { AppText } from "../../../../components/ui";

export type SortField =
  | "created_at"
  | "updated_at"
  | "name"
  | "purchase_price"
  | "selling_price"
  | "current_quantity"
  | "status";

export type SortOrder = "asc" | "desc";

export type SortOption = {
  label: string;
  sort: SortField;
  order: SortOrder;
};

type Props = {
  visible: boolean;
  selectedSort: SortField;
  selectedOrder: SortOrder;
  onDismiss: () => void;
  onSelect: (sort: SortField, order: SortOrder) => void;
};

const SORT_OPTIONS: SortOption[] = [
  {
    label: "Newest First",
    sort: "created_at",
    order: "desc",
  },
  {
    label: "Oldest First",
    sort: "created_at",
    order: "asc",
  },
  {
    label: "Recently Updated",
    sort: "updated_at",
    order: "desc",
  },
  {
    label: "Name (A-Z)",
    sort: "name",
    order: "asc",
  },
  {
    label: "Name (Z-A)",
    sort: "name",
    order: "desc",
  },
  {
    label: "Purchase Price (Low → High)",
    sort: "purchase_price",
    order: "asc",
  },
  {
    label: "Purchase Price (High → Low)",
    sort: "purchase_price",
    order: "desc",
  },
  {
    label: "Selling Price (Low → High)",
    sort: "selling_price",
    order: "asc",
  },
  {
    label: "Selling Price (High → Low)",
    sort: "selling_price",
    order: "desc",
  },
  {
    label: "Stock (Low → High)",
    sort: "current_quantity",
    order: "asc",
  },
  {
    label: "Stock (High → Low)",
    sort: "current_quantity",
    order: "desc",
  },
];

export default function SortBottomSheet({
  visible,
  selectedSort,
  selectedOrder,
  onDismiss,
  onSelect,
}: Props) {
  const { colors } = useAppTheme();

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
          <AppText variant="titleMedium" style={styles.title}>
            Sort By
          </AppText>

          <Divider style={styles.divider} />

          <RadioButton.Group
            value={`${selectedSort}_${selectedOrder}`}
            onValueChange={(selected) => {
              const option = SORT_OPTIONS.find(
                (item) => `${item.sort}_${item.order}` === selected,
              );

              if (!option) return;

              onSelect(option.sort, option.order);
              onDismiss();
            }}
          >
            {SORT_OPTIONS.map((option) => (
              <View
                key={`${option.sort}_${option.order}`}
                style={styles.option}
              >
                <AppText variant="bodyLarge" style={{ flex: 1 }}>
                  {option.label}
                </AppText>

                <RadioButton value={`${option.sort}_${option.order}`} />
              </View>
            ))}
          </RadioButton.Group>
        </Surface>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    flex: 1,
  },

  handle: {
  width: 50,
  height: 5,
  borderRadius: 10,
  alignSelf: "center",
  marginBottom: 16,
},

divider: {
  marginBottom: 8,
},

  container: {
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  paddingHorizontal: 20,
  paddingTop: 12,
  paddingBottom: 28,
},

  title: {
  textAlign: "center",
  marginBottom: 12,
},

  option: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 14,
},
});
