import { SearchParams } from "next/dist/server/request/search-params"
import { decodePDrinkFilter, getFilterFromQuery, getPageFromQuery } from "@/lib/util/functions"
import { PDrinkFilter } from "@hatsuboshi/types"
import { listPDrinks } from "@/lib/api/data/p-drink"
import PDrinkResults from "@/components/data/p-drink/PDrinkResults"

export default async function PDrinkSearch({ searchParams }: { searchParams: SearchParams }) {
    const page = getPageFromQuery(searchParams)
    const filter  = getFilterFromQuery<PDrinkFilter>(searchParams, decodePDrinkFilter)

    const res = await listPDrinks({ page, filter })
    if (!res.success) return null

    return <PDrinkResults data={res.data}/>
}
