import { fireEvent, render, userEvent } from "@testing-library/react-native"

import ColorPickerModal from "./ColorPickerModal"

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

describe("Locations > ColorPickerModal", () => {
  it("renders when visible", () => {
    const { getByText, getByDisplayValue } = render(
      <ColorPickerModal
        locationName="Barcelona"
        onCancel={() => undefined}
        onConfirm={() => undefined}
        visible
      />,
    )

    expect(getByText("Pick a color")).toBeTruthy()
    expect(getByDisplayValue("#0f6cbd")).toBeTruthy()
  })

  it("validates input and confirms the normalized color", async () => {
    const onConfirm = jest.fn()
    const { getByDisplayValue, getByText, queryByText } = render(
      <ColorPickerModal
        initialColor="#1d4ed8"
        locationName="Barcelona"
        onCancel={() => undefined}
        onConfirm={onConfirm}
        visible
      />,
    )

    const input = getByDisplayValue("#1d4ed8")

    fireEvent.changeText(input, "not-a-color")
    expect(getByText("Enter a valid hex color (e.g. #0f6cbd).")).toBeTruthy()

    fireEvent.changeText(input, "  #123abc  ")
    expect(queryByText("Enter a valid hex color (e.g. #0f6cbd).")).toBeNull()

    await userEvent.press(getByText("Save"))

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onConfirm).toHaveBeenCalledWith("#123abc")
  })
})
