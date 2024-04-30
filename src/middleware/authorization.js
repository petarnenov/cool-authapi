const authorization =
  (authorizedRoles = []) =>
  (req, res, next) => {
    const { role } = req.user;
    if (!role) {
      return res.status(401).json({ status: "Unauthorized action" });
    }

    if (!authorizedRoles.includes(role)) {
      return res.status(401).json({ status: "Unauthorized action" });
    }

    next();
  };

export default authorization;
