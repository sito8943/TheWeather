import { type ReactElement } from "react"
import { Pressable, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { shapes, spacing, type ThemeColors } from "#design/foundations"
import { useThemedStyles } from "#shared/settings"

import { type ExploreCardProps } from "./types"

export default function ExploreCard({
  color,
  disabled = false,
  label,
  onPress,
  style,
}: ExploreCardProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        style,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Card
        style={[
          styles.card,
          color === undefined ? undefined : { borderColor: color },
        ]}
      >
        <View style={styles.row}>
          <Typography
            style={[styles.label, color === undefined ? undefined : { color }]}
            variant="label"
          >
            {label}
          </Typography>
        </View>
      </Card>
    </Pressable>
  )
}

const createStyles = (colors: ThemeColors) => ({
  card: {
    borderColor: colors.border,
    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    margin: 0,
    paddingVertical: spacing.inside,
    paddingHorizontal: spacing.sm,
    width: "100%" as const,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.7,
  },
  row: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  label: {
    textAlign: "center" as const,
  },
})
