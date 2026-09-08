import { SearchParams } from "next/dist/server/request/search-params"
import { getPageAndFilterFromSearchParams, getSortOption, pDrinkFilterExpand } from "@/lib/util/functions"
import { IPDrink, PDrinkFilterOptions } from "@hatsuboshi/types"
import { getPDrinks } from "@/lib/api/data/p-drink"
import PDrinkResults from "@/components/data/p-drink/PDrinkResults"
import { PATHS } from "@/lib/util/consts";

export default async function PDrinkSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, filter] = getPageAndFilterFromSearchParams<PDrinkFilterOptions>(searchParams, pDrinkFilterExpand)
    const sort = await getSortOption<IPDrink>(`/${PATHS.pDrink}`)
    const res = await getPDrinks({ p, filter, sort })
    if (!res.success) return null

    return <PDrinkResults data={res.data}/>
}
