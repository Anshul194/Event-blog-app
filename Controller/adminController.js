const expressAsyncHandler = require('express-async-handler');
const adminService = require('../Services/adminService');
const SuccessHandler = require('../SuccessResponse');


// sign up

const signupAdmin = expressAsyncHandler(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newAdmin = await adminService.createAdmin(username, email, password);

   return SuccessHandler.sendSuccessResponse(res,'Admin created successfully',{admin: newAdmin });

  } catch (err) {
    next(err);
  }
});

//sign in

const signinAdmin = expressAsyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await adminService.signinAdmin(email, password);

    return SuccessHandler.sendSuccessResponse(res, 'Admin signed in successfully', { token : token });
  } catch (err) {
    next(err);
  }
});

module.exports = { signupAdmin, signinAdmin };
