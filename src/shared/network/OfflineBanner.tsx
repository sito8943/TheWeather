import { type ReactElement } from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import Typography from "#design/elements/Typography"
import { spacing, type ThemeColors } from "#design/foundations"
import { useThemedStyles } from "#shared/settings"

import useIsOnline from "./useIsOnline"

export default function OfflineBanner(): ReactElement | null {
  const styles = useThemedStyles(createStyles)
  const insets = useSafeAreaInsets()
  const isOnline = useIsOnline()

  if (isOnline) return null

  return (
    <View style={[styles.banner, { paddingTop: insets.top + spacing.sm }]}>
      <Typography style={styles.text} variant="label">
        No internet connection
      </Typography>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  banner: {
    alignItems: "center" as const,
    backgroundColor: colors.negative,
    paddingHorizontal: spacing.inside,
    paddingBottom: spacing.sm,
    width: "100%" as const,
  },
  text: {
    color: colors.surface,
  },
})
