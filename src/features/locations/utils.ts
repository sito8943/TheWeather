import { REGION_ORDER } from "./constants"
import { type Region, type Location, type LocationSection } from "./types"

export function groupLocationsByRegion(
  locations: Location[],
): LocationSection[] {
  const byRegion = new Map<Region, Location[]>()

  for (const location of locations) {
    const bucket = byRegion.get(location.region)
    if (bucket === undefined) {
      byRegion.set(location.region, [location])
    } else {
      bucket.push(location)
    }
  }

  return REGION_ORDER.filter((region) => byRegion.has(region)).map(
    (region) => ({
      data: byRegion.get(region) ?? [],
      title: region,
    }),
  )
}
