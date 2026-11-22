import { IPDrink, ListRequest, Paginator, PDrink, PDrinkFilter, Result, success } from "@hatsuboshi/types"
import { API_PATHS } from "@/lib/util/consts"
import { GET } from "@/lib/util/async"

export async function listPDrinks(options: ListRequest<PDrinkFilter, IPDrink> = {}): Promise<Result<Paginator<PDrink, IPDrink>>> {
    const path = API_PATHS.pDrink
    const r = await GET(path, PDrink.encodeListQuery(options))
    if (!r.success) return r
    return success(new Paginator<PDrink, IPDrink>(PDrink, r.data))
}

export async function getPDrinkById(id: string): Promise<Result<PDrink>> {
    const path = `${API_PATHS.pDrink}/${id}`
    const r = await GET(path)
    if (!r.success) return r
    return success(new PDrink(r.data))
}