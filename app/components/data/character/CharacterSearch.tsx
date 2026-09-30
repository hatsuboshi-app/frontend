import { SearchParams } from "next/dist/server/request/search-params"
import { characterFilterExpand, getPageAndFilterFromSearchParams, getSortOption } from "@/lib/util/functions"
import { CharacterFilterOptions, ICharacter } from "@hatsuboshi/types"
import { getCharacters } from "@/lib/api/data/character"
import CharacterResults from "@/components/data/character/CharacterResults"
import { PATHS } from "@/lib/util/consts"

export default async function CharacterSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, filter] = getPageAndFilterFromSearchParams<CharacterFilterOptions>(searchParams, characterFilterExpand)
    const sort = await getSortOption<ICharacter>(`/${PATHS.character}`)
    const res = await getCharacters({ p, filter, sort })
    if (!res.success) return null

    return <CharacterResults data={res.data}/>
}
