export const userNotFound = (res) =>
  res.status(404).json({ status: 404, statusMessage: "User not found" });
export const invalidToken = (res) =>
  res.status(403).json({ status: 403, statusMessage: "Invalid token" });
export const userNameAndPasswordRequired = (res) =>
  res
    .status(400)
    .json({ status: 400, statusMessage: "Username and password required" });
export const userAlreadyExists = (res) =>
  res.status(400).json({ status: 400, statusMessage: "User already exists" });
export const userDeletedOrDeactivated = (res) =>
  res
    .status(404)
    .json({ status: 404, statusMessage: "User has been deleted or deactivated" });
export const usernameOrPasswordIncorrect = (res) =>
  res
    .status(400)
    .json({ status: 400, statusMessage: "Username or password is incorrect" });
export const invalidRequest = (res) =>
  res.status(400).json({ status: 400, statusMessage: "Invalid request" });
export const userNotAuthenticated = (res) =>
  res.status(401).json({ status: 401, statusMessage: "User not authenticated" });
export const internalServerError = (res) =>
  res.status(500).json({ status: 500, statusMessage: "Internal server error" });
export const tooManyRequests = (res) =>
  res.status(429).json({ status: 429, statusMessage: "Too many requests" });
  