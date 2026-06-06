import { render } from "@testing-library/react-native"
import { type ReactNode } from "react"
import { Text, View } from "react-native"

import SwipeToDelete from "./SwipeToDelete"

// Gesture + animation libs are native-bound; stub them so the row renders.
jest.mock("react-native-gesture-handler", () => {
  const chain = {
    activeOffsetX: () => chain,
    failOffsetY: () => chain,
    onUpdate: () => chain,
    onEnd: () => chain,
  }
  return {
    Gesture: { Pan: () => chain },
    GestureDetector: ({ children }: { children?: ReactNode }) => children,
  }
})

jest.mock("react-native-reanimated", () => {
  const { View: RNView } = jest.requireActual("react-native")
  return {
    __esModule: true,
    default: { View: RNView },
    useSharedValue: (value: unknown) => ({ value }),
    useAnimatedStyle: () => ({}),
    withTiming: (value: unknown) => value,
  }
})

jest.mock("react-native-worklets", () => ({ scheduleOnRN: jest.fn() }))

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}))

jest.mock("#shared/settings", () => ({
  useThemedStyles: (factory: (colors: { negative: string }) => unknown) =>
    factory({ negative: "#dc2626" }),
}))

describe("Design > Patterns > SwipeToDelete", () => {
  it("renders its child row", () => {
    const { getByText } = render(
      <SwipeToDelete onDelete={jest.fn()}>
        <Text>Madrid</Text>
      </SwipeToDelete>,
    )

    expect(getByText("Madrid")).toBeTruthy()
  })

  it("renders children without the swipe affordance when disabled", () => {
    const { getByTestId } = render(
      <SwipeToDelete onDelete={jest.fn()} disabled>
        <View testID="child" />
      </SwipeToDelete>,
    )

    expect(getByTestId("child")).toBeTruthy()
  })
})
