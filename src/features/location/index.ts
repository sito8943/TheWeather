export {
  getCurrentPosition,
  requestForegroundPermission,
  reverseGeocodeName,
} from "./location"
export type { Coords } from "./location"
export {
  default as useCurrentLocation,
  CURRENT_LOCATION_ID,
} from "./useCurrentLocation"
export type { UseCurrentLocationResult } from "./useCurrentLocation"
export { default as useAddCurrentLocation } from "./useAddCurrentLocation"
export type { UseAddCurrentLocationResult } from "./useAddCurrentLocation"
