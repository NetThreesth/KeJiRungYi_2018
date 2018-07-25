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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app_src/main.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app_src/AppSetting.ts":
/*!*******************************!*\
  !*** ./app_src/AppSetting.ts ***!
  \*******************************/
/*! exports provided: AppSetting, Roles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSetting", function() { return AppSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Roles", function() { return Roles; });
var AppSetting = /** @class */ (function () {
    function AppSetting() {
    }
    AppSetting.userName = 'TestUser';
    return AppSetting;
}());

;
var Roles;
(function (Roles) {
    Roles[Roles["User"] = 0] = "User";
    Roles[Roles["ChatBot"] = 1] = "ChatBot";
    Roles[Roles["Algae"] = 2] = "Algae";
    Roles[Roles["AI"] = 3] = "AI";
})(Roles || (Roles = {}));
;


/***/ }),

/***/ "./app_src/BabylonUtility.ts":
/*!***********************************!*\
  !*** ./app_src/BabylonUtility.ts ***!
  \***********************************/
/*! exports provided: BabylonUtility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BabylonUtility", function() { return BabylonUtility; });
/* harmony import */ var _CommonUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommonUtility */ "./app_src/CommonUtility.ts");

var BabylonUtility = /** @class */ (function () {
    function BabylonUtility() {
    }
    BabylonUtility.distance = function (v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };
    ;
    BabylonUtility.degrees = function (v1, v2) {
        var rad = Math.acos(BABYLON.Vector3.Dot(v1, v2) / (v1.length() * v2.length()));
        return BABYLON.Angle.FromRadians(rad).degrees() || 0;
    };
    ;
    BabylonUtility.addVector = function (v1, v2) {
        return new BABYLON.Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    };
    ;
    BabylonUtility.subtractVector = function (v1, v2) {
        return new BABYLON.Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    };
    ;
    BabylonUtility.getRandomVector3 = function (randomOnX, randomOnY, randomOnZ) {
        if (randomOnX === void 0) { randomOnX = true; }
        if (randomOnY === void 0) { randomOnY = true; }
        if (randomOnZ === void 0) { randomOnZ = true; }
        return new BABYLON.Vector3(randomOnX ? _CommonUtility__WEBPACK_IMPORTED_MODULE_0__["CommonUtility"].getRandomInt() : 0, randomOnY ? _CommonUtility__WEBPACK_IMPORTED_MODULE_0__["CommonUtility"].getRandomInt() : 0, randomOnZ ? _CommonUtility__WEBPACK_IMPORTED_MODULE_0__["CommonUtility"].getRandomInt() : 0).normalize();
    };
    ;
    BabylonUtility.updatePosition = function (position, translateVector, scale) {
        position.x += (translateVector.x * scale);
        position.y += (translateVector.y * scale);
        position.z += (translateVector.z * scale);
        return position;
    };
    ;
    BabylonUtility.positionToString = function (position) {
        var positions = ['x', 'y', 'z'].map(function (k) {
            return position[k].toFixed(2);
        });
        return positions.join(', ');
    };
    ;
    BabylonUtility.getLineToEachOther = function (points) {
        var lines = [];
        points.forEach(function (from, iOfFrom) {
            points.forEach(function (to, iOfTo) {
                if (iOfFrom < iOfTo) {
                    var distance = BabylonUtility.distance(from, to);
                    var key = iOfFrom + "-" + iOfTo;
                    lines.push({
                        key: key,
                        from: from,
                        to: to,
                        distance: distance
                    });
                }
            });
        });
        return lines;
    };
    ;
    return BabylonUtility;
}());

;
;


/***/ }),

/***/ "./app_src/CommonUtility.ts":
/*!**********************************!*\
  !*** ./app_src/CommonUtility.ts ***!
  \**********************************/
/*! exports provided: CommonUtility */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonUtility", function() { return CommonUtility; });
var CommonUtility = /** @class */ (function () {
    function CommonUtility() {
    }
    CommonUtility.getRandomBoolean = function () {
        return Math.random() >= 0.5;
    };
    ;
    CommonUtility.getRandomNumberInRange = function (min, max, digits) {
        var rate = Math.pow(10, digits);
        return CommonUtility.getRandomIntInRange(min * rate, max * rate) / rate;
    };
    ;
    CommonUtility.getRandomIntInRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    ;
    CommonUtility.getRandomInt = function (digits) {
        var r = CommonUtility.getRandomBoolean() ? 1 : -1;
        return CommonUtility.getRandomNegativeInt(digits) * r;
    };
    ;
    CommonUtility.getRandomNegativeInt = function (digits) {
        return CommonUtility.getRandomNegativeNumber(digits);
    };
    ;
    CommonUtility.getRandomNumber = function (digitsOnInt, digitsOnFloat) {
        var r = CommonUtility.getRandomBoolean() ? 1 : -1;
        return CommonUtility.getRandomNegativeNumber(digitsOnInt, digitsOnFloat) * r;
    };
    ;
    CommonUtility.getRandomNegativeNumber = function (digitsOnInt, digitsOnFloat) {
        digitsOnInt = digitsOnInt || 1;
        digitsOnFloat = digitsOnFloat || 0;
        var result = Math.round(Math.random() * Math.pow(10, digitsOnInt + digitsOnFloat));
        if (digitsOnFloat !== 0)
            result = result / Math.pow(10, digitsOnFloat);
        return result;
    };
    ;
    CommonUtility.sort = function (array, func) {
        array.sort(function (a, b) {
            return func(a) - func(b);
        });
        return array;
    };
    ;
    CommonUtility.shuffle = function (array) {
        var currentIndex = array.length;
        var temporaryValue;
        var randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };
    ;
    CommonUtility.createArray = function (length) {
        var array = Array.apply(null, { length: length });
        return array;
    };
    ;
    CommonUtility.getQueryString = function (field, url) {
        var href = url ? url : window.location.href;
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
        var string = reg.exec(href);
        return string ? decodeURIComponent(string[1]) : null;
    };
    ;
    CommonUtility.deepMerge = function (from, to, propName) {
        if (from instanceof Object && !(from instanceof Date)) {
            if (from instanceof Array)
                to = to || [];
            to = to || {};
            var fromKeys = Object.keys(from);
            if (fromKeys) {
                fromKeys.forEach(function (prop) {
                    to[prop] = CommonUtility.deepMerge(from[prop], to[prop], prop);
                });
            }
        }
        else
            to = from;
        return to;
    };
    ;
    CommonUtility.deepClone = function (obj) {
        return CommonUtility.deepMerge(obj, {});
    };
    ;
    CommonUtility.asyncPost = function (url, data) {
        return $.ajax({
            url: url,
            type: "post",
            contentType: "application/json",
            data: JSON.stringify(data)
        });
    };
    ;
    return CommonUtility;
}());

;


/***/ }),

/***/ "./app_src/ControlPanel.tsx":
/*!**********************************!*\
  !*** ./app_src/ControlPanel.tsx ***!
  \**********************************/
/*! exports provided: ControlPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlPanel", function() { return ControlPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MessageCenter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MessageCenter */ "./app_src/MessageCenter.ts");
/* harmony import */ var _AppSetting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppSetting */ "./app_src/AppSetting.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ControlPanel = /** @class */ (function (_super) {
    __extends(ControlPanel, _super);
    function ControlPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlPanel.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "control-panel invisible untouchable" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: "textInput invisible" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "text", onKeyPress: this.keyPress.bind(this) }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { className: "button", onClick: this.handleText.bind(this) },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fas fa-share" }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "buttons" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { id: "textInputSwitch", className: "button white-text", onClick: this.switchTextInput.bind(this) },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "far fa-comment-dots" })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("label", { htmlFor: "fileUpload", className: "button white-text" },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fas fa-camera-retro" })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { id: "fileUpload", type: "file", accept: "image/*", style: { display: 'none' }, onChange: this.handleFiles.bind(this) })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "flashMask" }));
    };
    ;
    ControlPanel.prototype.componentDidMount = function () {
        this.props.eventCenter.on(_MessageCenter__WEBPACK_IMPORTED_MODULE_1__["Event"].AfterLogin, function () {
            $('.control-panel').removeClass(['invisible', 'untouchable']).addClass('visible');
        });
    };
    ;
    ControlPanel.prototype.onTextAdd = function (text) {
        this.props.messageCenter.addText(_AppSetting__WEBPACK_IMPORTED_MODULE_2__["Roles"].User, text);
    };
    ;
    ControlPanel.prototype.onImageAdd = function (image) {
        this.props.messageCenter.addImage(_AppSetting__WEBPACK_IMPORTED_MODULE_2__["Roles"].User, image);
    };
    ;
    ControlPanel.prototype.switchTextInput = function () {
        var $textInput = $('.textInput');
        $textInput.toggleClass('visible').toggleClass('invisible');
        if ($textInput.hasClass('visible'))
            $textInput.find('input').focus();
    };
    ;
    ControlPanel.prototype.keyPress = function (e) {
        if (e.which == 13 || e.keyCode == 13)
            this.handleText();
    };
    ;
    ControlPanel.prototype.handleText = function () {
        var $input = $('.textInput>input');
        var text = $input.val();
        if (!text)
            return;
        $input.val('');
        this.onTextAdd(String(text));
        this.switchTextInput();
        var $mask = $('.flashMask');
        $mask.addClass('flash');
        setTimeout(function () {
            $mask.removeClass('flash');
        }, 500);
    };
    ;
    ControlPanel.prototype.handleFiles = function ($ele) {
        var _this = this;
        var image = $ele.currentTarget.files[0];
        if (!image)
            return;
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
            var base64Image = e.target['result'];
            _this.onImageAdd(base64Image);
        });
        FR.readAsDataURL(image);
    };
    ;
    return ControlPanel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

