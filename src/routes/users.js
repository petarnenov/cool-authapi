import { Router } from "express";
import controller from "../controller/index.js";
import middleware from "../middleware/index.js";

const users = new Router();

//delete user
users.delete(
  "/users/:id",
  middleware.authentication,
  controller.deleteUserById
);

//update user
users.patch("/users/:id", middleware.authentication, controller.updateUserById);

//get user by id
users.get("/users/:id", middleware.authentication, controller.getUserById);

//get all users
users.get("/users", middleware.authentication, controller.getAllUsers);


export default users;
