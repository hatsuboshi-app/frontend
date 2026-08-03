import { SearchParams } from "next/dist/server/request/search-params"
import { getPFSFromSearchParams, pItemFilterExpand } from "@/lib/util/functions"
import { IPItem, PItemFilterOptions } from "@hatsuboshi/types"
import { getPItems } from "@/lib/api/data/p-item"
import PItemResults from "@/components/data/p-item/PItemResults"

export default async function PItemSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, filter, sort] = getPFSFromSearchParams<PItemFilterOptions, IPItem>(searchParams, pItemFilterExpand)
    const res = await getPItems({ p, filter, sort })
    if (!res.success) return null

    return <PItemResults data={res.data}/>
}
