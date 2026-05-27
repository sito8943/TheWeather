import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import { type OpenMeteoCurrent, type OpenMeteoLocation } from "./types"

const CurrentWeather: React.FC<{
  location?: OpenMeteoLocation | null
  locationColor?: string
  data?: OpenMeteoCurrent
}> = ({ data, location, locationColor }) => {
  return (
    <Card>
      <View style={styles.current}>
        <Typography variant="title">{data?.temperature ?? "--"} C</Typography>
        <Typography
          style={locationColor === undefined ? undefined : [{ color: locationColor }]}
          variant="muted"
        >
          {location?.name ?? "--"}
        </Typography>
        <Typography variant="label">{data?.condition ?? "--"}</Typography>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Typography variant="large">
            {data?.wind.toFixed(0) ?? "--"} km/h
          </Typography>
          <Typography variant="label">Wind</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="large">
            {data?.humidity.toFixed(0) ?? "--"}%
          </Typography>
          <Typography variant="label">Humidity</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="large">{data?.uv.toFixed(0) ?? "--"}</Typography>
          <Typography variant="label">UV</Typography>
        </View>
      </View>
    </Card>
  )
}

export default CurrentWeather

const styles = StyleSheet.create({
  current: {
    alignItems: "center",
    marginBottom: spacing.between,
  },
  stats: { flexDirection: "row" },
  stat: { flex: 1, alignItems: "center" },
})
