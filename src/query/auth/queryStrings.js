const queryStrings = {
  createUser:
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, active, admin, roles",
  getUserByName: "SELECT * FROM users WHERE username = $1",  
};

export default queryStrings;
