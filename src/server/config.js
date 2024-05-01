const cors = {
     
    origin:
      process.env.NOD_ENV === "production"
        ? ["http://192.168.0.164:5173"]
        : ["http://localhost:5173", "http://127.0.0.1:5173", "http://192.168.0.164:5173"],
    credentials: true,
  };

const config = {
    cors,
    };

export default config;
