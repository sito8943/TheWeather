import { type ReactElement } from "react"
import { Pressable, StyleSheet } from "react-native"

import {
  CurrentWeather,
  type CurrentWeatherProps,
  useOpenMeteoForecast,
} from "#shared/weather"

import { type LocationWeatherCardProps } from "./types"

export default function LocationWeatherCard({
  isActive,
  location,
  onPress,
}: LocationWeatherCardProps): ReactElement {
  const { data } = useOpenMeteoForecast(location)
  const activeCardStyle: CurrentWeatherProps["cardStyle"] = isActive
    ? [styles.card, { borderColor: location.color }]
    : styles.card

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <CurrentWeather
        cardStyle={activeCardStyle}
        data={data?.current}
        location={location}
        locationColor={location.color}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    borderColor: "transparent",
    borderWidth: 2,
  },
  pressable: {},
  pressed: {
    opacity: 0.92,
  },
})
