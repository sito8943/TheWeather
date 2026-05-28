import { type ReactElement } from "react"
import { Pressable, View } from "react-native"

import Typography from "#design/elements/Typography"
import { shapes, spacing, type ThemeColors } from "#design/foundations"
import {
  THEME_PREFERENCE,
  useTheme,
  useThemedStyles,
  type ThemePreference,
} from "#shared/settings"

const PREFERENCES: { label: string; value: ThemePreference }[] = [
  { label: "Light", value: THEME_PREFERENCE.LIGHT },
  { label: "Dark", value: THEME_PREFERENCE.DARK },
  { label: "System", value: THEME_PREFERENCE.SYSTEM },
]

export default function Settings(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const { preference, setPreference } = useTheme()

  return (
    <View style={styles.container}>
      <Typography style={styles.header} variant="title">
        Settings
      </Typography>

      <Typography style={styles.sectionLabel} variant="label">
        Theme
      </Typography>
      <View style={styles.themeRow}>
        {PREFERENCES.map((option) => {
          const active = option.value === preference
          return (
            <Pressable
              key={option.value}
              onPress={() => {
                setPreference(option.value)
              }}
              style={[styles.themeOption, active && styles.themeOptionActive]}
            >
              <Typography variant={active ? "label" : "bodyText"}>
                {option.label}
              </Typography>
            </Pressable>
          )
        })}
      </View>

      <Typography style={styles.copy} variant="muted">
        Forecast source: Open-Meteo
      </Typography>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    alignItems: "center" as const,
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center" as const,
    paddingHorizontal: spacing.between,
  },
  header: {
    marginBottom: spacing.between,
  },
  sectionLabel: {
    marginBottom: spacing.sm,
  },
  themeRow: {
    flexDirection: "row" as const,
    gap: spacing.sm,
    marginBottom: spacing.between,
  },
  themeOption: {
    borderColor: colors.muted,
    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.sm,
  },
  themeOptionActive: {
    borderColor: colors.brand,
  },
  copy: {
    marginTop: spacing.xs,
  },
})
