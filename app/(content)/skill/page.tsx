import { SearchParams } from "next/dist/server/request/search-params"
import SkillSearch from "@/components/data/skill/SkillSearch"
import { Suspense } from "react"
import SkillResults from "@/components/data/skill/SkillResults"
import { cookies } from "next/headers"

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const sp = await searchParams
    const suspenseKey = JSON.stringify(sp) + (await cookies()).toString()

    return (
        <>
            <h1>Skill Cards</h1>
            <Suspense key={suspenseKey} fallback={<SkillResults/>}>
                <SkillSearch searchParams={sp}/>
            </Suspense>
        </>
    )
}
