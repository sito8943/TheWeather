import { Stack, useLocalSearchParams } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
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
        <Stack.Screen options={{ title: "Favorite" }} />
        <Typography variant="title">Favorite not found</Typography>
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
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.between,
  },
})
