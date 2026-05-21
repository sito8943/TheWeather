import { useEffect, useState } from "react"

import {
  type ForecastLocation,
  type OpenMeteoForecast,
  type UseOpenMeteoForecastState,
} from "@/hooks/useOpenMeteoForecast/types"
import { getOpenMeteoForecastUrl } from "@/hooks/useOpenMeteoForecast/utils"

export default function useOpenMeteoForecast(
  location: ForecastLocation | null,
): UseOpenMeteoForecastState {
  const latitude = location?.latitude
  const longitude = location?.longitude
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

    const controller = new AbortController()
    const forecastLocation = { latitude, longitude }

    setState((currentState) => ({
      ...currentState,
      error: null,
      isLoading: true,
    }))

    const fetchForecast = async (): Promise<void> => {
      try {
        const response = await fetch(
          getOpenMeteoForecastUrl(forecastLocation),
          {
            signal: controller.signal,
          },
        )

        if (!response.ok) {
          throw new Error(`Open-Meteo request failed: ${response.status}`)
        }

        const data = (await response.json()) as OpenMeteoForecast

        setState({
          data,
          error: null,
          isLoading: false,
        })
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        setState({
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
          isLoading: false,
        })
      }
    }

    void fetchForecast()

    return () => {
      controller.abort()
    }
  }, [latitude, longitude])

  return state
}
