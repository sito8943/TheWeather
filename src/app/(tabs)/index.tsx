import { router } from "expo-router"
import { type ReactElement, useCallback, useState } from "react"
import { FlatList, Pressable } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { shapes, spacing, type ThemeColors } from "#design/foundations"
import { useAddCurrentLocation } from "#shared/location"
import {
  ColorPickerModal,
  SavedLocationCard,
  type SavedLocation,
  useSavedLocations,
} from "#shared/locations"
import { useThemedStyles } from "#shared/settings"

const REFRESH_SETTLE_MS = 800

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
  const [reloadToken, setReloadToken] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    setRefreshing(true)
    setReloadToken((current) => current + 1)
    setTimeout(() => {
      setRefreshing(false)
    }, REFRESH_SETTLE_MS)
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: SavedLocation }) => (
      <SavedLocationCard
        location={item}
        onPress={() => {
          router.push(`/locations/${item.id}`)
        }}
        reloadToken={reloadToken}
      />
    ),
    [reloadToken],
  )

  const showPrompt =
    isOnline && !isCurrentLocationSaved && currentLocationError === null

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <FlatList
        contentContainerStyle={styles.content}
        data={savedLocations}
        keyExtractor={(location) => location.id}
        ListHeaderComponent={
          <>
            <Typography variant="title">Your locations</Typography>
            {showPrompt ? (
              <Pressable
                disabled={isLoadingCurrentLocation || currentLocation === null}
                onPress={() => {
                  setIsPickingColor(true)
                }}
                style={({ pressed }) => pressed && styles.promptPressed}
              >
                <Card style={styles.prompt}>
                  <Typography variant="label" style={styles.promptText}>
                    {isLoadingCurrentLocation
                      ? "Locating…"
                      : currentLocation === null
                        ? "Unable to read location"
                        : `Add your location: ${currentLocation.name}`}
                  </Typography>
                </Card>
              </Pressable>
            ) : null}
          </>
        }
        onRefresh={handleRefresh}
        refreshing={refreshing}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

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
    gap: spacing.between,
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.between,
  },
  container: {
    backgroundColor: colors.background,
  },
  prompt: {
    alignItems: "flex-start" as const,
    borderColor: colors.border,
    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    marginHorizontal: 0,
    width: "100%" as const,
  },
  promptPressed: {
    opacity: 0.7,
  },
  promptText: {
    textAlign: "center" as const,
  },
})
