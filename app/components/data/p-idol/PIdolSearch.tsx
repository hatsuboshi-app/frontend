import { SearchParams } from "next/dist/server/request/search-params"
import { decodePIdolFilter, getFilterFromQuery, getPageFromQuery } from "@/lib/util/functions"
import { getPIdols } from "@/lib/api/data/p-idol"
import PIdolResults from "@/components/data/p-idol/PIdolResults"
import { IPIdol, PIdolFilter } from "@hatsuboshi/types"
import { PATHS } from "@/lib/util/consts"
import { getUserSortOptions } from "@/lib/util/async"

export default async function PIdolSearch({ searchParams }: { searchParams: SearchParams }) {
    // get from query
    const page = getPageFromQuery(searchParams)
    const filter  = getFilterFromQuery<PIdolFilter>(searchParams, decodePIdolFilter)

    // get from cookies
    const sort = await getUserSortOptions<IPIdol>(PATHS.pIdol)

    // retrieve
    const res = await getPIdols({ page, filter, sort })
    if (!res.success) return null

    return <PIdolResults data={res.data}/>
}
