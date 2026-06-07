import { Tabs } from "expo-router"
import { type ReactElement } from "react"

import Icon from "#design/elements/Icon"
import { useThemeColors } from "#shared/settings"

export default function Layout(): ReactElement {
  const colors = useThemeColors()
  const resolveIconColor = (color: unknown): string | undefined =>
    typeof color === "string" ? color : undefined

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Icon color={resolveIconColor(color)} icon="home" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Icon color={resolveIconColor(color)} icon="search" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Icon color={resolveIconColor(color)} icon="settings" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="locations"
        options={{ headerShown: false, href: null }}
      />
    </Tabs>
  )
}
