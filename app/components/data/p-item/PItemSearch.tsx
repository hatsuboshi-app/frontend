import { SearchParams } from "next/dist/server/request/search-params"
import { decodePItemFilter, getFilterFromQuery, getPageFromQuery } from "@/lib/util/functions"
import { IPItem, PItemFilter } from "@hatsuboshi/types"
import { getPItems } from "@/lib/api/data/p-item"
import PItemResults from "@/components/data/p-item/PItemResults"
import { PATHS } from "@/lib/util/consts"
import { getUserSortOptions } from "@/lib/util/async"

export default async function PItemSearch({ searchParams }: { searchParams: SearchParams }) {
    // get from query
    const page = getPageFromQuery(searchParams)
    const filter  = getFilterFromQuery<PItemFilter>(searchParams, decodePItemFilter)

    // get from cookies
    const sort = await getUserSortOptions<IPItem>(PATHS.pItem)

    // retrieve
    const res = await getPItems({ page, filter, sort })
    if (!res.success) return null

    return <PItemResults data={res.data}/>
}
