import { GetOptions } from "@/lib/util/types"
import { fail, IPItem, Paginator, PItem, PItemFilterOptions, Result, success } from "@hatsuboshi/types"
import { getGetURL, getHeader } from "@/lib/util/functions"
import { API_PATHS } from "@/lib/util/consts"

export async function getPItems(options: GetOptions<PItemFilterOptions, IPItem> = {}): Promise<Result<Paginator<PItem, IPItem>>> {
    try {
        const r = await fetch(await getGetURL(API_PATHS.pItem, options), {
            method: "get",
            headers: await getHeader()
        })
        if (r.status >= 400)
            return fail((await r.json()).message)
        return success(new Paginator<PItem, IPItem>(PItem, await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}

export async function getPItemById(id: string): Promise<Result<PItem>> {
    try {
        const r = await fetch(await getGetURL(`${API_PATHS.pItem}/${id}`), {
            method: "get",
            headers: await getHeader()
        })
        if (r.status >= 400)
            return fail((await r.json()).message)
        return success(new PItem(await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}
