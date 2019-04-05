var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const router = express.Router();
const morgan = require('morgan')

app.use(bodyParser.urlencoded({
    extended: false
 }));

app.use(express.static('./public'))

app.use(morgan('short'))

// ̥router.get("/", (req,res) => {
//   res.sendFile(path.join(__dirname+'/form.html'));
// });
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

//end mysql connection
//start body-parser configuration
app.use(bodyParser.urlencoded({extended: false}))
var server = app.listen(3000,  "127.0.0.1", function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});

//rest api to get all customers
app.get('/users', function (req, res) {
   connection.query('select * from data', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});

app.post("/add", (req, res) => {
   var params  = req.body;
   
   console.log(params);
   res.end()
    connection.query('INSERT INTO data SET ?', params, function (error, results, fields) {
	  if (error) throw error;
     res.end(JSON.stringify(results));
     console.log("Data Insterd Succusfully By ID :", results.insertId )
     res.send('Got a POST request')
 	});
});

//rest api to create a new customer record into mysql database
//rest api to update record into mysql database

// app.put('/valid:id', function (req, res) {
//   const userid = id;
//   connection.query('UPDATE data SET valid= 1 WHERE id = ?', [userId],  function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });

// rest api to delete record from mysql database
// app.delete('/customer', function (req, res) {
//    console.log(req.body);
//    connection.query('DELETE FROM `customer` WHERE `Id`=?', [req.body.Id], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end('Record has been deleted!');
// 	});
// });
