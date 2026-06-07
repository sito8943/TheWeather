import { router } from "expo-router"
import { useCallback } from "react"

import { type Location, useSavedLocations } from "#features/locations"
import { useIsOnline } from "#shared/network"

import useCurrentLocation from "./useCurrentLocation"

export type UseAddCurrentLocationResult = {
  add: (color: string) => void
  currentLocation: Location | null
  error: Error | null
  isLoading: boolean
  isOnline: boolean
  isSaved: boolean
}

export default function useAddCurrentLocation(): UseAddCurrentLocationResult {
  const { data, error, isLoading } = useCurrentLocation()
  const { add, isSaved } = useSavedLocations()
  const isOnline = useIsOnline()

  const handleAdd = useCallback(
    (color: string) => {
      if (data === null || !isOnline) return
      add(data, color)
      router.push({
        params: { id: data.id },
        pathname: "/locations/[id]",
      })
    },
    [add, data, isOnline],
  )

  return {
    add: handleAdd,
    currentLocation: data,
    error,
    isLoading,
    isOnline,
    isSaved: data === null ? false : isSaved(data.id),
  }
}
