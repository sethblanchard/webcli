var socket = io('http://localhost:7123');
socket.on('from_cli', function (data) {

	//globally scoped eval so we can get at things like test... 
	var geval = eval;

var result = { err: null, result: null };

try{
	console.log(data.line);
	result.result = geval(data.line);
	console.log(result.result);
}catch(exp){
	console.error(exp);
	result.err = exp.toString();
}

//will need to be a callback...
socket.emit('from_browser', result);
});