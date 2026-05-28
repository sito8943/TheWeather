import { Drawer } from "expo-router/drawer"
import { type ReactElement } from "react"

import { useThemeColors } from "#shared/settings"

export default function Layout(): ReactElement {
  const colors = useThemeColors()

  return (
    <Drawer
      screenOptions={{
        drawerActiveTintColor: colors.brand,
        drawerInactiveTintColor: colors.body,
        drawerStyle: { backgroundColor: colors.surface },
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.body,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Settings" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
    </Drawer>
  )
}
