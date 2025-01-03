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

/////////////////////////////////////////////////////////////////////////////

/**
 *   @desc     update user (name or email or password) function
 *   @route    GET ==> /api/users/profile
 *   @access   private
 */

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    // if the password is also change then only update unless don't touch
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

/////////////////////////////////////////////////////////
/**
 * @desc        Get all users;
 * @route    GET /api/users
 * @access   private/admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

/////////////////////////////////////////////////////////
/**
 *  @desc       Delete User
 *  @route      DELETE /api/users/:id
 *  @access    private/admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user._id.toString() === req.user.id) {
      res.status(400);
      throw new Error("Admins cannot delete their own account");
    }

    await User.deleteOne(user);
    res.json({ message: "User Deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 *  @desc      Get user by Id
 *  @route     GET /api/users/:id
 *  @access    private/admin
 */

const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found...");
  }
});

/**
 * @desc      update a user (admin)
 * @route     PUT /api/users/:id
 * @access    private/admin
 */

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export {
  Login,
  getUserProfile,
  registerUser,
  updateProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserByID,
};
