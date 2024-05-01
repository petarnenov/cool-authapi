import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;
const accessTokenExpiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "5min";
const refreshTokenExpiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "1d";

const createToken = (payload, expiresIn) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
}

export const createAccessToken = (payload) => {
  return createToken(payload, accessTokenExpiresIn);
};

export const createRefreshToken = (payload) => {
  return createToken(payload, refreshTokenExpiresIn);
};

export const verify = (token) =>
  new Promise((resolve) => {
    console.log("secret", secret)
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {        
        return resolve(null)
      }     
      resolve(decoded);
    });
  });

export const getAccessToken = (req) => {
  return req.headers.authorization?.split(" ")[1];
};

export const getDecodedAccessToken = async (req) => {
  const token = getAccessToken(req);
  if (!token) {
    return null;
  }
  return await verify(token);
}

export const getRefreshToken = (req) => {
  console.log("req.body", req.body)
  return req.body.refreshToken;
};

export const getDecodedRefreshToken = async (req) => {
  const refreshToken = getRefreshToken(req);
  if (!refreshToken) {
    return null;
  }
  return await verify(refreshToken);
}
