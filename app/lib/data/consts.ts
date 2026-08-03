// api

export const API_URI = process.env.NEXT_PUBLIC_API_URI ?? "http://localhost:3001"
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION ?? "v1"

// filter expand/minimize

export const COND_SEPARATOR = ","
export const PARAM_DELIMITER = ":"
export const PARAM_SEPARATOR = ";"

// timings

export const INPUT_DEBOUNCE_TIME = 350
export const FILTER_DEBOUNCE_TIME = 500
export const URL_REPLACE_THROTTLE_TIME = 2000

// searchParam keys

export const SEARCH_PARAM_PAGE = "p"
export const SEARCH_PARAM_FILTER = "f"
export const SEARCH_PARAM_SORT = "s"
export const SEARCH_PARAM_PER_PAGE = "pp"

// cookie keys

export const COOKIE_PER_PAGE = "per-page"

// others

export const DEFAULT_PER_PAGE = 15
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
