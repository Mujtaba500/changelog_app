import jwt from "jsonwebtoken";

const protectRoute = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      message: "Not Authorized",
    });
    return;
  }

  token = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Error while verifying token", err.message);
    return res.status(401).json({ message: "UnAuthorized" });
  }
};

export default protectRoute;
