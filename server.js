/**
 * Yanning Liu
 * yanningl@andrew.cmu.edu
 * 09/03/2016
 */

// setup server
var express = require('express');
var app = express();

// https://expressjs.com/en/starter/static-files.html
app.use(express.static('client'));

// setup socket
var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(9000, function(){
    console.log('server starts...');
});

// setup db file
var fileSystem = require("fs");
var fileName = "chatHistory.db";
var fileExists = fileSystem.existsSync(fileName);
if (!fileExists) {
	console.log("Creating a new database file...");
	fileSystem.openSync(fileName, "w");
}

// set up database
// https://www.npmjs.com/package/sqlite3
var sql = require("sqlite3").verbose();
var db = new sql.Database(fileName);

db.serialize(function() {
	  db.run("CREATE TABLE IF NOT EXISTS ChatHistory (message TEXT)");
});
	  
io.on('connection', function(socket){

    socket.on('post',function(message){
    	console.log('Received a message from client');
    	// emit to other clients
    	socket.broadcast.emit('post', message);
    	// emit back to sender
    	socket.emit('post', message);
    	// save data into database
    	var stmt = db.prepare("INSERT INTO ChatHistory VALUES (?)");
    	stmt.run(message);
    	stmt.finalize();
    });

    socket.on('login', function() {
    	console.log('A new user logged in');
    	// send chat history to the new user
    	db.each("SELECT * FROM ChatHistory", function (err, res) {
    		socket.emit('post', res.message);
    	});
    });

});