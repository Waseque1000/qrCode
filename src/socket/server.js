const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Store active sessions
const sessions = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Dashboard creates a session
  socket.on('create-session', (sessionId) => {
    socket.join(sessionId);
    sessions.set(sessionId, { dashboardId: socket.id, devices: [] });
    console.log(`Session created: ${sessionId}`);
  });

  // Mobile joins a session
  socket.on('join-session', (sessionId) => {
    if (sessions.has(sessionId)) {
      socket.join(sessionId);
      const session = sessions.get(sessionId);
      session.devices.push(socket.id);
      
      // Notify dashboard that a device connected
      io.to(sessionId).emit('device-connected', { deviceId: socket.id });
      console.log(`Device ${socket.id} joined session ${sessionId}`);
    } else {
      socket.emit('error', 'Session not found');
    }
  });

  // Mobile sends scan data
  socket.on('scan-data', ({ sessionId, data, type }) => {
    console.log(`Scan data received for session ${sessionId}:`, data);
    // Broadcast to everyone in the room (including dashboard)
    io.to(sessionId).emit('new-scan', {
      id: Date.now().toString(),
      data,
      type,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Cleanup sessions if dashboard disconnects
    for (const [sessionId, session] of sessions.entries()) {
      if (session.dashboardId === socket.id) {
        io.to(sessionId).emit('session-closed');
        sessions.delete(sessionId);
        console.log(`Session closed: ${sessionId}`);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
