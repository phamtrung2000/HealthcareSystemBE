// const app = require("./app");
import express from "express";
import cors from "cors";
import connectDB from "./db/mongoose.js";
import swaggerUI from "swagger-ui-express";
import { specs } from "./utils/docs.js";
import socketio from "socket.io";
import http from "http";
import auth from "./middleware/auth.js";
import firebaseAdmin from "firebase-admin";
import serviceAccount from "../config/serviceAccountKey.json";

import policyRoutes from "./routers/policy.routers.js";
import topicRoutes from "./routers/topic.routers.js";
import reportRoutes from "./routers/report.routers.js";
import testRoutes from "./routers/test.routers.js";
import authRoutes from "./routers/auth.routers.js";
import userRouter from "./routers/user.routers.js";
import badgeRouter from "./routers/badge.routers.js";
import dailyCheckinRouter from "./routers/daily_checkin.routers.js";
import adminRoutes from "./routers/admin.routers.js";
import postRouter from "./routers/post.routers.js";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//#region setup socket
import commentHandler from "./sockets/comment.js";

/**
 * Mỗi chức năng khác nhau có 1 namespace khác nhau
 * để tránh emit trùng event
 * Ví dụ ở đây là namespace /comments dành cho chức năng comment
 *  */
commentHandler(io.of("/comments"));

//#endregion

//#region setup middleware
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/res/user", express.static("res/user"));

//#endregion

//#region initialize app
connectDB();
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
//#region Test fcm only, delete if not needed
import fcmTestRouter from "./playground/fcm_test.router.js";
app.use(fcmTestRouter.getInstance(firebaseAdmin));
//#endregion

//#endregion

//#region setup routes

app.use("/res/user", express.static("res/user"));

app.use("/user", auth, userRouter);
app.use("/badge", auth, badgeRouter);
app.use("/chkin", auth, dailyCheckinRouter);
app.use("/policy", policyRoutes);
app.use("/topic", topicRoutes);
app.use("/report", auth, reportRoutes);
app.use("/test", auth, testRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/post", auth, postRouter);
//#endregion

//#region start server
app.use((req, res, next) => {
  const error = new Error("NOT FOUND!");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    msg: "INVALID DATA!",
    detail: error.message,
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server API listening at http://localhost:${port}`);
});
