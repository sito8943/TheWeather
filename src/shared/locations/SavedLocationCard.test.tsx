import { render } from "@testing-library/react-native"

import SavedLocationCard from "./SavedLocationCard"

jest.mock("#shared/weather", () => {
  return {
    __esModule: true,
    CurrentWeather: jest.fn(() => null),
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
    expect(() =>
      render(
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
      ),
    ).not.toThrow()
  })
})
