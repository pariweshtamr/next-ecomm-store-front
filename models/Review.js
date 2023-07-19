import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema(
  {
    title: { type: String },
    comment: { type: String, deafult: "", trim: true },
    rating: { type: Number },
    product: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
)

export default mongoose?.models?.Review ||
  mongoose?.model("Review", ReviewSchema)
