import express from "express";
import cors from "cors";
import helmet from "helmet";
import controller from "../controller/index.js";
import middleware from "../middleware/index.js";
import config from "./config.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors(config.cors));
app.use(express.json());
app.all("*", middleware.rateLimiter());

//greet
app.get("/", controller.greet);
//signup
app.post("/api/auth/signup", controller.signUp);
//login
app.post("/api/auth/login", controller.login);
//logout
app.post("/api/auth/logout", middleware.authentication,controller.logout);
//refresh token
app.post("/api/auth/refresh", controller.refreshToken);
//delete user
app.delete("/api/auth/user/:id", middleware.authentication, controller.deleteUserById);
//update user
app.put("/api/auth/user/:id", middleware.authentication, controller.updateUserById);
//get all users
app.get("/api/auth/user", middleware.authentication, controller.getAllUsers);

export default app;
