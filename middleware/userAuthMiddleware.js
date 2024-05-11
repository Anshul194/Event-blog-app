const jwt = require('jsonwebtoken');
const User = require('../model/User');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    jwt.verify(token, process.env.Access_Token_Secret, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.isBlocked) {
        return res.status(403).json({ message: 'You are blocked. Please contact your administrator.' });
      }
      if (!decoded.isUser) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }


      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = authenticateToken;
