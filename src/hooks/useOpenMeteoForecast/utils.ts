import {
  OPEN_METEO_DAILY_PARAMS,
  OPEN_METEO_FORECAST_URL,
} from "@/hooks/useOpenMeteoForecast/constants"
import { type OpenMeteoLocation } from "@/hooks/useOpenMeteoForecast/types"

export const getOpenMeteoForecastUrl = (
  location: OpenMeteoLocation,
): string => {
  const params = new URLSearchParams({
    daily: OPEN_METEO_DAILY_PARAMS,
    latitude: String(location.latitude),
    longitude: String(location.longitude),
  })

  return `${OPEN_METEO_FORECAST_URL}?${params.toString()}`
}
