const expressAsyncHandler = require('express-async-handler');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const signup = expressAsyncHandler(async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser(username, email, hashedPassword);
    console.log(newUser)
    return newUser
    console.log(newUser)
  } catch (err) {
    throw err;
  }
});


const signin = expressAsyncHandler(async (email, password) => {
  try {
    
    const user = await User.getUserByEmail(email);
    if (!user) {
      throw new Error('Invalid email ');
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid  password');
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isUser: true 
      },
      process.env.Access_Token_Secret,
      { expiresIn: '1h' } 
    );

    return { token };
  } catch (err) {
    throw err;
  }
});

module.exports={signup,signin};