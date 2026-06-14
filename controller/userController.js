import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";

dayjs.extend(relativeTime);

export const registerUser = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user)
      return res.status(401).json({ msg: `user ${name} already exists` });

    await User.create({
      name,
      email,
      password,
    });

    return res.status(200).json({ msg: `user ${name} created successfully!` });
  } catch (error) {
    console.log(email, name, "error", error);
    return res.status(500).json({ msg: `user creation failed`, error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "user not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      },
    );

    res.status(200).json({
      msg: "Login successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("login error: ", error);
    res.status(500).json({ msg: "server error" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findById(id || req.user._id).select("-password").lean();
    if (!user) return res.status(400).json({ msg: "User not found!" });

    const signUpDate = dayjs(user.createdAt).fromNow();
    user.date = signUpDate;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "error in user parsing" });
  }
};
