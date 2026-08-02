import { useCallback, useEffect, useRef, useState } from "react"

export default function useDebouncer<T>(value: T, delay: number = 350) {
    const [debounced, setDebounced] = useState(value)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        timerRef.current = setTimeout(() => setDebounced(value), delay)
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [value, delay])

    const setDebouncedInstantly = useCallback((v: T) => {
        if (timerRef.current) clearTimeout(timerRef.current)
        setDebounced(v)
    }, [])

    return [debounced, setDebouncedInstantly] as const
}