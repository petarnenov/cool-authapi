import express from "express";
import cors from "cors";
import helmet from "helmet";
import middleware from "../middleware/index.js";
import routes from "../routes/index.js";
import config from "./config.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors(config.cors));
app.use(express.json());
app.enable("trust proxy"); //nginx required
app.all("*", middleware.logger.console, middleware.utils.rateLimiter());

app.use(config.routes.version.v1, routes.info);
app.use(config.routes.version.v1, routes.auth);
app.use(config.routes.version.v1, routes.users);

app.use(middleware.utils.errorHandler);

export default app;
