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
        text = String(text);
        $input.val('').focus();
        this.onTextAdd(text);
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
/*! exports provided: DevPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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



var DevPanel = /** @class */ (function (_super) {
    __extends(DevPanel, _super);
    function DevPanel(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { fps: '', coordinate: '', greenMask: '' };
        _this.props.eventCenter.on(_MessageCenter__WEBPACK_IMPORTED_MODULE_1__["Event"].UpdateDevPanelData, function (data) {
            _this.setState({
                fps: data.fps || _this.state.fps,
                coordinate: data.coordinate || _this.state.coordinate,
                greenMask: data.greenMask || _this.state.greenMask
            });
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
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, "Coordinate"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, this.state.coordinate)),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, "GreenMask"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, this.state.greenMask)))));
    };
    ;
    DevPanel.prototype.componentDidMount = function () {
        var isdev = _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getQueryString('isdev');
        if (!isdev)
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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.performance = null;
        return _this;
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
    LoginPanel.prototype.getPerformance = function (startNewOne) {
        if (startNewOne === void 0) { startNewOne = false; }
        if (startNewOne || !this.performance)
            this.performance = performance.now();
        var result = performance.now() - this.performance;
        this.performance = performance.now();
        return result;
    };
    ;
    LoginPanel.prototype.fadeAnimation = function (ele, setting, afterFunc) {
        var _this = this;
        console.log('fadeAnimation start ' + this.getPerformance());
        var animation = $(ele).fadeIn(setting.fadeIn, undefined, function () {
            console.log('fadeIn end ' + _this.getPerformance());
            if (!setting.fadeOut)
                afterFunc(ele);
        });
        if (!setting.fadeOut)
            return;
        animation.delay(setting.sustain || 0).fadeOut(setting.fadeOut, undefined, function () {
            console.log('fadeOut end ' + _this.getPerformance());
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
    LoginPanel.prototype.skipAnimation = function () {
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
        this.focus();
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



var MessageBoard = /** @class */ (function (_super) {
    __extends(MessageBoard, _super);
    function MessageBoard(props) {
        var _this = _super.call(this, props) || this;
        _this.eventCenter = new _MessageCenter__WEBPACK_IMPORTED_MODULE_1__["EventCenter"]();
        var messageCenter = _this.props.messageCenter;
        _this.state = { contents: messageCenter.contents.slice() };
        _this.props.messageCenter.observable.on(_MessageCenter__WEBPACK_IMPORTED_MODULE_1__["MessageCenter"].eventName, _this.refresh.bind(_this));
        return _this;
    }
    ;
    MessageBoard.prototype.render = function () {
        var contents = this.state.contents;
        var contentElements = contents.map(this.createContent.bind(this));
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { id: "messageBoard", className: "invisible" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "messageBoardContent" }, contentElements),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Scrollbar, { syncTarget: ".messageBoardContent", eventCenter: this.eventCenter }));
    };
    ;
    MessageBoard.prototype.componentDidMount = function () {
        var _this = this;
        this.eventCenter.on(Scrollbar.ScrollEvent, function (rate) {
            _this.scrollTo(rate);
        });
    };
    ;
    MessageBoard.prototype.componentDidUpdate = function () {
        var _this = this;
        this.scrollTo(1, false, function () {
            _this.eventCenter.trigger(Scrollbar.UpdateEvent);
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
        var isUser = content.role === _AppSetting__WEBPACK_IMPORTED_MODULE_2__["Roles"].User;
        var name = isUser ? _AppSetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].userName : '';
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
        var isUser = content.role === _AppSetting__WEBPACK_IMPORTED_MODULE_2__["Roles"].User;
        var name = isUser ? _AppSetting__WEBPACK_IMPORTED_MODULE_2__["AppSetting"].userName : '';
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
        if (role === _AppSetting__WEBPACK_IMPORTED_MODULE_2__["Roles"].User)
            return 'assets/avatar_white.png';
        if (role === _AppSetting__WEBPACK_IMPORTED_MODULE_2__["Roles"].Algae)
            return 'assets/avatar_yellow.png';
        if (role === _AppSetting__WEBPACK_IMPORTED_MODULE_2__["Roles"].ChatBot)
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
        $scrollbarContainer
            .on('mousedown', function (e) {
            e.preventDefault();
            isDragging = true;
            origin.pageY = e.pageY;
            var scrollbarOffset = Number($scrollbar.css('top').replace('px', ''));
            origin.scrollbarOffset = scrollbarOffset;
        })
            .on('mousemove', function (e) {
            e.preventDefault();
            if (!isDragging)
                return;
            var offsetY = e.pageY - origin.pageY;
            console.log(offsetY);
            var maxOffset = $scrollbarContainer.height() - $scrollbar.height();
            var scrollbarOffset = origin.scrollbarOffset + offsetY;
            if (scrollbarOffset > maxOffset)
                scrollbarOffset = maxOffset;
            else if (scrollbarOffset < 0)
                scrollbarOffset = 0;
            $scrollbar.css('top', scrollbarOffset);
            eventCenter.trigger(Scrollbar.ScrollEvent, scrollbarOffset / maxOffset);
        });
        $(document).on('mouseup', function (e) {
            e.preventDefault();
            if (!isDragging)
                return;
            isDragging = false;
            console.log('mouseup');
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
        this.observable = null;
        this.observable = eventCenter;
    }
    ;
    MessageCenter.prototype.addText = function (role, text) {
        var _this = this;
        this.contents.push({ role: role, type: ContentType.Text, content: text });
        this.observable.trigger(MessageCenter.eventName);
        if (role !== _AppSetting__WEBPACK_IMPORTED_MODULE_0__["Roles"].User)
            return;
        $.ajax({
            url: 'apis/uploadText',
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({ text: text })
        }).done(function (resp) {
            _this.addText(_AppSetting__WEBPACK_IMPORTED_MODULE_0__["Roles"].Algae, resp.algaeResponse);
            _this.addText(_AppSetting__WEBPACK_IMPORTED_MODULE_0__["Roles"].ChatBot, resp.chatbotResponse);
        });
    };
    ;
    MessageCenter.prototype.addImage = function (role, b64String) {
        var _this = this;
        this.contents.push({ role: role, type: ContentType.Image, content: b64String });
        this.observable.trigger(MessageCenter.eventName);
        $.ajax({
            url: 'apis/uploadImage',
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({ base64Image: b64String })
        }).done(function (resp) {
            _this.addText(_AppSetting__WEBPACK_IMPORTED_MODULE_0__["Roles"].ChatBot, JSON.stringify(resp));
        });
    };
    ;
    MessageCenter.eventName = 'addMessage';
    return MessageCenter;
}());

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
        _this.colorsSetForParticle = [
            { diffuseColor: [253, 245, 134], glowColor: [255, 252, 193, 0.85] },
            { diffuseColor: [253, 229, 210], glowColor: [255, 219, 225, 0.85] },
            { diffuseColor: [252, 247, 255], glowColor: [255, 249, 254, 0.85] }
        ].map(function (set) {
            set.diffuseColor = set.diffuseColor.map(function (n) { return n / 255; });
            set.glowColor = set.glowColor.map(function (n, i) { return i !== 3 ? n / 255 : n; });
            return set;
        });
        _this.particles = [];
        _this.linesForLinesystem = [];
        _this.linesystem = null;
        // private translateFactor = 0;
        _this.translateType = 'Simple';
        _this.chatRoomsNodes = [];
        _this.chatRoomsCenter = [];
        _this.linesForChatRooms = [];
        _this.highlightForLine = null;
        _this.colorSetForLines = [
            [199, 222, 205],
            [192, 231, 164],
            [168, 213, 133]
        ].map(function (set) { return set.map(function (n) { return n / 255; }); });
        _this.glowColor = function () {
            var glowColorInRGB = [246 / 255, 255 / 255, 201 / 255, 0.84];
            return new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Color3"](glowColorInRGB[0], glowColorInRGB[1], glowColorInRGB[2]);
        }();
        _this.textNodes = [];
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
        this.registerRunRenderLoop();
        this.props.eventCenter.on(_MessageCenter__WEBPACK_IMPORTED_MODULE_5__["Event"].AfterWordCardsAnimation, this.transformation.bind(this));
        this.props.eventCenter.on(_MessageCenter__WEBPACK_IMPORTED_MODULE_5__["Event"].AfterLogin, this.zoomIn.bind(this));
        window.addEventListener("resize", function () {
            _this.engine.resize();
        });
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
        this.engine = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Engine"](canvas, true);
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
    Scene.prototype.createBubbleSpray = function (position) {
        // creation
        var sphere = babylonjs__WEBPACK_IMPORTED_MODULE_1__["MeshBuilder"].CreateSphere("s", { diameter: 0.3, segments: 12 }, this.scene);
        var bubbleSpray = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["SolidParticleSystem"]('bubbleSpray', this.scene);
        bubbleSpray.addShape(sphere, 20);
        var mesh = bubbleSpray.buildMesh();
        mesh.material = function () {
            var bubbleMat = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["StandardMaterial"]("bubbleMat", this.scene);
            //mat.backFaceCulling = false;
            bubbleMat.alpha = 0.2;
            return bubbleMat;
        }.bind(this)();
        mesh.position = position;
        sphere.dispose();
        var speed = 0.01;
        // init
        bubbleSpray.initParticles = function () {
            for (var p = 0; p < this.nbParticles; p++) {
                this.recycleParticle(this.particles[p]);
            }
        };
        bubbleSpray.recycleParticle = function (particle) {
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
                bubbleSpray.recycleParticle(particle);
            }
            particle.position.addInPlace(particle.velocity);
            particle.position.y += speed / 2;
            particle['age'] -= 0.01;
            return particle;
        };
        bubbleSpray.initParticles();
        bubbleSpray.setParticles();
        bubbleSpray.computeParticleColor = false;
        bubbleSpray.computeParticleTexture = false;
        bubbleSpray.computeParticleRotation = false;
        this.bubbleSpray = bubbleSpray;
    };
    ;
    Scene.prototype.registerRunRenderLoop = function () {
        var _this = this;
        var origin = { x: 0, y: 0, z: 0 };
        var viewport = this.camera.viewport.toGlobal(this.camera.getEngine(), null);
        this.engine.runRenderLoop(function () {
            /** render before */
            if (_this.cameraLocations.length > 0) {
                _this.camera.position = _this.cameraLocations.shift();
                if (_this.cameraLocations.length >= 1) {
                    _this.camera.setTarget(babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"].Zero());
                    if (_this.cameraLocations.length === 1) {
                        var center = _this.chatRoomsCenter[Scene.chatRoomIndex];
                        _this.createBubbleSpray(center);
                        _this.createAlgae(center);
                    }
                }
            }
            _this.lightOfCamera.position = _this.camera.position;
            _this.translateLinesForTextNodes();
            _this.translateParticles();
            if (_this.bubbleSpray)
                _this.bubbleSpray.setParticles();
            /** render before end */
            _this.scene.render();
            /** render after */
            _this.publishDevData();
        });
    };
    ;
    Scene.prototype.publishDevData = function () {
        this.props.eventCenter.trigger(_MessageCenter__WEBPACK_IMPORTED_MODULE_5__["Event"].UpdateDevPanelData, {
            fps: this.engine.getFps().toFixed() + ' fps',
            coordinate: _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].positionToString(this.camera.position)
        });
    };
    ;
    Scene.prototype.createParticle = function (center) {
        var _this = this;
        var range = 15;
        var position = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](center.x + (_CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(range * -1, range) * 0.1), center.y + (_CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(range * -1, range) * 0.1), center.z + (_CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(range * -1, range) * 0.1));
        var colorSetIndex = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(0, 2);
        var colorSet = this.colorsSetForParticle[colorSetIndex];
        var colorInRGB = colorSet.diffuseColor;
        var color = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Color3"](colorInRGB[0], colorInRGB[1], colorInRGB[2]);
        var radius = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(10, 20) * 0.01;
        var core = babylonjs__WEBPACK_IMPORTED_MODULE_1__["Mesh"].CreateSphere("core-colorSetIndex:" + colorSetIndex, 2, radius, this.scene);
        core.position = position;
        var coreMaterial = core.material = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["StandardMaterial"]("coreMaterial", this.scene);
        coreMaterial.diffuseColor = color;
        coreMaterial.emissiveColor = babylonjs__WEBPACK_IMPORTED_MODULE_1__["Color3"].Black();
        if (!this.glowLayerForParticle) {
            this.glowLayerForParticle = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["GlowLayer"]("glowLayerForParticle", this.scene);
            this.glowLayerForParticle.intensity = 0.5;
            this.glowLayerForParticle.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                var colorSetIndex = mesh.name.replace('core-colorSetIndex:', '');
                var glowColor = _this.colorsSetForParticle[colorSetIndex].glowColor;
                result.set(glowColor[0], glowColor[1], glowColor[2], glowColor[3]);
            };
        }
        this.glowLayerForParticle.addIncludedOnlyMesh(core);
        this.particles.push({
            mesh: core,
            translateVector: _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].getRandomVector3(),
            duration: this.getDurationForParticle()
        });
    };
    ;
    Scene.prototype.startUpdateTextNodeWorker = function () {
        var _this = this;
        if (!window['Worker'])
            return;
        var worker = new Worker(document.getElementById('UpdateTextNodeWorker').src);
        var next = function () {
            var nodes = _this.updateTextNode();
            worker.postMessage(nodes);
        };
        worker.onmessage = function (message) {
            if (_this.textNodes.length === 0) {
                _this.linesForLinesystem.length = 0;
                _this.linesystem.dispose();
                return;
            }
            _this.linesForLinesystem = message.data;
            next();
        };
        worker.postMessage(this.textNodes);
    };
    ;
    Scene.prototype.updateTextNode = function () {
        var _this = this;
        var nodes = [];
        switch (this.translateType) {
            case 'Simple': {
                nodes = this.textNodes.map(function (node, i) {
                    if (node.position.z > -13)
                        node.translateVector.z = -1;
                    else if (node.position.z < -16)
                        node.translateVector.z = 1;
                    _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].updatePosition(node.position, node.translateVector, node.scale);
                    return node.position;
                });
                break;
            }
            case 'ToChatRoomNode': {
                // this.textNodes = this.textNodes.slice(0, this.chatRoomsNodes.length);
                var maxMove_1 = 0.5;
                var textNodesLen = this.textNodes.length;
                var count_1 = 0;
                nodes = this.textNodes.map(function (node, i) {
                    var chatRoomsNode = _this.chatRoomsNodes[i];
                    var distance = _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].distance(chatRoomsNode, node.position);
                    if (distance > maxMove_1) {
                        var vector = _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].subtractVector(chatRoomsNode, node.position).normalize();
                        _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].updatePosition(node.position, vector, maxMove_1);
                    }
                    else {
                        node.position = chatRoomsNode;
                        /*    if (textNodesLen < this.chatRoomsNodes.length) {
                               const toAdd = this.chatRoomsNodes[textNodesLen + 1];
                               if (toAdd) {
                                   this.textNodes.push({ position: toAdd });
                               }
                           } */
                        count_1++;
                    }
                    return node.position;
                });
                console.log(count_1 + ' / ' + textNodesLen);
                break;
            }
        }
        return nodes;
    };
    ;
    Scene.prototype.translateLinesForTextNodes = function () {
        if (this.linesForLinesystem.length === 0)
            return;
        this.linesystem = babylonjs__WEBPACK_IMPORTED_MODULE_1__["MeshBuilder"].CreateLineSystem("linesystem", {
            lines: this.linesForLinesystem,
            updatable: true,
            instance: this.linesystem || null
        }, this.scene);
        this.linesystem.color = babylonjs__WEBPACK_IMPORTED_MODULE_1__["Color3"].White();
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
                p.duration = _this.getDurationForParticle();
            }
            _BabylonUtility__WEBPACK_IMPORTED_MODULE_4__["BabylonUtility"].updatePosition(p.mesh.position, p.translateVector, scale);
            p.duration -= 1;
        });
    };
    ;
    // unit: frame number
    Scene.prototype.getDurationForParticle = function () {
        return _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(60 * 3, 60 * 6);
    };
    ;
    Scene.prototype.getPoints = function () {
        var _this = this;
        jquery__WEBPACK_IMPORTED_MODULE_2__["getJSON"]('apis/getPoints', function (data) {
            var pointInGroups = [];
            Object.keys(data).forEach(function (key, i) {
                var pointInGroup = data[key].map(function (p) {
                    return new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](p.x, p.y, _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomNumber(3) * 0.006);
                });
                _this.chatRoomsNodes = _this.chatRoomsNodes.concat(pointInGroup);
                pointInGroups[i] = pointInGroup;
            });
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
            console.log("line count: " + lines.length);
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
        var highlightForLine = this.highlightForLine =
            this.highlightForLine ||
                function () {
                    var highlightForLine = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["HighlightLayer"]("highlightForLine", this.scene);
                    highlightForLine.innerGlow = false;
                    return highlightForLine;
                }.bind(this)();
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
            highlightForLine.addMesh(merged, _this.glowColor);
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
            _this.textNodes = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].sort(pixels, function (p) { return p.brightness; }).reverse()
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
            _this.startUpdateTextNodeWorker();
        };
    };
    ;
    Scene.prototype.createAlgae = function (center) {
        var count = 50;
        var algaeManager = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["SpriteManager"]("algaeManager", "assets/algae_30.png", count, 30, this.scene);
        for (var i = 0; i < count; i++) {
            var algae = new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Sprite"]("tree", algaeManager);
            algae.size = 0.1;
            algae.position.x = center.x + _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomNumberInRange(-3, 3, 2);
            algae.position.y = center.y + _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomNumberInRange(-3, 3, 2);
            algae.position.z = center.z + _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomNumberInRange(-3, 3, 2);
            algae.isPickable = false;
        }
    };
    ;
    Scene.prototype.transformation = function () {
        var _this = this;
        this.translateType = 'ToChatRoomNode';
        setTimeout(function () {
            _this.translateType = null;
            _this.textNodes.length = 0;
            _this.drawLine();
            _this.createParticles();
        }, 1.8 * 1000);
    };
    ;
    Scene.prototype.zoomIn = function () {
        Scene.chatRoomIndex = _CommonUtility__WEBPACK_IMPORTED_MODULE_3__["CommonUtility"].getRandomIntInRange(0, this.chatRoomsCenter.length - 1);
        var chatRoom = this.chatRoomsCenter[Scene.chatRoomIndex];
        var destination = chatRoom ?
            new babylonjs__WEBPACK_IMPORTED_MODULE_1__["Vector3"](chatRoom.x * 3, chatRoom.y * 3, 0) :
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


/***/ }),

