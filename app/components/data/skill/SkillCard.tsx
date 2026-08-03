"use client"

import Link from "next/link"
import { ISkill, Skill } from "@hatsuboshi/types"
import SuspenseCard from "@/components/data/SuspenseCard"
import { PATHS } from "@/lib/data/consts";

export default function SkillCard ({ skillJson }: { skillJson?: ISkill }) {
    const skill = skillJson ? new Skill(skillJson) : undefined
    const isSuspense = !skill
    const loc = "ja"

    return (!isSuspense ?
        // hydrated
        <Link href={`/${PATHS.skill}/${skill.id.replace("skill-", "")}`} className={`card sm`}>
            <div className={"md"}>
                <span>{skill.name[loc]}</span>
                <span className={"ml-3 text-accent font-medium"}>{skill.consolidatedRarity.toUpperCase()}</span>
            </div>
            <div>
                {skill.currentEffect.plaintext.map((t, i) =>
                    <p key={i} className={"text-secondary-dark font-medium leading-snug"}>{t[loc]}</p>
                )}
            </div>
            {skill.unlockLevel > 0 && <p className={"text-secondary-dark"}>PLv. {skill.unlockLevel}</p>}
        </Link>
        :
        // suspense
        <SuspenseCard/>
    )
}
