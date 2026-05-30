import { Stack, useLocalSearchParams } from "expo-router"
import { type ReactElement, useState } from "react"
import { Pressable, ScrollView, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Icon from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import { spacing, type ThemeColors } from "#design/foundations"
import {
  ColorPickerModal,
  findLocationById,
  useSavedLocations,
} from "#shared/locations"
import { useThemeColors, useThemedStyles } from "#shared/settings"
import { CurrentWeather, Forecast, useOpenMeteoForecast } from "#shared/weather"

export default function LocationDetails(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const colors = useThemeColors()
  const { add, findById, isSaved, remove, setColor } = useSavedLocations()
  const { id } = useLocalSearchParams<{ id: string | string[] }>()
  const [isPickingColor, setIsPickingColor] = useState(false)
  const locationId = Array.isArray(id) ? id[0] : id
  const savedLocation =
    locationId === undefined ? undefined : findById(locationId)
  const location =
    locationId === undefined
      ? undefined
      : (findLocationById(locationId) ?? savedLocation)
  const { data } = useOpenMeteoForecast(location ?? null)

  if (location === undefined) {
    return (
      <View style={styles.emptyState}>
        <Stack.Screen options={{ title: "Location" }} />
        <Typography variant="title">Location not found</Typography>
      </View>
    )
  }

  const saved = isSaved(location.id)

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerActions}>
              {saved ? (
                <Pressable
                  hitSlop={8}
                  onPress={() => {
                    setIsPickingColor(true)
                  }}
                  style={styles.headerAction}
                >
                  <View
                    style={[
                      styles.swatch,
                      { backgroundColor: savedLocation?.color ?? colors.border },
                    ]}
                  />
                </Pressable>
              ) : null}
              <Pressable
                hitSlop={8}
                onPress={() => {
                  if (saved) {
                    remove(location.id)
                  } else {
                    setIsPickingColor(true)
                  }
                }}
                style={styles.headerAction}
              >
                <Icon
                  color={saved ? colors.negative : colors.body}
                  icon={saved ? "heart" : "heartOutline"}
                  size={22}
                />
              </Pressable>
            </View>
          ),
          title: location.name,
        }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CurrentWeather
          data={data?.current}
          location={location}
          locationColor={savedLocation?.color}
        />
        <Forecast data={data?.forecast} />
      </ScrollView>

      <ColorPickerModal
        initialColor={savedLocation?.color}
        locationName={location.name}
        onCancel={() => {
          setIsPickingColor(false)
        }}
        onConfirm={(color) => {
          if (saved) {
            setColor(location.id, color)
          } else {
            add(location, color)
          }
          setIsPickingColor(false)
        }}
        visible={isPickingColor}
      />
    </SafeAreaView>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    alignItems: "center" as const,
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.between,
  },
  emptyState: {
    alignItems: "center" as const,
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center" as const,
    paddingHorizontal: spacing.between,
  },
  headerActions: {
    alignItems: "center" as const,
    flexDirection: "row" as const,
    gap: spacing.sm,
  },
  headerAction: {
    paddingHorizontal: spacing.sm,
  },
  swatch: {
    borderRadius: 999,
    height: 18,
    width: 18,
  },
})
