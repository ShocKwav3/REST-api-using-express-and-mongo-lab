/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _path = __webpack_require__(13);

var _path2 = _interopRequireDefault(_path);

var _morgan = __webpack_require__(12);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(10);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _controller = __webpack_require__(8);

var _controller2 = _interopRequireDefault(_controller);

var _database = __webpack_require__(4);

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
//due to webpack bug
var ejs = __webpack_require__(11).__express;
var port = process.env.PORT || 3000;

//connection to database
_mongoose2.default.connect(_database2.default.url);
_mongoose2.default.Promise = global.Promise;
var db = _mongoose2.default.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
  console.log("Connected to MongoDB");
});
//for logging information
app.use((0, _morgan2.default)('dev'));
//to make available the body of incoming request for access
app.use(_bodyParser2.default.json());
//serving static files (css, js, images etc)
app.use(_express2.default.static(_path2.default.join(__dirname, '..', 'public')));
//setting views
app.set('views', _path2.default.join(__dirname, '..', 'views'));
//setting templating engine
app.set('view engine', 'ejs');
//due to a bug of webpack do this
app.engine('.ejs', ejs);
//setting up corresponding routes
app.use('/', _controller2.default);
//handle error
app.use(function (err, req, res, next) {
  res.send({ error: err });
});

/*
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname,'..') + '/views/index.html');
});
*/

module.exports = { app: app, port: port };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _server = __webpack_require__(2);

_server.app.listen(_server.port, function () {
    console.log('Live on ' + _server.port);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    "url": "mongodb://shocky:shockyapi@ds062339.mlab.com:62339/testapi"
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _heroes = __webpack_require__(9);

var _heroes2 = _interopRequireDefault(_heroes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


//show hero from database
router.get('/', function (req, res) {
    _heroes2.default.find({}).then(function (heroes) {
        res.send(heroes);
    });
});

//add hero to database
router.post('/', function (req, res, next) {
    _heroes2.default.create(req.body).then(function (sentHeroObject) {
        res.send(sentHeroObject);
        console.log("Saved!");
    }).catch(next);
});

module.exports = router;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/hero', __webpack_require__(5));

module.exports = router;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//index page on GET request
router.get('/', function (req, res) {
  //console.log(req.url);
  res.render('index');
});

module.exports = router;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use('/', __webpack_require__(7));
router.use('/api', __webpack_require__(6));

module.exports = router;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

//creating hero schema
var heroSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    nickname: {
        type: String,
        required: [true, 'People should know them by nicks']
    },
    superpower: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    metahuman: {
        type: Boolean
    }
});

//creating hero model
var hero = _mongoose2.default.model('hero', heroSchema);

module.exports = hero;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ]);