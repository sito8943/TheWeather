import { router } from "expo-router"
import { type ReactElement } from "react"
import { Pressable, ScrollView } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { shapes, spacing, type ThemeColors } from "#design/foundations"
import { useAddCurrentLocation } from "#shared/location"
import { SavedLocationCard, useSavedLocations } from "#shared/locations"
import { useThemedStyles } from "#shared/settings"

export default function Home(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const { data: savedLocations } = useSavedLocations()
  const {
    add: addCurrentLocation,
    currentLocation,
    error: currentLocationError,
    isLoading: isLoadingCurrentLocation,
    isSaved: isCurrentLocationSaved,
  } = useAddCurrentLocation()

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Typography variant="title">Your locations</Typography>
        {!isCurrentLocationSaved && currentLocationError === null ? (
          <Pressable
            disabled={isLoadingCurrentLocation || currentLocation === null}
            onPress={addCurrentLocation}
            style={({ pressed }) => pressed && styles.promptPressed}
          >
            <Card style={styles.prompt}>
              <Typography variant="label">
                {isLoadingCurrentLocation
                  ? "Locating…"
                  : currentLocation === null
                    ? "Unable to read location"
                    : `Add your location: ${currentLocation.name}`}
              </Typography>
            </Card>
          </Pressable>
        ) : null}
        {savedLocations.map((location) => (
          <SavedLocationCard
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
  prompt: {
    alignItems: "flex-start" as const,
    borderColor: colors.border,
    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    width: "100%" as const,
  },
  promptPressed: {
    opacity: 0.7,
  },
})
