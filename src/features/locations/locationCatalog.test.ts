import { REGION } from "./constants"
import { locationCatalog } from "./locationCatalog"

const REGION_VALUES = Object.values(REGION)

describe("Locations > locationCatalog", () => {
  it("has unique ids", () => {
    const ids = locationCatalog.map((location) => location.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("assigns every location a known region", () => {
    for (const location of locationCatalog) {
      expect(REGION_VALUES).toContain(location.region)
    }
  })

  it("gives every location finite coordinates", () => {
    for (const location of locationCatalog) {
      expect(Number.isFinite(location.latitude)).toBe(true)
      expect(Number.isFinite(location.longitude)).toBe(true)
    }
  })
})
