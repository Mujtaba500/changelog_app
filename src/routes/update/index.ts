import { Router } from "express";
import updateValidator from "../../validators/update";

const updateRouter = Router();

updateRouter.get("/update", () => {});

updateRouter.get("/update/:id", () => {});

updateRouter.put("/update/:id", updateValidator.changeUpdate, () => {});

updateRouter.post("/update", updateValidator.createUpdate, () => {});

updateRouter.delete("/update/:id", () => {});

export default updateRouter;