;


/***/ }),

/***/ "./app_src/DevPanel.tsx":
/*!******************************!*\
  !*** ./app_src/DevPanel.tsx ***!
  \******************************/
/*! exports provided: AddLogEvent, DevPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddLogEvent", function() { return AddLogEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevPanel", function() { return DevPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MessageCenter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MessageCenter */ "./app_src/MessageCenter.ts");
/* harmony import */ var _CommonUtility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CommonUtility */ "./app_src/CommonUtility.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var AddLogEvent = 'AddLogEvent';
var DevPanel = /** @class */ (function (_super) {
    __extends(DevPanel, _super);
    function DevPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.isdev = _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getQueryString('isdev');
        _this.state = { log: [] };
        if (!_this.isdev)
            return _this;
        var eventCenter = _this.props.eventCenter;
        eventCenter.on(_MessageCenter__WEBPACK_IMPORTED_MODULE_1__["Event"].UpdateDevPanelData, function (data) {
            if (Object.keys(data).some(function (key) { return _this.state[key] !== data[key]; }))
                _this.setState(Object.assign({}, _this.state, data));
        });
        eventCenter.on(AddLogEvent, function (log) {
            _this.state.log.push(JSON.stringify(log));
            if (_this.state.log.length > 3)
                _this.state.log.shift();
            _this.setState(Object.assign({}, _this.state));
        });
        return _this;
    }
    ;
    DevPanel.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { id: "devPanel" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, "FPS"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, this.state.fps)),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, "LSPerformance"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, this.state.linesystemPerformance)),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, "Coordinate"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, this.state.coordinate)),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, "GreenMask"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, this.state.greenMask)),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", { colSpan: 2 }, this.renderLog())))));
    };
    ;
    DevPanel.prototype.renderLog = function () {
        var lis = this.state.log.map(function (e) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null, e); });
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", null, lis);
    };
    ;
    DevPanel.prototype.componentDidMount = function () {
        if (!this.isdev)
            return;
        $('#devPanel').show();
    };
    ;
    return DevPanel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

;
;


/***/ }),

/***/ "./app_src/LoginPanel.tsx":
/*!********************************!*\
  !*** ./app_src/LoginPanel.tsx ***!
  \********************************/
/*! exports provided: LoginPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPanel", function() { return LoginPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AppSetting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppSetting */ "./app_src/AppSetting.ts");
/* harmony import */ var _MessageCenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MessageCenter */ "./app_src/MessageCenter.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var LoginPanel = /** @class */ (function (_super) {
    __extends(LoginPanel, _super);
    function LoginPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginPanel.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { id: "loginPanel", className: "flex flex-center", onClick: this.focus.bind(this) },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "white-text text-center wordCard" },
                "\u6982\u5FF5\u6709\u540D\u800C\u6210\u6578\u64DA\uFF0C",
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                " \u7269\u9AD4\u7121\u5F62\u800C\u6210\u6982\u5FF5\uFF0C",
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                " \u5F7C\u81EA\u6210\u7A7A\u9593\uFF1B"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "white-text text-center wordCard" },
                "\u842C\u7269\u7AC4\u6D41\u5B87\u5B99\uFF0C",
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                " \u5728\u908A\u9699\u8655\u843D\u4E0B\uFF0C",
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                " \u65BC\u5F7C\u7AEF\u518D\u73FE\uFF1B"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "white-text text-center wordCard startBackgroundTransform" },
                "\u5343\u842C\u5F62\u8C8C\uFF0C",
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                " \u7D42\u6B78\u6D85\u69C3\uFF0C",
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                " \u751F\u751F\u4E0D\u606F\uFF0C",
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("br", null),
                " \u5468\u800C\u5FA9\u59CB\u3002"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { id: "signInWrapper", className: "wordCard" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: "label white-text" }, "Sign in with:\u00A0"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("input", { type: "text", id: "signInName", onKeyPress: this.keyPress.bind(this) }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "signInButton", onClick: this.signInButtonClickHandler.bind(this) },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: "fas fa-arrow-circle-right" }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "skipAnimation" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", onClick: this.skipAnimation.bind(this) }, "skip")));
    };
    ;
    LoginPanel.prototype.componentDidMount = function () {
        this.wordCardsAnimation();
    };
    ;
    LoginPanel.prototype.fadeAnimation = function (ele, setting, afterFunc) {
        var animation = $(ele).fadeIn(setting.fadeIn, undefined, function () {
            if (!setting.fadeOut)
                afterFunc(ele);
        });
        if (!setting.fadeOut)
            return;
        animation.delay(setting.sustain || 0).fadeOut(setting.fadeOut, undefined, function () {
            afterFunc(ele);
        });
    };
    ;
    LoginPanel.prototype.fadeSequence = function (eleArray, setting, afterFunc) {
        var _this = this;
        setting.fadeOut = (eleArray.length === 1) ? null : setting.fadeOut;
        this.fadeAnimation(eleArray.shift(), setting, function (ele) {
            afterFunc(ele);
            if (eleArray.length === 0)
                return;
            _this.fadeSequence(eleArray, setting, afterFunc);
        });
    };
    ;
    LoginPanel.prototype.wordCardsAnimation = function () {
        var _this = this;
        var wordCards = $('.wordCard').toArray();
        var setting = {
            fadeIn: 5000,
            sustain: 1000,
            fadeOut: 2000
        };
        this.fadeSequence(wordCards, setting, function (ele) {
            if (ele.classList.contains('startBackgroundTransform'))
                _this.afterWordCardsAnimation();
        });
    };
    ;
    LoginPanel.prototype.skipAnimation = function (e) {
        e.stopPropagation();
        var $wordCards = $('.wordCard');
        $wordCards.stop(true);
        $wordCards.hide();
        $('.skipAnimation').hide();
        $wordCards.last().fadeIn();
        this.afterWordCardsAnimation();
    };
    ;
    LoginPanel.prototype.afterWordCardsAnimation = function () {
        $('.skipAnimation').hide();
        this.props.eventCenter.trigger(_MessageCenter__WEBPACK_IMPORTED_MODULE_2__["Event"].AfterWordCardsAnimation);
    };
    ;
    LoginPanel.prototype.focus = function () {
        setTimeout(function () { return $('#signInName').focus(); });
    };
    ;
    LoginPanel.prototype.keyPress = function (e) {
        if (e.which == 13 || e.keyCode == 13)
            this.signInButtonClickHandler();
    };
    ;
    LoginPanel.prototype.signInButtonClickHandler = function () {
        var signInName = $('#signInName').val();
        if (signInName.length === 0)
            return;
        _AppSetting__WEBPACK_IMPORTED_MODULE_1__["AppSetting"].userName = signInName;
        this.login();
    };
    ;
    LoginPanel.prototype.login = function () {
        var $loginPanel = $('#loginPanel');
        $loginPanel.animate({ opacity: 0 }, 2000, function () { return $loginPanel.hide(); });
        this.props.eventCenter.trigger(_MessageCenter__WEBPACK_IMPORTED_MODULE_2__["Event"].AfterLogin);
    };
    ;
    return LoginPanel;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

;


/***/ }),

/***/ "./app_src/MessageBoard.tsx":
/*!**********************************!*\
  !*** ./app_src/MessageBoard.tsx ***!
  \**********************************/
