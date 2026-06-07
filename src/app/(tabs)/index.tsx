import { router } from "expo-router"
import { type ReactElement, useCallback, useState } from "react"
import { Alert, Pressable, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { shapes, spacing, type ThemeColors } from "#design/foundations"
import DraggableList from "#design/patterns/DraggableList"
import SwipeToDelete from "#design/patterns/SwipeToDelete"
import { useAddCurrentLocation } from "#features/location"
import {
  ColorPickerModal,
  SavedLocationCard,
  type SavedLocation,
  useSavedLocations,
} from "#features/locations"
import { useThemedStyles } from "#features/settings"
import { haptics } from "#shared/haptics"

const REFRESH_SETTLE_MS = 800

export default function Home(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const { data: savedLocations, remove, reorder } = useSavedLocations()
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

  const confirmRemove = useCallback(
    (location: SavedLocation) => {
      Alert.alert("Remove location", `Remove ${location.name}?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            remove(location.id)
            haptics.success()
          },
        },
      ])
    },
    [remove],
  )

  const renderItem = useCallback(
    (item: SavedLocation) => (
      <SwipeToDelete
        onDelete={() => {
          confirmRemove(item)
        }}
      >
        <SavedLocationCard
          location={item}
          onPress={() => {
            router.push(`/locations/${item.id}`)
          }}
          reloadToken={reloadToken}
        />
      </SwipeToDelete>
    ),
    [confirmRemove, reloadToken],
  )

  const showPrompt =
    isOnline && !isCurrentLocationSaved && currentLocationError === null

  const header = (
    <View style={styles.header}>
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
    </View>
  )

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <DraggableList
        data={savedLocations}
        header={header}
        keyExtractor={(location) => location.id}
        onRefresh={handleRefresh}
        onReorder={reorder}
        refreshing={refreshing}
        renderItem={renderItem}
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
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  header: {
    gap: spacing.between,
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
