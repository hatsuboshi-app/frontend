"use client"

import { IPIdol, PIdol } from "@hatsuboshi/types"

export default function PIdolIcon({ pIdolJson }: { pIdolJson?: IPIdol }) {
    const pIdol = pIdolJson ? new PIdol(pIdolJson) : undefined
    const isSuspense = !pIdol

    return (!isSuspense ?
            // hydrated
            <></>
            :
            // suspense
            <></>
    )
}
