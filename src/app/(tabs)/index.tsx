import { router } from "expo-router"
import { type ReactElement } from "react"
import { ScrollView } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Typography from "#design/elements/Typography"
import { spacing, type ThemeColors } from "#design/foundations"
import { LocationWeatherCard, useSavedLocations } from "#shared/locations"
import { useThemedStyles } from "#shared/settings"

export default function Home(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const { data: savedLocations } = useSavedLocations()

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Typography variant="title">Your locations</Typography>
        {savedLocations.map((location) => (
          <LocationWeatherCard
            key={location.id}
            location={location}
            onPress={() => {
              router.push(`/locations/${location.id}`)
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const createStyles = (colors: ThemeColors) => ({
  content: {
    alignItems: "center" as const,
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.between,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
})
