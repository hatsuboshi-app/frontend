"use client"

import { IPDrink, PDrink } from "@hatsuboshi/types"
import SuspenseCard from "@/components/data/SuspenseCard"
import { DEFAULT_LOCALE, PATHS } from "@/lib/util/consts"
import Link from "next/link";

export default function PDrinkCard({ pDrinkJson }: { pDrinkJson?: IPDrink }) {
    const pDrink = pDrinkJson ? new PDrink(pDrinkJson) : undefined

    return (pDrink ?
        // hydrated
        <Link href={`/${PATHS.pDrink}/${pDrink.id}`} className={"card"}>
            <p>{pDrink.name[DEFAULT_LOCALE]}</p>
        </Link>
        :
        // suspense
        <SuspenseCard/>
    )
}
