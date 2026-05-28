import { type ReactElement } from "react"
import { TextInput as RNTextInput } from "react-native"

import { shapes, spacing, type ThemeColors } from "#design/foundations"
import { useThemeColors, useThemedStyles } from "#shared/settings"

import { type TextInputProps } from "./types"

export default function TextInput({
  style,
  placeholderTextColor,
  ...rest
}: TextInputProps): ReactElement {
  const styles = useThemedStyles(createStyles)
  const colors = useThemeColors()

  return (
    <RNTextInput
      placeholderTextColor={placeholderTextColor ?? colors.muted}
      style={[styles.input, style]}
      {...rest}
    />
  )
}

const createStyles = (colors: ThemeColors) => ({
  input: {
    borderColor: colors.muted,
    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    color: colors.body,
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.sm,
    width: "100%" as const,
  },
})
