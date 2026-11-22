import { SearchParams } from "next/dist/server/request/search-params"
import { decodeCharacterFilter, getFilterFromQuery, getPageFromQuery } from "@/lib/util/functions"
import { CharacterFilter, ICharacter } from "@hatsuboshi/types"
import { listCharacters } from "@/lib/api/data/character"
import CharacterResults from "@/components/data/character/CharacterResults"
import { PATHS } from "@/lib/util/consts"
import { getUserSortOptions } from "@/lib/util/async"

export default async function CharacterSearch({ searchParams }: { searchParams: SearchParams }) {
    // get from query
    const page = getPageFromQuery(searchParams)
    const filter  = getFilterFromQuery<CharacterFilter>(searchParams, decodeCharacterFilter)

    // get from cookies
    const sort = await getUserSortOptions<ICharacter>(PATHS.character)

    // retrieve
    const res = await listCharacters({ page, filter, sort })
    if (!res.success) return null

    return <CharacterResults data={res.data}/>
}
