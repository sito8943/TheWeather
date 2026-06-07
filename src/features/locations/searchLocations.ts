import { locationCatalog } from "./locationCatalog"
import { type Location } from "./types"

export function searchLocations(query: string): Location[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (normalizedQuery.length === 0) {
    return locationCatalog
  }

  return locationCatalog.filter((location) =>
    location.name.toLowerCase().includes(normalizedQuery),
  )
}
