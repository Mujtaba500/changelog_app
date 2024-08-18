import config from "./config";
import app from "./app";

app.listen(config.port, () => {
  const address = `http://localhost:${config.port}`;
  console.log(`Server running on ${address}`);
});
