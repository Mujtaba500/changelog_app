import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(400).json({ message: "hello" });
});

const port = 3000;

app.listen(port, () => {
  const address = `http://localhost:${port}`;
  console.log(`Server running on ${address}`);
});
