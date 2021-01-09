var path = require("path");
var sqlite3 = require("sqlite3").verbose();
const db_name = path.join(__dirname, "../data", "amoeba19_test.db");
var db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'amoeba19_test.db'");
});

module.exports = db;