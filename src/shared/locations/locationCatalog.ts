import { type Location, type LocationId, type SavedLocation } from "./types"

export const locationCatalog: Location[] = [
  {
    id: "barcelona",
    latitude: 41.385063,
    longitude: 2.173404,
    name: "Barcelona",
  },
  {
    id: "madrid",
    latitude: 40.416775,
    longitude: -3.70379,
    name: "Madrid",
  },
  {
    id: "valencia",
    latitude: 39.46975,
    longitude: -0.37739,
    name: "Valencia",
  },
  {
    id: "sevilla",
    latitude: 37.389092,
    longitude: -5.984459,
    name: "Sevilla",
  },
  {
    id: "bilbao",
    latitude: 43.263012,
    longitude: -2.934985,
    name: "Bilbao",
  },
  {
    id: "malaga",
    latitude: 36.721302,
    longitude: -4.421637,
    name: "Malaga",
  },
]

const seedColorById: Record<LocationId, string> = {
  sevilla: "#c2410c",
  madrid: "#1d4ed8",
  valencia: "#0f766e",
}

export const DEFAULT_SAVED_LOCATIONS: SavedLocation[] = locationCatalog
  .filter((location) => seedColorById[location.id] !== undefined)
  .map((location) => ({ ...location, color: seedColorById[location.id] }))

export function findLocationById(id: string): Location | undefined {
  return locationCatalog.find((location) => location.id === id)
}

export function findLocationByName(name: string): Location | undefined {
  const normalized = name.trim().toLowerCase()
  if (normalized.length === 0) return undefined
  return locationCatalog.find(
    (location) => location.name.toLowerCase() === normalized,
  )
}
