import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"
import { useSettings } from "#shared/settings"

import { type CurrentWeatherProps } from "./types"
import { formatTemperature, formatWind } from "./units"

export default function CurrentWeather({
  cardStyle,
  data,
  location,
  locationColor,
}: CurrentWeatherProps): ReactElement {
  const { units } = useSettings()

  return (
    <Card style={[styles.card, cardStyle]}>
      <View style={styles.current}>
        <View>
          <Typography variant="large">
            {formatTemperature(data?.temperature, units.temperature)}
          </Typography>
          <Typography variant="label">{data?.condition ?? "--"}</Typography>
        </View>
        <Typography
          style={
            locationColor === undefined ? undefined : [{ color: locationColor }]
          }
          variant="muted"
        >
          {location?.name ?? "--"}
        </Typography>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Typography variant="label">Wind</Typography>
          <Typography>{formatWind(data?.wind, units.wind)}</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="label">Humidity</Typography>
          <Typography>{data?.humidity.toFixed(0) ?? "--"}%</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="label">UV</Typography>
          <Typography>{data?.uv.toFixed(0) ?? "--"}</Typography>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: "flex-start",
    marginHorizontal: 0,
  },
  current: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: spacing.between,
    width: "100%",
  },
  stats: { flexDirection: "row", width: "100%" },
  stat: { flex: 1, alignItems: "flex-start" },
})
