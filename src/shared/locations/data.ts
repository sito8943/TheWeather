import {
  type Location,
  type LocationId,
  type SavedLocation,
} from "./types"

const locationCatalog: Location[] = [
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

const savedColorById: Record<LocationId, string> = {
  barcelona: "#c2410c",
  madrid: "#1d4ed8",
  valencia: "#0f766e",
}

const savedLocationIds: LocationId[] = Object.keys(savedColorById)

export const savedLocations: SavedLocation[] = locationCatalog
  .filter((location) => savedLocationIds.includes(location.id))
  .map((location) => ({ ...location, color: savedColorById[location.id] }))

export function findLocationById(id: string): Location | undefined {
  return locationCatalog.find((location) => location.id === id)
}

export function findSavedLocationById(
  id: string,
): SavedLocation | undefined {
  return savedLocations.find((location) => location.id === id)
}

export function searchLocations(query: string): Location[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (normalizedQuery.length === 0) {
    return locationCatalog
  }

  return locationCatalog.filter((location) =>
    location.name.toLowerCase().includes(normalizedQuery),
  )
}
