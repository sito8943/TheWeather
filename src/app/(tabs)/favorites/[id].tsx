import { Stack, useLocalSearchParams } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { findFavoriteLocationById } from "#shared/favorites"
import { CurrentWeather, Forecast, useOpenMeteoForecast } from "#shared/weather"

export default function FavoriteDetails(): ReactElement {
  const { id } = useLocalSearchParams<{ id: string }>()
  const location = findFavoriteLocationById(id)
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

      <Typography style={[styles.header, { color: location.color }]} variant="title">
        {location.name}
      </Typography>
      <CurrentWeather
        data={data?.current}
        location={location}
        locationColor={location.color}
      />
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
  header: {
    marginBottom: spacing.between,
  },
})
