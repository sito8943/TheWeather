import { Stack } from "expo-router"
import { type ReactElement } from "react"

export default function Layout(): ReactElement {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Favorites" }} />
      <Stack.Screen name="[id]" options={{ title: "Favorite" }} />
    </Stack>
  )
}
