"use client"

import { IPItem, PItem } from "@hatsuboshi/types"
import SuspenseCard from "@/components/data/SuspenseCard"
import { DEFAULT_LOCALE, PATHS } from "@/lib/util/consts"
import Link from "next/link";

export default function PItemCard({ pItemJson }: { pItemJson?: IPItem }) {
    const pItem = pItemJson ? new PItem(pItemJson) : undefined

    return (pItem ?
        // hydrated
        <Link href={`/${PATHS.pItem}/${pItem.id}`} className={"card"}>
            <p>{pItem.name[DEFAULT_LOCALE]}</p>
            {pItem.currentEffect.plaintext.map((e, i) =>
                <p key={i} className={"sm font-normal text-secondary-dark"}>{e[DEFAULT_LOCALE]}</p>
            )}
        </Link>
        :
        // suspense
        <SuspenseCard/>
    )
}
