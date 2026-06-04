import { type ReactElement } from "react"
import { View } from "react-native"

import {
  createShadows,
  shapes,
  spacing,
  type ThemeColors,
} from "#design/foundations"
import { useThemedStyles } from "#shared/settings"

import { type CardProps } from "./types"

export default function Card({ children, style }: CardProps): ReactElement {
  const styles = useThemedStyles(createStyles)
  return <View style={[styles.container, style]}>{children}</View>
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    alignItems: "center" as const,
    backgroundColor: colors.surface,
    borderRadius: shapes.borderRadius,
    justifyContent: "center" as const,
    padding: spacing.inside,
    width: "100%" as const,
    ...createShadows(colors).main,
  },
})
