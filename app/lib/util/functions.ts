import {
    CharacterFilterOptions,
    DateFilterOptions, decodeSortOptions, encodeSortOptions,
    EnumFilterOptions,
    LocaleStringFilterOptions,
    NumberFilterOptions, PDrinkFilterOptions, PIdolFilterOptions,
    PItemFilterOptions, SkillFilterOptions, SkillRarity, SortOption,
    SkillConsolidatedRarity, PersistentObjectFilterOptions
} from "@hatsuboshi/types"
import {
    API_URI,
    API_VERSION,
    COND_SEPARATOR,
    PARAM_DELIMITER,
    PARAM_SEPARATOR, SEARCH_PARAM_FILTER, SEARCH_PARAM_PAGE, SEARCH_PARAM_PER_PAGE, SEARCH_PARAM_SORT
} from "@/lib/util/consts"
import { GetOptions, ReactSetter } from "@/lib/util/types"
import { getUserPerPage } from "@/lib/api/cookies/perPage"
import { SearchParams } from "next/dist/server/request/search-params"
import { decompressFromEncodedURIComponent } from "lz-string"

export async function getHeader(): Promise<Headers> {
    const headers: Headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Accept", "application/json")
    return headers
}

export async function getGetURL<F extends {}, I>(path: string = "", { filter, sort, p, pp }: GetOptions<F, I> = {}): Promise<string> {
    const url = new URL(`${API_VERSION}/${path}`, API_URI)
    if (filter !== undefined && Object.values(filter ?? {}).length > 0) url.searchParams.set(SEARCH_PARAM_FILTER, JSON.stringify(filter))
    if (sort !== undefined) url.searchParams.set(SEARCH_PARAM_SORT, encodeSortOptions(sort))
    if (p !== undefined) url.searchParams.set(SEARCH_PARAM_PAGE, p.toString())
    url.searchParams.set(SEARCH_PARAM_PER_PAGE, String(pp ?? await getUserPerPage()))
    return url.href
}

export function getSuspensePaginatorMeta(pageSize: number) {
    return { pageSize: pageSize, totalPages: 1, totalItems: 1, currentPage: 1 }
}

export function getPFSFromSearchParams<F extends {}, I>(sp: SearchParams, filterExpand: (s?: string) => F | undefined): [ number | undefined, F | undefined, SortOption<I>[] | undefined] {
    const [p, f, s] = [sp[SEARCH_PARAM_PAGE], sp[SEARCH_PARAM_FILTER], sp[SEARCH_PARAM_SORT]]

    // parse page
    let page: number | undefined
    try {
        page = p
            ? typeof p === "string" ? Number(p) : Number(p[0])
            : undefined
    } catch (_) {
        page = undefined
    }

    // parse filter
    const filter = f
        ? filterExpand(decompressFromEncodedURIComponent(typeof f === "string" ? f : f[0]))
        : undefined

    // parse sort
    const sort = s
        ? decodeSortOptions<I>(decompressFromEncodedURIComponent(typeof s === "string" ? s : s[0]))
        : undefined

    return [page, filter, sort]
}

export function formatMinimizedParam(key: string, condition: string | undefined): string | undefined {
    if (condition === undefined) return undefined
    return `${key}${PARAM_DELIMITER}${condition}`
}

// string

