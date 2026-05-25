import {
  OPEN_METEO_CURRENT_PARAMS,
  OPEN_METEO_DAILY_PARAMS,
  OPEN_METEO_FORECAST_URL,
} from "./constants"
import toWeather from "./toWeather"
import {
  type ForecastLocation,
  type OpenMeteoCurrent,
  type OpenMeteoForecast,
  type OpenMeteoForecastResponse,
} from "./types"

export const getOpenMeteoForecastUrl = (location: ForecastLocation): string => {
  const params = new URLSearchParams({
    current: OPEN_METEO_CURRENT_PARAMS,
    daily: OPEN_METEO_DAILY_PARAMS,
    latitude: String(location.latitude),
    longitude: String(location.longitude),
  })

  return `${OPEN_METEO_FORECAST_URL}?${params.toString()}`
}

export const mapOpenMeteoCurrent = (
  current: OpenMeteoForecastResponse["current"],
): OpenMeteoCurrent => ({
  condition: toWeather(current.weather_code),
  temperature: current.temperature_2m,
  isDay: current.is_day === 1,
  wind: current.wind_speed_10m,
  humidity: current.relative_humidity_2m,
  uv: current.uv_index,
})

export const mapOpenMeteoForecast = (
  daily: OpenMeteoForecastResponse["daily"],
): OpenMeteoForecast[] =>
  daily.time.map((day, i) => ({
    day,
    temperatureMax: daily.temperature_2m_max[i],
    temperatureMin: daily.temperature_2m_min[i],
    condition: toWeather(daily.weather_code[i]),
  }))
