import { SearchParams } from "next/dist/server/request/search-params"
import { decodeSkillFilter, getFilterFromQuery, getPageFromQuery } from "@/lib/util/functions"
import { getSkills } from "@/lib/api/data/skill"
import SkillResults from "@/components/data/skill/SkillResults"
import { ISkill, SkillFilter } from "@hatsuboshi/types"
import { PATHS } from "@/lib/util/consts"
import { getUserSortOptions } from "@/lib/util/async"

export default async function SkillSearch({ searchParams }: { searchParams: SearchParams }) {
    // get from query
    const page = getPageFromQuery(searchParams)
    const filter  = getFilterFromQuery<SkillFilter>(searchParams, decodeSkillFilter)

    // get from cookies
    const sort = await getUserSortOptions<ISkill>(PATHS.skill)

    // retrieve
    const res = await getSkills({ page, filter, sort })
    if (!res.success) return null

    return <SkillResults data={res.data}/>
}
