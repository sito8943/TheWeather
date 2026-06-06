import { type ReactElement } from "react"
import { type LayoutChangeEvent, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { scheduleOnRN } from "react-native-worklets"

import Icon from "#design/elements/Icon"
import { shapes, spacing, type ThemeColors } from "#design/foundations"
import { haptics } from "#shared/haptics"
import { useThemedStyles } from "#shared/settings"

import { HORIZONTAL_SLOP, TRIGGER_RATIO } from "./constants"
import { type SwipeToDeleteProps } from "./types"

// Swipe a row right to reveal a delete backdrop that grows to fill the gap, then
// commit past TRIGGER_RATIO of the width. onDelete fires on commit (callers
// confirm before removing); the row snaps back.
export default function SwipeToDelete({
  children,
  onDelete,
  disabled = false,
}: SwipeToDeleteProps): ReactElement {
  const styles = useThemedStyles(createStyles)
  const translateX = useSharedValue(0)
  const rowWidth = useSharedValue(0)
  // Buzz once per threshold crossing, not every frame.
  const armed = useSharedValue(false)

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  const backgroundStyle = useAnimatedStyle(() => ({
    width: translateX.value,
  }))

  // Bail out after all hooks have run.
  if (disabled) {
    return <>{children}</>
  }

  const onLayout = (event: LayoutChangeEvent): void => {
    rowWidth.value = event.nativeEvent.layout.width
  }

  const pan = Gesture.Pan()
    .activeOffsetX([-HORIZONTAL_SLOP, HORIZONTAL_SLOP])
    .failOffsetY([-HORIZONTAL_SLOP, HORIZONTAL_SLOP])
    .onUpdate((event) => {
      const width = rowWidth.value
      // Right swipes only, clamped to the row width.
      translateX.value = Math.max(0, Math.min(event.translationX, width))
      const passed = width > 0 && translateX.value >= width * TRIGGER_RATIO
      if (passed && !armed.value) {
        armed.value = true
        scheduleOnRN(haptics.tap)
      } else if (!passed && armed.value) {
        armed.value = false
      }
    })
    .onEnd(() => {
      if (
        rowWidth.value > 0 &&
        translateX.value >= rowWidth.value * TRIGGER_RATIO
      ) {
        scheduleOnRN(onDelete)
      }
      armed.value = false
      translateX.value = withTiming(0)
    })

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Animated.View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.action, backgroundStyle]}
      >
        <Icon icon="trash" color="#ffffff" />
      </Animated.View>

      <GestureDetector gesture={pan}>
        <Animated.View style={rowStyle}>{children}</Animated.View>
      </GestureDetector>
    </View>
  )
}

const createStyles = (colors: ThemeColors) => ({
  container: {
    justifyContent: "center" as const,
    overflow: "hidden" as const,
    borderRadius: shapes.borderRadius,
  },
  action: {
    position: "absolute" as const,
    left: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "flex-start" as const,
    overflow: "hidden" as const,
    paddingLeft: spacing.inside,
    backgroundColor: colors.negative,
  },
})
