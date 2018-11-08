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
})

SerialPort(io);

Server.listen(http_config.port, () => {
  console.log(`Express server started on ${http_config.port}`);
})
