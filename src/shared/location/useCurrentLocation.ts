import { useCallback, useEffect, useState } from "react"

import { findLocationByName, REGION, type Location } from "#shared/locations"

import {
  getCurrentPosition,
  requestForegroundPermission,
  reverseGeocodeName,
} from "./location"

export const CURRENT_LOCATION_ID = "current-location"

const CURRENT_LOCATION_FALLBACK_NAME = "Current location"

export type UseCurrentLocationResult = {
  data: Location | null
  error: Error | null
  isLoading: boolean
  refresh: () => void
}

const toError = (error: unknown): Error =>
  error instanceof Error ? error : new Error("Unable to read current location.")

export default function useCurrentLocation(): UseCurrentLocationResult {
  const [data, setData] = useState<Location | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [version, setVersion] = useState(0)

  const refresh = useCallback(() => {
    setVersion((current) => current + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    const load = async (): Promise<void> => {
      setIsLoading(true)
      setError(null)
      try {
        const granted = await requestForegroundPermission()
        if (!granted) {
          throw new Error("Location permission denied.")
        }
        const coords = await getCurrentPosition()
        const name = await reverseGeocodeName(coords)
        if (cancelled) return
        const catalogMatch =
          name === null ? undefined : findLocationByName(name)
        setData(
          catalogMatch ?? {
            id: CURRENT_LOCATION_ID,
            latitude: coords.latitude,
            longitude: coords.longitude,
            name: name ?? CURRENT_LOCATION_FALLBACK_NAME,
            region: REGION.OTHER,
          },
        )
      } catch (caught) {
        if (cancelled) return
        setError(toError(caught))
        setData(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [version])

  return { data, error, isLoading, refresh }
}
