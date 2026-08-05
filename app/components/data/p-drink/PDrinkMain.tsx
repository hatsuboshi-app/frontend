"use client"

import { IPDrink, PDrink } from "@hatsuboshi/types"

export default function PDrinkMain({ pDrinkJson }: { pDrinkJson?: IPDrink }) {
    const pDrink = pDrinkJson ? new PDrink(pDrinkJson) : undefined
    const isSuspense = !pDrink

    return (!isSuspense ?
            // hydrated
            <></>
            :
            // suspense
            <></>
    )
}
