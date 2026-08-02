import { Skill } from "@hatsuboshi/types"

export default async function SkillMain({ skill }: { skill: Skill }) {
    const loc = "ja"

    return (
        <div className={"w-full flex flex-row gap-x-lg-laptop-gap"}>
            <div className={"w-24 h-24 bg-background-inset-dark"}/>
            <div className={"flex flex-grow flex-col gap-y-sm-laptop-gap"}>
                <h1 className={"xl"}>{skill.name[loc]}</h1>
                <div>
                    {skill.currentEffect.plaintext.map((a, i) => {
                        return (<p key={i}>{a[loc]}</p>)
                    })}
                </div>
            </div>
        </div>
    )
}