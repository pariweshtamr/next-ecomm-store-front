import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema(
  {
    line_items: [{ type: Object }],
    fName: { type: String },
    lName: { type: String },
    email: { type: String, trim: true, required: true },
    city: { type: String },
    postalCode: { type: String },
    street: { type: String },
    country: { type: String },
    amount: { type: String },
    paid: { type: Boolean },
  },
  { timestamps: true }
)

export default mongoose?.models?.Order || mongoose.model("Order", OrderSchema)
