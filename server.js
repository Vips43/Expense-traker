import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/conn.js";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expenseRoutes.js";
import cors from "cors";

dotenv.config();
const PORT = 3000;
const app = express();
const mongo_url = process.env.MONGO_LOCAL;
connectDB(mongo_url);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api", expenseRoutes);

app.listen(PORT, () => {
  console.log("server started on: ", PORT);
});
