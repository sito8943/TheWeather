import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState, type Dispatch, type SetStateAction } from "react"

export type UseStoredStateOptions<T> = {
  errorMessage: string
  initialValue: T
  parseStoredValue: (value: unknown) => T
  storageKey: string
}

export type UseStoredStateResult<T> = {
  data: T
  error: Error | null
  isLoading: boolean
  setData: Dispatch<SetStateAction<T>>
}

const toError = (error: unknown, fallbackMessage: string): Error =>
  error instanceof Error ? error : new Error(fallbackMessage)

export function useStoredState<T>({
  errorMessage,
  initialValue,
  parseStoredValue,
  storageKey,
}: UseStoredStateOptions<T>): UseStoredStateResult<T> {
  const [data, setData] = useState<T>(initialValue)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    void (async () => {
      try {
        const cachedValue = await AsyncStorage.getItem(storageKey)

        if (!isMounted || !cachedValue) {
          return
        }

        setData(parseStoredValue(JSON.parse(cachedValue)))
      } catch (error) {
        if (isMounted) {
          setError(toError(error, errorMessage))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [errorMessage, parseStoredValue, storageKey])

  useEffect(() => {
    if (isLoading) {
      return
    }

    void AsyncStorage.setItem(storageKey, JSON.stringify(data)).catch(
      (error: unknown) => {
        setError(toError(error, errorMessage))
      },
    )
  }, [data, errorMessage, isLoading, storageKey])

  return {
    data,
    error,
    isLoading,
    setData,
  }
}
