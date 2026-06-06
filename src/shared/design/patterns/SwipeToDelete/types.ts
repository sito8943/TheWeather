import { type ReactNode } from "react"

export type SwipeToDeleteProps = {
  children: ReactNode
  // Fired on swipe-commit; callers confirm before removing, not delete outright.
  onDelete: () => void
  disabled?: boolean
}
