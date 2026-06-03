import { useEffect, useState } from "react"

import { useIsOnline } from "#shared/network"

import {
  getOpenMeteoForecastUrl,
  mapOpenMeteoCurrent,
  mapOpenMeteoForecast,
} from "./openMeteo"
import {
  type ForecastLocation,
  type OpenMeteoForecastResponse,
  type UseOpenMeteoForecastState,
} from "./types"

export default function useOpenMeteoForecast(
  location: ForecastLocation | null,
): UseOpenMeteoForecastState {
  const latitude = location?.latitude
  const longitude = location?.longitude
  const isOnline = useIsOnline()
  const [state, setState] = useState<UseOpenMeteoForecastState>({
    data: null,
    error: null,
    isLoading: false,
  })

  useEffect(() => {
    if (latitude === undefined || longitude === undefined) {
      setState({
        data: null,
        error: null,
        isLoading: false,
      })

      return
    }

    if (!isOnline) {
      setState((currentState) => ({
        ...currentState,
        error: new Error("You are offline."),
        isLoading: false,
      }))

      return
    }

    const forecastLocation: ForecastLocation = { latitude, longitude }

    setState((currentState) => ({
      ...currentState,
      error: null,
      isLoading: true,
    }))

    const fetchForecast = async (): Promise<void> => {
      try {
        const response = await fetch(getOpenMeteoForecastUrl(forecastLocation))

        if (!response.ok) {
          throw new Error(`Open-Meteo request failed: ${response.status}`)
        }

        const data = (await response.json()) as OpenMeteoForecastResponse

        setState({
          data: {
            forecast: mapOpenMeteoForecast(data.daily),
            current: mapOpenMeteoCurrent(data.current),
          },
          error: null,
          isLoading: false,
        })
      } catch (error) {
        setState({
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
          isLoading: false,
        })
      }
    }

    void fetchForecast()
  }, [latitude, longitude, isOnline])

  return state
}
