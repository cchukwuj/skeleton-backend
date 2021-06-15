var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var db;


/* GET users listing. */
router.get('/:user', function(req, res, next) {
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "s_p4tHan",
    database: "contactsV2"
  });
  var id = req.params.user;
  db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT * FROM people WHERE user_name = ?", [id], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
});

router.get('/refresh', function(req, res, next) {
  db.end();
});


router.get('/deleteIt/:first/:last/:username', function(req, res, next) {
  var first_name = req.params.first;
  var last_name = req.params.last;
  var username = req.params.username;

  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "s_p4tHan",
    database: "contactsV2"
  });
  db.connect(function(err) {
    if (err) throw err;
    db.query("DELETE FROM people WHERE First_name = ? AND Last_name = ? AND user_name = ?", [first_name, last_name, username], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  db.commit();
});


router.post('/addIt', function(req,res) {
  const username = req.body.username;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email_address = req.body.email_address;
  const phone_number = req.body.phone_number;

  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "s_p4tHan",
    database: "contactsV2"
  });
  db.connect(function(err) {
    if (err) throw err;
    db.query("INSERT INTO people (user_name, First_Name, Last_Name, Email, Phone_Number) VALUES (?,?,?,?,?)", [username, first_name, last_name, email_address, phone_number], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  db.commit();


});

module.exports = router;
