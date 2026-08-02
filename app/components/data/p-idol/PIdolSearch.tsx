import { SearchParams } from "next/dist/server/request/search-params"
import { SEARCH_PARAM_FILTER, SEARCH_PARAM_PAGE, SEARCH_PARAM_SORT } from "@/lib/data/consts"
import { pIdolFilterExpand } from "@/lib/util/functions"
import { decompressFromEncodedURIComponent } from "lz-string"
import { getPIdols } from "@/lib/api/data/p-idol"
import PIdolResults from "@/components/data/p-idol/PIdolResults"

export default async function PIdolSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, f, s] = [searchParams[SEARCH_PARAM_PAGE], searchParams[SEARCH_PARAM_FILTER], searchParams[SEARCH_PARAM_SORT]]

    const filter = typeof f === "string" ? pIdolFilterExpand(decompressFromEncodedURIComponent(f)) ?? {} : {}

    const res = await getPIdols({ filter })
    if (!res.success) return null

    return <PIdolResults data={res.data}/>
}