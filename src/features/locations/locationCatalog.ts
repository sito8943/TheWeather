import { REGION } from "./constants"
import { type Location, type LocationId, type SavedLocation } from "./types"

export const locationCatalog: Location[] = [
  // Cataluña
  {
    id: "barcelona",
    latitude: 41.385063,
    longitude: 2.173404,
    name: "Barcelona",
    region: REGION.CATALUNA,
  },
  {
    id: "girona",
    latitude: 41.9794,
    longitude: 2.8214,
    name: "Girona",
    region: REGION.CATALUNA,
  },
  {
    id: "tarragona",
    latitude: 41.1189,
    longitude: 1.2445,
    name: "Tarragona",
    region: REGION.CATALUNA,
  },
  {
    id: "lleida",
    latitude: 41.6176,
    longitude: 0.62,
    name: "Lleida",
    region: REGION.CATALUNA,
  },
  // Comunidad de Madrid
  {
    id: "madrid",
    latitude: 40.416775,
    longitude: -3.70379,
    name: "Madrid",
    region: REGION.COMUNIDAD_DE_MADRID,
  },
  {
    id: "alcala-de-henares",
    latitude: 40.4818,
    longitude: -3.3643,
    name: "Alcalá de Henares",
    region: REGION.COMUNIDAD_DE_MADRID,
  },
  {
    id: "mostoles",
    latitude: 40.3223,
    longitude: -3.8649,
    name: "Móstoles",
    region: REGION.COMUNIDAD_DE_MADRID,
  },
  // Andalucía
  {
    id: "sevilla",
    latitude: 37.389092,
    longitude: -5.984459,
    name: "Sevilla",
    region: REGION.ANDALUCIA,
  },
  {
    id: "malaga",
    latitude: 36.721302,
    longitude: -4.421637,
    name: "Malaga",
    region: REGION.ANDALUCIA,
  },
  {
    id: "granada",
    latitude: 37.1773,
    longitude: -3.5986,
    name: "Granada",
    region: REGION.ANDALUCIA,
  },
  {
    id: "cordoba",
    latitude: 37.8882,
    longitude: -4.7794,
    name: "Córdoba",
    region: REGION.ANDALUCIA,
  },
  {
    id: "cadiz",
    latitude: 36.5298,
    longitude: -6.2926,
    name: "Cádiz",
    region: REGION.ANDALUCIA,
  },
  {
    id: "almeria",
    latitude: 36.834,
    longitude: -2.4637,
    name: "Almería",
    region: REGION.ANDALUCIA,
  },
  // Comunidad Valenciana
  {
    id: "valencia",
    latitude: 39.46975,
    longitude: -0.37739,
    name: "Valencia",
    region: REGION.COMUNIDAD_VALENCIANA,
  },
  {
    id: "alicante",
    latitude: 38.3452,
    longitude: -0.481,
    name: "Alicante",
    region: REGION.COMUNIDAD_VALENCIANA,
  },
  {
    id: "castellon",
    latitude: 39.9864,
    longitude: -0.0513,
    name: "Castellón",
    region: REGION.COMUNIDAD_VALENCIANA,
  },
  // País Vasco
  {
    id: "bilbao",
    latitude: 43.263012,
    longitude: -2.934985,
    name: "Bilbao",
    region: REGION.PAIS_VASCO,
  },
  {
    id: "san-sebastian",
    latitude: 43.3183,
    longitude: -1.9812,
    name: "San Sebastián",
    region: REGION.PAIS_VASCO,
  },
  {
    id: "vitoria",
    latitude: 42.8467,
    longitude: -2.6716,
    name: "Vitoria-Gasteiz",
    region: REGION.PAIS_VASCO,
  },
  // Galicia
  {
    id: "a-coruna",
    latitude: 43.3623,
    longitude: -8.4115,
    name: "A Coruña",
    region: REGION.GALICIA,
  },
  {
    id: "vigo",
    latitude: 42.2406,
    longitude: -8.7207,
    name: "Vigo",
    region: REGION.GALICIA,
  },
  {
    id: "santiago-de-compostela",
    latitude: 42.8782,
    longitude: -8.5448,
    name: "Santiago de Compostela",
    region: REGION.GALICIA,
  },
  // Castilla y León
  {
    id: "valladolid",
    latitude: 41.6523,
    longitude: -4.7245,
    name: "Valladolid",
    region: REGION.CASTILLA_Y_LEON,
  },
  {
    id: "salamanca",
    latitude: 40.9701,
    longitude: -5.6635,
    name: "Salamanca",
    region: REGION.CASTILLA_Y_LEON,
  },
  {
    id: "leon",
    latitude: 42.5987,
    longitude: -5.5671,
    name: "León",
    region: REGION.CASTILLA_Y_LEON,
  },
  {
    id: "burgos",
    latitude: 42.3439,
    longitude: -3.6969,
    name: "Burgos",
    region: REGION.CASTILLA_Y_LEON,
  },
  // Aragón
  {
    id: "zaragoza",
    latitude: 41.6488,
    longitude: -0.8891,
    name: "Zaragoza",
    region: REGION.ARAGON,
  },
  // Región de Murcia
  {
    id: "murcia",
    latitude: 37.9922,
    longitude: -1.1307,
    name: "Murcia",
    region: REGION.REGION_DE_MURCIA,
  },
  // Canarias
  {
    id: "las-palmas",
    latitude: 28.1235,
    longitude: -15.4363,
    name: "Las Palmas de Gran Canaria",
    region: REGION.CANARIAS,
  },
  {
    id: "santa-cruz-de-tenerife",
    latitude: 28.4636,
    longitude: -16.2518,
    name: "Santa Cruz de Tenerife",
    region: REGION.CANARIAS,
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
