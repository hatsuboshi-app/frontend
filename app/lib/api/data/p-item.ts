import { IPItem, ListRequest, Paginator, PItem, PItemFilter, Result, success } from "@hatsuboshi/types"
import { API_PATHS } from "@/lib/util/consts"
import { GET } from "@/lib/util/async"

export async function getPItems(options: ListRequest<PItemFilter, IPItem> = {}): Promise<Result<Paginator<PItem, IPItem>>> {
    const path = API_PATHS.pItem
    const r = await GET(path, PItem.encodeListQuery(options))
    if (!r.success) return r
    return success(new Paginator<PItem, IPItem>(PItem, r.data))
}

export async function getPItemById(id: string): Promise<Result<PItem>> {
    const path = `${API_PATHS.pItem}/${id}`
    const r = await GET(path)
    if (!r.success) return r
    return success(new PItem(r.data))
}