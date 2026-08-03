import { ReactSetter } from "@/lib/util/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FILTER_DEBOUNCE_TIME, SEARCH_PARAM_FILTER, URL_REPLACE_THROTTLE_TIME } from "@/lib/util/consts"
import { useEffect, useState } from "react"
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string"
import useDebouncer from "@/lib/hooks/useDebouncer"
import useThrottledCallback from "@/lib/hooks/useThrottledCallback"

type UseFilterProps<T extends object> = {
    expand: (raw: string) => T | undefined,
    minimize: (filter: T) => string | undefined
}

export default function useFilter<T extends object>({ expand, minimize }: UseFilterProps<T>): [T, ReactSetter<T>] {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const f = searchParams.get(SEARCH_PARAM_FILTER)
    const [filter, setFilter] = useState<T>(f
        ? expand(decompressFromEncodedURIComponent(f)) ?? ({} as T)
        : ({} as T)
    )
    const [debouncedFilter] = useDebouncer(filter, FILTER_DEBOUNCE_TIME)

    const throttledReplaceUrl = useThrottledCallback((params: URLSearchParams) => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, [pathname, router], URL_REPLACE_THROTTLE_TIME)

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (Object.keys(debouncedFilter).length === 0) params.delete(SEARCH_PARAM_FILTER)
        else params.set(SEARCH_PARAM_FILTER, compressToEncodedURIComponent(minimize(debouncedFilter) ?? ""))
        if (params.toString() !== searchParams.toString()) throttledReplaceUrl(params)
    }, [debouncedFilter])

    return [filter, setFilter]
}