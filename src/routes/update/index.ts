import { Router } from "express";
import updateValidator from "../../validators/update";
import protectRoute from "../../middleware/auth";
import updateController from "../../controllers/update";

const updateRouter = Router();

// Get single update
updateRouter.get("/update", protectRoute, updateController.getAll);

// Get all updates
updateRouter.get("/update/:id", protectRoute, updateController.getSingle);

// Change update
updateRouter.put(
  "/update/:id",
  protectRoute,
  updateValidator.changeUpdate,
  updateController.change
);

// Create new update
updateRouter.post(
  "/update",
  protectRoute,
  updateValidator.createUpdate,
  updateController.create
);

// Delete
updateRouter.delete("/update/:id", protectRoute, updateController.delete);

export default updateRouter;
