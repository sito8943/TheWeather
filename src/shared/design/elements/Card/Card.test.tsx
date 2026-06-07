import { render } from "@testing-library/react-native"
import { Text } from "react-native"

import Card from "./Card"

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

describe("Design > Elements > Card", () => {
  it("works", () => {
    const { getByText } = render(
      <Card>
        <Text>Hello</Text>
      </Card>,
    )

    expect(getByText("Hello")).toBeTruthy()
  })
})
