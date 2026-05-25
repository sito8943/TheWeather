import { Drawer } from "expo-router/drawer"
import { type ReactElement } from "react"

export default function Layout(): ReactElement {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: "Settings" }} />
      <Drawer.Screen name="profile" options={{ title: "Profile" }} />
    </Drawer>
  )
}
