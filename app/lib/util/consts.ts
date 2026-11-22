import { characterMetadata } from "@/lib/metadata/resource/character"
import { ResourceMetadata } from "@/lib/util/types"
import { pDrinkMetadata } from "@/lib/metadata/resource/p-drink";
import { pIdolMetadata } from "@/lib/metadata/resource/p-idol";
import { pItemMetadata } from "@/lib/metadata/resource/p-item";
import { skillMetadata } from "@/lib/metadata/resource/skill";

// api
export const API_URI             = process.env.NEXT_PUBLIC_API_URI ?? "http://localhost:3001"
export const API_VERSION         = process.env.NEXT_PUBLIC_API_VERSION ?? "v1"

// filter expand/minimize
export const COND_SEPARATOR             = ","
export const PARAM_DELIMITER            = ":"
export const PARAM_SEPARATOR            = ";"

// timings
export const INPUT_DEBOUNCE_TIME        = 250
export const FILTER_DEBOUNCE_TIME       = 500
export const URL_REPLACE_THROTTLE_TIME  = 1500

// searchParam keys
export const SEARCH_PARAM_PAGE          = "p"
export const SEARCH_PARAM_FILTER        = "f"

// cookie keys
export const COOKIE_PER_PAGE            = "per-page"
export const COOKIE_SORT_DIRECTION      = "sort-dir"
export const COOKIE_SORT_FIELD          = "sort-by"

// others
export const DEFAULT_PER_PAGE           = 15
export const DEFAULT_LOCALE             = "ja"
export const MAX_P_LEVEL                = 90

export const PATHS = {
    character:   "character",
    pDrink:      "p-drink",
    pIdol:       "p-idol",
    pItem:       "p-item",
    skill:       "skill",
    supportCard: "support-card"
}

export const API_PATHS = {
    effect:      "effects",
    terminology: "terminologies",
    character:   "characters",
    pDrink:      "p-drinks",
    pIdol:       "p-idols",
    pItem:       "p-items",
    skill:       "skills",
    supportCard: "support-cards"
}

export const RESOURCE_METADATA = {
    [`/${PATHS.character}`]: characterMetadata,
    [`/${PATHS.pDrink}`]:    pDrinkMetadata,
    [`/${PATHS.pIdol}`]:     pIdolMetadata,
    [`/${PATHS.pItem}`]:     pItemMetadata,
    [`/${PATHS.skill}`]:     skillMetadata,
} as const satisfies
    Record<`/${typeof PATHS[keyof typeof PATHS]}`, ResourceMetadata<any, any>>
