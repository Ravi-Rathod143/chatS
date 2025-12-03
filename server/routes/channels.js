const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Channel = require('../models/Channel');
const Message = require('../models/Message');

// list channels (with member count)
router.get('/', auth, async (req, res) => {
  const channels = await Channel.find().select('name members').lean();
  const mapped = channels.map(c => ({ _id: c._id, name: c.name, memberCount: (c.members || []).length }));
  res.json(mapped);
});

// create channel
router.post('/', auth, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'missing' });
  const exists = await Channel.findOne({ name });
  if (exists) return res.status(400).json({ message: 'channel exists' });
  const c = await Channel.create({ name, members: [req.user._id] });
  res.json(c);
});

// join channel
router.post('/:id/join', auth, async (req, res) => {
  const ch = await Channel.findById(req.params.id);
  if (!ch) return res.status(404).json({ message: 'not found' });
  if (!ch.members.includes(req.user._id)) ch.members.push(req.user._id);
  await ch.save();
  res.json({ success: true });
});

// get messages with pagination (page=0 latest)
router.get('/:id/messages', auth, async (req, res) => {
  const { id } = req.params;
  const page = parseInt(req.query.page || '0');
  const limit = 20;
  const skip = page * limit;
  const messages = await Message.find({ channel: id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('sender', 'name')
    .lean();
  res.json(messages.reverse());
});

module.exports = router;
