import { SearchParams } from "next/dist/server/request/search-params"
import { cookies } from "next/headers"
import { Suspense } from "react"
import CharacterSearch from "@/components/data/character/CharacterSearch"
import CharacterResults from "@/components/data/character/CharacterResults"

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const sp = await searchParams
    const suspenseKey = JSON.stringify(sp) + (await cookies()).toString()

    return (
        <Suspense key={suspenseKey} fallback={<CharacterResults/>}>
            <CharacterSearch searchParams={sp}/>
        </Suspense>
    )
}
