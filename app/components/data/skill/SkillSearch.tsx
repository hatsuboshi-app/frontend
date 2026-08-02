import { SearchParams } from "next/dist/server/request/search-params"
import { SEARCH_PARAM_FILTER, SEARCH_PARAM_PAGE, SEARCH_PARAM_SORT } from "@/lib/data/consts"
import { skillFilterExpand } from "@/lib/util/functions"
import { decompressFromEncodedURIComponent } from "lz-string"
import { getSkills } from "@/lib/api/data/skill"
import SkillResults from "@/components/data/skill/SkillResults"

export default async function SkillSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, f, s] = [searchParams[SEARCH_PARAM_PAGE], searchParams[SEARCH_PARAM_FILTER], searchParams[SEARCH_PARAM_SORT]]

    const filter = typeof f === "string" ? skillFilterExpand(decompressFromEncodedURIComponent(f)) ?? {} : {}

    const res = await getSkills({ filter })
    if (!res.success) return null

    return <SkillResults data={res.data}/>
}