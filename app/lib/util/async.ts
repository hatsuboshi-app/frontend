import { fail, Result, SortOption, success } from "@hatsuboshi/types"
import { getUserSortField } from "@/lib/api/cookies/sortField"
import { getUserSortDirection } from "@/lib/api/cookies/sortDirection"
import { API_URI, API_VERSION, RESOURCE_METADATA } from "@/lib/util/consts"
import { prependSortOption } from "@/lib/util/functions"
import { ResourcePath } from "@/lib/util/types";

export async function getHeader(): Promise<Headers> {
    const headers: Headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Accept", "application/json")
    return headers
}

export async function getUserSortOptions<T>(path: ResourcePath): Promise<SortOption<T>[]> {
    const field = await getUserSortField(path)
    const direction = await getUserSortDirection(path)
    const s: SortOption<any> = { attribute: field, ascending: direction === "asc" }
    const s1 = RESOURCE_METADATA[path].hiddenSortOptions ?? []
    return prependSortOption(s, s1)
}

export async function GET(path: string, query?: object): Promise<Result<any>> {
    try {
        const base = API_URI.endsWith("/") ? API_URI : `${API_URI}/`
        const url = new URL(`${API_VERSION}/${path.replace(/^\//, "")}`, base)
        if (query) {
            const add = (k: string, v: unknown) => {
                url.searchParams.append(k, v instanceof Date ? v.toISOString() : String(v))
            }
            for (const [k, v] of Object.entries(query)) {
                if (Array.isArray(v)) {
                    v.forEach(i => i !== null && add(k, i))
                } else if (v !== null && v !== undefined) {
                    add(k, v)
                }
            }
        }
        const r = await fetch(url, {
            method: "GET",
            headers: await getHeader()
        })
        const body = await r.json().catch(() => undefined)
        if (!r.ok) {
            return fail(body?.message ?? `${r.status} ${r.statusText}`)
        }
        return success(body)
    } catch (e: any) {
        return fail(e?.cause?.message ?? e?.message ?? "Network Error")
    }
}
