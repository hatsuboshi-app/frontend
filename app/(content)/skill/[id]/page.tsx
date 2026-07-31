import { getSkillById } from "@/lib/api/data/skill"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const prefix = "skill"
    const { id } = await params
    const r = await getSkillById(`${prefix}-${id}`)
    if (!r.success) notFound()

    const s = r.data
    const loc = "ja"

    return (
        <div className={"w-full flex flex-row gap-x-lg-laptop-gap"}>
            <div className={"w-24 h-24 bg-white"}>

            </div>
            <div className={"flex flex-grow flex-col gap-y-sm-laptop-gap"}>
                <h1 className={"xl leading-none"}>{s.name[loc]}</h1>
                <hr className={"w-full border-border-dark border-t opacity-100"}/>
                <div className={"md"}>
                    {s.currentEffect.plaintext.map((a, i) => {
                        return (<p key={i}>{a[loc]}</p>)
                    })}
                </div>
            </div>
        </div>
    )
}
