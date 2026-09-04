// api

import { DropdownItem } from "@/components/input/DropdownMenu"
import { characterDefaultSortDirection, characterDefaultSortField, characterSortFields } from "@/lib/data/character"
import { pDrinkDefaultSortDirection, pDrinkDefaultSortField, pDrinkSortFields } from "@/lib/data/p-drink"
import { pIdolDefaultSortDirection, pIdolDefaultSortField, pIdolSortFields } from "@/lib/data/p-idol"
import { pItemDefaultSortDirection, pItemDefaultSortField, pItemSortFields } from "@/lib/data/p-item"
import { skillDefaultSortDirection, skillDefaultSortField, skillSortFields } from "@/lib/data/skill"
import { Sortable } from "@hatsuboshi/types"
import { SortDirection } from "@/lib/util/types"

export const API_URI = process.env.NEXT_PUBLIC_API_URI ?? "http://localhost:3001"
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? "v1"

// filter expand/minimize

export const COND_SEPARATOR = ","
export const PARAM_DELIMITER = ":"
export const PARAM_SEPARATOR = ";"

// timings

export const INPUT_DEBOUNCE_TIME = 250
export const FILTER_DEBOUNCE_TIME = 500
export const URL_REPLACE_THROTTLE_TIME = 1500

// searchParam keys

export const SEARCH_PARAM_PAGE = "p"
export const SEARCH_PARAM_FILTER = "f"
export const SEARCH_PARAM_SORT = "s"
export const SEARCH_PARAM_PER_PAGE = "pp"

// cookie keys

export const COOKIE_PER_PAGE = "per-page"
export const COOKIE_SORT_DIRECTION = "sort-dir"
export const COOKIE_SORT_FIELD = "sort-by"

// others

export const DEFAULT_LOCALE = "ja"
export const DEFAULT_PER_PAGE = 15
export const DEFAULT_SORT_FIELD = "updatedAt"
export const DEFAULT_SORT_DIRECTION = "asc"
export const MAX_P_LEVEL = 80
export const PATHS = {
    character: "character",
    pDrink: "p-drink",
    pIdol: "p-idol",
    pItem: "p-item",
    skill: "skill",
    supportCard: "support-card"
}
export const API_PATHS = {
    effect: "effects",
    terminology: "terminologies",
    character: "characters",
    pDrink: "p-drinks",
    pIdol: "p-idols",
    pItem: "p-items",
    skill: "skills",
    supportCard: "support-cards"
}
export const ALL_SORT_FIELDS: { [key: string]: DropdownItem[] } = {
    [`/${PATHS.character}`]: characterSortFields,
    [`/${PATHS.pDrink}`]: pDrinkSortFields,
    [`/${PATHS.pIdol}`]: pIdolSortFields,
    [`/${PATHS.pItem}`]: pItemSortFields,
    [`/${PATHS.skill}`]: skillSortFields,
}
export const DEFAULT_SORT_FIELDS: { [key: string]: Sortable<any> } = {
    [`/${PATHS.character}`]: characterDefaultSortField,
    [`/${PATHS.pDrink}`]: pDrinkDefaultSortField,
    [`/${PATHS.pIdol}`]: pIdolDefaultSortField,
    [`/${PATHS.pItem}`]: pItemDefaultSortField,
    [`/${PATHS.skill}`]: skillDefaultSortField,
}
export const DEFAULT_SORT_DIRECTIONS: { [key: string]: SortDirection } = {
    [`/${PATHS.character}`]: characterDefaultSortDirection,
    [`/${PATHS.pDrink}`]: pDrinkDefaultSortDirection,
    [`/${PATHS.pIdol}`]: pIdolDefaultSortDirection,
    [`/${PATHS.pItem}`]: pItemDefaultSortDirection,
    [`/${PATHS.skill}`]: skillDefaultSortDirection,
}
