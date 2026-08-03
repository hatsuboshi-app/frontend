import { SearchParams } from "next/dist/server/request/search-params"
import { getPFSFromSearchParams, skillFilterExpand } from "@/lib/util/functions"
import { getSkills } from "@/lib/api/data/skill"
import SkillResults from "@/components/data/skill/SkillResults"
import { ISkill, SkillFilterOptions } from "@hatsuboshi/types"

export default async function SkillSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, filter, sort] = getPFSFromSearchParams<SkillFilterOptions, ISkill>(searchParams, skillFilterExpand)
    const res = await getSkills({ p, filter, sort })
    if (!res.success) return null

    return <SkillResults data={res.data}/>
}
