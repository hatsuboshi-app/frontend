import { PersistentObjectFilterOptions } from "@hatsuboshi/types/dist/class/abstract/PersistentObject"
import {
    DateFilterOptions,
    EnumFilterOptions,
    LocaleStringFilterOptions,
    NumberFilterOptions
} from "@hatsuboshi/types"
import { COND_SEPARATOR, PARAM_DELIMITER, PARAM_SEPARATOR } from "@/lib/consts"

export function getHeader(): Headers {
    const headers: Headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Accept", "application/json")
    return headers
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

export function booleanFilterMinimize(f?: boolean): string | undefined {
    /*
     * true  -> t
     * false -> f
     */
    if (f === undefined) return undefined
    return f ? "t" : "f"
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

export function booleanFilterExpand(s?: string): boolean | undefined {
    if (s === undefined) return undefined
    return s === "t" ? true : s === "f" ? false : undefined
}

export function formatMinimizedParam(key: string, condition: string | undefined): string | undefined {
    if (condition === undefined) return undefined
    return `${key}${PARAM_DELIMITER}${condition}`
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