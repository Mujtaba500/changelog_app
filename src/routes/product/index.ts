import { Router } from "express";
import protectRoute from "../../middleware/auth";
import productValidator from "../../validators/product";
import productController from "../../controllers/product";

const productRouter = Router();

// Get all products
productRouter.get("/product", protectRoute, productController.getAll);

// Get single product
productRouter.get("/product/:id", protectRoute, productController.getOne);

// Update product
productRouter.put(
  "/product/:id",
  protectRoute,
  productValidator.changeProductName,
  productController.update
);

// Create product
productRouter.post(
  "/product",
  protectRoute,
  productValidator.createProduct,
  productController.create
);

// Delete product
productRouter.delete("/product/:id", protectRoute, productController.delete);

export default productRouter;
