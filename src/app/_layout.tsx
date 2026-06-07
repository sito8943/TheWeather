import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { type ReactElement } from "react"
import { StyleSheet } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { SavedLocationsProvider } from "#features/locations"
import { RESOLVED_THEME, SettingsProvider, useTheme } from "#features/settings"
import { OfflineBanner } from "#shared/network"

export default function Layout(): ReactElement {
  return (
    // Root wrapper required by react-native-gesture-handler.
    <GestureHandlerRootView style={styles.root}>
      <SettingsProvider>
        <SavedLocationsProvider>
          <ThemedRoot />
        </SavedLocationsProvider>
      </SettingsProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
})

function ThemedRoot(): ReactElement {
  const { colors, resolvedTheme } = useTheme()

  return (
    <>
      <OfflineBanner />

      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      <StatusBar
        style={resolvedTheme === RESOLVED_THEME.DARK ? "light" : "dark"}
      />
    </>
  )
}
