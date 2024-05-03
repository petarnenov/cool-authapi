import { Router } from "express";
import controller from "../controller/index.js";

const info = new Router();

info.get("/info", controller.greet);

export default info;
