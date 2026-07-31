import Link from "next/link"
import { ISkill, Skill } from "@hatsuboshi/types"
import SkillUpgradeState from "@hatsuboshi/types/dist/type/SkillUpgradeState"

export default function SkillIcon ({ skill, upgradeState }: { skill: ISkill, upgradeState?: SkillUpgradeState }) {
    const s = new Skill(skill, upgradeState)
    return (
        <div className={`
            leading-relaxed border border-border-dark flex flex-col sm rounded-lg
            py-xs-mobile-gap px-sm-mobile-gap
            tablet:py-xs-tablet-gap tablet:px-sm-tablet-gap
            laptop:py-xs-laptop-gap laptop:px-sm-laptop-gap
        `}>
            <Link href={`/skill/${s.id.replace("skill-", "")}`}>
                <div className={"md"}>
                    <span>{s.name.ja}</span>
                    <span className={"ml-3 text-accent font-medium"}>{s.consolidatedRarity.toUpperCase()}</span>
                </div>
                <div>
                    {s.currentEffect.plaintext.map((t, i) =>
                        <p key={i} className={"text-secondary-dark font-medium"}>{t.ja}</p>
                    )}
                </div>
                {s.unlockLevel > 0 && <p className={"text-secondary-dark"}>PLv. {s.unlockLevel}</p>}
            </Link>
        </div>
    )
}