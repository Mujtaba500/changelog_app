import { Router } from "express";
import protectRoute from "../../middleware/auth";
import productValidator from "../../validators/product";
import productController from "../../controllers/product";

const productRouter = Router();

productRouter.get("/product", protectRoute, productController.getAll);

productRouter.get("/product/:id", protectRoute, productController.getOne);

productRouter.put(
  "/product/:id",
  protectRoute,
  productValidator.changeProductName,
  productController.update
);

productRouter.post(
  "/product",
  protectRoute,
  productValidator.createProduct,
  productController.create
);

productRouter.delete("/product/:id", protectRoute, productController.delete);

export default productRouter;
