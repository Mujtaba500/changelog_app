import express from "express";
import allRoutes from "./routes/allRoutes";

const port = 3000;

const app = express();

app.use("/api", allRoutes);

app.listen(port, () => {
  const address = `http://localhost:${port}`;
  console.log(`Server running on ${address}`);
});
