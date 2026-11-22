import { Character, CharacterFilter, ICharacter, ListRequest, Paginator, Result, success } from "@hatsuboshi/types"
import { API_PATHS } from "@/lib/util/consts"
import { GET } from "@/lib/util/async"

export async function listCharacters(options: ListRequest<CharacterFilter, ICharacter> = {}): Promise<Result<Paginator<Character, ICharacter>>> {
    const path = API_PATHS.character
    const r = await GET(path, Character.encodeListQuery(options))
    if (!r.success) return r
    return success(new Paginator<Character, ICharacter>(Character, r.data))
}

export async function getCharacterById(id: string): Promise<Result<Character>> {
    const path = `${API_PATHS.character}/${id}`
    const r = await GET(path)
    if (!r.success) return r
    return success(new Character(r.data))
}