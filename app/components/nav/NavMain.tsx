import React from "react"
import Link from "next/link"
import { PATHS } from "@/lib/util/consts"

export default function NavMain() {
    return (
        <div className={"text-secondary-dark font-normal flex flex-col"}>
            <p className={"md mb-4"}>Under Early Development</p>
            <Link href={'/'}>Home</Link>
            <Link href={`/${PATHS.skill}`}>Skill</Link>
            <Link href={`/${PATHS.pIdol}`}>PIdol</Link>
            <Link href={`/${PATHS.pItem}`}>PItem</Link>
            <Link href={`/${PATHS.pDrink}`}>PDrink</Link>
            <Link href={`/${PATHS.character}`}>Character</Link>
        </div>
    )
}