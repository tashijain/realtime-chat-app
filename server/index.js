const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
// io is an instance of socketio
const io = socketio(server);

// io.on runs when we have a client connection on our io instance
// register client joining and leaving
// callback function ahead of 'connection'
// "emit" happens on the front-end and "on" part happens on backend
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    // telling user that they are welcome to the chat
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}!`,
    });

    // will send message to every user besides this user who has joined
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    // joins a user in the room
    socket.join(user.room);

    // error handling or any callbakc after a specific event has been emitted
    callback();
  });

  // expect the event on the backend
  // callback that is run after vent is emitted
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User has left");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
