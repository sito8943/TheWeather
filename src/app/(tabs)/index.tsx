import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { CurrentWeather, Forecast, useOpenMeteoForecast } from "#shared/weather"

const location = {
  name: "Barcelona",
  latitude: 41.385063,
  longitude: 2.173404,
}

export default function Home(): ReactElement {
  const { data } = useOpenMeteoForecast(location)

  return (
    <View style={styles.container}>
      <Typography style={styles.header} variant="title">
        The Weather
      </Typography>

      <CurrentWeather location={location} data={data?.current} />
      <Forecast data={data?.forecast} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.between,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.between,
  },
})
