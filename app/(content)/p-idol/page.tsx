import { SearchParams } from "next/dist/server/request/search-params"
import { Suspense } from "react"
import PIdolSearch from "@/components/data/p-idol/PIdolSearch"
import PIdolResults from "@/components/data/p-idol/PIdolResults"
import { cookies } from "next/headers"

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const sp = await searchParams
    const suspenseKey = JSON.stringify(sp) + (await cookies()).toString()

    return (
        <>
            <h1>Produce Idols</h1>
            <Suspense key={suspenseKey} fallback={<PIdolResults/>}>
                <PIdolSearch searchParams={sp}/>
            </Suspense>
        </>
    )
}
