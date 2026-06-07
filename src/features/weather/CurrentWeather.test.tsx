import { render } from "@testing-library/react-native"

import CurrentWeather from "./CurrentWeather"

jest.mock("#features/settings", () => ({
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

    expect(getByText("Barcelona")).toBeTruthy()
    expect(getByText("23 °C")).toBeTruthy()
    expect(getByText("12 km/h")).toBeTruthy()
  })
})
