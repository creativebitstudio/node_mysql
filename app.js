// add the necessary dependencies
const express = require('express');
const mysql = require('mysql');
const http = require('http');
const app = express();

// establish a connection with mysql
let connection = mysql.createConnection({
    host: 'localhost',
    //default user name
  user: 'root',
  // no password needed for testing purposes
  password: '',
  // name of database
  database: 'sqldb'
});

// connection error to indicate wether there was a succesful connection or not
connection.connect((err) => {
  if (err) {
    console.log('There is an error connecting to MySQL');
  }
  else{
    console.log('Success! Connected to MySQL')
  }
});

// to output the database results on localhost 3000
app.get('/', (req, res) => {
  connection.query("SELECT * FROM sqltable", (err, rows, fields) => {
if(err){
  console.log('Error in the query');
}
else{
  console.log('Success!\n');
  console.log(rows[0].Name);
  res.status(200).send('Hello,' + ' ' + rows[0].Name);
}
  });
})

// declaring normalizePort and port # 3000
let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// to access the server through available port
const server = http.createServer(app)
server.listen(app.get('port'), () => {
console.log('Express server listening on port ' + app.get('port'))
})

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


