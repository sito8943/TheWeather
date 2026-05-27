import { type TextStyle } from "react-native"

import { body, brand, muted as mutedColor } from "./colors"

const baseSize = 16

export const bodyText: TextStyle = {
  color: body,
  fontSize: baseSize,
}

export const large: TextStyle = {
  color: body,
  fontSize: baseSize * 1.25,
}

export const muted: TextStyle = {
  color: mutedColor,
  fontSize: baseSize,
}

export const label: TextStyle = {
  color: body,
  fontSize: baseSize * 0.875,
  fontWeight: "700",
}

export const link: TextStyle = {
  color: brand,
  fontSize: baseSize,
  fontWeight: "600",
}

export const title: TextStyle = {
  color: body,
  fontSize: baseSize * 2,
  fontWeight: "700",
}