/*! exports provided: MessageBoard, Scrollbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageBoard", function() { return MessageBoard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scrollbar", function() { return Scrollbar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MessageCenter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MessageCenter */ "./app_src/MessageCenter.ts");
/* harmony import */ var _DevPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DevPanel */ "./app_src/DevPanel.tsx");
/* harmony import */ var _AppSetting__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AppSetting */ "./app_src/AppSetting.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var MessageBoard = /** @class */ (function (_super) {
    __extends(MessageBoard, _super);
    function MessageBoard(props) {
        var _this = _super.call(this, props) || this;
        var messageCenter = _this.props.messageCenter;
        _this.state = { contents: messageCenter.contents.slice() };
        _this.props.messageCenter.eventCenter.on(_MessageCenter__WEBPACK_IMPORTED_MODULE_1__["MessageCenter"].eventName, _this.refresh.bind(_this));
        return _this;
    }
    ;
    MessageBoard.prototype.render = function () {
        var contents = this.state.contents;
        var contentElements = contents.map(this.createContent.bind(this));
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { id: "messageBoard", className: "invisible" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "messageBoardContent" }, contentElements),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Scrollbar, { syncTarget: ".messageBoardContent", eventCenter: this.props.eventCenter }));
    };
    ;
    MessageBoard.prototype.componentDidMount = function () {
        var _this = this;
        this.props.eventCenter.on(Scrollbar.ScrollEvent, function (rate) {
            _this.scrollTo(rate);
        });
    };
    ;
    MessageBoard.prototype.componentDidUpdate = function () {
        var _this = this;
        this.scrollTo(1, false, function () {
            _this.props.eventCenter.trigger(Scrollbar.UpdateEvent);
        });
    };
    ;
    MessageBoard.prototype.createContent = function (content) {
        if (content.type === _MessageCenter__WEBPACK_IMPORTED_MODULE_1__["ContentType"].Text)
            return this.createTextMessage(content);
        else if (content.type === _MessageCenter__WEBPACK_IMPORTED_MODULE_1__["ContentType"].Image)
            return this.createImageMessage(content);
    };
    ;
    MessageBoard.prototype.createTextMessage = function (content) {
        var isUser = content.role === _AppSetting__WEBPACK_IMPORTED_MODULE_3__["Roles"].User;
        var name = isUser ? _AppSetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].userName : '';
        var float = isUser ? 'left' : 'right';
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "messageBox", style: { float: float } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { src: this.getAvatar(content.role), className: "avatar" }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "name" }, name),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "content" }, content.content));
    };
    ;
    MessageBoard.prototype.createImageMessage = function (content) {
        var style = {
            width: '100%',
            maxWidth: '600px'
        };
        var isUser = content.role === _AppSetting__WEBPACK_IMPORTED_MODULE_3__["Roles"].User;
        var name = isUser ? _AppSetting__WEBPACK_IMPORTED_MODULE_3__["AppSetting"].userName : '';
        var float = isUser ? 'left' : 'right';
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "messageBox", style: { float: float } },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { src: this.getAvatar(content.role), className: "avatar" }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "name" }, name),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "content" },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { src: content.content, style: style })));
    };
    ;
    MessageBoard.prototype.refresh = function () {
        var contents = this.props.messageCenter.contents.slice();
        if (contents.length === 0)
            return;
        console.log('refresh fired');
        $('#messageBoard').removeClass('invisible');
        this.setState({ contents: contents });
    };
    ;
    MessageBoard.prototype.getAvatar = function (role) {
        if (role === _AppSetting__WEBPACK_IMPORTED_MODULE_3__["Roles"].User)
            return 'assets/avatar_white.png';
        if (role === _AppSetting__WEBPACK_IMPORTED_MODULE_3__["Roles"].Algae)
            return 'assets/avatar_yellow.png';
        if (role === _AppSetting__WEBPACK_IMPORTED_MODULE_3__["Roles"].ChatBot)
            return 'assets/avatar_pink.png';
    };
    ;
    MessageBoard.prototype.scrollTo = function (rate, immediate, afterFunc) {
        if (immediate === void 0) { immediate = true; }
        if (afterFunc === void 0) { afterFunc = function () { }; }
        var $scrollTarget = $('.messageBoardContent');
        var targetTotalH = $scrollTarget.prop('scrollHeight');
        var targetViewH = $scrollTarget.height();
        var offset = (targetTotalH - targetViewH) * rate;
        $scrollTarget.animate({ scrollTop: offset }, immediate ? 0 : 500, afterFunc);
    };
    ;
    return MessageBoard;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

;
var Scrollbar = /** @class */ (function (_super) {
    __extends(Scrollbar, _super);
    function Scrollbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$syncTarget = null;
        return _this;
    }
    Scrollbar.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "scrollbarContainer" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "scrollbar" }));
    };
    ;
    Scrollbar.prototype.componentDidMount = function () {
        this.$syncTarget = $(this.props.syncTarget);
        this.initScrollbar();
    };
    ;
    Scrollbar.prototype.initScrollbar = function () {
        var _this = this;
        var eventCenter = this.props.eventCenter;
        var isDragging = false;
        var origin = { pageY: 0, scrollbarOffset: 0 };
        var $scrollbarContainer = $('.scrollbarContainer');
        var $scrollbar = $scrollbarContainer.find('.scrollbar');
        $(document)
            .on('mousedown touchstart', '.scrollbarContainer', function (e) {
            e.preventDefault();
            var pageY = (e.type === 'touchstart') ? e.originalEvent.touches[0].pageY : e.pageY;
            eventCenter.trigger(_DevPanel__WEBPACK_IMPORTED_MODULE_2__["AddLogEvent"], e.type + ": pageY- " + pageY);
            isDragging = true;
            origin.pageY = pageY;
            var scrollbarOffset = Number($scrollbar.css('top').replace('px', ''));
            origin.scrollbarOffset = scrollbarOffset;
        })
            .on('mousemove touchmove', '.scrollbarContainer', function (e) {
            e.preventDefault();
            if (!isDragging)
                return;
            var offsetY = ((e.type === 'touchmove') ? e.originalEvent.touches[0].pageY : e.pageY) - origin.pageY;
            eventCenter.trigger(_DevPanel__WEBPACK_IMPORTED_MODULE_2__["AddLogEvent"], e.type + ": offsetY- " + offsetY);
            var maxOffset = $scrollbarContainer.height() - $scrollbar.height();
            var scrollbarOffset = origin.scrollbarOffset + offsetY;
            if (scrollbarOffset > maxOffset)
                scrollbarOffset = maxOffset;
            else if (scrollbarOffset < 0)
                scrollbarOffset = 0;
            $scrollbar.css('top', scrollbarOffset);
            eventCenter.trigger(Scrollbar.ScrollEvent, scrollbarOffset / maxOffset);
        }).on('mouseup touchend', function (e) {
            if (!isDragging)
                return;
            isDragging = false;
            eventCenter.trigger(_DevPanel__WEBPACK_IMPORTED_MODULE_2__["AddLogEvent"], "" + e.type);
        });
        eventCenter.on(Scrollbar.UpdateEvent, function () {
            _this.adjustScrollbarH();
            _this.adjustScrollbarOffset();
        });
    };
    ;
    Scrollbar.prototype.adjustScrollbarH = function () {
        var $scrollTarget = this.$syncTarget;
        var targetTotalH = $scrollTarget.prop('scrollHeight');
        var targetViewH = $scrollTarget.height();
        var $scrollbarContainer = $('.scrollbarContainer');
        var scrollbarContainerH = $scrollbarContainer.height();
        var scrollbarH = scrollbarContainerH * (targetViewH / targetTotalH);
        $scrollbarContainer.find('.scrollbar').height(scrollbarH);
    };
    ;
    Scrollbar.prototype.adjustScrollbarOffset = function () {
        var $scrollTarget = this.$syncTarget;
        var targetTotalH = $scrollTarget.prop('scrollHeight');
        var targetScrollTop = $scrollTarget.scrollTop();
        var $scrollbarContainer = $('.scrollbarContainer');
        var scrollbarContainerH = $scrollbarContainer.height();
        var offset = scrollbarContainerH * targetScrollTop / targetTotalH;
        $scrollbarContainer.find('.scrollbar').css('top', offset);
    };
    ;
    Scrollbar.ScrollEvent = 'scroll';
    Scrollbar.UpdateEvent = 'update';
    return Scrollbar;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

;


/***/ }),

/***/ "./app_src/MessageCenter.ts":
/*!**********************************!*\
  !*** ./app_src/MessageCenter.ts ***!
  \**********************************/
/*! exports provided: ContentType, MessageCenter, EventCenter, Event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentType", function() { return ContentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageCenter", function() { return MessageCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventCenter", function() { return EventCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony import */ var _AppSetting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppSetting */ "./app_src/AppSetting.ts");
/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Scene */ "./app_src/Scene.tsx");
/* harmony import */ var _CommonUtility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CommonUtility */ "./app_src/CommonUtility.ts");
/* harmony import */ var _DevPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DevPanel */ "./app_src/DevPanel.tsx");




