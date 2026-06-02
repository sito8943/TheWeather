import { render } from "@testing-library/react-native"

import TextInput from "./TextInput"

jest.mock("#shared/settings", () => ({
  useThemeColors: () => ({
    body: "#111827",
    border: "#d1d5db",
    brand: "#0f6cbd",
    muted: "#6b7280",
    negative: "#dc2626",
    surface: "#ffffff",
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

describe("Design > Elements > TextInput", () => {
  it("works", () => {
    const { getByDisplayValue } = render(
      <TextInput onChangeText={() => undefined} value="Barcelona" />,
    )

    expect(getByDisplayValue("Barcelona")).toBeTruthy()
  })
})
