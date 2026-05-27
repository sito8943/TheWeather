import { router } from "expo-router"
import { type ReactElement, useState } from "react"
import { Pressable, ScrollView, StyleSheet, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Card from "#design/elements/Card"
import TextInput from "#design/elements/TextInput"
import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"
import { findSavedLocationById, searchLocations } from "#shared/locations"

export default function Explore(): ReactElement {
  const [query, setQuery] = useState("")
  const results = searchLocations(query)

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Typography style={styles.header} variant="title">
          Explore
        </Typography>

        <TextInput
          onChangeText={setQuery}
          placeholder="Search locations"
          style={styles.searchInput}
          value={query}
        />

        {results.length === 0 ? (
          <Typography style={styles.emptyState} variant="muted">
            No locations match your search.
          </Typography>
        ) : null}

        <View style={styles.catalogContainer}>
          {results.map((location) => {
            const savedColor = findSavedLocationById(location.id)?.color
            return (
              <Pressable
                key={location.id}
                onPress={() => {
                  router.push({
                    params: { id: location.id },
                    pathname: "/locations/[id]",
                  })
                }}
                style={styles.gridItem}
              >
                <Card
                  style={[
                    styles.catalogCard,
                    savedColor === undefined
                      ? undefined
                      : { borderColor: savedColor },
                  ]}
                >
                  <View style={styles.row}>
                    <Typography style={{ color: savedColor }}>
                      {location.name}
                    </Typography>
                  </View>
                </Card>
              </Pressable>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  catalogContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "space-between",
    width: "100%",
  },
  catalogCard: {
    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    margin: 0,
    paddingVertical: spacing.between,
    width: "100%",
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: spacing.inside,
    paddingVertical: spacing.between,
  },
  emptyState: {
    marginBottom: spacing.between,
  },
  header: {
    marginBottom: spacing.between,
  },
  gridItem: {
    flexBasis: "48%",
    flexGrow: 0,
  },
  row: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    marginBottom: spacing.between,
  },
})
