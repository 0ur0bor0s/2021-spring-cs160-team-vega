var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : localhost,
  user     : 'root',
  password : 'Jdindin98!',
  database: 'test'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

