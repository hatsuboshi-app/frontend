import SkillResults from "@/components/data/skill/SkillResults"
import { SearchParams } from "next/dist/server/request/search-params"
import { SEARCH_PARAM_FILTER, SEARCH_PARAM_PAGE, SEARCH_PARAM_SORT } from "@/lib/data/consts"
import { decompressFromEncodedURIComponent } from "lz-string"
import { skillFilterExpand } from "@/lib/util/functions"
import { getSkills } from "@/lib/api/data/skill"

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams
    const [p, f, s] = [params[SEARCH_PARAM_PAGE], params[SEARCH_PARAM_FILTER], params[SEARCH_PARAM_SORT]]

    const filter = typeof f === "string" ? skillFilterExpand(decompressFromEncodedURIComponent(f)) ?? {} : {}

    const res = await getSkills({ filter })
    if (!res.success) return null
    return <SkillResults data={res.data}/>
}
