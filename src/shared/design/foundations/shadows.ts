import { Platform, type ViewStyle } from "react-native"

import { type ThemeColors } from "./colors"

export const createShadows = (colors: ThemeColors): { main: ViewStyle } => ({
  main: {
    shadowColor: colors.shadow,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
      default: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
      },
    }),
  },
})
