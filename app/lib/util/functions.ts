import {
    CharacterFilter,
    DateFilterOptions,
    EnumFilterOptions,
    LocaleStringFilterOptions,
    NumberFilterOptions, PDrinkFilter, PersistentObjectFilter, PIdolFilter, PItemFilter, SkillFilter,
    SortOption
} from "@hatsuboshi/types"
import {
    COND_SEPARATOR,
    PARAM_DELIMITER,
    PARAM_SEPARATOR,
    SEARCH_PARAM_FILTER,
    SEARCH_PARAM_PAGE
} from "@/lib/util/consts"
import { ReactSetter } from "@/lib/util/types"
import { SearchParams } from "next/dist/server/request/search-params"
import { decompressFromEncodedURIComponent } from "lz-string"

export function getPageFromQuery(q: SearchParams): number {
    const page = q[SEARCH_PARAM_PAGE]
    try {
        return page
            ? typeof page === "string"
                ? Number(page)
                : Number(page[0])
            : 1
    } catch {
        return 1
    }
}

export function getFilterFromQuery<F extends {}>(q: SearchParams, filterExpand: (s?: string) => F | undefined): F | undefined {
    const filter = q[SEARCH_PARAM_FILTER]
    return filter
        ? filterExpand(decompressFromEncodedURIComponent(typeof filter === "string" ? filter : filter[0]))
        : undefined
}

export function formatMinimizedParam(key: string, condition: string | undefined): string | undefined {
    if (condition === undefined) return undefined
    return `${key}${PARAM_DELIMITER}${condition}`
}

export function prependSortOption<T>(s: SortOption<T>, s1: SortOption<T>[]): SortOption<T>[] {
    const s2 = s1.filter(i => i.attribute !== s.attribute)
    return [ s, ...s2 ]
}

// string

export function decodeStringFilter(s?: string): LocaleStringFilterOptions | undefined {
    /*
     * type: "Search"           -> ?
     *   search:                -> [*]
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
export function encodeStringFilter(f?: LocaleStringFilterOptions): string | undefined {
    /*
     * type: "Search"           -> ?
     *   search:                -> [*]
     *
     * type: "IncompleteLocale" -> !
     *   missingJa:             -> j
     *   missingEn:             -> e
     *   missingRo:             -> r
     */
    if (f === undefined) return undefined
    if (f.type === "Search") {
        return `?${f.search}`
    }
    if (f.type === "IncompleteLocale") {
        return `!${f.missingJa ? "j" : ""}${f.missingEn ? "e" : ""}${f.missingRo ? "r" : ""}`
    }
}
export function getStringFilterDefaultValue(f?: LocaleStringFilterOptions): string | undefined {
    return f?.type === "Search" ? f.search : undefined
}
export function handleStringFilterInput<T>(setFilter: ReactSetter<T>, field: keyof T, value: string) {
    setFilter(f => {
        const newFilter = { ...f } as T
        if (!value) delete (newFilter as any)[field]
        else (newFilter as any)[field] = { type: "Search", search: value }
        return newFilter
    })
}

// number