export function handleStringFilterInput<T>(setFilter: ReactSetter<T>, field: keyof T, value: string) {
    setFilter(f => {
        const newFilter = { ...f } as T
        if (!value) delete (newFilter as any)[field]
        else (newFilter as any)[field] = { type: "Search", search: value }
        return newFilter
    })
}
export function stringFilterExpand(s?: string): LocaleStringFilterOptions | undefined {
    /*
     * type: "Search"           -> ?
     *   search:                -> [*]
     *   method: "simple"       -> %
     *   method: "regex"        -> ^
     *
     * type: "IncompleteLocale" -> !
     *   missingJa:             -> j
     *   missingEn:             -> e
     *   missingRo:             -> r
     */
    if (s === undefined) return undefined
    const o: LocaleStringFilterOptions = s[0] === "!" ? { type: "IncompleteLocale" } : { type: "Search" }
    switch (o.type) {
        case "Search": {
            if (s.at(-1) === "%") {
                s = s.slice(0, -1)
                o.method = "simple"
            } else if (s.at(-1) === "^") {
                s = s.slice(0, -1)
                o.method = "regex"
            }
            o.search = s.slice(1)
        } break
        case "IncompleteLocale": {
            for (let i = 1; i < s.length; i++) {
                if (s[i] === "j") {
                    o.missingJa = true
                } else if (s[i] === "e") {
                    o.missingEn = true
                } else if (s[i] === "r") {
                    o.missingRo = true
                }
            }
        }
    }
    return o
}
export function stringFilterMinimize(f?: LocaleStringFilterOptions): string | undefined {
    /*
     * type: "Search"           -> ?
     *   search:                -> [*]
     *   method: "simple"       -> %
     *   method: "regex"        -> ^
     *
     * type: "IncompleteLocale" -> !
     *   missingJa:             -> j
     *   missingEn:             -> e
     *   missingRo:             -> r
     */
    if (f === undefined) return undefined
    if (f.type === "Search") {
        return `?${f.search}${f.method === "regex" ? "^" : f.method === "simple" ? "%" : ""}`
    }
    if (f.type === "IncompleteLocale") {
        return `!${f.missingJa ? "j" : ""}${f.missingEn ? "e" : ""}${f.missingRo ? "r" : ""}`
    }
}
export function stringDefaultValueFromFilter(f?: LocaleStringFilterOptions): string | undefined {
    return f?.type === "Search" ? f.search : undefined
}

// number

export function handleNumberFilterInput<T>(setFilter: ReactSetter<T>, field: keyof T, value: { gte?: number, lte?: number }) {
    setFilter(f => {
        const newFilter = { ...f } as T
        if (value.gte === undefined && value.lte === undefined) delete (newFilter as any)[field]
        else (newFilter as any)[field] = value
        return newFilter
    })
}
export function numberFilterExpand(s?: string): NumberFilterOptions | undefined {
    /*
     * lte -> <
     * gte -> >
     */
    if (s === undefined) return undefined
    const o: NumberFilterOptions = {}
    const conditions = s.split(COND_SEPARATOR) ?? []
    conditions.forEach(c => {
        switch (c.at(0)) {
            case "<": {
                o.lte = Number(c.slice(1))
            } break
            case ">": {
                o.gte = Number(c.slice(1))
            }
        }
    })
    return o
}
export function numberFilterMinimize(f?: NumberFilterOptions): string | undefined {
    /*
     * lte -> <
     * gte -> >
     */
    if (f === undefined) return undefined
    const conditions: string[] = []
    if (f.lte) {
        conditions.push(`<${f.lte}`)
    }
    if (f.gte) {
        conditions.push(`>${f.gte}`)
    }
    return conditions.join(COND_SEPARATOR)
}
export function numberDefaultValueFromFilter(f?: NumberFilterOptions): { gte?: number, lte?: number } | undefined {
    return f
}

// boolean

export function handleBooleanFilterInput<T>(setFilter: ReactSetter<T>, fields: (keyof T)[], value: Partial<Record<keyof T, boolean>>) {
    setFilter(f => {
        const newFilter = { ...f } as T
        for (const field of fields) {
            if (value[field] === undefined) delete (newFilter as any)[field]
            else (newFilter as any)[field] = value[field]
        }
        return newFilter
    })
}
export function booleanFilterExpand(s?: string): boolean | undefined {
    if (s === undefined) return undefined
    return s === "t" ? true : s === "f" ? false : undefined
}
export function booleanFilterMinimize(f?: boolean): string | undefined {
    /*
     * true  -> t
     * false -> f
     */
    if (f === undefined) return undefined
    return f ? "t" : "f"
}
export function booleanDefaultValueFromFilter<T>(filter?: T, fields?: (keyof T)[]): Partial<Record<keyof T, boolean>> | undefined {
    if (!filter || !fields) return undefined
    return fields.reduce((a, v) => {
        return filter[v] !== undefined
            ? { ...a, [v]: filter[v] as boolean }
            : a
    }, {})
}

// Enum

