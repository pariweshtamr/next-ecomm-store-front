import mongoose from "mongoose"

const CustomerSchema = new mongoose.Schema(
  {
    userEmail: { type: String, unique: true, required: true },
    fName: { type: String },
    lName: { type: String },
    email: { type: String },
    city: { type: String },
    street: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  { timestamps: true }
)

export default mongoose?.models?.Customer ||
  mongoose.model("Customer", CustomerSchema)
