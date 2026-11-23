import { SearchParams } from "next/dist/server/request/search-params"
import { decodePIdolFilter, getFilterFromQuery, getPageFromQuery } from "@/lib/util/functions"
import { listPIdols } from "@/lib/api/data/p-idol"
import PIdolResults from "@/components/data/p-idol/PIdolResults"
import { PIdolFilter } from "@hatsuboshi/types"

export default async function PIdolSearch({ searchParams }: { searchParams: SearchParams }) {
    const page = getPageFromQuery(searchParams)
    const filter  = getFilterFromQuery<PIdolFilter>(searchParams, decodePIdolFilter)

    const res = await listPIdols({ page, filter })
    if (!res.success) return null

    return <PIdolResults data={res.data}/>
}
