var express = require('express');
var mysql = require('mysql');
var emp = require('./empAPIs.js');
var cors = require('cors')

var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'srajan123',
  database: 'zetwerk',
  insecureAuth : true
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

app.use('/employee', emp);
app.use(cors());

app.listen(3000); //backlog default 511