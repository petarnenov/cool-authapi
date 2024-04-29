export const userNotFound = (res) =>
  res.status(404).json({ status: "fail", message: "User not found" });
export const invalidToken = (res) =>
  res.status(403).json({ status: "fail", message: "Invalid token" });
export const userNameAndPasswordRequired = (res) =>
  res
    .status(400)
    .json({ status: "fail", message: "Username and password required" });
export const userAlreadyExists = (res) =>
  res.status(400).json({ status: "fail", message: "User already exists" });
export const userDeletedOrDeactivated = (res) =>
  res
    .status(404)
    .json({ status: "fail", message: "User has been deleted or deactivated" });
export const usernameOrPasswordIncorrect = (res) =>
  res
    .status(400)
    .json({ status: "fail", message: "Username or password is incorrect" });
export const invalidRequest = (res) =>
  res.status(400).json({ status: "fail", message: "Invalid request" });
export const userNotAuthenticated = (res) =>
  res.status(401).json({ status: "fail", message: "User not authenticated" });
export const internalServerError = (res) =>
  res.status(500).json({ status: "fail", message: "Internal server error" });
