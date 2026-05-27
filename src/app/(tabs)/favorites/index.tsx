import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"

const favorites = [
  { id: "barcelona", name: "Barcelona" },
  { id: "madrid", name: "Madrid" },
  { id: "valencia", name: "Valencia" },
]

export default function Favorites(): ReactElement {
  return (
    <View style={styles.container}>
      <Typography style={styles.header} variant="title">
        Favorites
      </Typography>

      {favorites.map((favorite) => (
        <Typography
          key={favorite.id}
          href={`/favorites/${favorite.id}`}
          variant="link"
        >
          {favorite.name}
        </Typography>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
  },
  header: {
    marginBottom: spacing.between,
  },
})
