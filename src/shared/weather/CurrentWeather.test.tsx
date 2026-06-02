import { render } from "@testing-library/react-native"

jest.mock("#shared/settings", () => ({
  TEMPERATURE_UNIT: {
    CELSIUS: "celsius",
    FAHRENHEIT: "fahrenheit",
  },
  WIND_UNIT: {
    KMH: "kmh",
    MPH: "mph",
  },
  useSettings: () => ({
    units: {
      temperature: "celsius",
      wind: "kmh",
    },
  }),
  useThemedStyles: (factory: (colors: Record<string, string>) => unknown) =>
    factory({
      body: "#111827",
      border: "#d1d5db",
      brand: "#0f6cbd",
      muted: "#6b7280",
      negative: "#dc2626",
      surface: "#ffffff",
    }),
}))

import CurrentWeather from "./CurrentWeather"

describe("Weather > CurrentWeather", () => {
  it("works", () => {
    const { getByText } = render(
      <CurrentWeather
        data={{
          condition: "Clear",
          humidity: 58,
          isDay: true,
          temperature: 23,
          uv: 4,
          wind: 12,
        }}
        location={{
          latitude: 41.3851,
          longitude: 2.1734,
          name: "Barcelona",
        }}
      />,
    )

    getByText("Barcelona")
    getByText("23 °C")
    getByText("12 km/h")
  })
})
