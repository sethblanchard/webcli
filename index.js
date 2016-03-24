var app       = require('http').createServer(handler)
var io        = require('socket.io')(app);
var fs        = require('fs');
var chalk     = require('chalk');
var readline  = require('readline');

var cnsl_err = chalk.red;

var rl = readline.createInterface(process.stdin, process.stdout);


app.listen(7123);

//Can probably remove from final?
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


rl.setPrompt('OHAI> ');
rl.prompt();

rl.on('close', function(){
  console.log('Have a great day!');
  process.exit(0);
});


io.on('connection', function (socket) {

  rl.on('line', function(line){
    socket.emit('from_cli', { line: line });
  });

  socket.on('from_browser', function (data) {
    if(data.err){
      console.log(chalk.red(data.err));
    }else{
      console.log(data.result);
    }
    rl.prompt();
  });
});

/*
//io.on('disconnect') //check to see if any browsers active 
//if not then tell the cli to go home
*/