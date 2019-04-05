var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const router = express.Router();
const morgan = require('morgan')
const main = require('main');

var unique = main.app.post.results.insertId;
console.log(unique);

function getconnection(){
  return mysql.createConnection({
    host     : 'localhost', //mysql database host name
    user     : 'root', //mysql database user name
    password : '', //mysql database password
    database : 'user_form' //mysql database name
  });
}

const connection = getconnection()
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
