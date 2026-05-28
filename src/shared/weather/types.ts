import { type StyleProp, type ViewStyle } from "react-native"

import { type Weather } from "./toWeather"

export type OpenMeteoLocation = {
  latitude: number
  longitude: number
  name: string
}

export type ForecastLocation = Omit<OpenMeteoLocation, "name">

export type OpenMeteoForecast = {
  day: string
  temperatureMax: number
  temperatureMin: number
  condition: Weather
}

export type OpenMeteoCurrent = {
  condition: Weather
  temperature: number
  isDay: boolean
  wind: number
  humidity: number
  uv: number
}

export type OpenMeteoForecastResponse = {
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
  current: {
    weather_code: number
    temperature_2m: number
    is_day: number
    wind_speed_10m: number
    relative_humidity_2m: number
    uv_index: number
  }
}

type OpenMeteoData = {
  current: OpenMeteoCurrent
  forecast: OpenMeteoForecast[]
}

export type UseOpenMeteoForecastState = {
  data: OpenMeteoData | null
  error: Error | null
  isLoading: boolean
}

export type CurrentWeatherProps = {
  cardStyle?: StyleProp<ViewStyle>
  location?: OpenMeteoLocation | null
  locationColor?: string
  data?: OpenMeteoCurrent
}

export type ForecastProps = {
  data?: OpenMeteoForecast[]
}
