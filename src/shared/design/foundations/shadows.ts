import { Platform, type ViewStyle } from "react-native"

import { type ThemeColors } from "./colors"

export const createShadows = (colors: ThemeColors): { main: ViewStyle } => ({
  main: {
    shadowColor: colors.shadow,
    ...Platform.select({
      android: {
        boxShadow: "0px 4px 12px rgba(16, 36, 66, 0.22)",
        elevation: 3,
        shadowColor: "rgba(16, 36, 66, 0.3)",
      },
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      default: {
        boxShadow: "0px 4px 12px rgba(16, 36, 66, 0.22)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
    }),
  },
})
