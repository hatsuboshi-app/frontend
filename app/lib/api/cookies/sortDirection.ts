"use server"

import { cookies } from "next/headers"
import { COOKIE_SORT_DIRECTION, RESOURCE_METADATA } from "@/lib/util/consts"
import { ResourcePath, SortDirection } from "@/lib/util/types"

export async function getUserSortDirection(path: ResourcePath): Promise<SortDirection> {
    const saved = (await cookies()).get(`${COOKIE_SORT_DIRECTION}-${path}`)?.value
    if (saved === "asc" || saved === "desc") return saved
    const resource = RESOURCE_METADATA[path]
    return resource.defaultSortOption.ascending ? "asc" : "desc"
}

export async function setUserSortDirection(path: ResourcePath, value: SortDirection): Promise<void> {
    (await cookies()).set(`${COOKIE_SORT_DIRECTION}-${path}`, value, { sameSite: "lax" })
}
