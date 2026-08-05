import { DependencyList, useCallback, useRef } from "react"

export default function useThrottledCallback<T extends (...args: any[]) => void> (callback: T, deps: DependencyList, cooldown: number = 1000) {
    const mCallback = useCallback(callback, deps)

    const lastRunRef = useRef(0)
    const pendingArgsRef = useRef<Parameters<T>>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
    const throttledRef = useRef<(...args: Parameters<T>) => void>(null)

    const callbackRef = useRef(mCallback)
    callbackRef.current = mCallback

    if (!throttledRef.current) {
        throttledRef.current = (...args: Parameters<T>) => {
            const now = Date.now()
            const elapsed = now - lastRunRef.current
            if (elapsed >= cooldown) {
                lastRunRef.current = now
                callbackRef.current(...args)
            } else {
                pendingArgsRef.current = args
                if (!timerRef.current) {
                    timerRef.current = setTimeout(() => {
                        lastRunRef.current = Date.now()
                        timerRef.current = null
                        if (pendingArgsRef.current) {
                            callbackRef.current(...pendingArgsRef.current)
                            pendingArgsRef.current = null
                        }
                    }, cooldown - elapsed)
                }
            }
        }
    }

    return throttledRef.current
}