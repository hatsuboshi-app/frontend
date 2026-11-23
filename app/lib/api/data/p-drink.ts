import { IPDrink, ListRequest, Paginator, PDrink, PDrinkFilter, Result, success } from "@hatsuboshi/types"
import { API_PATHS, PATHS } from "@/lib/util/consts"
import { GET, getUserSortOptions } from "@/lib/util/async"
import { getUserPerPage } from "@/lib/api/cookies/perPage"

export async function listPDrinks(options: ListRequest<PDrinkFilter, IPDrink> = {}): Promise<Result<Paginator<PDrink, IPDrink>>> {
    const path = API_PATHS.pDrink
    const sort = options.sort ?? await getUserSortOptions<IPDrink>(PATHS.pDrink)
    const perPage = options.perPage ?? await getUserPerPage()
    const r = await GET(path, PDrink.encodeListQuery({ ...options, sort, perPage }))
    if (!r.success) return r
    return success(new Paginator<PDrink, IPDrink>(PDrink, r.data))
}

export async function getPDrinkById(id: string): Promise<Result<PDrink>> {
    const path = `${API_PATHS.pDrink}/${id}`
    const r = await GET(path)
    if (!r.success) return r
    return success(new PDrink(r.data))
}