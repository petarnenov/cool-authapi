import { Router } from "express";
import controller from "../controller/index.js";
import middleware from "../middleware/index.js";

const auth = new Router();

//signup
auth.post(
  "/auth/signup",
  middleware.validator.auth.signup,
  middleware.repository.auth.signup,
  controller.signup,
);

//login
auth.post(
  "/auth/login",
  middleware.validator.auth.login,
  middleware.repository.auth.login,
  controller.login,
);

//logout
auth.post(
  "/auth/logout",
  middleware.authentication,
  middleware.repository.auth.logout,
  controller.logout,
);

//refresh token
auth.post(
  "/auth/refresh",
  middleware.validator.auth.refresh,
  middleware.repository.auth.refresh,
  controller.refreshToken,
);

export default auth;
