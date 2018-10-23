// Для начала установим зависимости.
const http = require('http');
const http_config = require('./config/http_config');
 // Модуль для работы через serialport
const SerialPort = require('./app/serialport');
const routing = require('./routing');

let server = new http.Server(function(req, res) {
  // API сервера будет принимать только POST-запросы и только JSON, так что записываем
  // всю нашу полученную информацию в переменную jsonString
  var jsonString = '';
  res.setHeader('Content-Type', 'application/json');
  req.on('data', (data) => { // Пришла информация - записали.
      jsonString += data;
  });

  req.on('end', () => {// Информации больше нет - передаём её дальше.
      routing.define(req, res, jsonString); // Функцию define мы ещё не создали.
      console.log(req.url);
  });

  // res.end('Hello Node.js Server!');
});

server.listen(http_config.port, (err) => {
  if (err) {
      return console.log('something bad happened', err);
  }
  console.log(`Http server is listening on ${http_config.port}`);
});

let io = require('socket.io').listen(server);
SerialPort(io);

io.sockets.on('connection', function (data) {
  console.log("connection" + JSON.stringify(data));
});

/*
io.sockets.on('message', function(socket) {
  console.log('Sending update!');
});

io.sockets.on('update',function (socket) {
  console.log("update");
});

io.sockets.on('connection',function (socket) {
  console.log("user connected");
});





/*
function initSocketIO(httpServer,debug) {

	socketServer = socket.listen(httpServer);
	
	if(debug == false)
	{
		socketServer.set('log level', 1); // socket.io debug OFF
	}
	
	socketServer.on('connection', function (socket) {
		console.log("user connected");
		socket.emit('onconnection', {pollOneValue:sendData});		
		
		socketServer.on('update', function(data) {
      console.log("update");
      socket.emit('updateData',{pollOneValue:data});
		});
		
		socket.on('buttonval', function(data) {
			serialPort.write(data.toString());
			console.log("buttonval: " + data);
		});
		
		socket.on('sliderval', function(data) {
			serialPort.write(data.toString());
			console.log("sliderval: " + data);
		});
		
		socket.on('start', function(data) {
			serialPort.write(data.toString());
			console.log("start: " + data);
		});
    });
}

*/