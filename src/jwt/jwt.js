import jwt from "jsonwebtoken";
import dotenv from "dotenv";

  dotenv.config();

const secret = process.env.JWT_SECRET;

export const createAccessToken = (payload, expiresIn = "5min") => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const createRefreshToken = (payload, expiresIn = "1d") => {
  return createAccessToken(payload, expiresIn);
};

export const verify = (token) =>
  new Promise((resolve) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        resolve(null)
      }
      resolve(decoded);
    });
  });

export const decode = (token) => {
  return jwt.decode(token);
};

export const getToken = (req) => {
  return req.headers.authorization?.split(" ")[1];
};

export const getDecodedAccessToken = async (req) => {
  const token = getToken(req);
  if (!token) {
    return null;
  }
  return await verify(token);
}

export const getDecodedRefreshToken = async (req) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return null;
  }
  return await verify(refreshToken);
}
