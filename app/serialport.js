module.exports = (io) => {

  const SerialPort = require('serialport');
  const serial_cfg = require('../config/serial');
  const Readline = SerialPort.parsers.Readline;

  var port = new SerialPort(serial_cfg.port, {
    baudRate: serial_cfg.baudRate,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
  });

  const parser = port.pipe(new Readline({delimiter: '\r\n'}));
/*
  port.write("\r\n", function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    //console.log('message written');
  });
*/

  port.on('open', showPortOpen);
  parser.on('data', readSerialData);
  port.on('close', showPortClose);
  port.on('error', showError);

  function showPortOpen() {
    console.log('Serial port open. Data rate: ' + port.baudRate);
  }

  let DataArray = '';

  function readSerialData(data) {
    //console.log(data);

    var today = new Date();
    io.sockets.emit('temp',
                      {date: today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear(),
                       time: (today.getHours())+":"+(today.getMinutes()),
                       DataArray: data});
/*
    io.on('connection', socket => {
      socket.emit('connected');
      socket.emit('data', DataArray);
    });  
*/

  }

  function showPortClose() {
    console.log('port closed.');
  }

  function showError(error) {
    console.log('Serial port error: ' + error);
  }
};

/*

  https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/

      //transmit the sendData array
      for(i=0; i<sendData.length; i++)
      {
        socketServer.emit('update', CharArray);
      }


  void loop() {
    if (Serial.available()) {
      char input = Serial.read();
      // read the input on analog pin 0:
      int sensorValue = analogRead(A0);
      // print out the value you read:
      Serial.println(sensorValue);
      delay(1); // delay in between reads for stability
  }
  }

sp.on('data', function (data) { // call back when data is received
    readData += data.toString(); // append data to buffer
    // if the letters 'A' and 'B' are found on the buffer then isolate what's in the middle
    // as clean data. Then clear the buffer. 
    if (readData.indexOf('B') >= 0 && readData.indexOf('A') >= 0) {
        cleanData = readData.substring(readData.indexOf('A') + 1, readData.indexOf('B'));
        readData = '';

            More code here later...

      }
    });

Namespace {
  name: '/',
  server:
   Server {
     nsps: { '/': [Circular] },
     parentNsps: Map {},
     _path: '/socket.io',
     _serveClient: true,
     parser:
      { protocol: 4,
        types: [Array],
        CONNECT: 0,
        DISCONNECT: 1,
        EVENT: 2,
        ACK: 3,
        ERROR: 4,
        BINARY_EVENT: 5,
        BINARY_ACK: 6,
        Encoder: [Function: Encoder],
        Decoder: [Function: Decoder] },
     encoder: Encoder {},
     _adapter: [Function: Adapter],
     _origins: '*:*',
     sockets: [Circular],
     eio:
      Server {
        clients: {},
        clientsCount: 0,
        wsEngine: 'ws',
        pingTimeout: 5000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Array],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Array],
        ws: [WebSocketServer],
        _events: [Object],
        _eventsCount: 1 },
     httpServer:
      Server {
        domain: null,
        _events: [Object],
        _eventsCount: 5,
        _maxListeners: undefined,
        _connections: 0,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        _connectionKey: '6::::3100',
        [Symbol(asyncId)]: 7 },
     engine:
      Server {
        clients: {},
        clientsCount: 0,
        wsEngine: 'ws',
        pingTimeout: 5000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Array],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Array],
        ws: [WebSocketServer],
        _events: [Object],
        _eventsCount: 1 } },
  sockets: {},
  connected: {},
  fns: [],
  ids: 0,
  rooms: [],
  flags: {},
  adapter: Adapter { nsp: [Circular], rooms: {}, sids: {}, encoder: Encoder {} } }

Use
Namespace {
  name: '/',
  server:
   Server {
     nsps: { '/': [Circular] },
     parentNsps: Map {},
     _path: '/socket.io',
     _serveClient: true,
     parser:
      { protocol: 4,
        types: [Array],
        CONNECT: 0,
        DISCONNECT: 1,
        EVENT: 2,
        ACK: 3,
        ERROR: 4,
        BINARY_EVENT: 5,
        BINARY_ACK: 6,
        Encoder: [Function: Encoder],
        Decoder: [Function: Decoder] },
     encoder: Encoder {},
     _adapter: [Function: Adapter],
     _origins: '*:*',
     sockets: [Circular],
     eio:
      Server {
        clients: {},
        clientsCount: 0,
        wsEngine: 'ws',
        pingTimeout: 5000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Array],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Array],
        ws: [WebSocketServer],
        _events: [Object],
        _eventsCount: 1 },
     httpServer:
      Server {
        domain: null,
        _events: [Object],
        _eventsCount: 5,
        _maxListeners: undefined,
        _connections: 0,
        _handle: [TCP],
        _usingWorkers: false,
        _workers: [],
        _unref: false,
        allowHalfOpen: true,
        pauseOnConnect: false,
        httpAllowHalfOpen: false,
        timeout: 120000,
        keepAliveTimeout: 5000,
        _pendingResponseData: 0,
        maxHeadersCount: null,
        _connectionKey: '6::::3100',
        [Symbol(asyncId)]: 7 },
     engine:
      Server {
        clients: {},
        clientsCount: 0,
        wsEngine: 'ws',
        pingTimeout: 5000,
        pingInterval: 25000,
        upgradeTimeout: 10000,
        maxHttpBufferSize: 100000000,
        transports: [Array],
        allowUpgrades: true,
        allowRequest: [Function: bound ],
        cookie: 'io',
        cookiePath: '/',
        cookieHttpOnly: true,
        perMessageDeflate: [Object],
        httpCompression: [Object],
        initialPacket: [Array],
        ws: [WebSocketServer],
        _events: [Object],
        _eventsCount: 1 } },
  sockets: {},
  connected: {},
  fns: [],
  ids: 0,
  rooms: [],
  flags: {},
  adapter: Adapter { nsp: [Circular], rooms: {}, sids: {}, encoder: Encoder {} } }











*/
