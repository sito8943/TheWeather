import { type IconProp } from "@fortawesome/fontawesome-svg-core"
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons"
import {
  faGear,
  faHeart,
  faHouse,
  faMagnifyingGlass,
  faTrash,
} from "@fortawesome/free-solid-svg-icons"

export const APP_ICONS: Record<string, IconProp> = {
  heart: faHeart,
  heartOutline: faHeartOutline,
  home: faHouse,
  search: faMagnifyingGlass,
  settings: faGear,
  trash: faTrash,
}
