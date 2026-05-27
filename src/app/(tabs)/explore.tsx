import { router } from "expo-router"
import { type ReactElement, useState } from "react"
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Card from "#design/elements/Card"
import Typography from "#design/elements/Typography"
import { colors, shapes, spacing } from "#design/foundations"
import { searchLocations } from "#shared/locations"

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
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
          value={query}
        />

        {results.length === 0 ? (
          <Typography style={styles.emptyState} variant="muted">
            No locations match your search.
          </Typography>
        ) : null}

        <View style={styles.catalogContainer}>
          {results.map((location) => (
            <Pressable
              key={location.id}
              onPress={() => {
                router.push({
                  params: { id: location.id },
                  pathname: "/locations/[id]",
                })
              }}
            >
              <Card
                style={[styles.catalogCard, { borderColor: location.color }]}
              >
                <View style={styles.row}>
                  <View>
                    <Typography>{location.name}</Typography>
                  </View>
                </View>
              </Card>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  catalogContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    justifyContent: "center",
  },
  catalogCard: {
    borderRadius: shapes.borderRadius,
    borderWidth: 2,
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
