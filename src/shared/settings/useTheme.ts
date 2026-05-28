import { useCallback, useMemo } from "react"
import { useColorScheme, type ColorSchemeName } from "react-native"

import {
  darkColors,
  lightColors,
  type ThemeColors,
} from "../design/foundations/colors"

import {
  THEME_PREFERENCE,
  useSettings,
  useSettingsSetter,
  type Settings,
  type ThemePreference,
} from "./settings"

export const RESOLVED_THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const

export type ResolvedTheme =
  (typeof RESOLVED_THEME)[keyof typeof RESOLVED_THEME]

const PREFERENCE_CYCLE: Record<ThemePreference, ThemePreference> = {
  [THEME_PREFERENCE.LIGHT]: THEME_PREFERENCE.DARK,
  [THEME_PREFERENCE.DARK]: THEME_PREFERENCE.SYSTEM,
  [THEME_PREFERENCE.SYSTEM]: THEME_PREFERENCE.LIGHT,
}

const resolveTheme = (
  preference: ThemePreference,
  systemScheme: ColorSchemeName,
): ResolvedTheme => {
  if (preference === THEME_PREFERENCE.SYSTEM) {
    return systemScheme === RESOLVED_THEME.DARK
      ? RESOLVED_THEME.DARK
      : RESOLVED_THEME.LIGHT
  }
  return preference
}

const getThemeColors = (theme: ResolvedTheme): ThemeColors =>
  theme === RESOLVED_THEME.DARK ? darkColors : lightColors

export type UseThemeResult = {
  colors: ThemeColors
  preference: ThemePreference
  resolvedTheme: ResolvedTheme
  setPreference: (preference: ThemePreference) => void
  togglePreference: () => void
}

export function useTheme(): UseThemeResult {
  const settings = useSettings()
  const setSettings = useSettingsSetter()
  const systemScheme = useColorScheme()

  const preference = settings.theme.preference
  const resolvedTheme = resolveTheme(preference, systemScheme)

  const setPreference = useCallback(
    (next: ThemePreference) => {
      const updated: Settings = {
        ...settings,
        theme: { ...settings.theme, preference: next },
      }
      setSettings(updated)
    },
    [settings, setSettings],
  )

  const togglePreference = useCallback(() => {
    setPreference(PREFERENCE_CYCLE[preference])
  }, [preference, setPreference])

  return useMemo(
    () => ({
      colors: getThemeColors(resolvedTheme),
      preference,
      resolvedTheme,
      setPreference,
      togglePreference,
    }),
    [preference, resolvedTheme, setPreference, togglePreference],
  )
}

export function useThemeColors(): ThemeColors {
  return useTheme().colors
}
