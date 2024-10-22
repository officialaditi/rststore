import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

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
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

export { Login };
