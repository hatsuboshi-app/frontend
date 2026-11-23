import { IPIdol, ListRequest, Paginator, PIdol, PIdolFilter, Result, success } from "@hatsuboshi/types"
import { API_PATHS, PATHS } from "@/lib/util/consts"
import { GET, getUserSortOptions } from "@/lib/util/async"
import { getUserPerPage } from "@/lib/api/cookies/perPage"

export async function listPIdols(options: ListRequest<PIdolFilter, IPIdol> = {}): Promise<Result<Paginator<PIdol, IPIdol>>> {
    const path = API_PATHS.pIdol
    const sort = options.sort ?? await getUserSortOptions<IPIdol>(PATHS.pIdol)
    const perPage = options.perPage ?? await getUserPerPage()
    const r = await GET(path, PIdol.encodeListQuery({ ...options, sort, perPage }))
    if (!r.success) return r
    return success(new Paginator<PIdol, IPIdol>(PIdol, r.data))
}

export async function getPIdolById(id: string): Promise<Result<PIdol>> {
    const path = `${API_PATHS.pIdol}/${id}`
    const r = await GET(path)
    if (!r.success) return r
    return success(new PIdol(r.data))
}