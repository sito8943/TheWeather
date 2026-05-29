import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { type ReactElement } from "react"

import { SavedLocationsProvider } from "#shared/locations"
import { OfflineBanner } from "#shared/network"
import {
  RESOLVED_THEME,
  SettingsProvider,
  useTheme,
} from "#shared/settings"

export default function Layout(): ReactElement {
  return (
    <SettingsProvider>
      <SavedLocationsProvider>
        <ThemedRoot />
      </SavedLocationsProvider>
    </SettingsProvider>
  )
}

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
        <Stack.Screen name="locations" options={{ headerShown: false }} />
      </Stack>

      <StatusBar
        style={resolvedTheme === RESOLVED_THEME.DARK ? "light" : "dark"}
      />
    </>
  )
}
