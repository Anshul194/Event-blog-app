const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');
const expressAsyncHandler = require('express-async-handler');

const createAdmin= expressAsyncHandler(async(username, email, password)=>{
  try {
    const existingAdmin = await Admin.getAdminByEmail(email);
    if (existingAdmin) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.createAdmin(username, email, hashedPassword);

    return newAdmin;
  } catch (err) {
    throw err;
  }
});

const signinAdmin=expressAsyncHandler(async(email, password)=>{
  try {
    const admin = await Admin.getAdminByEmail(email);
    if (!admin) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        isAdmin: true 
      },
      process.env.Access_Token_Secret ,
      { expiresIn: '1h' } 
    );

    return token;
  } catch (err) {
    throw err;
  }
})

module.exports = { createAdmin, signinAdmin };
