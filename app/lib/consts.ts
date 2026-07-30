import dotenv from 'dotenv'

dotenv.config({ quiet: true })

export let API_URI: string
export let ENV: "local" | "development" | "production"
export let PER_PAGE = 15

export let COND_SEPARATOR = ","
export let PARAM_DELIMITER = ":"
export let PARAM_SEPARATOR = ";"

switch (process.env.NEXT_PUBLIC_ENV) {
    case "development": {
        API_URI = "https://api-dev.hatsuboshi.app"
        ENV = "development"
        break
    }
    case "production": {
        API_URI = "https://api.hatsuboshi.app"
        ENV = "production"
        break
    }
    default: {
        API_URI = "http://localhost:3001/v1"
        ENV = "local"
    }
}