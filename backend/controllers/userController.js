import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 *   @desc     Register form function new user
 *   @route    POST ==> /api/users/
 *   @access   PUBLIC
 */

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400); // bad request
    throw new Error("User Already Exist...");
  }

  const user = await User.create({ username, email, password });
  if (user) {
    //successfully created
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
/////////////////////////////////////////////////////////////////////////////
/**
 *   @desc     Login form function
 *   @route    POST ==> /api/users/login
 *   @access   PUBLIC
 */
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
/////////////////////////////////////////////////////////////////////////////
/**
 *   @desc     profile (user) function
 *   @route    GET ==> /api/users/profile
 *   @access   private
 */

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export { Login, getUserProfile, registerUser };
