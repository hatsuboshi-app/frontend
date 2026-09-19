import { SearchParams } from "next/dist/server/request/search-params"
import { cookies } from "next/headers"
import { Suspense } from "react"
import PItemSearch from "@/components/data/p-item/PItemSearch"
import PItemResults from "@/components/data/p-item/PItemResults"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: 'P-Items'
}

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const sp = await searchParams
    const suspenseKey = JSON.stringify(sp) + (await cookies()).toString()

    return (
        <>
            <h1>P-Items</h1>
            <Suspense key={suspenseKey} fallback={<PItemResults/>}>
                <PItemSearch searchParams={sp}/>
            </Suspense>
        </>
    )
}
