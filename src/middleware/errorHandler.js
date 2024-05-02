import response from "../response/index.js";

const errorHandler = (err, req, res, next) => {
  console.log("hit the error handler");

  const statusCode = err.statusCode || 500;

  const errorMessage =
    response.error.message[statusCode] || response.error.message[500];

  res.status(statusCode).json(errorMessage);
};

export default errorHandler;
