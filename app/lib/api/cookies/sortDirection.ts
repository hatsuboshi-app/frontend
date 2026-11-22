"use server"

import { cookies } from "next/headers"
import { COOKIE_SORT_DIRECTION, RESOURCE_METADATA } from "@/lib/util/consts"
import { SortDirection } from "@/lib/util/types";

export async function getUserSortDirection(path: string): Promise<SortDirection> {
    return (
        await cookies()).get(`${COOKIE_SORT_DIRECTION}-${path}`)?.value ||
        RESOURCE_METADATA[`/${path}`].defaultSortOption.ascending ? "asc" : "desc"
}

export async function setUserSortDirection(path: string, value: SortDirection): Promise<void> {
    (await cookies()).set(`${COOKIE_SORT_DIRECTION}-${path}`, value, { sameSite: "lax" })
}
