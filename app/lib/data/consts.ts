import dotenv from 'dotenv'

dotenv.config({ quiet: true })

export let API_URI: string
export let ENV: "local" | "development" | "production"
export let PER_PAGE = 15

export let API_VERSION = "v1"
export let COND_SEPARATOR = ","
export let PARAM_DELIMITER = ":"
export let PARAM_SEPARATOR = ";"

export let SEARCH_PARAM_FILTER = "f"
export let SEARCH_PARAM_SORT = "s"
export let SEARCH_PARAM_PAGE = "p"
export let SEARCH_PARAM_PER_PAGE = "pp"

export let MAX_P_LEVEL = 80

switch (process.env.NEXT_PUBLIC_ENV) {
    case "production": {
        API_URI = `https://api.hatsuboshi.app`
        ENV = "production"
        break
    }
    case "development": {
        API_URI = `https://api-dev.hatsuboshi.app`
        ENV = "development"
        break
    }
    default: {
        API_URI = `http://localhost:3001`
        ENV = "local"
    }
}