const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

const comparePassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httponly: true,
    };

    res.cookie("jwt", token, cookieOptions);
    console.log(res.cookie);
    res.status(200).json({
      status: "success",
      token: token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError("Please provide email or password", 400));

    const user = await User.findOne({ email: email }).select("+password");
    console.log(user);
    if (!user || !(await comparePassword(password, user.password)))
      return next(new AppError("Incorrect email or password", 401));

    const token = signToken(user._id);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httponly: true,
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

exports.logout = async (req, res, next) => {
  try {
    const cookieOptions = {
      expires: new Date(Date.now() + 10 * 1000),
      httponly: true,
    };

    res.cookie("jwt", "logout", cookieOptions);

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];
    else if (req.cookies.jwt) token = req.cookies.jwt;

    if (!token)
      return next(
        new AppError("You are not logged in,log in to get access", 401)
      );

    //verify token

    const decodedString = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedString.id);
    if (!user)
      return next(
        new AppError("The user with this token no longer exists", 401)
      );

    req.user = user;
    next();
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You dont have access to perform this action", 403)
      );
    }

    next();
  };
};

exports.isLoggedIn = async (req, res, next) => {
  //this function checks if user is logged in
  //as we are checking if a user is currently logged in or not we will never return an error from this middleware
  //all we will do is add the user to the response locals if he is logged in, which then can be accessed by our pug templates

  //1) getting token and seeing if it exists
  try {
    let user = null;
    console.log(req.cookies);
    if (req.cookies.jwt) {
      //2) Verifying token
      const decodedString = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      console.log(decodedString);
      //3) check if user who is asking for the resouce exists

      user = await User.findById(decodedString.id);
      //console.log(user.email);
    }
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    next();
  }
  //if jwt doesnt exist then we will directly call next
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    if (!(await comparePassword(req.body.passwordCurrent, user.password))) {
      return next(new AppError("This password is incorrect", 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    const token = signToken(user._id);

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httponly: true,
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};
