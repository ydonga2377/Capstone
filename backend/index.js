const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const gameRoutes = require("./routes/games");
const reviewRoutes = require("./routes/review");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const userProfileRoutes = require("./routes/userProfile");
const marketplaceRoutes = require("./routes/marketplace");

const transactionRoute = require("./routes/transaction");
const blogRoutes = require("./routes/blogRoutes");
const checkoutRoutes = require('./routes/checkoutRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/blogRoutes", blogRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/transaction", transactionRoute);

app.use("/api/checkoutRoutes", checkoutRoutes);
app.post("/api/checkout", (req, res) => {
  const { items, transaction, address } = req.body;

  if (!items || !transaction || !address) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  res.status(200).json({ success: true, orderId: "12345" });
});
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
