var express = require("express");
var db = require("./db");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  //從DB抓資料
  db.all(
    "SELECT * FROM `Questions` ORDER BY QTime DESC",
    [],
    (error, question) => {
      db.all(
        "SELECT * FROM `Measures` ORDER BY PosID;",
        [],
        (error, students) => {
          res.render("Teacher", {
            date: "2021/1/13",
            question,
            students,
          });
        }
      );
    }
  );
});

// router.get("/teacher", function (req, res, next) {
//   //從DB抓資料
//   db.all("SELECT * FROM `Measures` ORDER BY PosID;", [], (error, rows)=>{

//     res.render("StudentSlides", {
//       date:"2021/1/13",
//       students: rows
//     });
//   });
// });

module.exports = router;
