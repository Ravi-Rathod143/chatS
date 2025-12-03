require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const setupSocket = require('./socket');

const authRoutes = require('./routes/auth');
const channelRoutes = require('./routes/channels');
const userRoutes = require('./routes/users');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));

app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/users', userRoutes);

const io = new Server(server, { cors: { origin: process.env.CLIENT_ORIGIN || '*' } });
setupSocket(io);

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Mongo connected');
  server.listen(PORT, () => console.log('Listening', PORT));
}).catch(err => console.error(err));
