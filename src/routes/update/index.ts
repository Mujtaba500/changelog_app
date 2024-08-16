import { Router } from "express";

const updateRouter = Router();

updateRouter.get("/update", () => {});

updateRouter.get("/update/:id", () => {});

updateRouter.put("/update/:id", () => {});

updateRouter.post("/update", () => {});

updateRouter.delete("/update/:id", () => {});

export default updateRouter;
