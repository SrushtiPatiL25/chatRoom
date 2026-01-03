const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Express
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

const server = http.createServer(app);

// Enable CORS for Socket.IO
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// utils
const formatmsg = require("./utils/formatMsg");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getUserRoom,
} = require("./utils/users");

// socket logic
io.on("connection", (socket) => {
  socket.on("joinroom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    console.log(username + " joined" + user.room);

    socket.emit("messageBot", formatmsg("ChatBot", `Welcome ${user.username}`));

    socket.broadcast
      .to(user.room)
      .emit("messageBot", formatmsg("ChatBot", `${user.username} joined`));

    io.to(user.room).emit("roomInfo", {
      room: user.room,
      userList: getUserRoom(user.room),
    });
  });

  socket.on("userMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    if (!user) return;

    io.to(user.room).emit("message", formatmsg(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "messageBot",
        formatmsg("ChatBot", `${user.username} left`)
      );

      io.to(user.room).emit("roomInfo", {
        room: user.room,
        userList: getUserRoom(user.room),
      });
    }
  });

  socket.on("leaveRoom", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "messageBot",
        formatmsg("ChatBot", `${user.username} has left the chat`)
      );

      io.to(user.room).emit("roomInfo", {
        room: user.room,
        userList: getUserRoom(user.room),
      });

      socket.leave(user.room);
    }
  });

  //typing indicator
  socket.on("typing", ({ room, username }) => {
    socket.broadcast.to(room).emit("userTyping", { username });
  });

  socket.on("stopTyping", ({ room }) => {
    socket.broadcast.to(room).emit("userStopTyping");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
