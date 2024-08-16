import { Router } from "express";
import protectRoute from "../../middleware/auth";
import productValidator from "../../validators/product";

const productRouter = Router();

productRouter.get("/product", protectRoute, (req, res) => {
  console.log(req.query);
  res.json({
    message: "hello",
  });
});

productRouter.get("/product/:id", () => {});

productRouter.put("/product/:id", productValidator.changeProductName, () => {});

productRouter.post("/product", productValidator.createProduct, () => {});

productRouter.delete("/product/:id", () => {});

export default productRouter;
