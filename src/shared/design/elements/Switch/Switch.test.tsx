import { render } from "@testing-library/react-native"

jest.mock("#shared/settings", () => ({
  useThemeColors: () => ({
    body: "#111827",
    border: "#d1d5db",
    brand: "#0f6cbd",
    muted: "#6b7280",
    negative: "#dc2626",
    surface: "#ffffff",
  }),
}))

import Switch from "./Switch"

describe("Design > Elements > Switch", () => {
  it("renders", () => {
    const { getByRole } = render(
      <Switch onValueChange={() => undefined} value={true} />,
    )

    getByRole("switch")
  })
})
