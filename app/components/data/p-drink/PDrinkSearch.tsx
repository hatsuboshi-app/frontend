import { SearchParams } from "next/dist/server/request/search-params"
import { getPFSFromSearchParams, pDrinkFilterExpand } from "@/lib/util/functions"
import { IPDrink, PDrinkFilterOptions } from "@hatsuboshi/types"
import { getPDrinks } from "@/lib/api/data/p-drink"
import PDrinkResults from "@/components/data/p-drink/PDrinkResults"

export default async function PDrinkSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, filter, sort] = getPFSFromSearchParams<PDrinkFilterOptions, IPDrink>(searchParams, pDrinkFilterExpand)
    const res = await getPDrinks({ p, filter, sort })
    if (!res.success) return null

    return <PDrinkResults data={res.data}/>
}
