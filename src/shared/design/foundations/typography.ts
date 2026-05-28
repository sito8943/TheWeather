import { type TextStyle } from "react-native"

import { type ThemeColors } from "./colors"

const baseSize = 16

const sizes = {
  bodyText: { fontSize: baseSize },
  large: { fontSize: baseSize * 1.25 },
  muted: { fontSize: baseSize },
  label: { fontSize: baseSize * 0.875, fontWeight: "700" },
  link: { fontSize: baseSize, fontWeight: "600" },
  title: { fontSize: baseSize * 2, fontWeight: "700" },
} as const satisfies Record<string, TextStyle>

export type TypographyVariant = keyof typeof sizes

const colorKey: Record<TypographyVariant, keyof ThemeColors> = {
  bodyText: "body",
  large: "body",
  muted: "muted",
  label: "body",
  link: "brand",
  title: "body",
}

export const createTypography = (
  colors: ThemeColors,
): Record<TypographyVariant, TextStyle> => ({
  bodyText: { ...sizes.bodyText, color: colors[colorKey.bodyText] },
  large: { ...sizes.large, color: colors[colorKey.large] },
  muted: { ...sizes.muted, color: colors[colorKey.muted] },
  label: { ...sizes.label, color: colors[colorKey.label] },
  link: { ...sizes.link, color: colors[colorKey.link] },
  title: { ...sizes.title, color: colors[colorKey.title] },
})
