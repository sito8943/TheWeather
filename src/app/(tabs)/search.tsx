import { router } from "expo-router"
import { type ReactElement, useState } from "react"
import { Pressable, ScrollView, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Card from "#design/elements/Card"
import TextInput from "#design/elements/TextInput"
import Typography from "#design/elements/Typography"
import { shapes, spacing, type ThemeColors } from "#design/foundations"
import { searchLocations, useSavedLocations } from "#shared/locations"
import { useThemedStyles } from "#shared/settings"

export default function Search(): ReactElement {
  const styles = useThemedStyles(createStyles)
  const { findById } = useSavedLocations()
  const [query, setQuery] = useState("")
  const results = searchLocations(query)

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Typography style={styles.header} variant="title">
          Search
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
            const savedColor = findById(location.id)?.color
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
                    <Typography
                      style={
                        savedColor === undefined
                          ? undefined
                          : { color: savedColor }
                      }
                    >
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

const createStyles = (colors: ThemeColors) => ({
  catalogContainer: {
    flexDirection: "row" as const,
    flexWrap: "wrap" as const,
    gap: spacing.sm,
    justifyContent: "space-between" as const,
    width: "100%" as const,
  },
  catalogCard: {
    borderColor: colors.border,
    borderRadius: shapes.borderRadius,
    borderWidth: 1,
    margin: 0,
    paddingVertical: spacing.between,
    width: "100%" as const,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    alignItems: "center" as const,
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
    flexBasis: "48%" as const,
    flexGrow: 0,
  },
  row: {
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  searchInput: {
    marginBottom: spacing.between,
  },
})
