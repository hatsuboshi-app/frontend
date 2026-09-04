"use server"

import { cookies } from "next/headers"
import { COOKIE_PER_PAGE, DEFAULT_PER_PAGE } from "@/lib/util/consts"

export async function getUserPerPage(): Promise<number> {
    return Number((await cookies()).get(COOKIE_PER_PAGE)?.value || DEFAULT_PER_PAGE)
}

export async function setUserPerPage(pp: number): Promise<void> {
    (await cookies()).set(COOKIE_PER_PAGE, String(pp), { sameSite: "lax" })
}
