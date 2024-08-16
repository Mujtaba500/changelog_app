import { Router } from "express";
import updatePointValidator from "../../validators/updatePoint";

const updatePointRouter = Router();

updatePointRouter.get("/updatepoint", () => {});

updatePointRouter.get("/updatepoint/:id", () => {});

updatePointRouter.put(
  "/updatepoint/:id",
  updatePointValidator.changeUpdatePoint,
  () => {}
);

updatePointRouter.post(
  "/updatepoint",
  updatePointValidator.createUpdatePoint,
  () => {}
);

updatePointRouter.delete("/updatepoint/:id", () => {});

export default updatePointRouter;
