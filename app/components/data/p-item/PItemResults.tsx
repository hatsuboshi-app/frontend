import { IPItem, Paginator, PItem } from "@hatsuboshi/types"
import { getUserPerPage } from "@/lib/api/cookies/perPage"
import ResultsWrapper from "@/components/data/wrappers/ResultsWrapper"
import { getSuspensePaginatorMeta } from "@/lib/util/functions"
import PItemCard from "@/components/data/p-item/PItemCard"

export default async function PItemResults({ data }: { data?: Paginator<PItem, IPItem> }) {
    const isSuspense = !data
    const pageSize = await getUserPerPage()

    return (
        <ResultsWrapper paginatorMeta={isSuspense ? getSuspensePaginatorMeta(pageSize) : data.meta} className={`
            w-full grid
            gap-sm-mobile-gap grid-cols-1 mobile-wide:grid-cols-2
            tablet:gap-sm-tablet-gap tablet:grid-cols-2
            laptop:gap-sm-laptop-gap laptop-wide:grid-cols-3
        `}>
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