import { Link } from "expo-router"
import { type ReactElement } from "react"
import { StyleSheet, Text, View } from "react-native"

const favorites = [
  { id: "barcelona", name: "Barcelona" },
  { id: "madrid", name: "Madrid" },
  { id: "valencia", name: "Valencia" },
]

export default function Favorites(): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>

      {favorites.map((favorite) => (
        <Link
          key={favorite.id}
          href={`/favorites/${favorite.id}`}
          style={styles.link}
        >
          {favorite.name}
        </Link>
      ))}
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
  link: {
    color: "#1565c0",
    fontSize: 18,
    marginVertical: 8,
  },
})
