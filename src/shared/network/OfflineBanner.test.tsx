import { render } from "@testing-library/react-native"

import OfflineBanner from "./OfflineBanner"
import useIsOnline from "./useIsOnline"

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
}))

jest.mock("#shared/settings", () => ({
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

jest.mock("./useIsOnline", () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockedUseIsOnline = jest.mocked(useIsOnline)

describe("Network > OfflineBanner", () => {
  it("works when offline", () => {
    mockedUseIsOnline.mockReturnValue(false)

    const { getByText } = render(<OfflineBanner />)

    expect(getByText("No internet connection")).toBeTruthy()
  })
})
