import SkillCard from "@/components/data/skill/SkillCard"
import { ISkill, Paginator, Skill } from "@hatsuboshi/types"
import ResultsWrapper from "@/components/data/wrappers/ResultsWrapper"
import { getUserPerPage } from "@/lib/api/cookies/perPage"
import { getSuspensePaginatorMeta } from "@/lib/util/functions"

export default async function SkillResults({ data }: { data?: Paginator<Skill, ISkill> }) {
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
                data.data.map(s => <SkillCard key={s.id} skillJson={s.toJSON()}/>)
                :
                // suspense
                new Array(pageSize).fill(null).map((_, i) => <SkillCard key={i}/>)
            }
        </ResultsWrapper>
    )
}
