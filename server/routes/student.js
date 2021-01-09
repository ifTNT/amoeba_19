var express = require("express");
var db = require("./db");
var router = express.Router();

/* GET home page. */
router.get("/slides", function (req, res, next) {
  //從DB抓資料
  db.all("SELECT Content FROM `Questions`", [], (error, rows)=>{
    res.render("StudentSlides", {
      questions: rows,
      slides:[
        "Slide1",
        "Slide2"
      ]
    });
  });
});
router.get("/test", function (req, res, next) {
  res.render("index", { title: "Test123" });
});

module.exports = router;
