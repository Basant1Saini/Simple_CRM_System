import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    contact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact", required: true },
    value: { type: Number, default: 0 },
    stage: {
      type: String,
      enum: ["new", "qualified", "proposal", "negotiation", "won", "lost"],
      default: "new",
    },
    expectedCloseDate: { type: Date },
    notes: { type: String, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
