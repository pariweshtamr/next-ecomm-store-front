import mongoose from "mongoose"
const WishlistSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
)

export default mongoose?.models?.Wishlist ||
  mongoose.model("Wishlist", WishlistSchema)
