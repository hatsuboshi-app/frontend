import { GetOptions } from "@/lib/util/types"
import { fail, IPIdol, Paginator, PIdol, PIdolFilterOptions, Result, success } from "@hatsuboshi/types"
import { getGetURL, getHeader } from "@/lib/util/functions"

export async function getPIdols(options: GetOptions<PIdolFilterOptions, IPIdol> = {}): Promise<Result<Paginator<PIdol, IPIdol>>> {
    try {
        const r = await fetch(await getGetURL("p-idols", options), {
            method: "get",
            headers: getHeader()
        })
        if (r.status >= 400)
            return fail((await r.json()).message)
        return success(new Paginator<PIdol, IPIdol>(PIdol, await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}