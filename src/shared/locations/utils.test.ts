import { REGION } from "./constants"
import { type Location } from "./types"
import { groupLocationsByRegion } from "./utils"

const makeLocation = (
  id: string,
  region: Location["region"],
): Location => ({
  id,
  latitude: 0,
  longitude: 0,
  name: id,
  region,
})

describe("Locations > groupLocationsByRegion", () => {
  it("returns no sections for an empty list", () => {
    expect(groupLocationsByRegion([])).toEqual([])
  })

  it("groups locations under their region", () => {
    const sections = groupLocationsByRegion([
      makeLocation("barcelona", REGION.CATALUNA),
      makeLocation("girona", REGION.CATALUNA),
      makeLocation("sevilla", REGION.ANDALUCIA),
    ])

    expect(sections).toEqual([
      {
        data: [
          makeLocation("sevilla", REGION.ANDALUCIA),
        ],
        title: REGION.ANDALUCIA,
      },
      {
        data: [
          makeLocation("barcelona", REGION.CATALUNA),
          makeLocation("girona", REGION.CATALUNA),
        ],
        title: REGION.CATALUNA,
      },
    ])
  })

  it("omits regions with no matching locations", () => {
    const sections = groupLocationsByRegion([
      makeLocation("madrid", REGION.COMUNIDAD_DE_MADRID),
    ])

    expect(sections).toHaveLength(1)
    expect(sections[0].title).toBe(REGION.COMUNIDAD_DE_MADRID)
  })

  it("orders sections by the canonical region order", () => {
    const sections = groupLocationsByRegion([
      makeLocation("murcia", REGION.REGION_DE_MURCIA),
      makeLocation("zaragoza", REGION.ARAGON),
      makeLocation("barcelona", REGION.CATALUNA),
    ])

    expect(sections.map((section) => section.title)).toEqual([
      REGION.ARAGON,
      REGION.CATALUNA,
      REGION.REGION_DE_MURCIA,
    ])
  })

  it("preserves the input order of locations within a region", () => {
    const sections = groupLocationsByRegion([
      makeLocation("girona", REGION.CATALUNA),
      makeLocation("barcelona", REGION.CATALUNA),
    ])

    expect(sections[0].data.map((location) => location.id)).toEqual([
      "girona",
      "barcelona",
    ])
  })
})
