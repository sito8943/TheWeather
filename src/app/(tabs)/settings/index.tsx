import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

export default function Settings(): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.copy}>Units: Celsius</Text>
      <Text style={styles.copy}>Forecast source: Open-Meteo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  copy: {
    color: "#666",
    fontSize: 16,
    marginVertical: 4,
  },
})