export function decodeNumberFilter(s?: string): NumberFilterOptions | undefined {
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
export function encodeNumberFilter(f?: NumberFilterOptions): string | undefined {
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
export function getNumberFilterDefaultValue(f?: NumberFilterOptions): { gte?: number, lte?: number } | undefined {
    return f
}
export function handleNumberFilterInput<T>(setFilter: ReactSetter<T>, field: keyof T, value: { gte?: number, lte?: number }) {
    setFilter(f => {
        const newFilter = { ...f } as T
        if (value.gte === undefined && value.lte === undefined) delete (newFilter as any)[field]
        else (newFilter as any)[field] = value
        return newFilter
    })
}

// boolean

export function decodeBooleanFilter(s?: string): boolean | undefined {
    if (s === undefined) return undefined
    return s === "t" ? true : s === "f" ? false : undefined
}
export function encodeBooleanFilter(f?: boolean): string | undefined {
    /*
     * true  -> t
     * false -> f
     */
    if (f === undefined) return undefined
    return f ? "t" : "f"
}
export function getBooleanFilterDefaultValue<T>(filter?: T, fields?: (keyof T)[]): Partial<Record<keyof T, boolean>> | undefined {
    if (!filter || !fields) return undefined
    return fields.reduce((a, v) => {
        return filter[v] !== undefined
            ? { ...a, [v]: filter[v] as boolean }
            : a
    }, {})
}
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

// Enum

export function decodeEnumFilter<T>(s?: string): EnumFilterOptions<T> | undefined {
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
export function encodeEnumFilter<T>(f?: EnumFilterOptions<T>): string | undefined {
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
export function getEnumFilterDefaultValue<T>(f?: EnumFilterOptions<T>): T[] | undefined {
    return f?.include
}
export function handleEnumFilterInput<T>(setFilter: ReactSetter<T>, field: keyof T, value: any[]) {
    setFilter(f => {
        const newFilter = { ...f } as T
        if (value.length === 0) delete (newFilter as any)[field]
        else (newFilter as any)[field] = { include: value }
        return newFilter
    })
}

// Date

export function decodeDateFilter(s?: string): DateFilterOptions | undefined {
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
export function encodeDateFilter(f?: DateFilterOptions): string | undefined {
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

// PersistentObject

export function decodePersistentObjectFilter(s?: string): PersistentObjectFilter | undefined {
    /*
     * createdAt -> pc
     * updatedAt -> pu
     */
    if (s === undefined) return undefined
    const o: PersistentObjectFilter = {}
    const parameters = s?.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "pc") o.createdAt = decodeDateFilter(cond)
        else if (key === "pu") o.updatedAt = decodeDateFilter(cond)
    })
    return o
}
export function encodePersistentObjectFilter(f?: PersistentObjectFilter): string | undefined {
    /*
     * createdAt -> pc
     * updatedAt -> pu
     */
    if (f === undefined) return undefined
    const params: (string | undefined)[] = []
    if (f.createdAt) params.push(formatMinimizedParam("pc", encodeDateFilter(f.createdAt)))
    if (f.updatedAt) params.push(formatMinimizedParam("pu", encodeDateFilter(f.updatedAt)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}

// Character

export function decodeCharacterFilter(s?: string): CharacterFilter | undefined {
    /*
     * name       -> n
     * isPlayable -> p
     */
    if (s === undefined) return undefined
    const o: CharacterFilter = { ...decodePersistentObjectFilter(s) }
    const parameters = s.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "n") o.name = decodeStringFilter(cond)
        else if (key === "p") o.isPlayable = decodeBooleanFilter(cond)
    })
    return o
}
export function encodeCharacterFilter(f?: CharacterFilter): string | undefined {
    /*
     * name       -> n
     * isPlayable -> p
     */
    if (f === undefined) return undefined
    const params: (string | undefined)[] = [encodePersistentObjectFilter(f)]
    if (f.name !== undefined) params.push(formatMinimizedParam("n", encodeStringFilter(f.name)))
    if (f.isPlayable !== undefined) params.push(formatMinimizedParam("p", encodeBooleanFilter(f.isPlayable)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}

// PDrink

export function decodePDrinkFilter(s?: string): PDrinkFilter | undefined {
    /*
     * name        -> n
     * plan        -> p
     * rarity      -> r
     * unlockLevel -> u
     */
    if (s === undefined) return undefined
    const o: PDrinkFilter = { ...decodePersistentObjectFilter(s) }
    const parameters = s.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "n") o.name = decodeStringFilter(cond)
        else if (key === "p") o.plan = decodeEnumFilter(cond)
        else if (key === "r") o.rarity = decodeEnumFilter(cond)
        else if (key === "u") o.unlockLevel = decodeNumberFilter(cond)
    })
    return o
}
export function encodePDrinkFilter(f?: PDrinkFilter): string | undefined {
    /*
     * name        -> n
     * plan        -> p
     * rarity      -> r
     * unlockLevel -> u
     */
    if (f === undefined) return undefined
    const params: (string | undefined)[] = [encodePersistentObjectFilter(f)]
    if (f.name !== undefined) params.push(formatMinimizedParam("n", encodeStringFilter(f.name)))
    if (f.plan !== undefined) params.push(formatMinimizedParam("p", encodeEnumFilter(f.plan)))
    if (f.rarity !== undefined) params.push(formatMinimizedParam("r", encodeEnumFilter(f.rarity)))
    if (f.unlockLevel !== undefined) params.push(formatMinimizedParam("u", encodeNumberFilter(f.unlockLevel)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}

// PIdol

export function decodePIdolFilter(s?: string): PIdolFilter | undefined {
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
    const o: PIdolFilter = { ...decodePersistentObjectFilter(s) }
    const parameters = s.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "n") o.name = decodeStringFilter(cond)
        else if (key === "c") o.character = decodeEnumFilter(cond)
        else if (key === "r") o.rarity = decodeEnumFilter(cond)
        else if (key === "p") o.plan = decodeEnumFilter(cond)
        else if (key === "w") o.isWelfare = decodeBooleanFilter(cond)
        else if (key === "s") o.hasPrimaStellaUpgrade = decodeBooleanFilter(cond)
        else if (key === "t") o.hasTrainingLv7 = decodeBooleanFilter(cond)
    })
    return o
}
export function encodePIdolFilter(f?: PIdolFilter): string | undefined {
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
    const params: (string | undefined)[] = [encodePersistentObjectFilter(f)]
    if (f.name !== undefined) params.push(formatMinimizedParam("n", encodeStringFilter(f.name)))
    if (f.character !== undefined) params.push(formatMinimizedParam("c", encodeEnumFilter(f.character)))
    if (f.rarity !== undefined) params.push(formatMinimizedParam("r", encodeEnumFilter(f.rarity)))
    if (f.plan !== undefined) params.push(formatMinimizedParam("p", encodeEnumFilter(f.plan)))
    if (f.isWelfare !== undefined) params.push(formatMinimizedParam("w", encodeBooleanFilter(f.isWelfare)))
    if (f.hasPrimaStellaUpgrade !== undefined) params.push(formatMinimizedParam("s", encodeBooleanFilter(f.hasPrimaStellaUpgrade)))
    if (f.hasTrainingLv7 !== undefined) params.push(formatMinimizedParam("t", encodeBooleanFilter(f.hasTrainingLv7)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}

// PItem

export function decodePItemFilter(s?: string): PItemFilter | undefined {
    /*
     * name        -> n
     * plan        -> p
     * rarity      -> r
     * source      -> s
     * unlockLevel -> u
     */
    if (s === undefined) return undefined
    const o: PItemFilter = { ...decodePersistentObjectFilter(s) }
    const parameters = s.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "n") o.name = decodeStringFilter(cond)
        else if (key === "p") o.plan = decodeEnumFilter(cond)
        else if (key === "r") o.rarity = decodeEnumFilter(cond)
        else if (key === "s") o.source = decodeEnumFilter(cond)
        else if (key === "u") o.unlockLevel = decodeNumberFilter(cond)
    })
    return o
}
export function encodePItemFilter(f?: PItemFilter): string | undefined {
    /*
     * name        -> n
     * plan        -> p
     * rarity      -> r
     * source      -> s
     * unlockLevel -> u
     */
    if (f === undefined) return undefined
    const params: (string | undefined)[] = [encodePersistentObjectFilter(f)]
    if (f.name !== undefined) params.push(formatMinimizedParam("n", encodeStringFilter(f.name)))
    if (f.plan !== undefined) params.push(formatMinimizedParam("p", encodeEnumFilter(f.plan)))
    if (f.rarity !== undefined) params.push(formatMinimizedParam("r", encodeEnumFilter(f.rarity)))
    if (f.source !== undefined) params.push(formatMinimizedParam("s", encodeEnumFilter(f.source)))
    if (f.unlockLevel !== undefined) params.push(formatMinimizedParam("u", encodeNumberFilter(f.unlockLevel)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}

// Skill

export function decodeSkillFilter(s?: string): SkillFilter | undefined {
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
    const o: SkillFilter = { ...decodePersistentObjectFilter(s) }
    const parameters = s.split(PARAM_SEPARATOR) ?? []
    parameters.forEach(p => {
        const [key, cond] = p.split(PARAM_DELIMITER)
        if (key === "n") o.name = decodeStringFilter(cond)
        else if (key === "p") o.plan = decodeEnumFilter(cond)
        else if (key === "r") o.rarity = decodeEnumFilter(cond)
        else if (key === "a") o.category = decodeEnumFilter(cond)
        else if (key === "s") o.source = decodeEnumFilter(cond)
        else if (key === "u") o.unlockLevel = decodeNumberFilter(cond)
        else if (key === "c") o.isCustomizable = decodeBooleanFilter(cond)
    })
    return o
}
export function encodeSkillFilter(f?: SkillFilter): string | undefined {
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
    const params: (string | undefined)[] = [encodePersistentObjectFilter(f)]
    if (f.name !== undefined) params.push(formatMinimizedParam("n", encodeStringFilter(f.name)))
    if (f.plan !== undefined) params.push(formatMinimizedParam("p", encodeEnumFilter(f.plan)))
    if (f.rarity !== undefined) params.push(formatMinimizedParam("r", encodeEnumFilter(f.rarity)))
    if (f.category !== undefined) params.push(formatMinimizedParam("a", encodeEnumFilter(f.category)))
    if (f.source !== undefined) params.push(formatMinimizedParam("s", encodeEnumFilter(f.source)))
    if (f.unlockLevel !== undefined) params.push(formatMinimizedParam("u", encodeNumberFilter(f.unlockLevel)))
    if (f.isCustomizable !== undefined) params.push(formatMinimizedParam("c", encodeBooleanFilter(f.isCustomizable)))
    return params.filter(p => p).join(PARAM_SEPARATOR)
}
