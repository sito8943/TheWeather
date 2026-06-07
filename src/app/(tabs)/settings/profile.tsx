import { type ReactElement } from "react"
import { View } from "react-native"

import Switch from "#design/elements/Switch"
import Typography from "#design/elements/Typography"
import { spacing, type ThemeColors } from "#design/foundations"
import { useThemedStyles, useUnits } from "#features/settings"

export default function Profile(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const { isFahrenheit, isMph, toggleTemperatureUnit, toggleWindUnit } =
    useUnits()

  return (
    <View style={styles.container}>
      <Typography style={styles.header} variant="title">
        Profile
      </Typography>

      <View style={styles.row}>
        <Typography variant="label">Use Fahrenheit (°F)</Typography>
        <Switch onValueChange={toggleTemperatureUnit} value={isFahrenheit} />
      </View>

      <View style={styles.row}>
        <Typography variant="label">Use miles per hour (mph)</Typography>
        <Switch onValueChange={toggleWindUnit} value={isMph} />
      </View>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: spacing.inside,
    paddingVertical: spacing.between,
  },
  header: {
    marginBottom: spacing.between,
  },
  row: {
    alignItems: "center" as const,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    marginBottom: spacing.between,
  },
})
