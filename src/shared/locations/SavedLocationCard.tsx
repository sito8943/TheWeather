import { type ReactElement } from "react"
import { Pressable, StyleSheet } from "react-native"

import { CurrentWeather, useOpenMeteoForecast } from "#shared/weather"

import { type SavedLocationCardProps } from "./types"

export default function SavedLocationCard({
  location,
  onPress,
  reloadToken,
}: SavedLocationCardProps): ReactElement {
  const { data } = useOpenMeteoForecast(location, reloadToken)

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
