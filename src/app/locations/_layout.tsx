import { Stack } from "expo-router"
import { type ReactElement } from "react"

import { useThemeColors } from "#shared/settings"

export default function Layout(): ReactElement {
  const colors = useThemeColors()

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.body,
      }}
    >
      <Stack.Screen name="[id]" options={{ title: "Location" }} />
    </Stack>
  )
}
