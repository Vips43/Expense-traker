import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

userSchema.methods.comparePassword = async function (pass) {
  return bcrypt.compare(pass, this.password);
};
userSchema.virtual("expense", {
  ref: "Expense",
  localField: "_id",
  foreignField: "user",
});
userSchema.virtual("earning", {
  ref: "Earning",
  localField: "_id",
  foreignField: "user",
});
userSchema.virtual("rights").get(function () {
  return {
    admin: false,
    add: false,
    remove: false,
  };
});
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const User = mongoose.model("User", userSchema);
export default User;
