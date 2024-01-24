const express = require("express");
const app = express();
const userRouter = require("./Routes/userRoutes");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const categoryRouter = require("./Routes/categoryRoute");
const http = require("http");
const { Server } = require("socket.io");
const httpServer = http.createServer(app);
const path = require("path");

app.use(cors({
  origin: [process.env.ORIGIN1, process.env.ORIGIN2],
  allowedHeaders: "X-Requested-With, Content-Type, Authorization",
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const io = new Server(httpServer, {
  cors: {
    origin: [process.env.ORIGIN1, process.env.ORIGIN2],
    allowedHeaders: "X-Requested-With, Content-Type, Authorization",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a React user connected");
  socket.on("send-data", (data) => {
    console.log(data,"data")
    socket.broadcast.emit("send-data-from-server",data)
  });
});

app.use("/", userRouter);
app.use("/", categoryRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
    // app.listen(process.env.PORT, () => {
    //   console.log("server listening on port 8080");
    // });
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/validateToken", (req, res) => {
//    console.log(req,"ppoii")
//   });
