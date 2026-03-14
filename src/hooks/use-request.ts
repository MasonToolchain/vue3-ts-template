import { ref, shallowRef, watch } from 'vue'
import type { Ref, WatchSource } from 'vue'

type RequestFn<T, TArgs extends unknown[]> = (...args: TArgs) => Promise<T>

export interface UseRequestOptions<T> {
  // Whether to request automatically on component mount.
  auto?: boolean
  // Re-run request when deps change.
  deps?: WatchSource<unknown>[]
  // Initial data value.
  initialData?: T
  // Called before each request.
  onBefore?: () => void
  // Called when request succeeds.
  onSuccess?: (data: T) => void
  // Called when request fails.
  onError?: (error: Error) => void
  // Called after request completes.
  onFinally?: () => void
}

export interface UseRequestReturn<T, TArgs extends unknown[]> {
  data: Ref<T | undefined>
  loading: Ref<boolean>
  error: Ref<Error | null>
  run: (...args: TArgs) => Promise<T>
}

export function useRequest<T, TArgs extends unknown[] = []>(
  requestFn: RequestFn<T, TArgs>,
  options: UseRequestOptions<T> = {},
): UseRequestReturn<T, TArgs> {
  const { auto = true, deps = [], initialData, onBefore, onSuccess, onError, onFinally } = options

  const data = shallowRef<T | undefined>(initialData)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const executeRequest = async (...args: TArgs): Promise<T> => {
    try {
      onBefore?.()
      loading.value = true
      error.value = null

      const result = await requestFn(...args)
      data.value = result
      onSuccess?.(result)
      return result
    } catch (err) {
      const normalizedError = err instanceof Error ? err : new Error(String(err))
      error.value = normalizedError
      onError?.(normalizedError)
      throw normalizedError
    } finally {
      loading.value = false
      onFinally?.()
    }
  }

  const run = (...args: TArgs): Promise<T> => executeRequest(...args)

  if (auto) {
    void executeRequest(...([] as unknown as TArgs))
  }

  if (deps.length > 0) {
    watch(
      deps,
      () => {
        void executeRequest(...([] as unknown as TArgs))
      },
      { deep: true },
    )
  }

  return {
    data,
    loading,
    error,
    run,
  }
}
