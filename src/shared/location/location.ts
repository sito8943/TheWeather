import * as ExpoLocation from "expo-location"

export type Coords = {
  latitude: number
  longitude: number
}

export async function requestForegroundPermission(): Promise<boolean> {
  const { status } = await ExpoLocation.requestForegroundPermissionsAsync()
  return status === ExpoLocation.PermissionStatus.GRANTED
}

export async function getCurrentPosition(): Promise<Coords> {
  const position = await ExpoLocation.getCurrentPositionAsync({
    accuracy: ExpoLocation.Accuracy.Balanced,
  })
  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  }
}

export async function reverseGeocodeName(
  coords: Coords,
): Promise<string | null> {
  const results = await ExpoLocation.reverseGeocodeAsync(coords)
  const first = results[0]
  if (first === undefined) return null
  return first.city ?? first.region ?? first.country ?? null
}
