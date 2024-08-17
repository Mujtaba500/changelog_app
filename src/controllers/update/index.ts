import prisma from "../../db/config";

const updateController = {
  getAll: async (req, res) => {
    try {
      const products = await prisma.product.findMany({
        where: {
          belongsToUser: req.user.id,
        },
        include: {
          updates: true,
        },
      });

      //  const allUpdates = []
      //   products.forEach((product) => {
      //     product.updates.forEach((update) => {
      //         allUpdates.push(update)
      //     })
      //   })
      // Better way to do the above:
      const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
      }, []);

      res.json({
        data: updates,
      });
    } catch (err) {
      console.log("Error while handling get all updates", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  getSingle: async (req, res) => {
    try {
      const id = req.params.id;
      const update = await prisma.update.findFirst({
        where: {
          id,
        },
      });

      if (!update) {
        return res.status(404).json({
          message: "Update not found",
        });
      }

      res.status(200).json({
        data: update,
      });
    } catch (err) {
      console.log("Error while handling get single update", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  create: async (req, res) => {
    try {
      const payload = req.body;
      const product = await prisma.product.findFirst({
        where: {
          id: req.body.productId,
          belongsToUser: req.user.id,
        },
      });

      if (!product) {
        return res.status(400).json({
          message: "Product does not belong to you",
        });
      }

      const update = await prisma.update.create({
        data: {
          title: payload.title,
          body: payload.body,
          updateAt: new Date(Date.now()).toISOString(),
          productId: payload.productId,
        },
      });

      res.json({
        data: update,
      });
    } catch (err) {
      console.log("Error while creating product", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  change: async (req, res) => {
    try {
      const payload = req.body;
      const updateId = req.params.id;

      const update = await prisma.update.findUnique({
        where: {
          id: updateId,
          belongsTo: {
            belongsToUser: req.user.id, // Ensure the update belongs to a product owned by the user
          },
        },
      });

      if (!update) {
        return res.status(404).json({
          message: "Update doesnot exist or doesnot belong to you",
        });
      }

      const changedUpdate = await prisma.update.update({
        where: {
          id: updateId,
        },
        data: {
          title: payload.title,
          body: payload.body,
          updateAt: new Date(Date.now()).toISOString(),
        },
      });

      res.status(200).json({
        data: changedUpdate,
      });
    } catch (err) {
      console.log("Error while updating product", err.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  delete: async (req, res) => {
    const updateId = req.params.id;
    const products = await prisma.product.findMany({
      where: {
        belongsToUser: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => updateId === update.id);

    if (!match) {
      return res.status(400).json({
        message: "Update does not exist or doesnot belong to you",
      });
    }

    await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      message: "Update deleted successfully",
    });
  },
};

export default updateController;
