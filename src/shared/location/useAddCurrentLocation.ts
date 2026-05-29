import { router } from "expo-router"
import { useCallback } from "react"

import { type Location, useSavedLocations } from "#shared/locations"

import useCurrentLocation from "./useCurrentLocation"

export type UseAddCurrentLocationResult = {
  add: () => void
  currentLocation: Location | null
  error: Error | null
  isLoading: boolean
  isSaved: boolean
}

export default function useAddCurrentLocation(): UseAddCurrentLocationResult {
  const { data, error, isLoading } = useCurrentLocation()
  const { add, isSaved } = useSavedLocations()

  const handleAdd = useCallback(() => {
    if (data === null) return
    add(data)
    router.push({
      params: { id: data.id },
      pathname: "/locations/[id]",
    })
  }, [add, data])

  return {
    add: handleAdd,
    currentLocation: data,
    error,
    isLoading,
    isSaved: data === null ? false : isSaved(data.id),
  }
}
