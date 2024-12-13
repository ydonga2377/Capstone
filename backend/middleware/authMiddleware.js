const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require("../models/Cart"); // Adjust the path to your Cart model

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); // Debug: Log the decoded token
    req.user = decoded; // Attach user details to the request object

    // Check if the user exists
    const user = await User.findById(decoded.userId); // Changed `decoded.id` to `decoded.userId`
    if (!user) {
      console.error("User not found for ID:", decoded.userId); // Debug: Log user not found
      return res.status(404).json({ message: "User not found" });
    }

    // If the request is for the cart
    if (req.path === "/cart" && req.method === "GET") {
      const cartItems = await Cart.find({ userId: decoded.userId }).populate("product");
      if (!cartItems.length) {
        return res.status(200).json({ cartItems: [], totalPrice: 0 });
      }

      const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );

      return res.status(200).json({ cartItems, totalPrice });
    }

    next(); // Proceed to the next middleware/route
  } catch (err) {
    console.error("Authentication error:", err.message);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token is invalid" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    res.status(500).json({ message: "Internal server error during authentication" });
  }
};

module.exports = authMiddleware;
