const consoleLogger = (req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} - ${req.url} - ${req.ip}`,
  );
  next();
};

export default consoleLogger;
