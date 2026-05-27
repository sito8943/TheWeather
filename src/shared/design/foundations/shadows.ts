import { Platform, type ViewStyle } from "react-native"

import { shadow } from "./colors"

export const main: ViewStyle = {
  shadowColor: shadow,
  ...Platform.select({
    android: {
      elevation: 10,
    },
    ios: {
      shadowOffset: { width: 16, height: 16},
      shadowOpacity: 1,
      shadowRadius: 8,
    },
    default: {
      shadowOffset: { width: 16, height: 16},
      shadowOpacity: 1,
      shadowRadius: 8,
    },
  }),
}
