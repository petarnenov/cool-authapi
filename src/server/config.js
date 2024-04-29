const cors = {
     
    origin:
      process.env.NOD_ENV === "production"
        ? false
        : ["http://localhost", "http://127.0.0.1", "http://192.168.0.164"],
    credentials: true,
  };

const config = {
    cors,
    };

export default config;
