"use server"

import { cookies } from "next/headers"
import { COOKIE_SORT_DIRECTION, DEFAULT_SORT_DIRECTION, DEFAULT_SORT_DIRECTIONS } from "@/lib/util/consts"

export async function getUserSortDirection(path: string): Promise<string> {
    return (await cookies()).get(`${COOKIE_SORT_DIRECTION}-${path}`)?.value || DEFAULT_SORT_DIRECTIONS[path] || DEFAULT_SORT_DIRECTION
}

export async function setUserSortDirection(path: string, value: string): Promise<void> {
    (await cookies()).set(`${COOKIE_SORT_DIRECTION}-${path}`, value, { sameSite: "lax" })
}
