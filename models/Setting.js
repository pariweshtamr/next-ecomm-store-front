import mongoose from "mongoose"

const SettingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    value: { type: Object },
  },
  { timestamps: true }
)

export default mongoose?.models?.Setting ||
  mongoose?.model("Setting", SettingSchema)
