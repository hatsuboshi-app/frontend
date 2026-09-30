import { SearchParams } from "next/dist/server/request/search-params"
import { getPageAndFilterFromSearchParams, getSortOption, skillFilterExpand } from "@/lib/util/functions"
import { getSkills } from "@/lib/api/data/skill"
import SkillResults from "@/components/data/skill/SkillResults"
import { ISkill, SkillFilterOptions } from "@hatsuboshi/types"
import { PATHS } from "@/lib/util/consts"

export default async function SkillSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, filter] = getPageAndFilterFromSearchParams<SkillFilterOptions>(searchParams, skillFilterExpand)
    const sort = await getSortOption<ISkill>(`/${PATHS.skill}`)
    const res = await getSkills({ p, filter, sort })
    if (!res.success) return null

    return <SkillResults data={res.data}/>
}
