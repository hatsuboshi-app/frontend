import { GetOptions } from "@/lib/util/types"
import { fail, IPDrink, Paginator, PDrink, PDrinkFilterOptions, Result, success } from "@hatsuboshi/types"
import { getGetURL, getHeader } from "@/lib/util/functions"
import { API_PATHS } from "@/lib/data/consts"

export async function getPDrinks(options: GetOptions<PDrinkFilterOptions, IPDrink> = {}): Promise<Result<Paginator<PDrink, IPDrink>>> {
    try {
        const r = await fetch(await getGetURL(API_PATHS.pDrink, options), {
            method: "get",
            headers: await getHeader()
        })
        if (r.status >= 400)
            return fail((await r.json()).message)
        return success(new Paginator<PDrink, IPDrink>(PDrink, await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}

export async function getPDrinkById(id: string): Promise<Result<PDrink>> {
    try {
        const r = await fetch(await getGetURL(`${API_PATHS.pDrink}/${id}`), {
            method: "get",
            headers: await getHeader()
        })
        if (r.status >= 400)
            return fail((await r.json()).message)
        return success(new PDrink(await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}
