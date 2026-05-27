import { type ReactElement, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

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
    <ScrollView
      contentContainerStyle={styles.content}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
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
    </ScrollView>
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
  forecastSection: {
    width: "100%",
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
})
