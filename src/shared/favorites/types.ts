import { type OpenMeteoLocation } from "#shared/weather"

export type FavoriteLocation = OpenMeteoLocation & {
  color: string
  id: string
}
