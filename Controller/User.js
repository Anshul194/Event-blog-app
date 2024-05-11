const expressAsyncHandler = require('express-async-handler');
const { validateRegistration,validateLogin } = require('../Validators/validateUser');
const userService = require('../Services/userService');
const SuccessHandler = require('../SuccessResponse');

// sign up

const signup = expressAsyncHandler(async (req, res, next) => {
  try {
    const userData = req.body;
    const { error } = validateRegistration(userData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { username, email, password } = userData;

    const newUser = await userService.signup(username, email, password);
    return SuccessHandler.sendSuccessResponse(res,'User created successfully',{user: newUser });

  } catch (err) {
    next(err);
  }
});

// sign in

const signin = expressAsyncHandler(async (req, res, next) => {
  try {
    const userData = req.body;
    const { error } = validateLogin(userData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = userData;

    const user = await userService.signin(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return SuccessHandler.sendSuccessResponse(res, 'User signed in successfully', { user });

  } catch (err) {
    next(err);
  }
});

module.exports = { signup,signin};
