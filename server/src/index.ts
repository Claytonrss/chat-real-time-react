// //index.js

// import express from "express";

// import { Router, Request, Response } from "express";

// const app = express();
// const route = Router();
// const http = require("http").Server(app);
// const cors = require("cors");

// app.use(cors());

// route.get("/api", (req: Request, res: Response) => {
//   res.json({ message: "hello world with Typescriptt" });
// });

// app.use(route);

// app.listen(4000, () => "server running on port 4000");

// const io = require("socket.io")(http, {
//   cors: {
//     origin: "https://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// //Add this before the app.get() block
// io.on("connection", (socket: any) => {
//   console.log(`⚡: ${socket.id} user just connected!`);
//   socket.on("disconnect", () => {
//     console.log("🔥: A user disconnected");
//   });
// });
import express from "express";

import { Router, Request, Response } from "express";
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const cors = require("cors");
const route = Router();

app.use(cors());
app.use(route);

type Room = {
  id: string;
  participants: User[];
};

type User = {
  userName: string;
  socketID: string;
};

let users: User[] = [];
let rooms: Room[] = [];

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "hello world with Typescriptt" });
});

route.get("/createRoom", (req: Request, res: Response) => {
  const { room } = req.query;

  const canIJoinRoom =
    typeof room === "string" && !rooms.some((r) => r.id === room);

  if (canIJoinRoom) {
    console.log("dicionou");
    rooms.push({ id: room, participants: [] });
    res.json({ status: "success", id: rooms.length, room });
  } else {
    console.log("nao");
    res.json({ status: "already exist", rooms });
  }
});

const socketIO = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

socketIO.on("connection", (socket: any) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("message", (data: any) => {
    console.log(data);
    socket.to(data.room).emit("messageResponse", data);
  });

  socket.on("newUser", (data: User) => {
    users.push(data);
    socketIO.emit("newUserResponse", users);
  });

  socket.on("joinRoom", (room: string) => {
    const canIJoinRoom = rooms.some((r) => r.id === room);

    if (canIJoinRoom) {
      socket.join(room);
      socket.emit("joinSuccessful", { room });
    }
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
