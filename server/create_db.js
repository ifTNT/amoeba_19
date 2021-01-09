var path = require("path");
var sqlite3 = require("sqlite3").verbose();
const db_name = path.join(__dirname, "data", "amoeba19_test.db");
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'amoeba19_text.db.db'");
});

// Create table
db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS Accounts (StuID VARCHAR(10), Name VARCHAR(20), Password CHAR(40))"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS Measures (MeasureID VARCHAR(10), StuID VARCHAR(10), Temp FLOAT, PosID INT, Time DATETIME)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS Questions (QID VARCHAR(10), StuID VARCHAR(10), Content VARCHAR(100), QTime DATETIME)"
  );
});

db.close();
