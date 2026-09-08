"use server"

import { cookies } from "next/headers"
import { COOKIE_SORT_FIELD, DEFAULT_SORT_FIELD, DEFAULT_SORT_FIELDS } from "@/lib/util/consts"

export async function getUserSortField(path: string): Promise<string> {
    return (await cookies()).get(`${COOKIE_SORT_FIELD}-${path}`)?.value || DEFAULT_SORT_FIELDS[path] || DEFAULT_SORT_FIELD
}

export async function setUserSortField(path: string, value: string): Promise<void> {
    (await cookies()).set(`${COOKIE_SORT_FIELD}-${path}`, value, { sameSite: "lax" })
}
