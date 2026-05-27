import { type ReactElement } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { favoriteLocations } from "#shared/favorites"

export default function Favorites(): ReactElement {
  return (
    <View style={styles.container}>
      <Typography style={styles.header} variant="title">
        Favorites
      </Typography>

      {favoriteLocations.map((favoriteLocation) => (
        <Typography
          key={favoriteLocation.id}
          href={`/favorites/${favoriteLocation.id}`}
          style={{ color: favoriteLocation.color }}
          variant="link"
        >
          {favoriteLocation.name}
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
