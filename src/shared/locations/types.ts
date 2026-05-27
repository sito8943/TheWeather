import { type OpenMeteoLocation } from "#shared/weather"

export type Location = {
  color: string
  id: string
} & OpenMeteoLocation

export type LocationId = Location["id"]

export type LocationWeatherCardProps = {
  isActive?: boolean
  location: Location
  onPress: () => void
}
