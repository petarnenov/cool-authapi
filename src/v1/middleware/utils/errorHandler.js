import response from "../../response/index.js";

const errorHandler = (err, req, res, next) => {
  console.log("hit the error handler");

  err.status = err.status || 500;
  err.statusMessage = err.statusMessage || "Internal Server Error";

  res.status(err.status).json(err);
};

export default errorHandler;
