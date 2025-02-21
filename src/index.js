import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

import connectDB from "../db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT || 8000, () => {
      console.log(`Server is running at Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB Connection Failed !!", err);
  });

/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    app.on("error", (error) => {
      console.log("ERROR", error);
      throw error;
    });

    app.listen(PORT || 8000, () => {
      console.log(`App is listing on port ${PORT}`);
    });
  } catch (error) {
    console.log("ERROR: ", error);

    throw error;
  }
})();
*/
