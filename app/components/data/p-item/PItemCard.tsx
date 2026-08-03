"use client"

import { IPItem, PItem } from "@hatsuboshi/types"
import SuspenseCard from "@/components/data/SuspenseCard"
import { DEFAULT_LOCALE } from "@/lib/util/consts"

export default function PItemCard({ pItemJson }: { pItemJson?: IPItem }) {
    const pItem = pItemJson ? new PItem(pItemJson) : undefined
    const isSuspense = !pItem

    return (!isSuspense ?
            // hydrated
            <div className={"card"}>
                <p>{pItem.name[DEFAULT_LOCALE]}</p>
                {pItem.currentEffect.plaintext.map((e, i) =>
                    <p key={i} className={"sm font-normal text-secondary-dark"}>{e[DEFAULT_LOCALE]}</p>
                )}
            </div>
            :
            // suspense
            <SuspenseCard/>
    )
}
