export const DEFAULT_LOCATION_COLOR = "#0f6cbd"

export const PRESET_LOCATION_COLORS = [
  "#0f6cbd",
  "#c2410c",
  "#1d4ed8",
  "#0f766e",
  "#7c3aed",
  "#dc2626",
  "#ca8a04",
  "#15803d",
] as const

const HEX_COLOR_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export function isValidHexColor(value: string): boolean {
  return HEX_COLOR_PATTERN.test(value.trim())
}

export function normalizeHexColor(value: string): string {
  const trimmed = value.trim()
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`
}
