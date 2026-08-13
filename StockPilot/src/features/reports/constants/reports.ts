import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export interface ReportItem {
  id: string;

  title: string;

  description: string;

  icon: keyof typeof MaterialCommunityIcons.glyphMap;

  screen:
    | "InventoryValuation"
    | "CategoryReport"
    | "ProductReport";
}

export const REPORTS: ReportItem[] = [
  {
    id: "inventory",

    title: "Inventory Valuation",

    description:
      "View inventory value and potential profit.",

    icon: "finance",

    screen: "InventoryValuation",
  },

  {
    id: "category",

    title: "Category Report",

    description:
      "Analyze inventory grouped by category.",

    icon: "view-grid",

    screen: "CategoryReport",
  },

  {
    id: "product",

    title: "Product Performance",

    description:
      "Analyze product profitability.",

    icon: "package-variant",

    screen: "ProductReport",
  },
];