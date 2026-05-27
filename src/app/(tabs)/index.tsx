import { type ReactElement, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Typography from "#design/elements/Typography"
import { colors, spacing } from "#design/foundations"
import { LocationWeatherCard, savedLocations } from "#shared/locations"

export default function Home(): ReactElement {
  const [selectedLocationId, setSelectedLocationId] = useState<
    string | undefined
  >(savedLocations[0]?.id)

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Typography variant="title">Your locations</Typography>
        {savedLocations.map((location) => (
          <LocationWeatherCard
            isActive={selectedLocationId === location.id}
            key={location.id}
            location={location}
            onPress={() => {
              setSelectedLocationId(location.id)
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
