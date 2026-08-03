"use client"

import { IPItem, PItem } from "@hatsuboshi/types"

export default function PItemCard({ pItemJson }: { pItemJson?: IPItem }) {
    const pItem = pItemJson ? new PItem(pItemJson) : undefined
    const isSuspense = !pItem

    return (!isSuspense ?
            // hydrated
            <></>
            :
            // suspense
            <></>
    )
}
