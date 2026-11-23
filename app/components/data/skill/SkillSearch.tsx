import { SearchParams } from "next/dist/server/request/search-params"
import { decodeSkillFilter, getFilterFromQuery, getPageFromQuery } from "@/lib/util/functions"
import { listSkills } from "@/lib/api/data/skill"
import SkillResults from "@/components/data/skill/SkillResults"
import { SkillFilter } from "@hatsuboshi/types"

export default async function SkillSearch({ searchParams }: { searchParams: SearchParams }) {
    const page = getPageFromQuery(searchParams)
    const filter  = getFilterFromQuery<SkillFilter>(searchParams, decodeSkillFilter)

    const res = await listSkills({ page, filter })
    if (!res.success) return null

    return <SkillResults data={res.data}/>
}
