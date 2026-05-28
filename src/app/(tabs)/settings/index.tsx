import { type ReactElement } from "react"
import { View } from "react-native"

import Chip from "#design/elements/Chip"
import Typography from "#design/elements/Typography"
import { spacing, type ThemeColors } from "#design/foundations"
import {
  THEME_PREFERENCE,
  useTheme,
  useThemedStyles,
  type ThemePreference,
} from "#shared/settings"

const PREFERENCES: Array<{ label: string; value: ThemePreference }> = [
  { label: "Light", value: THEME_PREFERENCE.LIGHT },
  { label: "Dark", value: THEME_PREFERENCE.DARK },
  { label: "System", value: THEME_PREFERENCE.SYSTEM },
]

export default function Settings(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const { preference, setPreference } = useTheme()

  return (
    <View style={styles.container}>
      <Typography style={styles.sectionLabel} variant="label">
        Theme
      </Typography>
      <View style={styles.row}>
        {PREFERENCES.map((option) => (
          <Chip
            active={option.value === preference}
            key={option.value}
            label={option.label}
            onPress={() => {
              setPreference(option.value)
            }}
          />
        ))}
      </View>

      <Typography style={styles.copy} variant="muted">
        Forecast source: Open-Meteo
      </Typography>
    </View>
  )
}

const createStyles = (_colors: ThemeColors) => ({
  container: {
    flex: 1,
    paddingHorizontal: spacing.inside,
    paddingVertical: spacing.between,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: spacing.sm,
    marginBottom: spacing.between,
  },
  copy: {
    marginTop: spacing.xs,
  },
})
