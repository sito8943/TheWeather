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

import Forecast from "./Forecast"

describe("Weather > Forecast", () => {
  it("works", () => {
    const { getByText } = render(
      <Forecast
        data={[
          {
            condition: "Clear",
            day: "2026-06-02",
            temperatureMax: 24,
            temperatureMin: 17,
          },
          {
            condition: "Cloudy",
            day: "2026-06-03",
            temperatureMax: 22,
            temperatureMin: 16,
          },
        ]}
      />,
    )

    getByText("7-day forecast")
    getByText("2026-06-02")
    getByText("24 °C")
    getByText("17 °C")
  })
})
