import prisma from "../../db/config";

const productController = {
  //Get all products of a user
  getAll: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        include: {
          products: true,
        },
      });

      res.status(200).json({
        data: user.products,
      });
    } catch (err) {
      console.log("Error while handling get all products", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  // Get single product of a user
  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await prisma.product.findFirst({
        where: {
          id,
          belongsToUser: req.user.id,
        },
      });

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.status(200).json({
        data: product,
      });
    } catch (err) {
      console.log("Error while handling get single product", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  // Create product
  create: async (req, res) => {
    try {
      const payload = req.body;
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });

      if (!user) {
        res.status(404).json({
          message: "User does not exist",
        });
      }

      const product = await prisma.product.create({
        data: {
          name: payload.name,
          belongsToUser: req.user.id,
        },
      });

      res.json({
        data: product,
      });
    } catch (err) {
      console.log("Error while creating product", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const payload = req.body;
      const productId = req.params.id;
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });

      if (!user) {
        res.status(404).json({
          message: "User does not exist",
        });
      }

      const updatedProduct = await prisma.product.update({
        where: {
          id: productId,
          belongsToUser: req.user.id,
        },
        data: {
          name: payload.name,
        },
      });

      res.status(200).json({
        data: updatedProduct,
      });
    } catch (err) {
      console.log("Error while updating product", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const productId = req.params.id;

      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });

      if (!user) {
        res.status(404).json({
          message: "User does not exist",
        });
      }

      await prisma.product.delete({
        where: {
          id: productId,
          belongsToUser: req.user.id,
        },
      });

      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (err) {
      console.log("Error while deleting product", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
};

export default productController;
