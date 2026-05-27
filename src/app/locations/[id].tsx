import { Stack, useLocalSearchParams } from "expo-router"
import { type ReactElement } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { findLocationById, findSavedLocationById } from "#shared/locations"
import { CurrentWeather, Forecast, useOpenMeteoForecast } from "#shared/weather"

export default function LocationDetails(): ReactElement {
  const { id } = useLocalSearchParams<{ id: string | string[] }>()
  const locationId = Array.isArray(id) ? id[0] : id
  const location =
    locationId === undefined ? undefined : findLocationById(locationId)
  const savedLocation =
    locationId === undefined ? undefined : findSavedLocationById(locationId)
  const { data } = useOpenMeteoForecast(location ?? null)

  if (location === undefined) {
    return (
      <View style={styles.emptyState}>
        <Stack.Screen options={{ title: "Location" }} />
        <Typography variant="title">Location not found</Typography>
      </View>
    )
  }

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Stack.Screen options={{ title: location.name }} />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.between,
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.between,
  },
})
