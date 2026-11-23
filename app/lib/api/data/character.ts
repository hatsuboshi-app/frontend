import { Character, CharacterFilter, ICharacter, ListRequest, Paginator, Result, success } from "@hatsuboshi/types"
import { API_PATHS, PATHS } from "@/lib/util/consts"
import { GET, getUserSortOptions } from "@/lib/util/async"
import { getUserPerPage } from "@/lib/api/cookies/perPage"

export async function listCharacters(options: ListRequest<CharacterFilter, ICharacter> = {}): Promise<Result<Paginator<Character, ICharacter>>> {
    const path = API_PATHS.character
    const sort = options.sort ?? await getUserSortOptions<ICharacter>(PATHS.character)
    const perPage = options.perPage ?? await getUserPerPage()
    const r = await GET(path, Character.encodeListQuery({ ...options, sort, perPage }))
    if (!r.success) return r
    return success(new Paginator<Character, ICharacter>(Character, r.data))
}

export async function getCharacterById(id: string): Promise<Result<Character>> {
    const path = `${API_PATHS.character}/${id}`
    const r = await GET(path)
    if (!r.success) return r
    return success(new Character(r.data))
}