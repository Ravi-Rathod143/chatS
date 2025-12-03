const Message = require('./models/Message');
const Channel = require('./models/Channel');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// simple in-memory presence: userId => open sockets count
const presence = new Map();

function setupSocket(io) {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth && socket.handshake.auth.token;
      if (!token) return next(new Error('no token'));
      const data = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = data.id;
      socket.user = await User.findById(data.id).select('name');
      next();
    } catch (err) {
      next(new Error('auth error'));
    }
  });

  io.on('connection', (socket) => {
    const uid = socket.userId.toString();
    const prev = presence.get(uid) || 0;
    presence.set(uid, prev + 1);
    // broadcast presence map as array of ids currently online
    io.emit('presence', Array.from(presence.entries()).filter(([_,c]) => c>0).map(([id]) => id));

    socket.on('joinChannel', (channelId) => {
      socket.join(channelId);
    });

    socket.on('leaveChannel', (channelId) => {
      socket.leave(channelId);
    });

    socket.on('message', async ({ channelId, text }) => {
      if (!text || !channelId) return;
      const m = await Message.create({ channel: channelId, sender: socket.userId, text });
      const populated = await m.populate('sender', 'name');
      io.to(channelId).emit('message', populated);
    });

    socket.on('typing', ({ channelId, typing }) => {
      // broadcast typing to others in channel
      socket.to(channelId).emit('typing', { userId: socket.userId, typing });
    });

    socket.on('disconnect', () => {
      const cur = presence.get(uid) || 1;
      if (cur <= 1) presence.delete(uid);
      else presence.set(uid, cur - 1);
      io.emit('presence', Array.from(presence.entries()).filter(([_,c]) => c>0).map(([id]) => id));
    });
  });
}

module.exports = setupSocket;