var ContentType;
(function (ContentType) {
    ContentType[ContentType["Text"] = 0] = "Text";
    ContentType[ContentType["Image"] = 1] = "Image";
})(ContentType || (ContentType = {}));
;
;
var MessageCenter = /** @class */ (function () {
    function MessageCenter(eventCenter) {
        this.contents = [];
        this.eventCenter = null;
        this.eventCenter = eventCenter;
    }
    ;
    MessageCenter.prototype.addText = function (role, text) {
        var _this = this;
        this.contents.push({ role: role, type: ContentType.Text, content: text });
        this.eventCenter.trigger(MessageCenter.eventName);
        if (role !== _AppSetting__WEBPACK_IMPORTED_MODULE_0__["Roles"].User)
            return;
        _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].asyncPost('apis/uploadText', { rid: _Scene__WEBPACK_IMPORTED_MODULE_1__["Scene"].chatRoomIndex, text: text })
            .done(function (resp) {
            _this.eventCenter.trigger(_DevPanel__WEBPACK_IMPORTED_MODULE_3__["AddLogEvent"], resp);
            _this.addText(_AppSetting__WEBPACK_IMPORTED_MODULE_0__["Roles"].Algae, resp.algaeResponse);
            _this.addText(_AppSetting__WEBPACK_IMPORTED_MODULE_0__["Roles"].ChatBot, resp.chatbotResponse);
            _this.eventCenter.trigger(Event.AfterSubmitMessage, resp.text2cmd);
        });
    };
    ;
    MessageCenter.prototype.addImage = function (role, b64String) {
        var _this = this;
        this.contents.push({ role: role, type: ContentType.Image, content: b64String });
        this.eventCenter.trigger(MessageCenter.eventName);
        _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].asyncPost('apis/uploadImage', { rid: _Scene__WEBPACK_IMPORTED_MODULE_1__["Scene"].chatRoomIndex, base64Image: b64String })
            .done(function (resp) {
            _this.eventCenter.trigger(_DevPanel__WEBPACK_IMPORTED_MODULE_3__["AddLogEvent"], resp);
            _this.addText(_AppSetting__WEBPACK_IMPORTED_MODULE_0__["Roles"].ChatBot, resp.chatbotResponse);
            _this.addText(_AppSetting__WEBPACK_IMPORTED_MODULE_0__["Roles"].Algae, resp.algaeResponse);
            _this.addText(_AppSetting__WEBPACK_IMPORTED_MODULE_0__["Roles"].ChatBot, resp.chatbot2algaeResponse);
            _this.addText(_AppSetting__WEBPACK_IMPORTED_MODULE_0__["Roles"].Algae, JSON.stringify(resp));
            _this.eventCenter.trigger(Event.AfterSubmitMessage, resp.text2cmd);
        });
    };
    ;
    MessageCenter.eventName = 'addMessage';
    return MessageCenter;
}());

;
;
;
;
var EventCenter = /** @class */ (function () {
    function EventCenter() {
        this.eventCenter = $({});
        this.registeredEventMap = {};
    }
    EventCenter.prototype.on = function (event, handler) {
        this.registeredEventMap[event] = true;
        console.log("Event registered: " + event);
        this.eventCenter.on(event, function (event, data) { return handler(data); });
    };
    ;
    EventCenter.prototype.trigger = function (event, data) {
        if (!this.registeredEventMap[event]) {
            console.log("Event not registered: " + event);
            return;
        }
        this.eventCenter.trigger(event, data);
    };
    ;
    return EventCenter;
}());

;
var Event = /** @class */ (function () {
    function Event() {
    }
    Event.AfterLogin = 'AfterLogin';
    Event.UpdateDevPanelData = 'UpdateDevPanelData';
    Event.AfterWordCardsAnimation = 'AfterWordCardsAnimation';
    Event.AfterSubmitMessage = 'AfterSubmitMessage';
    Event.None = 'None';
    return Event;
}());

;


/***/ }),

/***/ "./app_src/Scene.tsx":
/*!***************************!*\
  !*** ./app_src/Scene.tsx ***!
  \***************************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return Scene; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CommonUtility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CommonUtility */ "./app_src/CommonUtility.ts");
