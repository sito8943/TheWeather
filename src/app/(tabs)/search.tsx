import { router } from "expo-router"
import { type ReactElement, useState } from "react"
import { ScrollView, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import TextInput from "#design/elements/TextInput"
import Typography from "#design/elements/Typography"
import { spacing, type ThemeColors } from "#design/foundations"
import { useAddCurrentLocation } from "#shared/location"
import {
  ColorPickerModal,
  ExploreCard,
  searchLocations,
  useSavedLocations,
} from "#shared/locations"
import { useThemedStyles } from "#shared/settings"

export default function Search(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const { findById } = useSavedLocations()
  const {
    add: addCurrentLocation,
    currentLocation,
    error: currentLocationError,
    isLoading: isLoadingCurrentLocation,
    isOnline,
    isSaved: isCurrentLocationSaved,
  } = useAddCurrentLocation()
  const [query, setQuery] = useState("")
  const [isPickingColor, setIsPickingColor] = useState(false)
  const results = searchLocations(query)

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Typography style={styles.header} variant="title">
          Search
        </Typography>

        {!isCurrentLocationSaved && currentLocationError === null ? (
          <ExploreCard
            disabled={
              isLoadingCurrentLocation || currentLocation === null || !isOnline
            }
            label={
              !isOnline
                ? "Offline"
                : isLoadingCurrentLocation
                  ? "Locating…"
                  : `Use my location${currentLocation === null ? "" : `: ${currentLocation.name}`}`
            }
            onPress={() => {
              setIsPickingColor(true)
            }}
            style={styles.currentLocation}
          />
        ) : null}

        <TextInput
          onChangeText={setQuery}
          placeholder="Search locations"
          style={styles.searchInput}
          value={query}
        />

        {results.length === 0 ? (
          <Typography style={styles.emptyState} variant="muted">
            No locations match your search.
          </Typography>
        ) : null}

        <View style={styles.catalogContainer}>
          {results.map((location) => (
            <ExploreCard
              color={findById(location.id)?.color}
              key={location.id}
              label={location.name}
              onPress={() => {
                router.push({
                  params: { id: location.id },
                  pathname: "/locations/[id]",
                })
              }}
              style={styles.gridItem}
            />
          ))}
        </View>
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
  catalogContainer: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: spacing.sm,
    justifyContent: "space-between" as const,
    width: "100%" as const,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    alignItems: "center" as const,
    paddingHorizontal: spacing.inside,
    paddingVertical: spacing.between,
  },
  currentLocation: {
    marginBottom: spacing.between,
    width: "100%" as const,
  },
  emptyState: {
    marginBottom: spacing.between,
  },
  header: {
    marginBottom: spacing.between,
  },
  gridItem: {
    flexBasis: "48%" as const,
    flexGrow: 0,
  },
  searchInput: {
    marginBottom: spacing.between,
  },
})
