"use client"

import { IPDrink, PDrink } from "@hatsuboshi/types"
import SuspenseCard from "@/components/data/SuspenseCard"
import { DEFAULT_LOCALE } from "@/lib/util/consts"

export default function PDrinkCard({ pDrinkJson }: { pDrinkJson?: IPDrink }) {
    const pDrink = pDrinkJson ? new PDrink(pDrinkJson) : undefined
    const isSuspense = !pDrink

    return (!isSuspense ?
            // hydrated
            <div className={"card"}>
                <p>{pDrink.name[DEFAULT_LOCALE]}</p>
            </div>
            :
            // suspense
            <SuspenseCard/>
    )
}
