var SerialPort = require('serialport');

var port = new SerialPort('COM4', {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
});

port.write("\r\n", function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  //console.log('message written');
});

port.on('open', showPortOpen);
port.on('data', readSerialData);
port.on('close', showPortClose);
port.on('error', showError);

function showPortOpen() {
  console.log('Port open. Data rate: ' + port.baudRate);
}

let CharArray = [];

function readSerialData(data) {
  
  CharArray.push(data);
  
  if (data.toString() === '\n') {
    data = '';
    CharArray.forEach((char) => {
      data += char.toString(); 
    });
    console.log(data);
  }
}

function showPortClose() {
  console.log('port closed.');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}

/*

  https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/

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
*/
