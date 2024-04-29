import jwt from "../jwt/index.js";
import response from "../response/index.js";

const authentication = async (req, res, next) => {
  const  decodedToken = await jwt.getDecodedAccessToken(req);
    if (!decodedToken) {
        return response.error.userNotAuthenticated(res);
        }    
    req.decodedToken = {...decodedToken};
    next()
}

export default authentication;
