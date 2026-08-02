import { getSkillById } from "@/lib/api/data/skill"
import SkillMain from "@/components/data/skill/SkillMain"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const res = await getSkillById(`skill-${(await params).id}`)
    if (!res.success) return null

    return <SkillMain skill={res.data}/>
}
