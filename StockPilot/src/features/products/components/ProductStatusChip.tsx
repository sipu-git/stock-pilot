import React from "react";

import { Chip } from "react-native-paper";

import { ProductStatus } from "../types";

interface ProductStatusChipProps {
  status: ProductStatus;
}

const ProductStatusChip = ({
  status,
}: ProductStatusChipProps) => {
  const getChipColor = () => {
    switch (status) {
      case "ACTIVE":
        return "#2E7D32";

      case "LOW_STOCK":
        return "#F57C00";

      case "OUT_OF_STOCK":
        return "#D32F2F";

      case "ARCHIVED":
        return "#757575";

      default:
        return "#1976D2";
    }
  };

  const getLabel = () => {
    switch (status) {
      case "ACTIVE":
        return "Active";

      case "LOW_STOCK":
        return "Low Stock";

      case "OUT_OF_STOCK":
        return "Out of Stock";

      case "ARCHIVED":
        return "Archived";

      default:
        return status;
    }
  };

  return (
    <Chip
      compact
      textStyle={{
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 12,
      }}
      style={{
        backgroundColor: getChipColor(),
      }}
    >
      {getLabel()}
    </Chip>
  );
};

export default ProductStatusChip;