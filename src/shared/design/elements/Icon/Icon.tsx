import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { type ReactElement } from "react"

import { APP_ICONS } from "./constants"
import { type IconProps } from "./types"

export default function Icon({ icon, ...rest }: IconProps): ReactElement {
  return <FontAwesomeIcon {...rest} icon={APP_ICONS[icon]} />
}
