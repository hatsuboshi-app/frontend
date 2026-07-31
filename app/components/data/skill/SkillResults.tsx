import { getSkills } from "@/lib/api/data/skill"
import SkillIcon from "@/components/data/skill/SkillIcon"
import { getUserPerPage } from "@/lib/api/cookies/perPage"
import Paginator from "@/components/data/paginator/Paginator"

export default async function SkillResults () {
    const res = await getSkills()
    const skills = res.data
    const pp = await getUserPerPage()

    return (
        <div className={"w-full flex flex-col gap-y-sm-mobile-gap tablet:gap-y-sm-tablet-gap laptop:gap-y-sm-laptop-gap"}>
            <Paginator tp={res.data.meta.totalPages} pp={pp}/>
            {skills.data.map(s => <SkillIcon key={s.id} skill={s.toJSON()}/>)}
        </div>
    )
}
