import { router } from "expo-router"
import { type ReactElement } from "react"
import { ScrollView, StyleSheet } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { LocationWeatherCard, savedLocations } from "#shared/locations"

export default function Home(): ReactElement {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Typography variant="title">Your locations</Typography>
        {savedLocations.map((location) => (
          <LocationWeatherCard
            key={location.id}
            location={location}
            onPress={() => {
              router.push(`/locations/${location.id}`)
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    paddingHorizontal: spacing.between,
    paddingVertical: spacing.between,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
})
