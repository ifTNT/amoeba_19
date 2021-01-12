var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var stylus = require("stylus");
var bodyParser = require("body-parser");
var session = require("express-session");
var cors = require("cors");

var indexRouter = require("./routes/index");
var studentRouter = require("./routes/student");
var teacherRouter = require("./routes/teacher");
var amoebaRouter = require("./routes/amoeba");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cors());
app.use(
  session({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use("/", indexRouter);
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/amoeba", amoebaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Listen MQTT
var mqtt = require("mqtt");
const db = require("./routes/db");

let mqtt_args = {
  username: "DKS75FFBRE2KA1BKHZ",
  password: "DKS75FFBRE2KA1BKHZ",
};
let client = mqtt.connect("mqtt://iot.cht.com.tw", mqtt_args);

var topic = "/v1/device/25622793175/sensor/temp/rawdata";

client.on("connect", function () {
  console.log("MQTT connected!");
  client.subscribe(topic);
});

client.on("message", function (topic, message) {
  let msg = JSON.parse(message);
  // JUst for demo
  db.run("INSERT INTO `Measures` VALUES (?, ?, ?, ?, ?)", [
    +Date.now(),
    "A1065524",
    msg.value[0],
    5,
    +Date.now(),
  ]);
});
module.exports = app;
