import { SearchParams } from "next/dist/server/request/search-params"
import { decodeCharacterFilter, getFilterFromQuery, getPageFromQuery } from "@/lib/util/functions"
import { CharacterFilter } from "@hatsuboshi/types"
import { listCharacters } from "@/lib/api/data/character"
import CharacterResults from "@/components/data/character/CharacterResults"

export default async function CharacterSearch({ searchParams }: { searchParams: SearchParams }) {
    const page = getPageFromQuery(searchParams)
    const filter  = getFilterFromQuery<CharacterFilter>(searchParams, decodeCharacterFilter)

    const res = await listCharacters({ page, filter })
    if (!res.success) return null

    return <CharacterResults data={res.data}/>
}
