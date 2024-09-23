import { asyncHandler } from "../utils/asyncHandler.js";

// import User from "../models/user.model";

export const registerUser = asyncHandler(async (req, res) => {
  // get user details from request body
  const { fullName, username, email, password } = req.body;
  console.log("email", email);

  //validation of user details

  //check if user already exits: username, email

  //check for images , check for avatar

  //upload them to cloudinary, avatar

  //create user object

  //create user using User model in mongoose and save it in database

  //remove passowrd and refresh token field from response

  //return user details
});
