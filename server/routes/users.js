const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// return all users (id + name) - for presence mapping
router.get('/', auth, async (req, res) => {
  const users = await User.find().select('name').lean();
  res.json(users.map(u => ({ id: u._id.toString(), name: u.name })));
});

module.exports = router;
