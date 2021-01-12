var express = require("express");
var db = require("./db");
var crypto = require("crypto");
var router = express.Router();

var mqtt = require("mqtt");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("StudentHome");
});
/* POST home page. */
router.post("/", function (req, res, next) {
  console.log(req.body);
  // Hash the password
  let shasum = crypto.createHash("sha1");
  shasum.update(req.body.password);
  let hash_passwd = shasum.digest("hex");
  let user = req.body.studentID;

  // 和資料庫的密碼比對
  db.get(
    "SELECT Password FROM `Accounts` WHERE StuID = ?",
    [user],
    (error, passwd) => {
      if (passwd["Password"] !== hash_passwd) {
        res.redirect("/student/");
      } else {
        req.session["user"] = user;
        res.redirect("/student/measure");
      }
    }
  );
});
router.get("/slides", function (req, res, next) {
  //從DB抓資料
  db.all("SELECT Content FROM `Questions`", [], (error, rows) => {
    res.render("StudentSlides", {
      questions: rows,
      slides: ["LPWAN 低功耗廣域網路架構與應用", "LoRa模組應用(Termite)"],
    });
  });
});

router.post("/slides", function (req, res, next) {
  //Insert data to database
  db.run("INSERT INTO `Questions` VALUES (?, ?, ?, ?);", [
    +Date.now(),
    req.session.user,
    req.body.content,
    +Date.now(),
  ]);
  res.redirect("/student/slides");
});

router.get("/measure", function (req, res, next) {
  let mqtt_args = {
    username: "DKS75FFBRE2KA1BKHZ",
    password: "DKS75FFBRE2KA1BKHZ",
  };
  let client = mqtt.connect("mqtt://iot.cht.com.tw", mqtt_args);

  let topic = "/v1/device/25622793175/rawdata";

  client.on("connect", function () {
    client.publish(topic, '[{"id":"measure", value:["1"]}]');

    client.end();
  });
  let user = req.session["user"];
  db.get(
    "SELECT `Name` FROM `Accounts` WHERE `StuID` = ?",
    [user],
    (error, rows) => {
      res.render("StudentInfo", {
        name: rows["Name"],
        studentid: user,
      });
    }
  );
});

router.get("/logout", function (req, res, next) {
  delete req.session["user"];
  res.redirect("/student/");
});

module.exports = router;
