import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const createToken = (user) => {
  const dataToSign = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign(dataToSign, process.env.JWT_SECRET);

  return token;
};

const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export { createToken, hashPassword, comparePasswords };
