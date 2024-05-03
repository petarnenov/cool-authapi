import redis from "../index.js";

const accessTokenExpiresIn = process.env.REDIS_ACCESS_TOKEN_EXPIRES_IN;
const refreshTokenExpiresIn = process.env.REDIS_REFRESH_TOKEN_EXPIRES_IN;

const redisIsNotReady = async () =>
  Promise.reject(new Error("Redis is not ready"));

const setToken = async ({ token, type, expireIn, userId }) => {
  if (!redis.client.isReady) {
    return await redisIsNotReady();
  }
  return await redis.client
    .multi()
    .set(`${token}:${userId}:${type}`, token, { EX: expireIn })
    .exec();
};

const getToken = async ({ token, type, userId }) => {
  if (!redis.client.isReady) {
    return await redisIsNotReady();
  }
  return await redis.client.get(`${token}:${userId}:${type}`);
};

const deleteToken = async ({ token, type, userId }) => {
  if (!redis.client.isReady) {
    return await redisIsNotReady();
  }
  return await redis.client.del(`${token}:${userId}:${type}`);
};

export const setAccessToken = (userId) => async (accessToken) => {
  return await setToken({
    token: accessToken,
    type: "access",
    expireIn: accessTokenExpiresIn,
    userId: userId,
  });
};

export const setRefreshToken = (userId) => async (refreshToken) => {
  return await setToken({
    token: refreshToken,
    type: "refresh",
    expireIn: refreshTokenExpiresIn,
    userId: userId,
  });
};

export const getAccessToken = (userId) => async (token) => {
  return await getToken({
    token,
    type: "access",
    userId,
  });
};

export const getRefreshToken = (userId) => async (token) => {
  return await getToken({
    token,
    type: "refresh",
    userId,
  });
};

export const deleteAccessToken = (userId) => async (token) => {
  return await deleteToken({
    token,
    type: "access",
    userId,
  });
};

export const deleteRefreshToken = (userId) => async (token) => {
  return await deleteToken({
    token,
    type: "refresh",
    userId,
  });
};

export const incrAttempts = async (ip) => {
  if (!redis.client.isReady) {
    return await redisIsNotReady();
  }
  return await redis.client.multi().incr(ip).expire(ip, 60).exec();
};