/***/ "./app_src/main.tsx":
/*!**************************!*\
  !*** ./app_src/main.tsx ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MessageCenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MessageCenter */ "./app_src/MessageCenter.ts");
/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Scene */ "./app_src/Scene.tsx");
/* harmony import */ var _DevPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DevPanel */ "./app_src/DevPanel.tsx");
/* harmony import */ var _LoginPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LoginPanel */ "./app_src/LoginPanel.tsx");
/* harmony import */ var _ControlPanel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ControlPanel */ "./app_src/ControlPanel.tsx");
/* harmony import */ var _MessageBoard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MessageBoard */ "./app_src/MessageBoard.tsx");
/* harmony import */ var _CommonUtility__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CommonUtility */ "./app_src/CommonUtility.ts");









var isdev = _CommonUtility__WEBPACK_IMPORTED_MODULE_8__["CommonUtility"].getQueryString('isdev');
if (!isdev)
    console.info = console.debug = console.log = function () { };
var eventCenter = new _MessageCenter__WEBPACK_IMPORTED_MODULE_2__["EventCenter"]();
var messageCenter = new _MessageCenter__WEBPACK_IMPORTED_MODULE_2__["MessageCenter"](eventCenter);
react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_Scene__WEBPACK_IMPORTED_MODULE_3__["Scene"], { eventCenter: eventCenter }),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_DevPanel__WEBPACK_IMPORTED_MODULE_4__["DevPanel"], { eventCenter: eventCenter }),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_LoginPanel__WEBPACK_IMPORTED_MODULE_5__["LoginPanel"], { eventCenter: eventCenter }),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_MessageBoard__WEBPACK_IMPORTED_MODULE_7__["MessageBoard"], { messageCenter: messageCenter }),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_ControlPanel__WEBPACK_IMPORTED_MODULE_6__["ControlPanel"], { messageCenter: messageCenter, eventCenter: eventCenter })), document.getElementById("app"));


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
//# sourceMappingURL=bundle.main.d8d93e30d3e272ee8dc9.js.map