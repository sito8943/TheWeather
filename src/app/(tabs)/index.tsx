import { router } from "expo-router"
import { type ReactElement, useState } from "react"
import { Pressable, ScrollView } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { shapes, spacing, type ThemeColors } from "#design/foundations"
import { useAddCurrentLocation } from "#shared/location"
import {
  ColorPickerModal,
  SavedLocationCard,
  useSavedLocations,
} from "#shared/locations"
import { useThemedStyles } from "#shared/settings"

export default function Home(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const { data: savedLocations } = useSavedLocations()
  const {
    add: addCurrentLocation,
    currentLocation,
    error: currentLocationError,
    isLoading: isLoadingCurrentLocation,
    isOnline,
    isSaved: isCurrentLocationSaved,
  } = useAddCurrentLocation()
  const [isPickingColor, setIsPickingColor] = useState(false)

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Typography variant="title">Your locations</Typography>
        {isOnline &&
        !isCurrentLocationSaved &&
        currentLocationError === null ? (
          <Pressable
            disabled={isLoadingCurrentLocation || currentLocation === null}
            onPress={() => {
              setIsPickingColor(true)
            }}
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

      {currentLocation === null ? null : (
        <ColorPickerModal
          locationName={currentLocation.name}
          onCancel={() => {
            setIsPickingColor(false)
          }}
          onConfirm={(color) => {
            addCurrentLocation(color)
            setIsPickingColor(false)
          }}
          visible={isPickingColor}
        />
      )}
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
