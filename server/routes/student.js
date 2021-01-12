var express = require("express");
var db = require("./db");
var crypto = require("crypto");
var router = express.Router();

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
        res.redirect("/student/temperature");
      }
    }
  );
});
router.get("/slides", function (req, res, next) {
  //從DB抓資料
  db.all("SELECT Content FROM `Questions`", [], (error, rows) => {
    res.render("StudentSlides", {
      questions: rows,
      slides: ["Slide1", "Slide2"],
    });
  });
});

router.get("/measure", function (req, res, next) {
  //let user = req.session["user"];
  //db.get(
  //  "SELECT `Name` FROM `Accounts` WHERE `StuID` = ?",
  //  [user],
  //  (error, rows) => {
  res.render("StudentInfo", {
    name: "test",
    studentid: "A10000000",
    //name: rows["Name"],
    //studentid: user,
  });
  //  }
  //);
});

router.get("/logout", function (req, res, next) {
  delete req.session["user"];
  res.redirect("/student/");
});

module.exports = router;
