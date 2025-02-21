import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../src/constants.js";
dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection Error: ", error);
    process.exit(1);
  }
};

export default connectDB;
