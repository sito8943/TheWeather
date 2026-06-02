import { render } from "@testing-library/react-native"

import SavedLocationCard from "./SavedLocationCard"

jest.mock("#shared/weather", () => {
  const { Text } = jest.requireActual("react-native")
  const { createElement } = jest.requireActual("react")

  return {
    __esModule: true,
    CurrentWeather: ({ location }: { location: { name: string } }) =>
      createElement(Text, null, location.name),
    useOpenMeteoForecast: () => ({
      data: {
        current: {
          condition: "Clear",
          humidity: 58,
          isDay: true,
          temperature: 23,
          uv: 4,
          wind: 12,
        },
      },
    }),
  }
})

describe("Locations > SavedLocationCard", () => {
  it("works", () => {
    const { getByText } = render(
      <SavedLocationCard
        location={{
          color: "#0f6cbd",
          id: "barcelona",
          latitude: 41.3851,
          longitude: 2.1734,
          name: "Barcelona",
        }}
        onPress={() => undefined}
      />,
    )

    getByText("Barcelona")
  })
})
