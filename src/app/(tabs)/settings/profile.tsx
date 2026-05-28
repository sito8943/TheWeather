import { type ReactElement } from "react"
import { View } from "react-native"

import Typography from "#design/elements/Typography"
import { spacing, type ThemeColors } from "#design/foundations"
import { useThemedStyles } from "#shared/settings"

export default function Profile(): ReactElement {
  const styles = useThemedStyles(createStyles)

  return (
    <View style={styles.container}>
      <Typography style={styles.header} variant="title">
        Profile
      </Typography>
      <Typography variant="muted">Guest weather watcher</Typography>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    alignItems: "center" as const,
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center" as const,
  },
  header: {
    marginBottom: spacing.between,
  },
})
