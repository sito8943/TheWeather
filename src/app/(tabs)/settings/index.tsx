import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

export default function Settings(): ReactElement {
  return (
    <View style={styles.container}>
      <Typography style={styles.header} variant="title">
        Settings
      </Typography>
      <Typography variant="bodyText">Units: Celsius</Typography>
      <Typography style={styles.copy} variant="muted">
        Forecast source: Open-Meteo
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
  },
  header: {
    marginBottom: spacing.between,
  },
  copy: {
    marginBottom: spacing.between,
    marginTop: spacing.xs,
  },
})
