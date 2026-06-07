import { render } from "@testing-library/react-native"

import Typography from "./Typography"

jest.mock("#features/settings", () => ({
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

describe("Design > Elements > Typography", () => {
  it("renders with the large styles", () => {
    const { getByText } = render(<Typography variant="large">Today</Typography>)

    expect(getByText("Today")).toHaveStyle({ fontSize: 20 })
  })
})
