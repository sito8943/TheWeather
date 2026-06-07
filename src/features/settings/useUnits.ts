import { useCallback, useMemo } from "react"

import {
  TEMPERATURE_UNIT,
  WIND_UNIT,
  useSettings,
  useSettingsSetter,
  type Settings,
  type TemperatureUnit,
  type WindUnit,
} from "./settings"

export type UseUnitsResult = {
  isFahrenheit: boolean
  isMph: boolean
  setTemperatureUnit: (unit: TemperatureUnit) => void
  setWindUnit: (unit: WindUnit) => void
  temperature: TemperatureUnit
  toggleTemperatureUnit: (useFahrenheit: boolean) => void
  toggleWindUnit: (useMph: boolean) => void
  wind: WindUnit
}

export function useUnits(): UseUnitsResult {
  const settings = useSettings()
  const setSettings = useSettingsSetter()

  const { temperature, wind } = settings.units

  const setTemperatureUnit = useCallback(
    (unit: TemperatureUnit) => {
      const updated: Settings = {
        ...settings,
        units: { ...settings.units, temperature: unit },
      }
      setSettings(updated)
    },
    [settings, setSettings],
  )

  const setWindUnit = useCallback(
    (unit: WindUnit) => {
      const updated: Settings = {
        ...settings,
        units: { ...settings.units, wind: unit },
      }
      setSettings(updated)
    },
    [settings, setSettings],
  )

  const toggleTemperatureUnit = useCallback(
    (useFahrenheit: boolean) => {
      setTemperatureUnit(
        useFahrenheit ? TEMPERATURE_UNIT.FAHRENHEIT : TEMPERATURE_UNIT.CELSIUS,
      )
    },
    [setTemperatureUnit],
  )

  const toggleWindUnit = useCallback(
    (useMph: boolean) => {
      setWindUnit(useMph ? WIND_UNIT.MPH : WIND_UNIT.KMH)
    },
    [setWindUnit],
  )

  return useMemo(
    () => ({
      isFahrenheit: temperature === TEMPERATURE_UNIT.FAHRENHEIT,
      isMph: wind === WIND_UNIT.MPH,
      setTemperatureUnit,
      setWindUnit,
      temperature,
      toggleTemperatureUnit,
      toggleWindUnit,
      wind,
    }),
    [
      temperature,
      wind,
      setTemperatureUnit,
      setWindUnit,
      toggleTemperatureUnit,
      toggleWindUnit,
    ],
  )
}
