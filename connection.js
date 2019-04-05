
function getconnection(){
    return mysql.createConnection({
      host     : 'localhost', //mysql database host name
      user     : 'root', //mysql database user name
      password : '', //mysql database password
      database : 'user_form' //mysql database name
    });
  }
module.export.getconnection();