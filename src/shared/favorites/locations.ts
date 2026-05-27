import { type FavoriteLocation } from "./types"

export const favoriteLocations: FavoriteLocation[] = [
  {
    color: "#c2410c",
    id: "barcelona",
    latitude: 41.385063,
    longitude: 2.173404,
    name: "Barcelona",
  },
  {
    color: "#1d4ed8",
    id: "madrid",
    latitude: 40.416775,
    longitude: -3.70379,
    name: "Madrid",
  },
  {
    color: "#0f766e",
    id: "valencia",
    latitude: 39.46975,
    longitude: -0.37739,
    name: "Valencia",
  },
]

export function findFavoriteLocationById(
  id: string,
): FavoriteLocation | undefined {
  return favoriteLocations.find((favoriteLocation) => favoriteLocation.id === id)
}
