import { type Metadata } from "next"
import { getSkillById } from "@/lib/api/data/skill"
import { notFound } from "next/navigation"
import SkillMain from "@/components/data/skill/SkillMain"

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const res = await getSkillById((await params).id)
    if (!res.success) return { title: "Not Found" }
    else return { title: res.data.name.en || res.data.name.ja }
}

export default async function Page({ params }: Props) {
    const res = await getSkillById((await params).id)
    if (!res.success) notFound()
    return <SkillMain skillJson={res.data.toJSON()}/>
}
