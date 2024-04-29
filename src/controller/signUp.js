const signUp = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ loggedIn: false, status: "Username and password are required" });
  }

  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (result.rows.length) {
    return res
      .status(401)
      .json({ loggedIn: false, status: "Username already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username, id",
    [username, hashPassword]
  );

  res.status(200).json({ loggedIn: true, status: "User created", username });
};

export default signUp;
