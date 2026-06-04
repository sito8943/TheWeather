import { type ThemeColors } from "#design/foundations"

import { ICON_BUTTON_VARIANT } from "./constants"
import { type IconButtonVariant } from "./types"

export const getIconColor = ({
  colors,
  disabled,
  variant,
}: {
  colors: ThemeColors
  disabled: boolean
  variant: IconButtonVariant
}): string => {
  if (disabled) {
    return colors.muted
  }

  if (variant === ICON_BUTTON_VARIANT.FILLED) {
    return colors.surface
  }

  return colors.brand
}

export const getContainerStyle = ({
  colors,
  disabled,
  variant,
}: {
  colors: ThemeColors
  disabled: boolean
  variant: IconButtonVariant
}): {
  backgroundColor: string
  borderColor: string
  borderWidth: number
} => {
  if (variant === ICON_BUTTON_VARIANT.FILLED) {
    return {
      backgroundColor: disabled ? colors.border : colors.brand,
      borderColor: "transparent",
      borderWidth: 0,
    }
  }

  if (variant === ICON_BUTTON_VARIANT.OUTLINED) {
    return {
      backgroundColor: "transparent",
      borderColor: disabled ? colors.border : colors.brand,
      borderWidth: 1,
    }
  }

  return {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: 0,
  }
}
