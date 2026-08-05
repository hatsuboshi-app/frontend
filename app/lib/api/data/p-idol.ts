import { GetOptions } from "@/lib/util/types"
import { fail, IPIdol, Paginator, PIdol, PIdolFilterOptions, Result, success } from "@hatsuboshi/types"
import { getGetURL, getHeader } from "@/lib/util/functions"
import { API_PATHS } from "@/lib/util/consts"

export async function getPIdols(options: GetOptions<PIdolFilterOptions, IPIdol> = {}): Promise<Result<Paginator<PIdol, IPIdol>>> {
    try {
        const r = await fetch(await getGetURL(API_PATHS.pIdol, options), {
            method: "get",
            headers: await getHeader()
        })
        if (r.status >= 400)
            return fail((await r.json()).message)
        return success(new Paginator<PIdol, IPIdol>(PIdol, await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}

export async function getPIdolById(id: string): Promise<Result<PIdol>> {
    try {
        const r = await fetch(await getGetURL(`${API_PATHS.pIdol}/${id}`), {
            method: "get",
            headers: await getHeader()
        })
        if (r.status >= 400)
            return fail((await r.json()).message)
        return success(new PIdol(await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}