/* harmony import */ var _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BabylonUtility */ "./app_src/BabylonUtility.ts");
/* harmony import */ var _MessageCenter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MessageCenter */ "./app_src/MessageCenter.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var Scene = /** @class */ (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cameraLocations = [];
        _this.viewPort = { position: babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"].Zero(), rotation: babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"].Zero() };
        _this.colorsSetForParticle = [
            { diffuseColor: [253, 245, 134], glowColor: [255, 252, 193, 0.85] },
            { diffuseColor: [253, 229, 210], glowColor: [255, 219, 225, 0.85] },
            { diffuseColor: [252, 247, 255], glowColor: [255, 249, 254, 0.85] }
        ].map(function (set) {
            set.diffuseColor = set.diffuseColor.map(function (n) { return n / 255; });
            set.glowColor = set.glowColor.map(function (n, i) { return i !== 3 ? n / 255 : n; });
            return set;
        });
        _this.getTextureForParticle = function () {
            var _this = this;
            var textures = null;
            return function () {
                if (!textures) {
                    textures = {
                        0: new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Texture"]('assets/background_particles/pink_particle.png', _this.scene),
                        1: new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Texture"]('assets/background_particles/white_particle.png', _this.scene),
                        2: new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Texture"]('assets/background_particles/yellow_particle.png', _this.scene)
                    };
                }
                var key = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(0, 2);
                return textures[key];
            };
        }.bind(_this)();
        _this.particles = [];
        _this.linesForLinesystem = [];
        _this.linesystem = null;
        _this.translateType = TranslateType.Simple;
        _this.linesystemPerformance = 0;
        _this.chatRoomsNodes = [];
        _this.chatRoomsCenter = [];
        _this.linesForChatRooms = [];
        _this.colorSetForLines = [
            [199, 222, 205],
            [192, 231, 164],
            [168, 213, 133]
        ].map(function (set) { return set.map(function (n) { return n / 255; }); });
        _this.algaes = [];
        return _this;
    }
    Scene.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("canvas", { id: "renderCanvas", "touch-action": "none" }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { id: "greenMask" }));
    };
    ;
    Scene.prototype.componentDidMount = function () {
        var _this = this;
        this.initScene();
        this.getTexts();
        this.getPoints();
        this.createLinesWorker = new AsyncWorker(document.getElementById('CreateLinesWorker').src);
        this.engine.runRenderLoop(function () {
            _this.renderBefore();
            _this.scene.render();
            _this.renderAfter();
        });
        this.props.eventCenter.on(_MessageCenter__WEBPACK_IMPORTED_MODULE_5__["Event"].AfterWordCardsAnimation, this.transformation.bind(this));
        this.props.eventCenter.on(_MessageCenter__WEBPACK_IMPORTED_MODULE_5__["Event"].AfterLogin, this.zoomIn.bind(this));
        this.props.eventCenter.on(_MessageCenter__WEBPACK_IMPORTED_MODULE_5__["Event"].AfterSubmitMessage, this.cmdHandler.bind(this));
        window.addEventListener("resize", this.engine.resize.bind(this.engine));
        var updateMask = function () {
            var setting = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getQueryString('greenMask');
            var color = setting || "rgba(0, 255, 0, " + _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomNumberInRange(0, 0.5, 2) + ")";
            jquery__WEBPACK_IMPORTED_MODULE_2__('#greenMask').css('background-color', color);
            _this.props.eventCenter.trigger(_MessageCenter__WEBPACK_IMPORTED_MODULE_5__["Event"].UpdateDevPanelData, { greenMask: color });
            if (setting)
                return;
            setTimeout(function () {
                updateMask();
            }, 2000);
        };
        updateMask();
    };
    ;
    Scene.prototype.initScene = function () {
        var canvas = document.getElementById("renderCanvas");
        this.engine = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Engine"](canvas, true, { stencil: true });
        var scene = this.scene = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Scene"](this.engine);
        var camera = this.camera = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["UniversalCamera"]("Camera", new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, -25), this.scene);
        camera.speed = 0.5;
        camera.setTarget(babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"].Zero());
        camera.attachControl(canvas, true);
        new babylonjs__WEBPACK_IMPORTED_MODULE_1__["HemisphericLight"]("HemiLight1", new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, 10), scene).intensity = 0.8;
        new babylonjs__WEBPACK_IMPORTED_MODULE_1__["HemisphericLight"]("HemiLight2", new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, -10), scene).intensity = 0.8;
        this.lightOfCamera = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["PointLight"]("lightOfCamera", new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, 0), scene);
        this.lightOfCamera.diffuse = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Color3"](1, 1, 1);
        this.lightOfCamera.specular = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Color3"](0.8, 0.8, 0.2);
        this.lightOfCamera.intensity = 0.3;
        var skyboxMaterial = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["StandardMaterial"]("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["CubeTexture"]("assets/skybox/sb", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = babylonjs__WEBPACK_IMPORTED_MODULE_1__["Texture"].SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Color3"](0, 0, 0);
        skyboxMaterial.specularColor = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Color3"](0, 0, 0);
        skyboxMaterial.disableLighting = true;
        var skybox = babylonjs__WEBPACK_IMPORTED_MODULE_1__["Mesh"].CreateBox("skyBox", 1500.0, scene);
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skybox.renderingGroupId = 0;
    };
    ;
    Scene.prototype.renderBefore = function () {
        this.updateCameraPosition();
        this.translateLinesForTextNodes();
        this.translateParticles();
        this.checkAlgaes();
        if (this.bubbleSpray)
            this.bubbleSpray.setParticles();
    };
    ;
    Scene.prototype.updateCameraPosition = function () {
        var cameraLocationsLen = this.cameraLocations.length;
        if (cameraLocationsLen > 0) {
            this.camera.position = this.cameraLocations.shift();
            if (cameraLocationsLen > 1) {
                this.camera.setTarget(babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"].Zero());
            }
            else {
                var center = this.chatRoomsCenter[Scene.chatRoomIndex];
                this.createBubbleSpray(center);
                this.viewPort.position = this.camera.position.clone();
                this.viewPort.rotation = this.camera.rotation.clone();
            }
        }
        else if (Scene.chatRoomIndex !== null) {
            var positionCorrelationRate = 0.02;
            var positionCorrelation = this.viewPort.position
                .subtract(this.camera.position)
                .multiply(new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](positionCorrelationRate, positionCorrelationRate, positionCorrelationRate));
            this.camera.position = this.camera.position.add(positionCorrelation);
            var rotationCorrelationRate = 0.1;
            var rotationCorrelation = this.viewPort.rotation
                .subtract(this.camera.rotation)
                .multiply(new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](rotationCorrelationRate, rotationCorrelationRate, rotationCorrelationRate));
            this.camera.rotation = this.camera.rotation.add(rotationCorrelation);
        }
        this.lightOfCamera.position = this.camera.position;
    };
    ;
    Scene.prototype.checkAlgaes = function () {
        if (this.algaes.length === 0)
            return;
        var disposeTime = new Date(Date.now() - 30 * 60 * 1000);
        if (this.algaes[0].createTime < disposeTime) {
            var algae = this.algaes.shift();
            algae.sprite.dispose();
        }
    };
    ;
    Scene.prototype.renderAfter = function () {
        this.props.eventCenter.trigger(_MessageCenter__WEBPACK_IMPORTED_MODULE_5__["Event"].UpdateDevPanelData, {
            fps: this.engine.getFps().toFixed() + ' fps',
            coordinate: _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].positionToString(this.camera.position)
        });
    };
    ;
    Scene.prototype.createBubbleSpray = function (position) {
        // creation
        var sphere = babylonjs__WEBPACK_IMPORTED_MODULE_1__["MeshBuilder"].CreateSphere("s", { diameter: 0.3, segments: 12 }, this.scene);
        var bubbleSpray = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["SolidParticleSystem"]('bubbleSpray', this.scene);
        bubbleSpray.computeParticleColor = false;
        bubbleSpray.computeParticleTexture = false;
        bubbleSpray.computeParticleRotation = false;
        bubbleSpray.addShape(sphere, 20);
        sphere.dispose();
        var mesh = bubbleSpray.buildMesh();
        mesh.material = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["StandardMaterial"]("bubbleMat", this.scene);
        mesh.material.alpha = 0.2;
        mesh.position = position;
        var speed = 0.01;
        var recycleParticle = function (particle) {
            particle.position.x = 0;
            particle.position.y = 0;
            particle.position.z = 0;
            particle.velocity.x = (Math.random() - 0.5) * speed / 3;
            particle.velocity.y = Math.random() * speed;
            particle.velocity.z = (Math.random() - 0.5) * speed / 3;
            var scale = 1 * Math.random() + 0.2;
            particle.scale.x = scale;
            particle.scale.y = scale;
            particle.scale.z = scale;
            particle['age'] = Math.random() * 2 + 2;
            return particle;
        };
        bubbleSpray.updateParticle = function (particle) {
            if (particle.position.y < 0 || particle['age'] < 0) {
                recycleParticle(particle);
            }
            particle.position.addInPlace(particle.velocity);
            particle.position.y += speed / 2;
            particle['age'] -= 0.01;
            return particle;
        };
        for (var p = 0; p < bubbleSpray.nbParticles; p++) {
            recycleParticle(bubbleSpray.particles[p]);
        }
        bubbleSpray.setParticles();
        this.bubbleSpray = bubbleSpray;
    };
    ;
    Scene.prototype.createParticle = function (center) {
        // const range = 15;
        /*  const position = new BABYLON.Vector3(
             center.x + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
             center.y + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
             center.z + (CommonUtility.getRandomIntInRange(range * -1, range) * 0.1),
         ); */
        var colorSetIndex = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(0, 2);
        // const colorSet = this.colorsSetForParticle[colorSetIndex];
        // const colorInRGB = colorSet.diffuseColor;
        // const color = new BABYLON.Color3(colorInRGB[0], colorInRGB[1], colorInRGB[2]);
        // const radius = CommonUtility.getRandomIntInRange(10, 20) * 0.01;
        // const particle = BABYLON.Mesh.CreateSphere(`colorSetIndex:${colorSetIndex}`, 8, radius, this.scene);
        var particle = babylonjs__WEBPACK_IMPORTED_MODULE_1__["Mesh"].CreatePlane("colorSetIndex:" + colorSetIndex, 0.5, this.scene);
        particle.position = center.clone();
        particle.billboardMode = babylonjs__WEBPACK_IMPORTED_MODULE_1__["Mesh"].BILLBOARDMODE_ALL;
        var material = particle.material = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["StandardMaterial"]("particleMaterial", this.scene);
        material.diffuseTexture = this.getTextureForParticle();
        material.diffuseTexture.hasAlpha = true;
        /*         material.diffuseColor = color;
                material.emissiveColor = BABYLON.Color3.Black(); */
        /*         if (!this.glowLayerForParticle) {
                    this.glowLayerForParticle = new BABYLON.GlowLayer("glowLayerForParticle", this.scene);
                    this.glowLayerForParticle.intensity = 0.5;
                    this.glowLayerForParticle.customEmissiveColorSelector = (mesh, subMesh, material, result) => {
                        const colorSetIndex = mesh.name.replace('colorSetIndex:', '');
                        const glowColor = this.colorsSetForParticle[colorSetIndex].glowColor;
                        result.set(glowColor[0], glowColor[1], glowColor[2], glowColor[3]);
                    }
                }
                this.glowLayerForParticle.addIncludedOnlyMesh(particle); */
        this.particles.push({
            mesh: particle,
            translateVector: _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].getRandomVector3(),
            duration: this.getDurationForParticle()
        });
    };
    ;
    Scene.prototype.startUpdateTextNodes = function (textNodes) {
        var _this = this;
        var updatedNodes;
        switch (this.translateType) {
            case TranslateType.Simple: {
                updatedNodes = this.updateTextNodeForSimpleMotion(textNodes);
                break;
            }
            case TranslateType.Forward: {
                updatedNodes = this.updateTextNodeForForward(textNodes);
                break;
            }
            default: return;
        }
        ;
        this.createLinesWorker.asyncExcute(updatedNodes.map(function (e) { return e.position; })).then(function (data) {
            _this.linesForLinesystem = data;
            var linesystemPerformance = _this.linesystemPerformance;
            if (linesystemPerformance < -3) {
                var newCount = updatedNodes.length + linesystemPerformance;
                if (newCount > 100)
                    updatedNodes.length = newCount;
            }
            _this.props.eventCenter.trigger(_MessageCenter__WEBPACK_IMPORTED_MODULE_5__["Event"].UpdateDevPanelData, {
                linesystemPerformance: linesystemPerformance
            });
            _this.linesystemPerformance = 0;
            _this.startUpdateTextNodes(updatedNodes);
        });
    };
    ;
    Scene.prototype.updateTextNodeForSimpleMotion = function (nodesToTranslate) {
        var nodes = nodesToTranslate.map(function (node, i) {
            if (node.position.z > -13)
                node.translateVector.z = -1;
            else if (node.position.z < -16)
                node.translateVector.z = 1;
            _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].updatePosition(node.position, node.translateVector, node.scale);
            return node;
        });
        return nodes;
    };
    ;
    Scene.prototype.updateTextNodeForForward = function (nodesToTranslate) {
        var _this = this;
        var maxMove = 0.3;
        var count = 0;
        var nodes = nodesToTranslate.map(function (node, i) {
            var chatRoomsNode = _this.chatRoomsNodes[i];
            var distance = babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"].Distance(chatRoomsNode, node.position);
            if (distance > maxMove) {
                var vector = _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].subtractVector(chatRoomsNode, node.position).normalize();
                _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].updatePosition(node.position, vector, maxMove);
            }
            else {
                node.position = chatRoomsNode;
                count++;
            }
            return node;
        });
        if (count > 70) {
            this.translateType = TranslateType.Expand;
        }
        return nodes;
    };
    ;
    Scene.prototype.translateLinesForTextNodes = function () {
        if (this.linesForLinesystem.length === 0) {
            if (this.linesystem) {
                this.linesystem.dispose();
                this.linesystem = null;
            }
            return;
        }
        else if (this.translateType === TranslateType.Expand) {
            this.expandTextNodes();
        }
        this.linesystemPerformance--;
        this.linesystem = babylonjs__WEBPACK_IMPORTED_MODULE_1__["MeshBuilder"].CreateLineSystem("linesystem", {
            lines: this.linesForLinesystem,
            updatable: true,
            instance: this.linesystem || null
        }, this.scene);
        this.linesystem.color = babylonjs__WEBPACK_IMPORTED_MODULE_1__["Color3"].White();
    };
    ;
    Scene.prototype.expandTextNodes = function () {
        var linesystemLen = this.linesForLinesystem.length;
        var linesForChatRoomLen = this.linesForChatRooms.length;
        var exchangeCount = 20;
        var maxIndex = Math.min(linesystemLen, linesForChatRoomLen) - 1 - exchangeCount;
        var startIndex = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(0, maxIndex);
        for (var i = 0; i < exchangeCount; i++) {
            var index = startIndex + i;
            var toExchange = this.linesForChatRooms[index];
            this.linesForLinesystem[index] = [toExchange.from, toExchange.to];
        }
        if (linesForChatRoomLen === linesystemLen)
            return;
        else if (linesForChatRoomLen > linesystemLen) {
            var toAdd = this.linesForChatRooms[linesystemLen - 1];
            this.linesForLinesystem.push([toAdd.from, toAdd.to]);
        }
        else if (linesForChatRoomLen < linesystemLen) {
            this.linesForLinesystem.pop();
        }
    };
    ;
    Scene.prototype.translateParticles = function () {
        var _this = this;
        if (this.particles.length === 0)
            return;
        var scale = 0.003;
        this.particles.forEach(function (p) {
            if (p.duration <= 0) {
                p.translateVector = _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].getRandomVector3();
                p.duration = _this.getDurationForParticle(); // unit: frame number
            }
            _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].updatePosition(p.mesh.position, p.translateVector, scale);
            p.duration -= 1;
        });
    };
    ;
    Scene.prototype.getDurationForParticle = function () {
        return _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(60 * 3, 60 * 6);
    };
    ;
    Scene.prototype.getPoints = function () {
        var _this = this;
        jquery__WEBPACK_IMPORTED_MODULE_2__["getJSON"]('apis/getPoints', function (data) {
            var pointInGroups = [];
            var rate = 0.006;
            Object.keys(data).forEach(function (key, i) {
                var pointInGroup = data[key].map(function (p) {
                    return new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](p.x * rate, p.y * rate, _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomNumber(3) * 0.0025);
                });
                _this.chatRoomsNodes = _this.chatRoomsNodes.concat(pointInGroup);
                pointInGroups[i] = pointInGroup;
            });
            _this.chatRoomsNodes = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].shuffle(_this.chatRoomsNodes);
            var lines = [];
            var take = 120;
            pointInGroups.forEach(function (points) {
                var linesInGroup = _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].getLineToEachOther(points);
                var maxLine = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].sort(linesInGroup, function (e) { return e.distance; })[linesInGroup.length - 1];
                var center = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, 0);
                Object.keys(center).forEach(function (axis) {
                    center[axis] = (maxLine.from[axis] + maxLine.to[axis]) / 2;
                });
                _this.chatRoomsCenter.push(center);
                lines = lines.concat(linesInGroup.slice(0, take));
            });
            _this.linesForChatRooms = lines;
        });
    };
    ;
    Scene.prototype.createParticles = function () {
        var _this = this;
        this.chatRoomsCenter.forEach(function (center) {
            for (var i = 0; i < 10; i++) {
                _this.createParticle(center);
            }
        });
    };
    ;
    Scene.prototype.drawLine = function () {
        var _this = this;
        if (this.linesForChatRooms.length === 0)
            return;
        var highlightForLine = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["HighlightLayer"]("highlightForLine", this.scene);
        highlightForLine.innerGlow = false;
        var glowColor = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Color3"](246 / 255, 255 / 255, 201 / 255);
        var materials = this.colorSetForLines.map(function (colorInRGB, i) {
            var color = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Color3"](colorInRGB[0], colorInRGB[1], colorInRGB[2]);
            var mat = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["StandardMaterial"]("lineMat" + i, _this.scene);
            mat.diffuseColor = color;
            return mat;
        });
        var meshContainer = [[], [], []];
        this.linesForChatRooms.forEach(function (e, i) {
            var materialIndex = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(0, 2);
            var line = babylonjs__WEBPACK_IMPORTED_MODULE_1__["MeshBuilder"].CreateTube("line" + i, {
                path: [e.from, e.to],
                radius: 0.03,
                updatable: false
            }, _this.scene);
            line.material = materials[materialIndex];
            meshContainer[materialIndex].push(line);
        });
        meshContainer.forEach(function (group) {
            if (group.length === 0)
                return;
            var merged = babylonjs__WEBPACK_IMPORTED_MODULE_1__["Mesh"].MergeMeshes(group, true, false);
            highlightForLine.addMesh(merged, glowColor);
        });
    };
    ;
    Scene.prototype.getTexts = function () {
        var _this = this;
        var img = new Image();
        img.src = 'assets/textImage/image.png';
        img.onload = function () {
            var canvas = document.createElement('canvas');
            var height = canvas.height = img.height;
            var width = canvas.width = img.width;
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, width, height);
            // inputs
            var startX = 64 * _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(0, 6);
            var startY = 64 * _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(0, 6);
            var takeWidth = 64;
            var rateOfWoverH = 1 / 1;
            var takeHeight = takeWidth / rateOfWoverH;
            var imgData = context.getImageData(startX, startY, takeWidth, takeHeight);
            var pixels = [];
            var len = imgData.data.length;
            for (var i = 0; i < len; i += 4) {
                var r = imgData.data[i];
                var g = imgData.data[i + 1];
                var b = imgData.data[i + 2];
                var brightness = (0.299 * r) + (0.587 * g) + (0.114 * b);
                var pixelNumber = (i / 4) + 1;
                var rowNumber = Math.floor(pixelNumber / takeWidth);
                var culNumber = pixelNumber % takeWidth;
                pixels.push({
                    x: culNumber,
                    y: rowNumber,
                    r: r,
                    g: g,
                    b: b,
                    brightness: brightness
                });
            }
            var initialZ = -15;
            var textNodes = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].sort(pixels, function (p) { return p.brightness; }).reverse()
                .slice(0, 200)
                .map(function (p, i) {
                var rate = 0.12;
                var position = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"]((p.x - 32) * rate, (p.y - 32) * -1 * rate, initialZ + _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomNumberInRange(-2, 2, 3));
                return {
                    position: position,
                    scale: _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomNumberInRange(0.005, 0.01, 3),
                    translateVector: new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](0, 0, position.z < initialZ ? 1 : -1) // 初始方向
                };
            });
            _this.startUpdateTextNodes(textNodes);
        };
    };
    ;
    Scene.prototype.cmdHandler = function (cmd) {
        var algaeManager = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["SpriteManager"]("algaeManager", "assets/algae_particles.png", 1, 375, this.scene);
        var center = this.chatRoomsCenter[Scene.chatRoomIndex];
        var algae = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Sprite"]("algae", algaeManager);
        algae.size = 1;
        algae.position.x = center.x + _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomNumberInRange(-3, 3, 2);
        algae.position.y = center.y + _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomNumberInRange(-3, 3, 2);
        algae.position.z = center.z + _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomNumberInRange(-3, 3, 2);
        algae.isPickable = false;
        this.algaes.push({ sprite: algae, createTime: new Date() });
    };
    ;
    Scene.prototype.transformation = function () {
        var _this = this;
        this.translateType = TranslateType.Forward;
        setTimeout(function () {
            _this.translateType = TranslateType.Expand;
            setTimeout(function () {
                _this.linesForLinesystem.length = 0;
                _this.drawLine();
                setTimeout(function () { return _this.createParticles(); });
            }, 0.8 * 1000);
        }, 2 * 1000);
    };
    ;
    Scene.prototype.zoomIn = function () {
        Scene.chatRoomIndex = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(0, this.chatRoomsCenter.length - 1);
        var chatRoom = this.chatRoomsCenter[Scene.chatRoomIndex];
        var destination = chatRoom ?
            new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](chatRoom.x * 2.5, chatRoom.y * 2.5, 0) :
            babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"].Zero();
        var curve = babylonjs__WEBPACK_IMPORTED_MODULE_1__["Curve3"].CreateHermiteSpline(this.camera.position, babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"].Zero(), destination, babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"].Zero(), 60 * 5);
        var points = curve.getPoints();
        this.cameraLocations = points;
    };
    ;
    Scene.chatRoomIndex = null;
    return Scene;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

