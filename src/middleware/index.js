import  rateLimiter from "./rateLimiter.js"
import  authentication from "./authentication.js"
import  authorization from "./authorization.js"

const middleware = {
    rateLimiter,
    authentication,
    authorization
}

export default middleware;
