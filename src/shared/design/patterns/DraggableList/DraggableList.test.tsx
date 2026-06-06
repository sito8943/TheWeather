import { render } from "@testing-library/react-native"
import { type ReactNode } from "react"
import { Text } from "react-native"

import DraggableList from "./DraggableList"

jest.mock("react-native-gesture-handler", () => {
  const chain = {
    activateAfterLongPress: () => chain,
    onStart: () => chain,
    onUpdate: () => chain,
    onEnd: () => chain,
  }
  return {
    Gesture: { Pan: () => chain },
    GestureDetector: ({ children }: { children?: ReactNode }) => children,
  }
})

jest.mock("react-native-reanimated", () => {
  const { View } = jest.requireActual("react-native")
  return {
    __esModule: true,
    default: { View },
    useSharedValue: (value: unknown) => ({ value }),
    useAnimatedStyle: () => ({}),
    withTiming: (value: unknown) => value,
  }
})

jest.mock("react-native-worklets", () => ({ scheduleOnRN: jest.fn() }))

jest.mock("#shared/haptics", () => ({ haptics: { tap: jest.fn() } }))

type Row = { id: string; label: string }

const DATA: Row[] = [
  { id: "a", label: "Madrid" },
  { id: "b", label: "Lisbon" },
  { id: "c", label: "Paris" },
]

describe("Design > Patterns > DraggableList", () => {
  it("renders the header and a row per item", () => {
    const { getByText } = render(
      <DraggableList
        data={DATA}
        header={<Text>Your locations</Text>}
        keyExtractor={(item) => item.id}
        onReorder={jest.fn()}
        renderItem={(item) => <Text>{item.label}</Text>}
      />,
    )

    expect(getByText("Your locations")).toBeTruthy()
    expect(getByText("Madrid")).toBeTruthy()
    expect(getByText("Lisbon")).toBeTruthy()
    expect(getByText("Paris")).toBeTruthy()
  })
})
