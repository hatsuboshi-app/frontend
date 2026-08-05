import { GetOptions } from "@/lib/util/types"
import { Character, CharacterFilterOptions, fail, ICharacter, Paginator, Result, success } from "@hatsuboshi/types"
import { getGetURL, getHeader } from "@/lib/util/functions"
import { API_PATHS } from "@/lib/util/consts"

export async function getCharacters(options: GetOptions<CharacterFilterOptions, ICharacter> = {}): Promise<Result<Paginator<Character, ICharacter>>> {
    try {
        const r = await fetch(await getGetURL(API_PATHS.character, options), {
            method: "get",
            headers: await getHeader()
        })
        if (r.status >= 400)
            return fail((await r.json()).message)
        return success(new Paginator<Character, ICharacter>(Character, await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}

export async function getCharacterById(id: string): Promise<Result<Character>> {
    try {
        const r = await fetch(await getGetURL(`${API_PATHS.character}/${id}`), {
            method: "get",
            headers: await getHeader()
        })
        if (r.status >= 400)
            return fail((await r.json()).message)
        return success(new Character(await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}