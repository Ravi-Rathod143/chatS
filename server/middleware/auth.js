const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async function (req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(data.id).select('-passwordHash');
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
