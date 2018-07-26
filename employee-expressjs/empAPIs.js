var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'srajan123',
  database: 'zetwerk',
  insecureAuth : true
})

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//get all employees
router.get('/all', function(req, res){
	connection.query("SELECT * FROM empTable", function (err, result, fields) {
	    if (err) throw err;
		res.send(result);
	});
   // res.send('GET route on things.');
});

//search function
router.get('/search', function(req, res){
	//res.send(req.query.key);
	//console.log(req.query.key);	
	var searchQuery = "SELECT * FROM empTable WHERE CONCAT(empId, '', name, '', dob, '', salary, '', skills) LIKE \"\%" + req.query.key + "\%\"";
	connection.query(searchQuery, function(err, result, fields){
		if (err) throw err;
		console.log("result = " + result);
		res.send(result);
	});
});

//add api where keys are: name, dob, salary, skills
router.post('/add', function(req, res){
	var addQuery = "INSERT INTO empTable (name, dob, salary, skills) VALUES (\'" + req.body.name + "\', \'" + req.body.dob + "\', \'" + req.body.salary + "\', \'" + req.body.skills + "\')";
	console.log(addQuery);
	connection.query(addQuery, function(err, result, fields){
		if (err) throw err;
		console.log("result = " + result);
		res.send(result);
	});
});

//add api where keys are: empId
router.post('/delete', function(req, res){
	var deleteQuery = "DELETE FROM empTable WHERE empId=" + req.body.empId;
	console.log(deleteQuery);
	connection.query(deleteQuery, function(err, result, fields){
		if (err) throw err;
		console.log("result = " + result);
		res.send(result)
	});
});

//export this router to use in our index.js
module.exports = router;