export function handleEnumFilterInput<T>(setFilter: ReactSetter<T>, field: keyof T, value: any[]) {
    setFilter(f => {
        const newFilter = { ...f } as T
        if (value.length === 0) delete (newFilter as any)[field]
        else (newFilter as any)[field] = { include: value }
        return newFilter
    })
}
export function enumFilterExpand<T>(s?: string): EnumFilterOptions<T> | undefined {
    /*
     * include -> +[value]
     * exclude -> -[value]
     */
    if (s === undefined) return undefined
    const o: EnumFilterOptions<T> = {}
    const conditions = s.split(COND_SEPARATOR) ?? []
    conditions.forEach(c => {
        switch (c.at(0)) {
            case "+": {
                if (o.include === undefined) {
                    o.include = []
                }
                o.include.push(<T>c.slice(1))
            } break
            case "-": {
                if (o.exclude === undefined) {
                    o.exclude = []
                }
                o.exclude.push(<T>c.slice(1))
            }
        }
    })
    return o
}
export function enumFilterMinimize<T>(f?: EnumFilterOptions<T>): string | undefined {
    /*
     * include -> +[value]
     * exclude -> -[value]
     */
    if (f === undefined) return undefined
    const conditions: string[] = []
    f.include?.forEach(a => conditions.push(`+${a}`))
    f.exclude?.forEach(a => conditions.push(`-${a}`))
    return conditions.join(COND_SEPARATOR)
}
export function enumDefaultValueFromFilter<T>(f?: EnumFilterOptions<T>): T[] | undefined {
    return f?.include
}

// Date

export function ISOToShortDate(date: string): string {
    const d = new Date(date)
    const year = String(d.getUTCFullYear())
    const month = String(d.getUTCMonth() + 1)
    const day = String(d.getUTCDate())
    return `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`
}
export function shortToISODate(short: string): string {
    const [year, month, day] = [short.slice(0, 4), short.slice(4, 6), short.slice(6, 8)]
    return new Date(Number(year), Number(month) - 1, Number(day)).toISOString()
}
export function dateFilterExpand(s?: string): DateFilterOptions | undefined {
    /*
     * before -> <
     * after  -> >
     */
    if (s === undefined) return undefined
    const o: DateFilterOptions = {}
    const conditions = s.split(COND_SEPARATOR) ?? []
    conditions.forEach(c => {
        switch (c.at(0)) {
            case "<": {
                o.before = shortToISODate(c.slice(1))
            } break
            case ">": {
                o.after = shortToISODate(c.slice(1))
            }
        }
    })
    return o
}
export function dateFilterMinimize(f?: DateFilterOptions): string | undefined {
    /*
     * before -> <
     * after  -> >
     */
    if (f === undefined) return undefined
    const conditions: string[] = []
    if (f.before) {
        conditions.push(`<${ISOToShortDate(f.before)}`)
    }
    if (f.after) {
        conditions.push(`>${ISOToShortDate(f.after)}`)
    }
    return conditions.join(COND_SEPARATOR)
}

// PersistentObject

