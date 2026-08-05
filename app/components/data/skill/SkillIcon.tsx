"use client"

import { ISkill, Skill } from "@hatsuboshi/types"

export default function SkillIcon({ skillJson }: { skillJson?: ISkill }) {
    const skill = skillJson ? new Skill(skillJson) : undefined
    const isSuspense = !skill

    return (!isSuspense ?
            // hydrated
            <></>
            :
            // suspense
            <></>
    )
}
