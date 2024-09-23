import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  // get user details from request body
  const { fullName, username, email, password } = req.body;
  console.log("email", email);

  //validation of user details
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  //check if user already exits: username, email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //check for images , check for avatar
  let avatarLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files?.avatar[0]?.path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  let coverImageLocalPath;
  // console.log("fies", avatarLocalPath);

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  }

  //upload them to cloudinary, avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  console.log("avatar", avatar);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

export const loginUser = asyncHandler(async (req,res) => {
  //get email or username and password from req body
  // const { email, username, password } = req.body;

  // if (!email || !password) {
  //   return res.status(400).json(new ApiResponse(400, null, "Please provide email and password"));
  // }

  // const user = await User.findOne({ email }).select("+password");

  // if (!user) {
  //   return res.status(404).json(new ApiResponse(404, null, "User not found"));
  // }

  // const isMatch = await user.matchPassword(password);

  // if (!isMatch) {
  //   return res.status(401).json(new ApiResponse(401, null, "Invalid credentials"));
  // }

  // const token = user.getSignedToken();

  // res.status(200).json(new ApiResponse(200, { token }, "Logged in successfully"));


})