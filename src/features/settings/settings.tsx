import {
  createContext,
  useContext,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react"

import { useStoredState } from "#shared/storage"

export const THEME_PREFERENCE = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const

export type ThemePreference =
  (typeof THEME_PREFERENCE)[keyof typeof THEME_PREFERENCE]

export const TEMPERATURE_UNIT = {
  CELSIUS: "celsius",
  FAHRENHEIT: "fahrenheit",
} as const

export type TemperatureUnit =
  (typeof TEMPERATURE_UNIT)[keyof typeof TEMPERATURE_UNIT]

export const WIND_UNIT = {
  KMH: "kmh",
  MPH: "mph",
} as const

export type WindUnit = (typeof WIND_UNIT)[keyof typeof WIND_UNIT]

export type Settings = {
  theme: {
    preference: ThemePreference
  }
  units: {
    temperature: TemperatureUnit
    wind: WindUnit
  }
}

const defaultSettings: Settings = {
  theme: {
    preference: THEME_PREFERENCE.SYSTEM,
  },
  units: {
    temperature: TEMPERATURE_UNIT.CELSIUS,
    wind: WIND_UNIT.KMH,
  },
}

const STORAGE_KEY = "the-weather:settings"

const parseSettings = (value: unknown): Settings => {
  if (!value || typeof value !== "object") {
    return defaultSettings
  }

  const raw = value as Partial<Settings>
  const preference = raw.theme?.preference
  const temperature = raw.units?.temperature
  const wind = raw.units?.wind

  return {
    theme: {
      preference:
        preference === THEME_PREFERENCE.LIGHT ||
        preference === THEME_PREFERENCE.DARK ||
        preference === THEME_PREFERENCE.SYSTEM
          ? preference
          : defaultSettings.theme.preference,
    },
    units: {
      temperature:
        temperature === TEMPERATURE_UNIT.CELSIUS ||
        temperature === TEMPERATURE_UNIT.FAHRENHEIT
          ? temperature
          : defaultSettings.units.temperature,
      wind:
        wind === WIND_UNIT.KMH || wind === WIND_UNIT.MPH
          ? wind
          : defaultSettings.units.wind,
    },
  }
}

type SettingsContextValue = {
  isLoading: boolean
  set: (settings: Settings) => void
  settings: Settings
}

const Context = createContext<SettingsContextValue | undefined>(undefined)

type SettingsProviderProps = {
  children: ReactNode
}

export function SettingsProvider({
  children,
}: SettingsProviderProps): ReactElement {
  const { data, isLoading, setData } = useStoredState<Settings>({
    errorMessage: "Unable to persist settings.",
    initialValue: defaultSettings,
    parseStoredValue: parseSettings,
    storageKey: STORAGE_KEY,
  })

  const value = useMemo<SettingsContextValue>(
    () => ({
      isLoading,
      set: setData,
      settings: data,
    }),
    [data, isLoading, setData],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

const useSettingsContext = (): SettingsContextValue => {
  const context = useContext(Context)
  if (!context) throw new Error("Missing SettingsProvider.")
  return context
}

export function useSettings(): Settings {
  return useSettingsContext().settings
}

export function useSettingsSetter(): (settings: Settings) => void {
  return useSettingsContext().set
}

export function useSettingsLoading(): boolean {
  return useSettingsContext().isLoading
}
