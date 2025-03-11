import { User } from "../models/user.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudnairy.js";

export const registerUser = asyncHandler(async (req, res) => {
  //  get user data from frontend
  // validation - not empty
  //  check user already exist : username and email
  // check for avatar  , check for images
  // upload them to cloudinary
  // create user object -- create entry in db
  // remove password and refresh token field form response
  // check for user creations
  // return user details

  const { fullname, email, username, password } = req.body;

  // console.log({ fullname, email, username, password });

  // if (fullname === "") {
  //   throw new ApiError(400, "fullname is required");
  // }
  if (
    [fullname, email, username, password].some((field) => {
      field?.trim() === " ";
    })
  ) {
    throw new ApiError(400, "All filed is required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  const coverImagePath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImagePath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
    username: username.toString().toLowerCase(),
    email,
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  if (!createUser) {
    throw new ApiError(500, "Something went wrong registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "User register successfully"));
});
