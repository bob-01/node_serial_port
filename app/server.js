var express = require("express");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
var mysql      = require('mysql');
var my_cfg = require("./config/my_cfg");
const {getHomePage, getChartPage} = require('./routes/index');
const {InfoSysPage, getInfoSysPage} = require('./routes/infsys');
const {getImsSystem} = require('./app/ims');
const {IpCalcPage} = require('./routes/ipcalc');
const {RulesPage} = require('./routes/rules');

const mydb = require('./app/my');

const port = 3000;

var app = express();
var router = express.Router();

const db = mysql.createConnection(my_cfg.web);

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});

const db_local = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '12qwasZX'
});

db_local.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to local database');
});

const asa_db = mysql.createConnection(my_cfg.asa);

asa_db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to ASA database');
});



global.db = db;
global.db_local = db_local;
global.asa_db = asa_db;

// configure middleware
app.use('/chart', express.static('node_modules/chart.js'));
app.use('/ipv4', express.static('app/ipv4.js'));
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app
app.get('/', (req, res, next) => {res.redirect('/1');});
app.get('/:page(\\d+)', getHomePage);
app.get('/infosys/', (req, res, next) => {res.redirect('/infosys/1');});
app.get('/infosys/:page(\\d+)', InfoSysPage);
app.get('/getinfosys/:id(\\d+)', getInfoSysPage);
app.get('/chart', getChartPage);
app.get('/calc', IpCalcPage);
app.get('/rules', RulesPage);

// Получение данных по системе из IMS
app.get('/getimssystem/:id(\\d+)', getImsSystem);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
