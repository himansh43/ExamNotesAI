import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.examNotesToken;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
        success: false,
      });
    }

    const decodedValue = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    req.userId = decodedValue.id;

    next();

  } catch (error) {
    console.error("JWT verification error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};
