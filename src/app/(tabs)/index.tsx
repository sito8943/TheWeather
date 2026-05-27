import { type ReactElement, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import {
  LocationWeatherCard,
  findLocationById,
  savedLocations,
} from "#shared/locations"
import { Forecast, useOpenMeteoForecast } from "#shared/weather"

export default function Home(): ReactElement {
  const [selectedLocationId, setSelectedLocationId] = useState<
    string | undefined
  >(savedLocations[0]?.id)
  const selectedLocation =
    selectedLocationId === undefined
      ? undefined
      : findLocationById(selectedLocationId)
  const { data } = useOpenMeteoForecast(selectedLocation ?? null)

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Typography variant="title">Your locations</Typography>
        {selectedLocation !== undefined ? (
          <View style={styles.forecastSection}>
            <Typography
              style={[styles.sectionTitle, { color: selectedLocation.color }]}
              variant="title"
            >
              {selectedLocation.name}
            </Typography>
            <Forecast data={data?.forecast} />
          </View>
        ) : null}
        {savedLocations.map((location) => (
          <LocationWeatherCard
            isActive={selectedLocationId === location.id}
            key={location.id}
            location={location}
            onPress={() => {
              setSelectedLocationId(location.id)
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.between,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  forecastSection: {},
  sectionTitle: {
    marginBottom: spacing.sm,
  },
})
