import { type Props } from "@fortawesome/react-native-fontawesome"

import { type APP_ICONS } from "./constants"

export type IconName = keyof typeof APP_ICONS

export type IconProps = Omit<Props, "icon"> & {
  icon: IconName
}
