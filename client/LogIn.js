/**
 * Yanning Liu
 * yanningl@andrew.cmu.edu
 * 09/03/2016
 */

function start() {
	var name = document.getElementById('name').value;
	document.getElementById('name').value = '';
	location.href = 'InChat.html' + '#' + name;
}