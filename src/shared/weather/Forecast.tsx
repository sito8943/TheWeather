import { ScrollView, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import { type OpenMeteoForecast } from "./types"

const Forecast: React.FC<{
  data?: OpenMeteoForecast[]
}> = ({ data }) => {
  return (
    <Card style={styles.card}>
      <ScrollView style={styles.days}>
        {data?.map(({ day, temperatureMax, temperatureMin, condition }) => (
          <View key={day} style={styles.day}>
            <Typography variant="label">{day}</Typography>
            <View style={styles.info}>
              <View style={styles.temperatures}>
                <Typography variant="muted">{temperatureMax} C</Typography>
                <Typography variant="muted">{temperatureMin} C</Typography>
              </View>
              <Typography variant="label">{condition}</Typography>
            </View>
          </View>
        ))}
      </ScrollView>
    </Card>
  )
}

export default Forecast

const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
  days: { flexGrow: 0, width: "100%" },
  day: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: spacing.sm,
  },
  info: {
    alignItems: "flex-end",
  },
  temperatures: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
})
