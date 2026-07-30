"use server"

import { cookies } from "next/headers"
import { PER_PAGE } from "@/lib/consts"

const cookieName = "per-page"

export async function getUserPerPage(): Promise<number> {
    return Number((await cookies()).get(cookieName)?.value || PER_PAGE)
}

export async function setUserPerPage(pp: number): Promise<void> {
    (await cookies()).set(cookieName, String(pp), { sameSite: "lax" })
}