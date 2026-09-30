import { SearchParams } from "next/dist/server/request/search-params"
import { getPageAndFilterFromSearchParams, getSortOption, pItemFilterExpand } from "@/lib/util/functions"
import { IPItem, PItemFilterOptions } from "@hatsuboshi/types"
import { getPItems } from "@/lib/api/data/p-item"
import PItemResults from "@/components/data/p-item/PItemResults"
import { PATHS } from "@/lib/util/consts"

export default async function PItemSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, filter] = getPageAndFilterFromSearchParams<PItemFilterOptions>(searchParams, pItemFilterExpand)
    const sort = await getSortOption<IPItem>(`/${PATHS.pItem}`)
    const res = await getPItems({ p, filter, sort })
    if (!res.success) return null

    return <PItemResults data={res.data}/>
}
