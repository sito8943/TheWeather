import { Stack, useLocalSearchParams } from "expo-router"
import { type ReactElement } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { findLocationById } from "#shared/locations"
import { CurrentWeather, Forecast, useOpenMeteoForecast } from "#shared/weather"

export default function LocationDetails(): ReactElement {
  const { id } = useLocalSearchParams<{ id: string | string[] }>()
  const locationId = Array.isArray(id) ? id[0] : id
  const location =
    locationId === undefined ? undefined : findLocationById(locationId)
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
    <ScrollView
      contentContainerStyle={styles.content}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen options={{ title: location.name }} />
      <CurrentWeather data={data?.current} location={location} />
      <Forecast data={data?.forecast} />
    </ScrollView>
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
  header: {
    marginBottom: spacing.between,
  },
})
