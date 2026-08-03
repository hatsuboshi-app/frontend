"use client"

import { ISkill, Skill } from "@hatsuboshi/types"
import { DEFAULT_LOCALE } from "@/lib/util/consts"

export default function SkillMain({ skillJson }: { skillJson?: ISkill }) {
    const skill = skillJson ? new Skill(skillJson) : undefined
    const isSuspense = !skill

    return (!isSuspense ?
            // hydrated
            <div className={"w-full flex flex-row gap-x-lg-laptop-gap"}>
                <div className={"w-24 h-24 bg-background-inset-dark"}/>
                <div className={"flex flex-grow flex-col gap-y-sm-laptop-gap"}>
                    <h1 className={"xl"}>{skill.name[DEFAULT_LOCALE]}</h1>
                    <div>
                        {skill.currentEffect.plaintext.map((a, i) => {
                            return (<p key={i}>{a[DEFAULT_LOCALE]}</p>)
                        })}
                    </div>
                </div>
            </div>
            :
            // suspense
            <p>Loading...</p>
    )
}