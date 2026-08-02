import Link from "next/link"
import { Skill } from "@hatsuboshi/types"
import SuspenseCard from "@/components/data/SuspenseCard"

export default async function SkillCard ({ skill }: { skill?: Skill }) {
    const isSuspense = !skill
    const loc = "ja"

    return !isSuspense ?
        // hydrated
        <Link href={`/skill/${skill.id.replace("skill-", "")}`} className={`card sm`}>
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
}