import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
console.log(dotenv);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    //
    //
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file  has been uploaded successfully
    console.log("file is uploaded on cloudinary", response.url);

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // remove temporary file as the upload operation
    fs.unlinkSync(localFilePath);
  }
};

export { uploadOnCloudinary };
