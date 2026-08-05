import { SearchParams } from "next/dist/server/request/search-params"
import { getPFSFromSearchParams, pIdolFilterExpand } from "@/lib/util/functions"
import { getPIdols } from "@/lib/api/data/p-idol"
import PIdolResults from "@/components/data/p-idol/PIdolResults"
import { IPIdol, PIdolFilterOptions } from "@hatsuboshi/types"

export default async function PIdolSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, filter, sort] = getPFSFromSearchParams<PIdolFilterOptions, IPIdol>(searchParams, pIdolFilterExpand)
    const res = await getPIdols({ p, filter, sort })
    if (!res.success) return null

    return <PIdolResults data={res.data}/>
}
