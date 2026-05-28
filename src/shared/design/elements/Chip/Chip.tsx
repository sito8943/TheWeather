import { type ReactElement } from "react"
import { Pressable } from "react-native"

import Typography from "#design/elements/Typography"
import { shapes, spacing, type ThemeColors } from "#design/foundations"
import { useThemedStyles } from "#shared/settings"

import { type ChipProps } from "./types"

export default function Chip({
  active,
  label,
  onPress,
}: ChipProps): ReactElement {
  const styles = useThemedStyles(createStyles)

  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
    >
      <Typography
        style={active ? styles.labelActive : undefined}
        variant="label"
      >
        {label}
      </Typography>
    </Pressable>
  )
}

const createStyles = (colors: ThemeColors) => ({
  chip: {
    borderRadius: shapes.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.sm,
  },
  chipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  chipInactive: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  labelActive: {
    color: colors.surface,
  },
})
