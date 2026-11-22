import { IPIdol, ListRequest, Paginator, PIdol, PIdolFilter, Result, success } from "@hatsuboshi/types"
import { API_PATHS } from "@/lib/util/consts"
import { GET } from "@/lib/util/async"

export async function getPIdols(options: ListRequest<PIdolFilter, IPIdol> = {}): Promise<Result<Paginator<PIdol, IPIdol>>> {
    const path = API_PATHS.pIdol
    const r = await GET(path, PIdol.encodeListQuery(options))
    if (!r.success) return r
    return success(new Paginator<PIdol, IPIdol>(PIdol, r.data))
}

export async function getPIdolById(id: string): Promise<Result<PIdol>> {
    const path = `${API_PATHS.pIdol}/${id}`
    const r = await GET(path)
    if (!r.success) return r
    return success(new PIdol(r.data))
}