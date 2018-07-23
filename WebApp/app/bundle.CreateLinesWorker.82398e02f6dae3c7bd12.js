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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app_src/CreateLinesWorker.ts");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./app_src/CreateLinesWorker.ts":
/*!**************************************!*\
  !*** ./app_src/CreateLinesWorker.ts ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CommonUtility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommonUtility */ "./app_src/CommonUtility.ts");
/* harmony import */ var _BabylonUtility__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BabylonUtility */ "./app_src/BabylonUtility.ts");


self.onmessage = function (message) {
    var textNodes = message.data;
    var lines = _BabylonUtility__WEBPACK_IMPORTED_MODULE_1__["BabylonUtility"].getLineToEachOther(textNodes);
    var linesToSelect = lines.filter(function (l) { return l.distance > 0.2; });
    linesToSelect = _CommonUtility__WEBPACK_IMPORTED_MODULE_0__["CommonUtility"]
        .sort(linesToSelect, function (l) { return l.distance; })
        .slice(0, 1200);
    var linesToDraw = linesToSelect.map(function (l) { return [l.from, l.to]; });
    //.shuffle(linesToSelect)
    //.slice(0, 900)
    postMessage(linesToDraw, undefined);
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.CreateLinesWorker.82398e02f6dae3c7bd12.js.map