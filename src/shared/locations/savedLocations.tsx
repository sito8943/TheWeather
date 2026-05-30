import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react"

import { useStoredState } from "#shared/storage"

import { DEFAULT_LOCATION_COLOR } from "./color"
import { DEFAULT_SAVED_LOCATIONS } from "./locationCatalog"
import { type Location, type SavedLocation } from "./types"

const STORAGE_KEY = "the-weather:saved-locations"

const parseSavedLocations = (value: unknown): SavedLocation[] => {
  if (!Array.isArray(value)) return DEFAULT_SAVED_LOCATIONS

  return value.filter(
    (entry): entry is SavedLocation =>
      typeof entry === "object" &&
      entry !== null &&
      typeof (entry as SavedLocation).id === "string" &&
      typeof (entry as SavedLocation).name === "string" &&
      typeof (entry as SavedLocation).color === "string" &&
      typeof (entry as SavedLocation).latitude === "number" &&
      typeof (entry as SavedLocation).longitude === "number",
  )
}

export type UseSavedLocationsResult = {
  add: (location: Location, color?: string) => void
  data: SavedLocation[]
  error: Error | null
  findById: (id: string) => SavedLocation | undefined
  isLoading: boolean
  isSaved: (id: string) => boolean
  remove: (id: string) => void
  setColor: (id: string, color: string) => void
  toggle: (location: Location, color?: string) => void
}

const Context = createContext<UseSavedLocationsResult | undefined>(undefined)

type SavedLocationsProviderProps = {
  children: ReactNode
}

export function SavedLocationsProvider({
  children,
}: SavedLocationsProviderProps): ReactElement {
  const { data, error, isLoading, setData } = useStoredState<SavedLocation[]>({
    errorMessage: "Unable to persist saved locations.",
    initialValue: DEFAULT_SAVED_LOCATIONS,
    parseStoredValue: parseSavedLocations,
    storageKey: STORAGE_KEY,
  })

  const isSaved = useCallback(
    (id: string) => data.some((entry) => entry.id === id),
    [data],
  )

  const findById = useCallback(
    (id: string) => data.find((entry) => entry.id === id),
    [data],
  )

  const add = useCallback(
    (location: Location, color: string = DEFAULT_LOCATION_COLOR) => {
      setData((current) =>
        current.some((entry) => entry.id === location.id)
          ? current
          : [...current, { ...location, color }],
      )
    },
    [setData],
  )

  const remove = useCallback(
    (id: string) => {
      setData((current) => current.filter((entry) => entry.id !== id))
    },
    [setData],
  )

  const setColor = useCallback(
    (id: string, color: string) => {
      setData((current) =>
        current.map((entry) =>
          entry.id === id ? { ...entry, color } : entry,
        ),
      )
    },
    [setData],
  )

  const toggle = useCallback(
    (location: Location, color?: string) => {
      setData((current) =>
        current.some((entry) => entry.id === location.id)
          ? current.filter((entry) => entry.id !== location.id)
          : [...current, { ...location, color: color ?? DEFAULT_LOCATION_COLOR }],
      )
    },
    [setData],
  )

  const value = useMemo<UseSavedLocationsResult>(
    () => ({
      add,
      data,
      error,
      findById,
      isLoading,
      isSaved,
      remove,
      setColor,
      toggle,
    }),
    [add, data, error, findById, isLoading, isSaved, remove, setColor, toggle],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useSavedLocations(): UseSavedLocationsResult {
  const context = useContext(Context)
  if (!context) throw new Error("Missing SavedLocationsProvider.")
  return context
}
