import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"
import { type ReactElement } from "react"

export default function Layout(): ReactElement {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} name="gear" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
