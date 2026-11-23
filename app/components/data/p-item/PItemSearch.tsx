import { SearchParams } from "next/dist/server/request/search-params"
import { decodePItemFilter, getFilterFromQuery, getPageFromQuery } from "@/lib/util/functions"
import { PItemFilter } from "@hatsuboshi/types"
import { listPItems } from "@/lib/api/data/p-item"
import PItemResults from "@/components/data/p-item/PItemResults"

export default async function PItemSearch({ searchParams }: { searchParams: SearchParams }) {
    const page = getPageFromQuery(searchParams)
    const filter  = getFilterFromQuery<PItemFilter>(searchParams, decodePItemFilter)

    const res = await listPItems({ page, filter })
    if (!res.success) return null

    return <PItemResults data={res.data}/>
}