export function persistentObjectFilterExpand(s?: string): PersistentObjectFilterOptions | undefined {
    /*
     * createdAt -> pc
     * updatedAt -> pu
     */
    if (s === undefined) return undefined
    const o: PersistentObjectFilterOptions = {}
    const parameters = s?.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "pc") o.createdAt = dateFilterExpand(cond)
        else if (key === "pu") o.updatedAt = dateFilterExpand(cond)
    })
    return o
}
export function persistentObjectFilterMinimize(f?: PersistentObjectFilterOptions): string | undefined {
    /*
     * createdAt -> pc
     * updatedAt -> pu
     */
    if (f === undefined) return undefined
    const params: (string | undefined)[] = []
    if (f.createdAt) params.push(formatMinimizedParam("pc", dateFilterMinimize(f.createdAt)))
    if (f.updatedAt) params.push(formatMinimizedParam("pu", dateFilterMinimize(f.updatedAt)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}

// Character

export function characterFilterExpand(s?: string): CharacterFilterOptions | undefined {
    /*
     * name       -> n
     * isPlayable -> p
     */
    if (s === undefined) return undefined
    const o: CharacterFilterOptions = { ...persistentObjectFilterExpand(s) }
    const parameters = s.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "n") o.name = stringFilterExpand(cond)
        else if (key === "p") o.isPlayable = booleanFilterExpand(cond)
    })
    return o
}
export function characterFilterMinimize(f?: CharacterFilterOptions): string | undefined {
    /*
     * name       -> n
     * isPlayable -> p
     */
    if (f === undefined) return undefined
    const params: (string | undefined)[] = [persistentObjectFilterMinimize(f)]
    if (f.name !== undefined) params.push(formatMinimizedParam("n", stringFilterMinimize(f.name)))
    if (f.isPlayable !== undefined) params.push(formatMinimizedParam("p", booleanFilterMinimize(f.isPlayable)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}

// PDrink

export function pDrinkFilterExpand(s?: string): PDrinkFilterOptions | undefined {
    /*
     * name        -> n
     * plan        -> p
     * rarity      -> r
     * unlockLevel -> u
     */
    if (s === undefined) return undefined
    const o: PDrinkFilterOptions = { ...persistentObjectFilterExpand(s) }
    const parameters = s.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "n") o.name = stringFilterExpand(cond)
        else if (key === "p") o.plan = enumFilterExpand(cond)
        else if (key === "r") o.rarity = enumFilterExpand(cond)
        else if (key === "u") o.unlockLevel = numberFilterExpand(cond)
    })
    return o
}
export function pDrinkFilterMinimize(f?: PDrinkFilterOptions): string | undefined {
    /*
     * name        -> n
     * plan        -> p
     * rarity      -> r
     * unlockLevel -> u
     */
    if (f === undefined) return undefined
    const params: (string | undefined)[] = [persistentObjectFilterMinimize(f)]
    if (f.name !== undefined) params.push(formatMinimizedParam("n", stringFilterMinimize(f.name)))
    if (f.plan !== undefined) params.push(formatMinimizedParam("p", enumFilterMinimize(f.plan)))
    if (f.rarity !== undefined) params.push(formatMinimizedParam("r", enumFilterMinimize(f.rarity)))
    if (f.unlockLevel !== undefined) params.push(formatMinimizedParam("u", numberFilterMinimize(f.unlockLevel)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}

// PIdol

export function pIdolFilterExpand(s?: string): PIdolFilterOptions | undefined {
    /*
     * name                  -> n
     * character             -> c
     * rarity                -> r
     * plan                  -> p
     * isWelfare             -> w
     * hasPrimaStellaUpgrade -> s
     * hasTrainingLv7        -> t
     */
    if (s === undefined) return undefined
    const o: PIdolFilterOptions = { ...persistentObjectFilterExpand(s) }
    const parameters = s.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "n") o.name = stringFilterExpand(cond)
        else if (key === "c") o.character = enumFilterExpand(cond)
        else if (key === "r") o.rarity = enumFilterExpand(cond)
        else if (key === "p") o.plan = enumFilterExpand(cond)
        else if (key === "w") o.isWelfare = booleanFilterExpand(cond)
        else if (key === "s") o.hasPrimaStellaUpgrade = booleanFilterExpand(cond)
        else if (key === "t") o.hasTrainingLv7 = booleanFilterExpand(cond)
    })
    return o
}
export function pIdolFilterMinimize(f?: PIdolFilterOptions): string | undefined {
    /*
     * name                  -> n
     * character             -> c
     * rarity                -> r
     * plan                  -> p
     * isWelfare             -> w
     * hasPrimaStellaUpgrade -> s
     * hasTrainingLv7        -> t
     */
    if (f === undefined) return undefined
    const params: (string | undefined)[] = [persistentObjectFilterMinimize(f)]
    if (f.name !== undefined) params.push(formatMinimizedParam("n", stringFilterMinimize(f.name)))
    if (f.character !== undefined) params.push(formatMinimizedParam("c", enumFilterMinimize(f.character)))
    if (f.rarity !== undefined) params.push(formatMinimizedParam("r", enumFilterMinimize(f.rarity)))
    if (f.plan !== undefined) params.push(formatMinimizedParam("p", enumFilterMinimize(f.plan)))
    if (f.isWelfare !== undefined) params.push(formatMinimizedParam("w", booleanFilterMinimize(f.isWelfare)))
    if (f.hasPrimaStellaUpgrade !== undefined) params.push(formatMinimizedParam("s", booleanFilterMinimize(f.hasPrimaStellaUpgrade)))
    if (f.hasTrainingLv7 !== undefined) params.push(formatMinimizedParam("t", booleanFilterMinimize(f.hasTrainingLv7)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}

// PItem

export function pItemFilterExpand(s?: string): PItemFilterOptions | undefined {
    /*
     * name        -> n
     * plan        -> p
     * rarity      -> r
     * source      -> s
     * unlockLevel -> u
     */
    if (s === undefined) return undefined
    const o: PItemFilterOptions = { ...persistentObjectFilterExpand(s) }
    const parameters = s.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "n") o.name = stringFilterExpand(cond)
        else if (key === "p") o.plan = enumFilterExpand(cond)
        else if (key === "r") o.rarity = enumFilterExpand(cond)
        else if (key === "s") o.source = enumFilterExpand(cond)
        else if (key === "u") o.unlockLevel = numberFilterExpand(cond)
    })
    return o
}
export function pItemFilterMinimize(f?: PItemFilterOptions): string | undefined {
    /*
     * name        -> n
     * plan        -> p
     * rarity      -> r
     * source      -> s
     * unlockLevel -> u
     */
    if (f === undefined) return undefined
    const params: (string | undefined)[] = [persistentObjectFilterMinimize(f)]
    if (f.name !== undefined) params.push(formatMinimizedParam("n", stringFilterMinimize(f.name)))
    if (f.plan !== undefined) params.push(formatMinimizedParam("p", enumFilterMinimize(f.plan)))
    if (f.rarity !== undefined) params.push(formatMinimizedParam("r", enumFilterMinimize(f.rarity)))
    if (f.source !== undefined) params.push(formatMinimizedParam("s", enumFilterMinimize(f.source)))
    if (f.unlockLevel !== undefined) params.push(formatMinimizedParam("u", numberFilterMinimize(f.unlockLevel)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}

// Skill

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
    if (f.name !== undefined) params.push(formatMinimizedParam("n", stringFilterMinimize(f.name)))
    if (f.plan !== undefined) params.push(formatMinimizedParam("p", enumFilterMinimize(f.plan)))
    if (f.rarity !== undefined) params.push(formatMinimizedParam("r", enumFilterMinimize(f.rarity)))
    if (f.category !== undefined) params.push(formatMinimizedParam("a", enumFilterMinimize(f.category)))
    if (f.source !== undefined) params.push(formatMinimizedParam("s", enumFilterMinimize(f.source)))
    if (f.unlockLevel !== undefined) params.push(formatMinimizedParam("u", numberFilterMinimize(f.unlockLevel)))
    if (f.isCustomizable !== undefined) params.push(formatMinimizedParam("c", booleanFilterMinimize(f.isCustomizable)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}
export function skillConsolidateRarity(rarities: SkillRarity[]): SkillConsolidatedRarity[] {
    const consolidated: SkillConsolidatedRarity[] = []
    if (rarities.includes(SkillRarity.N)) consolidated.push(SkillConsolidatedRarity.N)
    if (rarities.includes(SkillRarity.RLow) || rarities.includes(SkillRarity.RHigh)) consolidated.push(SkillConsolidatedRarity.R)
    if (rarities.includes(SkillRarity.SRLow) || rarities.includes(SkillRarity.SRHigh)) consolidated.push(SkillConsolidatedRarity.SR)
    if (rarities.includes(SkillRarity.SSR)) consolidated.push(SkillConsolidatedRarity.SSR)
    if (rarities.includes(SkillRarity.Legend)) consolidated.push(SkillConsolidatedRarity.Legend)
    return consolidated
}
export function skillDeconsolidateRarity(consolidated: SkillConsolidatedRarity[]): SkillRarity[] {
    const rarities: SkillRarity[] = []
    if (consolidated.includes(SkillConsolidatedRarity.N)) rarities.push(SkillRarity.N)
    if (consolidated.includes(SkillConsolidatedRarity.R)) rarities.push(SkillRarity.RLow, SkillRarity.RHigh)
    if (consolidated.includes(SkillConsolidatedRarity.SR)) rarities.push(SkillRarity.SRLow, SkillRarity.SRHigh)
    if (consolidated.includes(SkillConsolidatedRarity.SSR)) rarities.push(SkillRarity.SSR)
    if (consolidated.includes(SkillConsolidatedRarity.Legend)) rarities.push(SkillRarity.Legend)
    return rarities
}
