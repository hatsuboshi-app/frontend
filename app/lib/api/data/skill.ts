import { ISkill, ListRequest, Paginator, Result, Skill, SkillFilter, success } from "@hatsuboshi/types"
import { API_PATHS } from "@/lib/util/consts"
import { GET } from "@/lib/util/async"

export async function getSkills(options: ListRequest<SkillFilter, ISkill> = {}): Promise<Result<Paginator<Skill, ISkill>>> {
    const path = API_PATHS.skill
    const r = await GET(path, Skill.encodeListQuery(options))
    if (!r.success) return r
    return success(new Paginator<Skill, ISkill>(Skill, r.data))
}

export async function getSkillById(id: string): Promise<Result<Skill>> {
    const path = `${API_PATHS.skill}/${id}`
    const r = await GET(path)
    if (!r.success) return r
    return success(new Skill(r.data))
}