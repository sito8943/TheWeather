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

export type Settings = {
  theme: {
    preference: ThemePreference
  }
}

const defaultSettings: Settings = {
  theme: {
    preference: THEME_PREFERENCE.SYSTEM,
  },
}

const STORAGE_KEY = "the-weather:settings"

const parseSettings = (value: unknown): Settings => {
  if (!value || typeof value !== "object") {
    return defaultSettings
  }

  const raw = value as Partial<Settings>
  const preference = raw.theme?.preference

  return {
    theme: {
      preference:
        preference === THEME_PREFERENCE.LIGHT ||
        preference === THEME_PREFERENCE.DARK ||
        preference === THEME_PREFERENCE.SYSTEM
          ? preference
          : defaultSettings.theme.preference,
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
