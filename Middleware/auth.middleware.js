import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  // 1. Get token from header
  const authHeader = req.headers.authorization;

  // 2. Check if token exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // 3. Extract the actual token string (remove "Bearer ")
  const token = authHeader.split(" ")[1];

  try {
    // 4. Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach the decoded user ID to the request for later use
    req.userInfo = { id: decoded.user_id };

    // 6. Call next() to continue to the route handler
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
