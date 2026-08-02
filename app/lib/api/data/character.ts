import { GetOptions } from "@/lib/util/types"
import { Character, CharacterFilterOptions, fail, ICharacter, Paginator, Result, success } from "@hatsuboshi/types"
import { getGetURL, getHeader } from "@/lib/util/functions"

export async function getCharacters(options: GetOptions<CharacterFilterOptions, ICharacter> = {}): Promise<Result<Paginator<Character, ICharacter>>> {
    try {
        const r = await fetch(await getGetURL("characters", options), {
            method: "get",
            headers: getHeader(),
        })
        return success(new Paginator<Character, ICharacter>(Character, await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}