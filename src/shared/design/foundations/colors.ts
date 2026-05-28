export type ThemeColors = {
  background: string
  body: string
  brand: string
  muted: string
  shadow: string
}

export const lightColors: ThemeColors = {
  background: "#ffffff",
  body: "#102542",
  brand: "#0f6cbd",
  muted: "#667085",
  shadow: "rgba(16, 36, 66, 0.16)",
}

export const darkColors: ThemeColors = {
  background: "#0b1320",
  body: "#e6edf7",
  brand: "#5aa9e6",
  muted: "#94a3b8",
  shadow: "rgba(0, 0, 0, 0.6)",
}

export const background = lightColors.background
export const body = lightColors.body
export const brand = lightColors.brand
export const muted = lightColors.muted
export const shadow = lightColors.shadow
