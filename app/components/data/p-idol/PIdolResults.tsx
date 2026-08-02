import { IPIdol, Paginator, PIdol } from "@hatsuboshi/types"
import ResultsWrapper from "@/components/data/wrappers/ResultsWrapper"
import PIdolCard from "@/components/data/p-idol/PIdolCard"
import { getUserPerPage } from "@/lib/api/cookies/perPage"
import { getSuspensePaginatorMeta } from "@/lib/util/functions"

export default async function PIdolResults({ data }: { data?: Paginator<PIdol, IPIdol> }) {
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
                data.data.map(i => <PIdolCard key={i.id} pIdol={i}/>)
                :
                // suspense
                new Array(pageSize).fill(null).map((_, i) => <PIdolCard key={i}/>)
            }
        </ResultsWrapper>
    )
}

