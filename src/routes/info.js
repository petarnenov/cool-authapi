import { Router } from "express";

const info = new Router();

info.get("/info", (req, res) => {
  res.status(200).json({
    message: "This is a simple API",
  });
});

export default info;
