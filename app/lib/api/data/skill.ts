import { ISkill, Paginator, Result, Skill, SkillFilterOptions, SortOption, success } from "@hatsuboshi/types"
import { API_URI } from "@/lib/data/consts"
import { getHeader } from "@/lib/util/functions"

export async function getSkills(f?: SkillFilterOptions, s?: SortOption<ISkill>[], p?: number, pp?: number) {
    const r = await fetch(API_URI + `/skills`, {
        method: "get",
        headers: getHeader()
    })
    return success(new Paginator<Skill, ISkill>(Skill, await r.json()))
}

export async function getSkillById(id: string): Promise<Result<Skill>> {
    const r = await fetch(API_URI + `/skills/${id}`, {
        method: "get",
        headers: getHeader()
    })
    return success(new Skill(await r.json()))
}