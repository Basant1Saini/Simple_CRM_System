import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["call", "email", "meeting"], required: true },
    note: { type: String, trim: true },
    date: { type: Date, default: Date.now },
  },
  { _id: true }
);

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    tags: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ["active", "inactive", "prospect"],
      default: "prospect",
    },
    interactions: [interactionSchema],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

contactSchema.index({ name: "text", email: "text", company: "text" });

export default mongoose.model("Contact", contactSchema);
