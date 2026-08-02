import { SearchParams } from "next/dist/server/request/search-params"
import { Suspense } from "react"
import PIdolSearch from "@/components/data/p-idol/PIdolSearch"
import PIdolResults from "@/components/data/p-idol/PIdolResults"

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const params = await searchParams
    const suspenseKey = JSON.stringify(params)

    return (
        <Suspense key={suspenseKey} fallback={<PIdolResults/>}>
            <PIdolSearch searchParams={params}/>
        </Suspense>
    )
}
