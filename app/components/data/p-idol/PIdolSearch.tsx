import { SearchParams } from "next/dist/server/request/search-params"
import { getPageAndFilterFromSearchParams, getSortOption, pIdolFilterExpand } from "@/lib/util/functions"
import { getPIdols } from "@/lib/api/data/p-idol"
import PIdolResults from "@/components/data/p-idol/PIdolResults"
import { IPIdol, PIdolFilterOptions } from "@hatsuboshi/types"
import { PATHS } from "@/lib/util/consts"

export default async function PIdolSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, filter] = getPageAndFilterFromSearchParams<PIdolFilterOptions>(searchParams, pIdolFilterExpand)
    const sort = await getSortOption<IPIdol>(`/${PATHS.pIdol}`)
    const res = await getPIdols({ p, filter, sort })
    if (!res.success) return null

    return <PIdolResults data={res.data}/>
}
