import { SearchParams } from "next/dist/server/request/search-params"
import SkillSearch from "@/components/data/skill/SkillSearch"
import { Suspense } from "react"
import SkillResults from "@/components/data/skill/SkillResults"

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams
    const suspenseKey = JSON.stringify(params)

    return (
        <Suspense key={suspenseKey} fallback={<SkillResults/>}>
            <SkillSearch searchParams={params}/>
        </Suspense>
    )
}
