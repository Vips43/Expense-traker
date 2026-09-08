import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token = req.cookies["exp-token"];

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "token expired" });
  }
};
