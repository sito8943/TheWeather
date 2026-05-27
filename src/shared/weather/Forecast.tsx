import { ScrollView, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { spacing } from "#design/foundations"

import { type OpenMeteoForecast } from "./types"

const Forecast: React.FC<{
  data?: OpenMeteoForecast[]
}> = ({ data }) => {
  return (
    <Card>
      <ScrollView horizontal style={styles.days}>
        {data?.map(({ day, temperatureMax, temperatureMin, condition }) => (
          <View key={day} style={styles.day}>
            <Typography variant="large">{temperatureMax} C</Typography>
            <Typography variant="muted">{temperatureMin} C</Typography>
            <Typography variant="label">{condition}</Typography>
          </View>
        ))}
      </ScrollView>
    </Card>
  )
}

export default Forecast

const styles = StyleSheet.create({
  days: { flexGrow: 0, flexDirection: "row" },
  day: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: spacing.between,
  },
})
