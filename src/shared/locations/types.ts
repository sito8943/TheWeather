import { type OpenMeteoLocation } from "#shared/weather"

export type Location = {
  id: string
} & OpenMeteoLocation

export type SavedLocation = Location & {
  color: string
}

export type LocationId = Location["id"]

export type SavedLocationCardProps = {
  location: SavedLocation
  onPress: () => void
}
