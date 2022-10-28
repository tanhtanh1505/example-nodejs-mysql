const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const HttpException = require("./utils/HttpException");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");

const setup = require("./setup/index");

dotenv.config();
const app = express();
const server = http.createServer(app);

setup.run();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/", userRoutes);
app.get("/", (req, res) => {
  res.status(200).end("hi");
});

app.all("*", (req, res, next) => {
  next(new HttpException(404, "Page not found :("));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Loi rui" } = err;
  res.status(status).end(message);
});

let port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running in ${port}`);
});
