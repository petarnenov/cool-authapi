//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
import server from "./server/index.js";

const port = process.env.PORT || 3001;
try {
  server.listen(port, () => {
    console.log("Server is running on port 3001");
  });
} catch (err) {
  console.error(`server crash with error: ${err}`);
}
