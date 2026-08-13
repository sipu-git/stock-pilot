import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  // ==========================
  // Search Box
  // ==========================

  searchContainer: {
    flex: 1,
    height: 52,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderRadius: 16,

    paddingHorizontal: 14,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowRadius: 8,
  },

  searchIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,

    fontSize: 15,

    paddingVertical: 0,
  },

  // ==========================
  // Filter / Sort Buttons
  // ==========================

  actionWrapper: {
    marginLeft: 10,
  },

  actionButton: {
    width: 52,
    height: 52,

    borderRadius: 16,

    borderWidth: 1,

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 10,
  },
  clearButton: {
  marginLeft: 6,
},

  // ==========================
  // Badge
  // ==========================

  badge: {
    position: "absolute",

    top: -4,
    right: -4,

    zIndex: 10,
  },
});