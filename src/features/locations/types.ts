import { type StyleProp, type ViewStyle } from "react-native"

import { type OpenMeteoLocation } from "#features/weather"

import { type REGION } from "./constants"

export type Region = (typeof REGION)[keyof typeof REGION]

export type Location = {
  id: string
  region: Region
} & OpenMeteoLocation

export type SavedLocation = Location & {
  color: string
}

export type LocationId = Location["id"]

export type LocationSection = {
  data: Location[]
  title: Region
}

export type SavedLocationCardProps = {
  location: SavedLocation
  onPress: () => void
  reloadToken?: number
}

export type ExploreCardProps = {
  color?: string
  disabled?: boolean
  label: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}
