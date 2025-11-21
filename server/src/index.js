require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes'); // <-- add this line

const app = express();
const clientOrigin = process.env.CLIENT_URL || 'http://localhost:3000';
app.use(cors({ origin: clientOrigin }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

app.get('/', (req, res) => res.send('Peer Hub API'));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: clientOrigin } });

io.on('connection', socket => {
  console.log('New socket connection:', socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