;
var TranslateType;
(function (TranslateType) {
    TranslateType[TranslateType["Simple"] = 0] = "Simple";
    TranslateType[TranslateType["Forward"] = 1] = "Forward";
    TranslateType[TranslateType["Expand"] = 2] = "Expand";
})(TranslateType || (TranslateType = {}));
;
;
var AsyncWorker = /** @class */ (function () {
    function AsyncWorker(src) {
        if (!window['Worker'])
            throw 'Worker not support';
        this.worker = new Worker(src);
    }
    ;
    AsyncWorker.prototype.asyncExcute = function (input) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var worker = _this.worker;
            worker.onmessage = function (message) { return resolve(message.data); };
            worker.onerror = function (e) { return reject(e.error); };
            worker.postMessage(input);
        });
    };
    ;
    return AsyncWorker;
}());
;


/***/ }),

/***/ "./app_src/base.scss":
/*!***************************!*\
  !*** ./app_src/base.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./base.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/base.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./app_src/controlPanel.scss":
/*!***********************************!*\
  !*** ./app_src/controlPanel.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./controlPanel.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/controlPanel.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./app_src/devPanel.scss":
/*!*******************************!*\
  !*** ./app_src/devPanel.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./devPanel.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/devPanel.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./app_src/flexbox.scss":
/*!******************************!*\
  !*** ./app_src/flexbox.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./flexbox.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/flexbox.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./app_src/loginPanel.scss":
/*!*********************************!*\
  !*** ./app_src/loginPanel.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./loginPanel.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/loginPanel.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./app_src/main.tsx":
/*!**************************!*\
  !*** ./app_src/main.tsx ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.scss */ "./app_src/base.scss");
