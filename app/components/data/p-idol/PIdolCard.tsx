"use client"

import { IPIdol, PIdol } from "@hatsuboshi/types"
import Link from "next/link"
import { PATHS } from "@/lib/util/consts"
import SuspenseCard from "@/components/data/SuspenseCard"

export default function PIdolCard({ pIdolJson }: { pIdolJson?: IPIdol }) {
    const pIdol = pIdolJson ? new PIdol(pIdolJson) : undefined
    const isSuspense = !pIdol
    const loc = "ja"

    return (!isSuspense ?
            // hydrated
            <Link href={`/${PATHS.pIdol}/${pIdol.id.replace("idol-", "")}`} className={`card sm`}>
                <p className={"font-normal"} style={{ color: "#" + pIdol.character.color.text }}>
                    {pIdol.character.lastName[loc]}{pIdol.character.firstName[loc]}
                </p>
                <p className={"md"}>{pIdol.name[loc]}</p>
                <p className={"font-normal text-secondary-dark"}>
                    <span className={"uppercase"}>{pIdol.rarity}</span>&nbsp;&#183;&nbsp;
                    <span className={"capitalize"}>{pIdol.plan}</span>
                </p>
                <div className={"flex flex-col mt-2 font-normal"}>
                    <div>
                        {pIdol.signatureSkill.map(s => <p key={s.id}>{s.name[loc]}</p>)}
                    </div>
                    <div>
                        <p>{pIdol.signaturePItem.name[loc]}</p>
                    </div>
                </div>
            </Link>
            :
            // suspense
            <SuspenseCard/>
    )
}
