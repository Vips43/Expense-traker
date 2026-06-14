import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/conn.js";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js";
import cors from "cors";
import User from "./model/userModel.js";

dotenv.config();
const PORT = 3000;
const app = express();
const mongo_url = process.env.MONGO_URI;
connectDB(mongo_url);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api", expenseRoutes);

const backfillTimestamps = async () => {
  try {
    const users = await User.find({}).lean();
    console.log(`Found ${users.length} users`);

    for (const user of users) {
      const creationDate = user._id.getTimestamp();

      await User.collection.updateOne(  // native driver, bypasses Mongoose timestamps
        { _id: user._id },
        { $set: { createdAt: creationDate, updatedAt: creationDate } }
      );
    }

    console.log("Done!");
    process.exit(0);
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
};

// backfillTimestamps();

export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("Server started on: ", PORT);
  });
}
