import prisma from "../../db/config";
import { comparePasswords, createToken, hashPassword } from "../../utils/auth";

const userController = {
  createUser: async (req, res) => {
    const payload = req.body;
    try {
      const hashedPassword = await hashPassword(payload.password);
      const user = await prisma.user.create({
        data: {
          username: payload.username,
          password: hashedPassword,
        },
      });

      const token = createToken(user);
      res.json({
        message: "User registered successfully",
        token,
      });
    } catch (err) {
      console.log("Something went wrong while registering user", err.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  login: async (req, res) => {
    try {
      const payload = req.body;
      const user = await prisma.user.findUnique({
        where: {
          username: payload.username,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "User with this username doesnot exist",
        });
      }

      // check password
      const isPassValid = await comparePasswords(
        req.body.password,
        user.password
      );
      if (!isPassValid) {
        return res.status(401).json({
          message: "Invalid password",
        });
      }
      const token = createToken(user);

      res.status(200).json({
        message: "User logged in successfully",
        token,
      });
    } catch (err) {
      console.log("Something went wrong while logging in   user", err.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

export default userController;
