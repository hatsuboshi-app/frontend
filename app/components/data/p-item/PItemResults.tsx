import { IPItem, Paginator, PItem } from "@hatsuboshi/types"
import { getUserPerPage } from "@/lib/api/cookies/perPage"
import ResultsWrapper from "@/components/data/wrappers/ResultsWrapper"
import { getSuspensePaginatorMeta } from "@/lib/util/functions"
import PItemCard from "@/components/data/p-item/PItemCard"
import { getUserSortField } from "@/lib/api/cookies/sortField"
import { getUserSortDirection } from "@/lib/api/cookies/sortDirection"
import { PATHS } from "@/lib/util/consts"

export default async function PItemResults({ data }: { data?: Paginator<PItem, IPItem> }) {
    const isSuspense = !data
    const path = `/${PATHS.pItem}`
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
                data.data.map(i => <PItemCard key={i.id} pItemJson={i.toJSON()}/>)
                :
                // suspense
                new Array(pageSize).fill(null).map((_, i) => <PItemCard key={i}/>)
            }
        </ResultsWrapper>
    )
}