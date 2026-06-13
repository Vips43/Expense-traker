import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    console.log("mongodb connected", conn.connection.host);
  } catch (error) {
    console.log("mongodb error", error);
    process.exit(1);
  }
};
export default connectDB;
