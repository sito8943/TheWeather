import {
  TEMPERATURE_UNIT,
  WIND_UNIT,
  type TemperatureUnit,
  type WindUnit,
} from "#shared/settings"

// Open-Meteo returns Celsius and km/h. Conversions happen at display time.

export function formatTemperature(
  celsius: number | undefined,
  unit: TemperatureUnit,
): string {
  if (celsius === undefined) return "--"

  if (unit === TEMPERATURE_UNIT.FAHRENHEIT) {
    return `${Math.round(celsius * 1.8 + 32)} °F`
  }

  return `${Math.round(celsius)} °C`
}

export function formatWind(
  kmh: number | undefined,
  unit: WindUnit,
): string {
  if (kmh === undefined) return "--"

  if (unit === WIND_UNIT.MPH) {
    return `${Math.round(kmh / 1.609344)} mph`
  }

  return `${Math.round(kmh)} km/h`
}
