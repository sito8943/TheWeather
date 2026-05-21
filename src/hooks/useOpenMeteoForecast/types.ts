export type OpenMeteoLocation = {
  latitude: number
  longitude: number
}

export type ForecastLocation = OpenMeteoLocation

export type OpenMeteoForecast = {
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
  daily_units: {
    time: string
    temperature_2m_max: string
    temperature_2m_min: string
    weather_code: string
  }
  elevation: number
  generationtime_ms: number
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
}

export type UseOpenMeteoForecastState = {
  data: OpenMeteoForecast | null
  error: Error | null
  isLoading: boolean
}
