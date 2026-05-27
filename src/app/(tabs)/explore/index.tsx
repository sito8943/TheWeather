import { router } from "expo-router"
import { type ReactElement, useState } from "react"
import { Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"
import { searchLocations } from "#shared/locations"

export default function Explore(): ReactElement {
  const [query, setQuery] = useState("")
  const results = searchLocations(query)

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Typography style={styles.header} variant="title">
        Explore
      </Typography>

      <TextInput
        onChangeText={setQuery}
        placeholder="Search locations"
        placeholderTextColor={colors.muted}
        style={styles.searchInput}
        value={query}
      />

      <Typography style={styles.catalogTitle} variant="label">
        Catalog
      </Typography>

      {results.length === 0 ? (
        <Typography style={styles.emptyState} variant="muted">
          No locations match your search.
        </Typography>
      ) : null}

      {results.map((location) => (
        <Pressable
          key={location.id}
          onPress={() => {
            router.push({
              params: { id: location.id },
              pathname: "/locations/[id]",
            })
          }}
          style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
        >
          <Card style={[styles.catalogCard, { borderColor: location.color }]}>
            <View style={styles.row}>
              <View>
                <Typography style={{ color: location.color }} variant="title">
                  {location.name}
                </Typography>
                <Typography variant="muted">
                  {location.latitude}, {location.longitude}
                </Typography>
              </View>

              <Typography variant="link">Forecast</Typography>
            </View>
          </Card>
        </Pressable>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  catalogCard: {
    borderRadius: shapes.borderRadius,
    borderWidth: 2,
  },
  catalogTitle: {
    marginBottom: spacing.sm,
    width: "100%",
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.between,
  },
  emptyState: {
    marginBottom: spacing.between,
    width: "100%",
  },
  header: {
    marginBottom: spacing.between,
  },
  pressable: {
    width: "100%",
  },
  pressed: {
    opacity: 0.92,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInput: {
    borderColor: colors.muted,
    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    color: colors.body,
    marginBottom: spacing.between,
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.sm,
    width: "100%",
  },
})
