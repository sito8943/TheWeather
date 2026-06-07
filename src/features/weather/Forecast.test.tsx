import { render } from "@testing-library/react-native"

import Forecast from "./Forecast"

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

    expect(getByText("7-day forecast")).toBeTruthy()
    expect(getByText("2026-06-02")).toBeTruthy()
    expect(getByText("24 °C")).toBeTruthy()
    expect(getByText("17 °C")).toBeTruthy()
  })
})
