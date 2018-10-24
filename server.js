const http = require('http');
const http_config = require('./config/http_config');
 
// Модуль для работы через serialport
const SerialPort = require('./app/serialport');
const routing = require('./routing');

const express = require('express')
const app = express()

const Server = http.createServer(app)
const io = require('socket.io').listen(Server) // we creating socket object

//app.get('/', (req, res) => {
  //res.send('<h1>Hello world!</h1>')
//})

// and add lines:

app.use(express.static(__dirname + '/webpage')) 
// we serving files from "public" directory

io.on('connection', socket => {
  console.log('a user connected')
  socket.emit('connected')
  socket.on('click', ({ id, x, y }) => {
    console.log(`socket with id ${id} just clicked on { ${x}, ${y} }`)
    // print to console event from web page
    socket.emit('click') // and let page knows it
  })
})

SerialPort(io);

Server.listen(http_config.port, () => {
  console.log(`Express server started on ${http_config.port}`);
})







/*
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




/*
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dweetClient = require('node-dweetio');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');

const dweetio = new dweetClient();
const dweetThing = 'node-temperature-monitor';
const SERVER_PORT = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Resource not found'
  });
});

io.on('connection', (socket) => {
  console.log('Connection has been established with browser.');
  socket.on('disconnect', () => {
    console.log('Browser client disconnected from the connection.');
  });
});

dweetio.listen_for(dweetThing, (dweet) => {
  const data = {
    sensorData: dweet.content,
    time: moment().format('HH:mm:ss')
  };
  io.emit('sensor-data', data);
});

http.listen(process.env.PORT || SERVER_PORT, () => {
  console.log(`Server started on the http://localhost:${SERVER_PORT}`);
});

*/