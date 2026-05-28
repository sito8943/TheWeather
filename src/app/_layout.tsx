import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { type ReactElement } from "react"

import { SavedLocationsProvider } from "#shared/locations"
import { SettingsProvider } from "#shared/settings"

export default function Layout(): ReactElement {
  return (
    <SettingsProvider>
      <SavedLocationsProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="locations" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style="auto" />
      </SavedLocationsProvider>
    </SettingsProvider>
  )
}