/* harmony import */ var _base_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_base_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _flexbox_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flexbox.scss */ "./app_src/flexbox.scss");
/* harmony import */ var _flexbox_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_flexbox_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scene_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scene.scss */ "./app_src/scene.scss");
/* harmony import */ var _scene_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scene_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _controlPanel_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controlPanel.scss */ "./app_src/controlPanel.scss");
/* harmony import */ var _controlPanel_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_controlPanel_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _loginPanel_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loginPanel.scss */ "./app_src/loginPanel.scss");
/* harmony import */ var _loginPanel_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_loginPanel_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _messageBoard_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./messageBoard.scss */ "./app_src/messageBoard.scss");
/* harmony import */ var _messageBoard_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_messageBoard_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _devPanel_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./devPanel.scss */ "./app_src/devPanel.scss");
/* harmony import */ var _devPanel_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_devPanel_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _MessageCenter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./MessageCenter */ "./app_src/MessageCenter.ts");
/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Scene */ "./app_src/Scene.tsx");
/* harmony import */ var _DevPanel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./DevPanel */ "./app_src/DevPanel.tsx");
/* harmony import */ var _LoginPanel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./LoginPanel */ "./app_src/LoginPanel.tsx");
/* harmony import */ var _ControlPanel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ControlPanel */ "./app_src/ControlPanel.tsx");
/* harmony import */ var _MessageBoard__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./MessageBoard */ "./app_src/MessageBoard.tsx");
/* harmony import */ var _CommonUtility__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./CommonUtility */ "./app_src/CommonUtility.ts");
















var isdev = _CommonUtility__WEBPACK_IMPORTED_MODULE_15__["CommonUtility"].getQueryString('isdev');
if (!isdev)
    console.info = console.debug = console.log = function () { };
var eventCenter = new _MessageCenter__WEBPACK_IMPORTED_MODULE_9__["EventCenter"]();
var messageCenter = new _MessageCenter__WEBPACK_IMPORTED_MODULE_9__["MessageCenter"](eventCenter);
react_dom__WEBPACK_IMPORTED_MODULE_8__["render"](react__WEBPACK_IMPORTED_MODULE_7__["createElement"]("div", null,
    react__WEBPACK_IMPORTED_MODULE_7__["createElement"](_Scene__WEBPACK_IMPORTED_MODULE_10__["Scene"], { eventCenter: eventCenter }),
    react__WEBPACK_IMPORTED_MODULE_7__["createElement"](_DevPanel__WEBPACK_IMPORTED_MODULE_11__["DevPanel"], { eventCenter: eventCenter }),
    react__WEBPACK_IMPORTED_MODULE_7__["createElement"](_LoginPanel__WEBPACK_IMPORTED_MODULE_12__["LoginPanel"], { eventCenter: eventCenter }),
    react__WEBPACK_IMPORTED_MODULE_7__["createElement"](_MessageBoard__WEBPACK_IMPORTED_MODULE_14__["MessageBoard"], { messageCenter: messageCenter, eventCenter: eventCenter }),
    react__WEBPACK_IMPORTED_MODULE_7__["createElement"](_ControlPanel__WEBPACK_IMPORTED_MODULE_13__["ControlPanel"], { messageCenter: messageCenter, eventCenter: eventCenter })), document.getElementById("app"));


/***/ }),

