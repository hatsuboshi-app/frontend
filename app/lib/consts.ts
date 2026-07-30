import dotenv from 'dotenv'

dotenv.config({ quiet: true })

export let API_URI: string
export let ENV: "local" | "development" | "production"
export let PER_PAGE = 15

export let API_VERSION = "v1"
export let COND_SEPARATOR = ","
export let PARAM_DELIMITER = ":"
export let PARAM_SEPARATOR = ";"

switch (process.env.NEXT_PUBLIC_ENV) {
    case "production": {
        API_URI = `https://api.hatsuboshi.app/${API_VERSION}`
        ENV = "production"
        break
    }
    case "development": {
        API_URI = `https://api-dev.hatsuboshi.app/${API_VERSION}`
        ENV = "development"
        break
    }
    default: {
        API_URI = `http://localhost:3001/${API_VERSION}`
        ENV = "local"
    }
}