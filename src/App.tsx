import { StatusBar } from "expo-status-bar"
import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

import CurrentWeather from "./CurrentWeather"
import Forecast from "./Forecast"
import { useOpenMeteoForecast } from "./hooks"

const location = { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 }

export default function App(): ReactElement {
  const { data } = useOpenMeteoForecast(location)

  return (
    <View style={styles.container}>
      <Text style={styles.header}>The Weather</Text>

      <CurrentWeather location={location} data={data?.current} />
      <Forecast data={data?.forecast} />

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
