import { ISkill, ListRequest, Paginator, Result, Skill, SkillFilter, success } from "@hatsuboshi/types"
import { API_PATHS, PATHS } from "@/lib/util/consts"
import { GET, getUserSortOptions } from "@/lib/util/async"
import { getUserPerPage } from "@/lib/api/cookies/perPage"

export async function listSkills(options: ListRequest<SkillFilter, ISkill> = {}): Promise<Result<Paginator<Skill, ISkill>>> {
    const path = API_PATHS.skill
    const sort = options.sort ?? await getUserSortOptions<ISkill>(PATHS.skill)
    const perPage = options.perPage ?? await getUserPerPage()
    const r = await GET(path, Skill.encodeListQuery({ ...options, sort, perPage }))
    if (!r.success) return r
    return success(new Paginator<Skill, ISkill>(Skill, r.data))
}

export async function getSkillById(id: string): Promise<Result<Skill>> {
    const path = `${API_PATHS.skill}/${id}`
    const r = await GET(path)
    if (!r.success) return r
    return success(new Skill(r.data))
}