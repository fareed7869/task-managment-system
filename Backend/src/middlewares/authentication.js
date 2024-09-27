//Authentication Middleware
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access Denied: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extracts the token part after 'Bearer'
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token is not valid" });
  }
};

export { auth };
