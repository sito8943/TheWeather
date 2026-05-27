import { type Location, type LocationId } from "./types"

export const locationCatalog: Location[] = [
  {
    color: "#c2410c",
    id: "barcelona",
    latitude: 41.385063,
    longitude: 2.173404,
    name: "Barcelona",
  },
  {
    color: "#1d4ed8",
    id: "madrid",
    latitude: 40.416775,
    longitude: -3.70379,
    name: "Madrid",
  },
  {
    color: "#0f766e",
    id: "valencia",
    latitude: 39.46975,
    longitude: -0.37739,
    name: "Valencia",
  },
  {
    color: "#b45309",
    id: "sevilla",
    latitude: 37.389092,
    longitude: -5.984459,
    name: "Sevilla",
  },
  {
    color: "#7c3aed",
    id: "bilbao",
    latitude: 43.263012,
    longitude: -2.934985,
    name: "Bilbao",
  },
  {
    color: "#be185d",
    id: "malaga",
    latitude: 36.721302,
    longitude: -4.421637,
    name: "Malaga",
  },
]

export const savedLocationIds: LocationId[] = [
  "barcelona",
  "madrid",
  "valencia",
]

export const savedLocations: Location[] = locationCatalog.filter((location) =>
  savedLocationIds.includes(location.id),
)

export function findLocationById(id: string): Location | undefined {
  return locationCatalog.find((location) => location.id === id)
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
