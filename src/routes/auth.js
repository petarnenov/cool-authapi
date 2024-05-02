import { Router } from "express";
import controller from "../controller/index.js";
import middleware from "../middleware/index.js";

const auth = new Router();

//signup
auth.post(
  "/auth/signup",
  middleware.validator.signup,
  middleware.repository.signup,
  controller.signup
);

//login
auth.post(
  "/auth/login",
  middleware.validator.login,
  middleware.repository.login,
  controller.login
);

//logout
auth.post(
  "/auth/logout",
  middleware.authentication,
  middleware.repository.logout,
  controller.logout
);

//refresh token
auth.post(
  "/auth/refresh",
  middleware.validator.refresh,
  middleware.repository.refresh,
  controller.refreshToken
);

export default auth;
