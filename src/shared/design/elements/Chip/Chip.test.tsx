import { render, userEvent } from "@testing-library/react-native"

import Chip from "./Chip"

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

describe("Design > Elements > Chip", () => {
  it("works", () => {
    const { getByText } = render(
      <Chip active={false} label="Hourly" onPress={() => undefined} />,
    )

    expect(getByText("Hourly")).toBeTruthy()
  })

  it("calls onPress when selected", async () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <Chip active={true} label="Weekly" onPress={onPress} />,
    )

    await userEvent.press(getByText("Weekly"))

    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
