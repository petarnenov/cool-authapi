import { Router } from "express";
import controller from "../controller/index.js";
import middleware from "../middleware/index.js";

const users = new Router();

//delete user
users.delete(
  "/users/:id",
  middleware.authentication,
  middleware.validator.users.deleteUserById,
  middleware.repository.users.deleteUserById,
  controller.deleteUserById,
);

//update user
users.patch(
  "/users/:id",
  middleware.authentication,
  middleware.validator.users.updateUserById,
  middleware.repository.users.updateUserById,
  controller.updateUserById,
);

//get user by id
users.get(
  "/users/:id",
  middleware.authentication,
  middleware.validator.users.getUserById,
  middleware.repository.users.getUserById,
  controller.getUserById,
);

//get all users
users.get(
  "/users",
  middleware.authentication,
  middleware.validator.users.getAllUsers,
  middleware.repository.users.getAllUsers,
  controller.getAllUsers,
);

export default users;
