const http = require('http');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');

// Users Array
users=[{}]


// Initialize Express app
const app = express();
dotenv.config();

// Routing
app.use(cors);
app.get("/", (req, res)=>{
    res.send("Working Fine.");
})

// Create a HTTP server using the Express app
const server = http.createServer(app);

// SocketIO Circuit
const io = socketIO(server, {
  cors: {
	origin: '*',
  }
});

// User Connected
io.on('connection', (socket) => {
  console.log("New Connection!");

  socket.on("joined", (data)=>{
    const username = data.user;
    users[socket.id] = username;
    console.log(`${users[socket.id]} has Joined!\n`);
    socket.broadcast.emit("broadcastmsg", {user: "Host", message: `${users[socket.id]} has joined the platform.`})
    socket.emit("welcome", {user: "Host", message: `Welcome ${users[socket.id]}!`})
  })
  socket.on("disconnect",()=>{
    socket.broadcast.emit("broadcastleavemsg", {user: "Host", message: `${users[socket.id]} has left the platform.`})
    console.log(`${users[socket.id]} left the chat.`);
  })
  socket.on("message", (message, id)=>{
    io.emit("sendusermessages", {user:users[socket.id], message, id})
    
    console.log(message);
  })

});

// Start the HTTP server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`HTTP Server Listening on port http://localhost:${PORT}...`);
});
