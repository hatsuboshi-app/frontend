import { SearchParams } from "next/dist/server/request/search-params"
import { cookies } from "next/headers"
import { Suspense } from "react"
import PDrinkSearch from "@/components/data/p-drink/PDrinkSearch"
import PDrinkResults from "@/components/data/p-drink/PDrinkResults"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: 'P-Drinks'
}

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const sp = await searchParams
    const suspenseKey = JSON.stringify(sp) + (await cookies()).toString()

    return (
        <>
            <h1>P-Drinks</h1>
            <Suspense key={suspenseKey} fallback={<PDrinkResults/>}>
                <PDrinkSearch searchParams={sp}/>
            </Suspense>
        </>
    )
}
