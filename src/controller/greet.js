import response from "../response/index.js"

const greet = (req, res) => {
    response.success.other.greet(res)
}

export default greet;
