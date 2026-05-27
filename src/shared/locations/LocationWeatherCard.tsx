import { type ReactElement } from "react"
import { Pressable, StyleSheet } from "react-native"

import { CurrentWeather, useOpenMeteoForecast } from "#shared/weather"

import { type LocationWeatherCardProps } from "./types"

export default function LocationWeatherCard({
  location,
  onPress,
}: LocationWeatherCardProps): ReactElement {
  const { data } = useOpenMeteoForecast(location)

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <CurrentWeather
        data={data?.current}
        location={location}
        locationColor={location.color}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.92,
  },
})
