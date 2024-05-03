const cacheControl = (req, res, next) => {
  res.setHeader("Cache-Control", "no-store");

  const period = 60 * 5;
  if (req.method === "GET") {
    res.setHeader("Cache-Control", `public, max-age=${period}`);
  }

  next();
};

export default cacheControl;

