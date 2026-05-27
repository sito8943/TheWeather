import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

export default function Profile(): ReactElement {
  return (
    <View style={styles.container}>
      <Typography style={styles.header} variant="title">
        Profile
      </Typography>
      <Typography variant="muted">Guest weather watcher</Typography>
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
})
