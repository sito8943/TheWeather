import toWeather from "./toWeather"
import {
  type ForecastLocation,
  type OpenMeteoCurrent,
  type OpenMeteoForecast,
  type OpenMeteoForecastResponse,
} from "./types"

const OPEN_METEO_FORECAST_URL = "https://api.open-meteo.com/v1/forecast"

const OPEN_METEO_CURRENT_PARAMS =
  "temperature_2m,is_day,weather_code,wind_speed_10m,relative_humidity_2m,uv_index"

const OPEN_METEO_DAILY_PARAMS =
  "temperature_2m_max,temperature_2m_min,weather_code"

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
