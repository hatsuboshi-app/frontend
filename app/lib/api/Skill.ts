import { ISkill, Paginator, Result, Skill, SkillFilterOptions, SortOption, success } from "@hatsuboshi/types"
import { API_URI, PARAM_DELIMITER, PARAM_SEPARATOR } from "@/lib/consts"
import {
    booleanFilterExpand,
    booleanFilterMinimize, enumFilterExpand,
    enumFilterMinimize, formatMinimizedParam,
    getHeader, numberFilterExpand,
    numberFilterMinimize, persistentObjectFilterExpand,
    persistentObjectFilterMinimize, stringFilterExpand,
    stringFilterMinimize
} from "@/lib/util"

export function skillFilterMinimize(f?: SkillFilterOptions): string | undefined {
    /*
     * name           -> n
     * plan           -> p
     * rarity         -> r
     * category       -> a
     * source         -> s
     * unlockLevel    -> u
     * isCustomizable -> c
     */
    if (f === undefined) return undefined
    const params: (string | undefined)[] = [persistentObjectFilterMinimize(f)]
    if (f.name) params.push(formatMinimizedParam("n", stringFilterMinimize(f.name)))
    if (f.plan) params.push(formatMinimizedParam("p", enumFilterMinimize(f.plan)))
    if (f.rarity) params.push(formatMinimizedParam("r", enumFilterMinimize(f.rarity)))
    if (f.category) params.push(formatMinimizedParam("a", enumFilterMinimize(f.category)))
    if (f.source) params.push(formatMinimizedParam("s", enumFilterMinimize(f.source)))
    if (f.unlockLevel) params.push(formatMinimizedParam("u", numberFilterMinimize(f.unlockLevel)))
    if (f.isCustomizable) params.push(formatMinimizedParam("c", booleanFilterMinimize(f.isCustomizable)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}

export function skillFilterExpand(s?: string): SkillFilterOptions | undefined {
    /*
     * name           -> n
     * plan           -> p
     * rarity         -> r
     * category       -> a
     * source         -> s
     * unlockLevel    -> u
     * isCustomizable -> c
     */
    if (s === undefined) return undefined
    const o: SkillFilterOptions = { ...persistentObjectFilterExpand(s) }
    const parameters = s.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "n") o.name = stringFilterExpand(cond)
        else if (key === "p") o.plan = enumFilterExpand(cond)
        else if (key === "r") o.rarity = enumFilterExpand(cond)
        else if (key === "a") o.category = enumFilterExpand(cond)
        else if (key === "s") o.source = enumFilterExpand(cond)
        else if (key === "u") o.unlockLevel = numberFilterExpand(cond)
        else if (key === "c") o.isCustomizable = booleanFilterExpand(cond)
    })
    return o
}

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