import { SearchParams } from "next/dist/server/request/search-params"
import { characterFilterExpand, getPFSFromSearchParams } from "@/lib/util/functions"
import { CharacterFilterOptions, ICharacter } from "@hatsuboshi/types"
import { getCharacters } from "@/lib/api/data/character"
import CharacterResults from "@/components/data/character/CharacterResults"

export default async function CharacterSearch({ searchParams }: { searchParams: SearchParams }) {
    const [p, filter, sort] = getPFSFromSearchParams<CharacterFilterOptions, ICharacter>(searchParams, characterFilterExpand)
    const res = await getCharacters({ p, filter, sort })
    if (!res.success) return null

    return <CharacterResults data={res.data}/>
}
