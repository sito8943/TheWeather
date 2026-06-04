import { router } from "expo-router"
import { type ReactElement, useCallback, useEffect, useState } from "react"
import { SectionList, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import TextInput from "#design/elements/TextInput"
import Typography from "#design/elements/Typography"
import { spacing, type ThemeColors } from "#design/foundations"
import { useAddCurrentLocation } from "#shared/location"
import {
  ColorPickerModal,
  ExploreCard,
  groupLocationsByRegion,
  searchLocations,
  useSavedLocations,
  type Location,
} from "#shared/locations"
import { useThemedStyles } from "#shared/settings"

const INITIAL_VISIBLE_COUNT = 12
const PAGE_SIZE = 8

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
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

  const results = searchLocations(query)
  const hasMore = visibleCount < results.length
  const sections = groupLocationsByRegion(results.slice(0, visibleCount))

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }, [query])

  const handleEndReached = useCallback(() => {
    setVisibleCount((current) =>
      current >= results.length
        ? current
        : Math.min(current + PAGE_SIZE, results.length),
    )
  }, [results.length])

  const renderItem = useCallback(
    ({ item }: { item: Location }) => (
      <ExploreCard
        color={findById(item.id)?.color}
        label={item.name}
        onPress={() => {
          router.push({
            params: { id: item.id },
            pathname: "/locations/[id]",
          })
        }}
        style={styles.item}
      />
    ),
    [findById, styles.item],
  )

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.fixedHeader}>
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
      </View>

      <SectionList
        contentContainerStyle={styles.content}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Typography style={styles.emptyState} variant="muted">
            No locations match your search.
          </Typography>
        }
        ListFooterComponent={
          hasMore ? (
            <Typography style={styles.footer} variant="muted">
              Loading more…
            </Typography>
          ) : null
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <Typography style={styles.sectionHeader} variant="label">
            {section.title}
          </Typography>
        )}
        sections={sections}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled
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
  content: {
    paddingBottom: spacing.between,
    paddingHorizontal: spacing.inside,
  },
  currentLocation: {
    marginBottom: spacing.between,
    width: "100%" as const,
  },
  emptyState: {
    textAlign: "center" as const,
  },
  fixedHeader: {
    paddingHorizontal: spacing.inside,
    paddingTop: spacing.between,
  },
  footer: {
    paddingVertical: spacing.between,
    textAlign: "center" as const,
  },
  header: {
    marginBottom: spacing.between,
  },
  item: {
    marginBottom: spacing.sm,
    width: "100%" as const,
  },
  searchInput: {
    marginBottom: spacing.between,
  },
  sectionHeader: {
    backgroundColor: colors.background,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  },
})
