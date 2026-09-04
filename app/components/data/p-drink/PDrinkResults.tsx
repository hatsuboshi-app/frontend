import { IPDrink, Paginator, PDrink } from "@hatsuboshi/types"
import { getUserPerPage } from "@/lib/api/cookies/perPage"
import ResultsWrapper from "@/components/data/wrappers/ResultsWrapper"
import { getSuspensePaginatorMeta } from "@/lib/util/functions"
import PDrinkCard from "@/components/data/p-drink/PDrinkCard"
import { getUserSortField } from "@/lib/api/cookies/sortField"
import { getUserSortDirection } from "@/lib/api/cookies/sortDirection"

export default async function PDrinkResults({ data }: { data?: Paginator<PDrink, IPDrink> }) {
    const isSuspense = !data
    const path = "/p-drink"
    const pageSize = await getUserPerPage()
    const sortField = await getUserSortField(path)
    const sortDirection = await getUserSortDirection(path)

    return (
        <ResultsWrapper
            paginatorMeta={isSuspense ? getSuspensePaginatorMeta(pageSize) : data.meta}
            currentSortField={sortField}
            currentSortDirection={sortDirection}
            className={`
                w-full grid
                gap-sm-mobile-gap grid-cols-1 mobile-wide:grid-cols-2
                tablet:gap-sm-tablet-gap tablet:grid-cols-2
                laptop:gap-sm-laptop-gap laptop-wide:grid-cols-3
            `}
        >
            {!isSuspense ?
                // hydrated
                data.data.map(i => <PDrinkCard key={i.id} pDrinkJson={i.toJSON()}/>)
                :
                // suspense
                new Array(pageSize).fill(null).map((_, i) => <PDrinkCard key={i}/>)
            }
        </ResultsWrapper>
    )
}