import { type Region } from "./types"

export const REGION = {
  ANDALUCIA: "Andalucía",
  ARAGON: "Aragón",
  CANARIAS: "Canarias",
  CASTILLA_Y_LEON: "Castilla y León",
  CATALUNA: "Cataluña",
  COMUNIDAD_DE_MADRID: "Comunidad de Madrid",
  COMUNIDAD_VALENCIANA: "Comunidad Valenciana",
  GALICIA: "Galicia",
  PAIS_VASCO: "País Vasco",
  REGION_DE_MURCIA: "Región de Murcia",
  OTHER: "Otras ubicaciones",
} as const

export const REGION_ORDER: Region[] = Object.values(REGION)
