import { IPIdol, Paginator, PIdol } from "@hatsuboshi/types"
import ResultsWrapper from "@/components/data/wrappers/ResultsWrapper"
import PIdolCard from "@/components/data/p-idol/PIdolCard"

export default async function PIdolResults({ data }: { data: Paginator<PIdol, IPIdol> }) {
    return (
        <ResultsWrapper paginatorMeta={data.meta} className={`
            w-full grid
            gap-sm-mobile-gap grid-cols-1 mobile-wide:grid-cols-2
            tablet:gap-sm-tablet-gap tablet:grid-cols-2
            laptop:gap-sm-laptop-gap laptop-wide:grid-cols-3
        `}>
            {data.data.map(i => <PIdolCard key={i.id} pIdol={i}/>)}
        </ResultsWrapper>
    )
}

