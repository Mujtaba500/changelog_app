import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import allRoutes from "./routes/allRoutes";

const port = 3000;

const app = express();

app.use(cors()); // Allows cross origin requests
app.use(morgan("dev")); // log each request
app.use(express.json()); // allows client to send json
app.use(express.urlencoded({ extended: true })); // query params are encoded for us

app.use("/api", allRoutes);

app.listen(port, () => {
  const address = `http://localhost:${port}`;
  console.log(`Server running on ${address}`);
});
