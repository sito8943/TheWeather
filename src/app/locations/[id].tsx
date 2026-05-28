import { Stack, useLocalSearchParams } from "expo-router"
import { type ReactElement } from "react"
import { Pressable, ScrollView, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Icon from "#design/elements/Icon"
import Typography from "#design/elements/Typography"
import { spacing, type ThemeColors } from "#design/foundations"
import { findLocationById, useSavedLocations } from "#shared/locations"
import { useThemeColors, useThemedStyles } from "#shared/settings"
import { CurrentWeather, Forecast, useOpenMeteoForecast } from "#shared/weather"

export default function LocationDetails(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const colors = useThemeColors()
  const { findById, isSaved, toggle } = useSavedLocations()
  const { id } = useLocalSearchParams<{ id: string | string[] }>()
  const locationId = Array.isArray(id) ? id[0] : id
  const location =
    locationId === undefined ? undefined : findLocationById(locationId)
  const savedLocation =
    locationId === undefined ? undefined : findById(locationId)
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
            <Pressable
              hitSlop={8}
              onPress={() => {
                toggle(location)
              }}
              style={styles.headerAction}
            >
              <Icon
                color={saved ? colors.negative : colors.body}
                icon={saved ? "heart" : "heartOutline"}
                size={22}
              />
            </Pressable>
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
  headerAction: {
    paddingHorizontal: spacing.sm,
  },
})
