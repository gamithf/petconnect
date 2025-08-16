import mongoose from "mongoose";

const petPostSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["Adopt", "LostFound"], required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    details: { type: String, required: true, trim: true },
    location: { type: String, default: "" },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("PetPost", petPostSchema);
