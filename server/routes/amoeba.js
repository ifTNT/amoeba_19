var express = require("express");
var db = require("./db");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  //從DB抓資料
  db.all("SELECT * FROM `Measures` ORDER BY PosID;", [], (error, students) => {
    res.render("AmoebaPosition", {
      courseID: "CSD572",
      courseName: "嵌入式系統",
      courseTeacher: "郭錦福",
      courseDate: "2021/1/12",
      courseClassroom: "工院200",
      students,
    });
  });
});

module.exports = router;
