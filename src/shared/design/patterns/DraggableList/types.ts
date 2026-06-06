import { type ReactElement } from "react"
import { type StyleProp, type ViewStyle } from "react-native"

export type DraggableListProps<T> = {
  data: T[]
  keyExtractor: (item: T) => string
  renderItem: (item: T) => ReactElement
  // Called on drop with the full key order after the move.
  onReorder: (orderedKeys: string[]) => void
  // Vertical space between rows; also feeds the drag stride.
  gap?: number
  header?: ReactElement
  refreshing?: boolean
  onRefresh?: () => void
  contentStyle?: StyleProp<ViewStyle>
}
