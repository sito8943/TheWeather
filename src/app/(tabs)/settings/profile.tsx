import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

export default function Profile(): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.copy}>Guest weather watcher</Text>
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
  },
})
