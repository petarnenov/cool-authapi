import response from "../response/index.js";

const greet = (req, res) => {
  console.log("greet");
  res
    .status(200)
    .json(response.success.other(req.user, response.success.GREET.HELLO));
};

export default greet;
