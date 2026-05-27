import { type ReactElement } from "react"
import { TextInput as RNTextInput, StyleSheet } from "react-native"

import { colors, shapes, spacing } from "#design/foundations"

import { type TextInputProps } from "./types"

export default function TextInput({
  style,
  placeholderTextColor = colors.muted,
  ...rest
}: TextInputProps): ReactElement {
  return (
    <RNTextInput
      placeholderTextColor={placeholderTextColor}
      style={[styles.input, style]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderColor: colors.muted,
    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    color: colors.body,
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.sm,
    width: "100%",
  },
})
