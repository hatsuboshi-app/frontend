import { SearchParams } from "next/dist/server/request/search-params"
import { decodePDrinkFilter, getFilterFromQuery, getPageFromQuery } from "@/lib/util/functions"
import { IPDrink, PDrinkFilter } from "@hatsuboshi/types"
import { listPDrinks } from "@/lib/api/data/p-drink"
import PDrinkResults from "@/components/data/p-drink/PDrinkResults"
import { PATHS } from "@/lib/util/consts"
import { getUserSortOptions } from "@/lib/util/async"

export default async function PDrinkSearch({ searchParams }: { searchParams: SearchParams }) {
    // get from query
    const page = getPageFromQuery(searchParams)
    const filter  = getFilterFromQuery<PDrinkFilter>(searchParams, decodePDrinkFilter)

    // get from cookies
    const sort = await getUserSortOptions<IPDrink>(PATHS.pDrink)

    // retrieve
    const res = await listPDrinks({ page, filter, sort })
    if (!res.success) return null

    return <PDrinkResults data={res.data}/>
}
