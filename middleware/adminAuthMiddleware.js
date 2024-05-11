

const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }
  
    jwt.verify(token, process.env.Access_Token_Secret, async (err, decoded) => {
      console.log(decoded)
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
console.log(decoded)
      const admin = await Admin.findById(decoded.id);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      if (!decoded.isAdmin) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }

      req.admin = admin;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = authenticateToken;
