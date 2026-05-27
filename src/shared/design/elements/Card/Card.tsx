import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import { colors, shadows, shapes, spacing } from "#design/foundations"

import { type CardProps } from "./types"

export default function Card({ children, style }: CardProps): ReactElement {
  return <View style={[styles.container, style]}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: shapes.borderRadius,
    justifyContent: "center",
    margin: spacing.between,
    padding: spacing.inside,
    width: "100%",
    ...shadows.main,
  },
})
