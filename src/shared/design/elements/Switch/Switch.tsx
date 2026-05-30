import { type ReactElement } from "react"
import { Switch as RNSwitch } from "react-native"

import { useThemeColors } from "#shared/settings"

import { type SwitchProps } from "./types"

export default function Switch({
  onValueChange,
  value,
}: SwitchProps): ReactElement {
  const colors = useThemeColors()

  return (
    <RNSwitch
      onValueChange={onValueChange}
      thumbColor={colors.surface}
      trackColor={{ false: colors.border, true: colors.brand }}
      value={value}
    />
  )
}
