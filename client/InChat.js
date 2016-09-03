/**
 * Yanning Liu
 * yanningl@andrew.cmu.edu
 * 09/03/2016
 */
 
var name = window.location.hash.substring(1);

var socket = io();

socket.emit('login');

socket.on('post', function(data) {
	console.log("Received a message from server");
	var history = document.getElementById('history');
	history.value += data;
	history.scrollTop = history.scrollHeight;
});

socket.on('open',function(){
});

function quit() {
	location.href='index.html';
}

function post() {
	// clear field
	var newEntry = document.getElementById('entry').value;
	document.getElementById('entry').value = '';

	// http://www.w3school.com.cn/jsref/jsref_obj_date.asp
	var date = new Date();
	var time = date.toLocaleString();

	var message = name + '\t' + time + '\n' + newEntry + '\n';

	console.log("message sent");

	socket.emit('post', message);
}