import { type ReactElement, useCallback, useState } from "react"
import {
  type LayoutChangeEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { scheduleOnRN } from "react-native-worklets"

import { spacing } from "#design/foundations"
import { haptics } from "#shared/haptics"

import { LONG_PRESS_MS, SHIFT_DURATION_MS } from "./constants"
import { type DraggableListProps } from "./types"

type DraggableRowProps = {
  index: number
  count: number
  gap: number
  activeIndex: SharedValue<number>
  translationY: SharedValue<number>
  stride: SharedValue<number>
  onMeasure?: (height: number) => void
  onDragStart: () => void
  onDrop: (from: number, to: number) => void
  children: ReactElement
}

function DraggableRow({
  index,
  count,
  gap,
  activeIndex,
  translationY,
  stride,
  onMeasure,
  onDragStart,
  onDrop,
  children,
}: DraggableRowProps): ReactElement {
  const style = useAnimatedStyle(() => {
    const active = activeIndex.value
    if (active === -1) {
      return { transform: [{ translateY: 0 }], zIndex: 0 }
    }
    if (index === active) {
      // The dragged row follows the finger and lifts above the rest.
      return { transform: [{ translateY: translationY.value }], zIndex: 20 }
    }

    const step = stride.value
    const hover =
      step > 0
        ? Math.max(
            0,
            Math.min(count - 1, active + Math.round(translationY.value / step)),
          )
        : active
    let shift = 0
    if (index > active && index <= hover) {
      shift = -step
    } else if (index < active && index >= hover) {
      shift = step
    }

    return {
      transform: [
        { translateY: withTiming(shift, { duration: SHIFT_DURATION_MS }) },
      ],
      zIndex: 0,
    }
  })

  const pan = Gesture.Pan()
    .activateAfterLongPress(LONG_PRESS_MS)
    .onStart(() => {
      activeIndex.value = index
      scheduleOnRN(onDragStart)
      scheduleOnRN(haptics.tap)
    })
    .onUpdate((event) => {
      translationY.value = event.translationY
    })
    .onEnd(() => {
      const step = stride.value
      const to =
        step > 0
          ? Math.max(
              0,
              Math.min(
                count - 1,
                index + Math.round(translationY.value / step),
              ),
            )
          : index
      scheduleOnRN(onDrop, index, to)
      activeIndex.value = -1
      translationY.value = 0
    })

  const handleLayout = (event: LayoutChangeEvent): void => {
    onMeasure?.(event.nativeEvent.layout.height)
  }

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[{ marginBottom: gap }, style]}
        onLayout={handleLayout}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

// Long-press a row to drag it; the dragged row follows the finger while the
// others slide to open a slot. Drops commit the new order via onReorder. Rows
// are assumed uniform height (measured from the first one) — fine for a short
// list of equal cards. Not virtualized, so keep lists small.
export default function DraggableList<T>({
  data,
  keyExtractor,
  renderItem,
  onReorder,
  gap = spacing.between,
  header,
  refreshing,
  onRefresh,
  contentStyle,
}: DraggableListProps<T>): ReactElement {
  const activeIndex = useSharedValue(-1)
  const translationY = useSharedValue(0)
  const stride = useSharedValue(0)
  const [dragging, setDragging] = useState(false)

  const handleDragStart = useCallback(() => {
    setDragging(true)
  }, [])

  const handleDrop = useCallback(
    (from: number, to: number) => {
      setDragging(false)
      if (from === to) {
        return
      }

      const keys = data.map(keyExtractor)
      const [moved] = keys.splice(from, 1)
      keys.splice(to, 0, moved)
      onReorder(keys)
    },
    [data, keyExtractor, onReorder],
  )

  const handleMeasure = useCallback(
    (height: number) => {
      stride.value = height + gap
    },
    [gap, stride],
  )

  return (
    <ScrollView
      contentContainerStyle={[styles.content, contentStyle]}
      refreshControl={
        onRefresh === undefined ? undefined : (
          <RefreshControl
            refreshing={refreshing ?? false}
            onRefresh={onRefresh}
          />
        )
      }
      scrollEnabled={!dragging}
      showsVerticalScrollIndicator={false}
    >
      {header !== undefined && (
        <Animated.View style={{ marginBottom: gap }}>{header}</Animated.View>
      )}

      {data.map((item, index) => (
        <DraggableRow
          key={keyExtractor(item)}
          activeIndex={activeIndex}
          count={data.length}
          gap={gap}
          index={index}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onMeasure={index === 0 ? handleMeasure : undefined}
          stride={stride}
          translationY={translationY}
        >
          {renderItem(item)}
        </DraggableRow>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.between,
  },
})
