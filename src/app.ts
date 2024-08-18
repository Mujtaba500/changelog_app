import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import allRoutes from "./routes/allRoutes";

const app = express();

app.use(cors()); // Allows cross origin requests
app.use(morgan("dev")); // log each request
app.use(express.json()); // allows client to send json
app.use(express.urlencoded({ extended: true })); // query params are encoded for us

app.use("/api", allRoutes);

app.use("/", (req, res) => {
  res.json({
    message: "API is live",
  });
});

export default app;
