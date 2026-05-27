import { type OpenMeteoLocation } from "#shared/weather"

export interface Location extends OpenMeteoLocation {
  color: string
  id: string
}

export type LocationId = Location["id"]
