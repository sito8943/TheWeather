import { StatusBar } from "expo-status-bar"
import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

export default function App(): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>The Weather</Text>
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
