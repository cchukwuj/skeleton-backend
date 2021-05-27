var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "s_p4tHan",
  database: "contacts"
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT * FROM people", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

router.get('/refresh', function(req, res, next) {
  db.end();
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "s_p4tHan",
    database: "contacts"
  });
});

module.exports = router;
