import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized. Please login." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Invalid token. Please login again." });
    }

    req.user = { id: decoded.id };
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Authentication error",
    });
  }
};

export default userAuth;
