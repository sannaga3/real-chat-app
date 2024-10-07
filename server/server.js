import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import socketRoutes from "./router.js";

dotenv.config();

/* eslint-disable no-undef */
const app = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: corsOptions,
});

socketRoutes(io);

const port = process.env.SERVER_PORT || 4000;
/* eslint-enable no-undef */
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
