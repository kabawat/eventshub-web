import SECRETS from "@/configs/env.configs"
const environment = SECRETS.ENVIRONMENT
const fetchBaseURL = () => {
    if (environment == "development") {
        return SECRETS.LOCAL_API_URL
    }
    if (environment == "production") {
        return SECRETS.PRODUCTION_API_URL
    }
}
const baseURL = fetchBaseURL()
const URLs = {
    // auth URLs 
    BASE_URL: baseURL,
    LOGIN: `/admin/login`,
    PROFILE: `/admin/profile`,
    EVENTS: "/events"
}
export default URLs
