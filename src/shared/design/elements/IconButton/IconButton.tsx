import { type ReactElement } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Icon from "#design/elements/Icon"
import { shapes, spacing } from "#design/foundations"
import { useThemeColors } from "#shared/settings"

import {
  BUTTON_SIZES,
  ICON_BUTTON_SIZE,
  ICON_BUTTON_VARIANT,
} from "./constants"
import { type IconButtonProps } from "./types"
import { getContainerStyle, getIconColor } from "./utils"

export default function IconButton({
  accessibilityLabel,
  children,
  disabled = false,
  hitSlop = spacing.sm,
  icon,
  iconColor,
  iconStyle,
  size = ICON_BUTTON_SIZE.MD,
  style,
  variant = ICON_BUTTON_VARIANT.TEXT,
  ...props
}: IconButtonProps): ReactElement {
  const colors = useThemeColors()
  const resolvedSize = BUTTON_SIZES[size]
  const container = getContainerStyle({ colors, disabled, variant })
  const resolvedIconColor =
    iconColor ?? getIconColor({ colors, disabled, variant })

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      disabled={disabled}
      hitSlop={hitSlop}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: container.backgroundColor,
          borderColor: container.borderColor,
          borderWidth: container.borderWidth,
          minHeight: resolvedSize.minSize,
          minWidth: resolvedSize.minSize,
          opacity: pressed && !disabled ? 0.7 : 1,
          padding: resolvedSize.padding,
        },
        style,
      ]}
      {...props}
    >
      <View style={styles.content}>
        {icon === undefined ? null : (
          <Icon
            color={resolvedIconColor}
            icon={icon}
            size={resolvedSize.iconSize}
            style={iconStyle}
          />
        )}
        {children}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    borderRadius: shapes.pill,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
  },
})
