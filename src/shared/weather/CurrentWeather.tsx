import { StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import { type CurrentWeatherProps } from "./types"

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  cardStyle,
  data,
  location,
  locationColor,
}) => {
  return (
    <Card style={[styles.card, cardStyle]}>
      <View style={styles.current}>
        <View>
          <Typography variant="large">{data?.temperature ?? "--"} C</Typography>
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
          <Typography>{data?.wind.toFixed(0) ?? "--"} km/h</Typography>
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

export default CurrentWeather

const styles = StyleSheet.create({
  card: {
    alignItems: "flex-start",
  },
  current: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: spacing.between,
  },
  stats: { flexDirection: "row" },
  stat: { flex: 1, alignItems: "flex-start" },
})
