import { type OpenMeteoLocation } from "#shared/weather"

export type Location = {
  color: string
  id: string
} & OpenMeteoLocation

export type LocationId = Location["id"]
