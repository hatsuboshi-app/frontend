import { IPItem, ListRequest, Paginator, PItem, PItemFilter, Result, success } from "@hatsuboshi/types"
import { API_PATHS, PATHS } from "@/lib/util/consts"
import { GET, getUserSortOptions } from "@/lib/util/async"
import { getUserPerPage } from "@/lib/api/cookies/perPage"

export async function listPItems(options: ListRequest<PItemFilter, IPItem> = {}): Promise<Result<Paginator<PItem, IPItem>>> {
    const path = API_PATHS.pItem
    const sort = options.sort ?? await getUserSortOptions<IPItem>(PATHS.pItem)
    const perPage = options.perPage ?? await getUserPerPage()
    const r = await GET(path, PItem.encodeListQuery({ ...options, sort, perPage }))
    if (!r.success) return r
    return success(new Paginator<PItem, IPItem>(PItem, r.data))
}

export async function getPItemById(id: string): Promise<Result<PItem>> {
    const path = `${API_PATHS.pItem}/${id}`
    const r = await GET(path)
    if (!r.success) return r
    return success(new PItem(r.data))
}