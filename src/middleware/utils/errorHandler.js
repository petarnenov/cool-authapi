import response from "../../response/index.js";

const errorHandler = (err, req, res, next) => {
  console.log("hit the error handler");

  const status = err.status || 500;

  const errorMessage = err.statusMessage || "Internal Server Error";

  res.status(status).json(errorMessage);
};

export default errorHandler;
