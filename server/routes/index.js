var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/test", function (req, res, next) {
  res.render("index", { title: "Test123" });
});
router.get("/teacher", function (req, res, next) {
  res.render("Teacher", {
    date:"2021/1/12",
    question: [
      "I don't know how to program JS",
      " count down 6 days to winter vocation"
     ],
    students: [
      {
        StuID: "A1075500",
        Temp: "70",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "3",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
    ]
  });
});

router.get("/AmoebaPosition", function (req, res, next) {
  res.render("AmoebaPosition", {
    date:"2021/1/12",
    courseID: "CSC111",
    courseName: "嵌入式系統",
    courseTeacher: "郭錦福",
    courseDate: "2021/11/87",
    courseClassroom: "工院200",
    students: [
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "40",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "3",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
      {
        StuID: "A1075500",
        Temp: "37",
        Time: "13:00"
      },
    ]
  });
});

module.exports = router;
