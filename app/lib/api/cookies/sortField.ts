"use server"

import { cookies } from "next/headers"
import { COOKIE_SORT_FIELD, RESOURCE_METADATA } from "@/lib/util/consts"

export async function getUserSortField(path: string): Promise<string> {
    return (
        await cookies()).get(`${COOKIE_SORT_FIELD}-${path}`)?.value ||
        RESOURCE_METADATA[`/${path}`].defaultSortOption.attribute
}

export async function setUserSortField(path: string, value: string): Promise<void> {
    (await cookies()).set(`${COOKIE_SORT_FIELD}-${path}`, value, { sameSite: "lax" })
}
