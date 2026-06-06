import * as Haptics from "expo-haptics"
import { Platform } from "react-native"

import { haptics } from "./haptics"

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: "light" },
  NotificationFeedbackType: { Success: "success" },
}))

describe("Haptics", () => {
  afterEach(() => {
    jest.clearAllMocks()
    Platform.OS = "ios"
  })

  it("maps each intent to its expo-haptics call", () => {
    haptics.tap()
    expect(Haptics.impactAsync).toHaveBeenCalledWith(
      Haptics.ImpactFeedbackStyle.Light,
    )

    haptics.success()
    expect(Haptics.notificationAsync).toHaveBeenCalledWith(
      Haptics.NotificationFeedbackType.Success,
    )
  })

  it("skips haptics on web", () => {
    Platform.OS = "web"

    haptics.tap()
    haptics.success()

    expect(Haptics.impactAsync).not.toHaveBeenCalled()
    expect(Haptics.notificationAsync).not.toHaveBeenCalled()
  })

  it("never throws when the effect rejects", () => {
    ;(Haptics.impactAsync as jest.Mock).mockRejectedValueOnce(new Error("off"))

    expect(() => haptics.tap()).not.toThrow()
  })
})
