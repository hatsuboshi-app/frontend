import { fail, ISkill, Paginator, Result, Skill, SkillFilterOptions, success } from "@hatsuboshi/types"
import { getHeader, getURL } from "@/lib/util/functions"
import { GetOptions } from "@/lib/util/types"

export async function getSkills({ filter, sort, p, pp }: GetOptions<SkillFilterOptions, ISkill> = {}): Promise<Result<Paginator<Skill, ISkill>>> {
    try {
        const r = await fetch(getURL("skills", { filter, sort, p, pp }), {
            method: "get",
            headers: getHeader()
        })
        return success(new Paginator<Skill, ISkill>(Skill, await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}

export async function getSkillById(id: string): Promise<Result<Skill>> {
    try {
        const r = await fetch(getURL(`skills/${id}`), {
            method: "get",
            headers: getHeader()
        })
        return success(new Skill(await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}