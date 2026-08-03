import { fail, ISkill, Paginator, Result, Skill, SkillFilterOptions, success } from "@hatsuboshi/types"
import { getGetURL, getHeader } from "@/lib/util/functions"
import { GetOptions } from "@/lib/util/types"

export async function getSkills(options: GetOptions<SkillFilterOptions, ISkill> = {}): Promise<Result<Paginator<Skill, ISkill>>> {
    try {
        const r = await fetch(await getGetURL("skills", options), {
            method: "get",
            headers: await getHeader()
        })
        if (r.status >= 400)
            return fail((await r.json()).message)
        return success(new Paginator<Skill, ISkill>(Skill, await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}

export async function getSkillById(id: string): Promise<Result<Skill>> {
    try {
        const r = await fetch(await getGetURL(`skills/${id}`), {
            method: "get",
            headers: await getHeader()
        })
        if (r.status >= 400)
            return fail((await r.json()).message)
        return success(new Skill(await r.json()))
    } catch (e: any) {
        return fail(e.message)
    }
}