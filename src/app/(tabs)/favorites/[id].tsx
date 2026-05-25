import { Stack, useLocalSearchParams } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

import { CurrentWeather, Forecast, useOpenMeteoForecast } from "#shared/weather"

const favoriteLocations = {
  barcelona: { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 },
  madrid: { name: "Madrid", latitude: 40.416775, longitude: -3.70379 },
  valencia: { name: "Valencia", latitude: 39.46975, longitude: -0.37739 },
} as const

export default function FavoriteDetails(): ReactElement {
  const { id } = useLocalSearchParams<{ id: string }>()
  const location = favoriteLocations[id as keyof typeof favoriteLocations]
  const { data } = useOpenMeteoForecast(location ?? null)

  if (location === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Favorite not found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: location.name }} />

      <CurrentWeather location={location} data={data?.current} />
      <Forecast data={data?.forecast} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
})
