import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";

const earningSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["earning"],
      default: "earning",
      required: true,
    },
    category: { type: String, required: true },
    mode: { type: String, enum: ["online", "offline"], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true },
);


earningSchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
  overrideMethods: "all",
});

const Earning = mongoose.model("Earning", earningSchema);
export default Earning;