/***/ "./app_src/messageBoard.scss":
/*!***********************************!*\
  !*** ./app_src/messageBoard.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./messageBoard.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/messageBoard.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./app_src/scene.scss":
/*!****************************!*\
  !*** ./app_src/scene.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!../node_modules/sass-loader/lib/loader.js!./scene.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/scene.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/base.scss":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./app_src/base.scss ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html,\nbody {\n  font-family: Microsoft JhengHei;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0; }\n\n.full-page {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n/* flash */\n.flash {\n  -webkit-animation-name: flash-animation;\n  -webkit-animation-duration: 1s;\n  animation-name: flash-animation;\n  animation-duration: 1s; }\n\n@-webkit-keyframes flash-animation {\n  from {\n    background: rgba(255, 255, 255, 0.8); }\n  to {\n    background: default; } }\n\n@keyframes flash-animation {\n  from {\n    background: rgba(255, 255, 255, 0.8); }\n  to {\n    background: default; } }\n\n.untouchable {\n  pointer-events: none; }\n\ninput[type=text] {\n  background-color: transparent;\n  border: 1px solid #ffffff;\n  border-radius: 3px;\n  height: 24px;\n  color: #ffffff; }\n\n.button {\n  background-color: transparent;\n  cursor: pointer; }\n\n.white-text {\n  color: white;\n  text-shadow: 0px 0px 6px #404040; }\n\n.text-center {\n  text-align: center; }\n\n.visible {\n  opacity: 1; }\n\n.invisible {\n  opacity: 0; }\n\n.transition-all {\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  transition: all 0.3s ease; }\n\n.clearfix::after {\n  content: \"\";\n  clear: both;\n  display: table; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/controlPanel.scss":
/*!******************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./app_src/controlPanel.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html,\nbody {\n  font-family: Microsoft JhengHei;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0; }\n\n.full-page, .flashMask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n/* flash */\n.flash {\n  -webkit-animation-name: flash-animation;\n  -webkit-animation-duration: 1s;\n  animation-name: flash-animation;\n  animation-duration: 1s; }\n\n@-webkit-keyframes flash-animation {\n  from {\n    background: rgba(255, 255, 255, 0.8); }\n  to {\n    background: default; } }\n\n@keyframes flash-animation {\n  from {\n    background: rgba(255, 255, 255, 0.8); }\n  to {\n    background: default; } }\n\n.untouchable, .flashMask {\n  pointer-events: none; }\n\ninput[type=text] {\n  background-color: transparent;\n  border: 1px solid #ffffff;\n  border-radius: 3px;\n  height: 24px;\n  color: #ffffff; }\n\n.button {\n  background-color: transparent;\n  cursor: pointer; }\n\n.white-text, .control-panel .textInput button {\n  color: white;\n  text-shadow: 0px 0px 6px #404040; }\n\n.text-center {\n  text-align: center; }\n\n.visible {\n  opacity: 1; }\n\n.invisible {\n  opacity: 0; }\n\n.transition-all, .control-panel, .control-panel .textInput {\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  transition: all 0.3s ease; }\n\n.clearfix::after {\n  content: \"\";\n  clear: both;\n  display: table; }\n\n.flex, .control-panel, .control-panel .textInput {\n  display: flex; }\n\n.flex-row {\n  flex-direction: row; }\n\n.flex-column, .control-panel {\n  flex-direction: column; }\n\n.flex-verticalCenter, .flex-center, .control-panel, .control-panel .textInput {\n  align-items: center; }\n\n.flex-horizontalCenter, .flex-center, .control-panel, .control-panel .textInput {\n  justify-content: center; }\n\n.flex-end {\n  align-items: flex-end; }\n\n.control-panel {\n  position: fixed;\n  bottom: 30px;\n  left: 0;\n  width: 100%;\n  height: 70px; }\n  .control-panel .buttons .button {\n    font-size: 1.8em;\n    border: 0; }\n  .control-panel .textInput {\n    width: 100%;\n    max-width: 35em; }\n  .control-panel .textInput input {\n    background-color: transparent;\n    border: solid 1px white;\n    border-radius: 1px;\n    width: 80%; }\n  .control-panel .textInput button {\n    border: solid 1px white;\n    border-radius: 1px;\n    margin: 0; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/devPanel.scss":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./app_src/devPanel.scss ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#devPanel {\n  display: none;\n  position: fixed;\n  top: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.2);\n  width: 200px; }\n  #devPanel table {\n    width: 100%; }\n\n#devPanel td {\n  width: 50px;\n  padding: 3px;\n  word-break: break-all; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/flexbox.scss":
/*!*************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./app_src/flexbox.scss ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".flex {\n  display: flex; }\n\n.flex-row {\n  flex-direction: row; }\n\n.flex-column {\n  flex-direction: column; }\n\n.flex-verticalCenter, .flex-center {\n  align-items: center; }\n\n.flex-horizontalCenter, .flex-center {\n  justify-content: center; }\n\n.flex-end {\n  align-items: flex-end; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/loginPanel.scss":
/*!****************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./app_src/loginPanel.scss ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html,\nbody {\n  font-family: Microsoft JhengHei;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0; }\n\n.full-page {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n/* flash */\n.flash {\n  -webkit-animation-name: flash-animation;\n  -webkit-animation-duration: 1s;\n  animation-name: flash-animation;\n  animation-duration: 1s; }\n\n@-webkit-keyframes flash-animation {\n  from {\n    background: rgba(255, 255, 255, 0.8); }\n  to {\n    background: default; } }\n\n@keyframes flash-animation {\n  from {\n    background: rgba(255, 255, 255, 0.8); }\n  to {\n    background: default; } }\n\n.untouchable {\n  pointer-events: none; }\n\ninput[type=text] {\n  background-color: transparent;\n  border: 1px solid #ffffff;\n  border-radius: 3px;\n  height: 24px;\n  color: #ffffff; }\n\n.button, #loginPanel .skipAnimation > button {\n  background-color: transparent;\n  cursor: pointer; }\n\n.white-text, #loginPanel .skipAnimation > button {\n  color: white;\n  text-shadow: 0px 0px 6px #404040; }\n\n.text-center {\n  text-align: center; }\n\n.visible {\n  opacity: 1; }\n\n.invisible {\n  opacity: 0; }\n\n.transition-all {\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  transition: all 0.3s ease; }\n\n.clearfix::after {\n  content: \"\";\n  clear: both;\n  display: table; }\n\n#loginPanel {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.3);\n  overflow: auto; }\n  #loginPanel > .wordCard {\n    display: none;\n    white-space: nowrap; }\n  #loginPanel .skipAnimation {\n    position: absolute;\n    bottom: 10%;\n    left: 50%;\n    transform: translate(-50%); }\n    #loginPanel .skipAnimation > button {\n      border: 1px solid white;\n      border-radius: 2px;\n      padding: 0 20px; }\n\n#signInWrapper .label {\n  height: 24px;\n  line-height: 24px; }\n\n#signInWrapper .icon {\n  height: 24px;\n  line-height: 24px;\n  background: url(\"https://google-developers.appspot.com/identity/sign-in/g-normal.png\") transparent -7px 50% no-repeat;\n  display: inline-block;\n  vertical-align: middle;\n  width: 25px; }\n\n.signInButton {\n  background: transparent;\n  padding: 0;\n  border: none;\n  color: #ecffec;\n  font-size: 18px;\n  cursor: pointer; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/messageBoard.scss":
/*!******************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./app_src/messageBoard.scss ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html,\nbody {\n  font-family: Microsoft JhengHei;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0; }\n\n.full-page, #messageBoard {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n/* flash */\n.flash {\n  -webkit-animation-name: flash-animation;\n  -webkit-animation-duration: 1s;\n  animation-name: flash-animation;\n  animation-duration: 1s; }\n\n@-webkit-keyframes flash-animation {\n  from {\n    background: rgba(255, 255, 255, 0.8); }\n  to {\n    background: default; } }\n\n@keyframes flash-animation {\n  from {\n    background: rgba(255, 255, 255, 0.8); }\n  to {\n    background: default; } }\n\n.untouchable, #messageBoard {\n  pointer-events: none; }\n\ninput[type=text] {\n  background-color: transparent;\n  border: 1px solid #ffffff;\n  border-radius: 3px;\n  height: 24px;\n  color: #ffffff; }\n\n.button {\n  background-color: transparent;\n  cursor: pointer; }\n\n.white-text, #messageBoard .messageBoardContent .messageBox {\n  color: white;\n  text-shadow: 0px 0px 6px #404040; }\n\n.text-center {\n  text-align: center; }\n\n.visible {\n  opacity: 1; }\n\n.invisible {\n  opacity: 0; }\n\n.transition-all {\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  transition: all 0.3s ease; }\n\n.clearfix::after, #messageBoard .messageBoardContent::after {\n  content: \"\";\n  clear: both;\n  display: table; }\n\n.flex, #messageBoard {\n  display: flex; }\n\n.flex-row {\n  flex-direction: row; }\n\n.flex-column {\n  flex-direction: column; }\n\n.flex-verticalCenter, .flex-center {\n  align-items: center; }\n\n.flex-horizontalCenter, .flex-center, #messageBoard {\n  justify-content: center; }\n\n.flex-end {\n  align-items: flex-end; }\n\n#messageBoard > div {\n  margin-bottom: 100px; }\n\n#messageBoard .messageBoardContent {\n  width: 100%;\n  overflow: hidden; }\n  #messageBoard .messageBoardContent .messageBox {\n    position: relative;\n    background-color: rgba(255, 255, 255, 0.05);\n    padding: 3px;\n    margin: 5px 0;\n    border-radius: 3px;\n    width: 50%;\n    color: white; }\n    #messageBoard .messageBoardContent .messageBox .avatar {\n      position: absolute;\n      width: 30px;\n      transform: translateY(40%); }\n    #messageBoard .messageBoardContent .messageBox .name {\n      position: absolute;\n      top: 0px;\n      left: 7px; }\n    #messageBoard .messageBoardContent .messageBox .content {\n      margin: 20px 0 0 30px; }\n\n#messageBoard .scrollbarContainer {\n  pointer-events: auto;\n  position: relative;\n  top: 0;\n  right: 0;\n  width: 15px;\n  background-color: rgba(0, 0, 0, 0.1); }\n  #messageBoard .scrollbarContainer .scrollbar {\n    position: absolute;\n    top: 0;\n    right: 1px;\n    width: 12px;\n    height: 100px;\n    background-color: rgba(0, 0, 0, 0.3);\n    border-radius: 5px; }\n\n@media only screen and (min-width: 768px) {\n  .messageBoardContent {\n    padding: 0 50px; } }\n\n@media only screen and (min-width: 1224px) {\n  .messageBoardContent {\n    padding: 0 200px; } }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./app_src/scene.scss":
/*!***********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./app_src/scene.scss ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "html,\nbody {\n  font-family: Microsoft JhengHei;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0; }\n\n.full-page, #renderCanvas, #greenMask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden; }\n\n/* flash */\n.flash {\n  -webkit-animation-name: flash-animation;\n  -webkit-animation-duration: 1s;\n  animation-name: flash-animation;\n  animation-duration: 1s; }\n\n@-webkit-keyframes flash-animation {\n  from {\n    background: rgba(255, 255, 255, 0.8); }\n  to {\n    background: default; } }\n\n@keyframes flash-animation {\n  from {\n    background: rgba(255, 255, 255, 0.8); }\n  to {\n    background: default; } }\n\n.untouchable, #greenMask {\n  pointer-events: none; }\n\ninput[type=text] {\n  background-color: transparent;\n  border: 1px solid #ffffff;\n  border-radius: 3px;\n  height: 24px;\n  color: #ffffff; }\n\n.button {\n  background-color: transparent;\n  cursor: pointer; }\n\n.white-text {\n  color: white;\n  text-shadow: 0px 0px 6px #404040; }\n\n.text-center {\n  text-align: center; }\n\n.visible {\n  opacity: 1; }\n\n.invisible {\n  opacity: 0; }\n\n.transition-all {\n  -webkit-transition: all 0.3s ease;\n  -moz-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  transition: all 0.3s ease; }\n\n.clearfix::after {\n  content: \"\";\n  clear: both;\n  display: table; }\n\n#renderCanvas {\n  touch-action: none; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "babylonjs":
/*!**************************!*\
  !*** external "BABYLON" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = BABYLON;

/***/ }),

/***/ "jquery":
/*!********************!*\
  !*** external "$" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = $;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=bundle.main.js.map