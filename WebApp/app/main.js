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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
    BabylonUtility.distanceVector = function (v1, v2) {
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
                    var distance = BabylonUtility.distanceVector(from, to);
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
    return CommonUtility;
}());

;


/***/ }),

/***/ "./app_src/ControlPanel.ts":
/*!*********************************!*\
  !*** ./app_src/ControlPanel.ts ***!
  \*********************************/
/*! exports provided: ControlPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControlPanel", function() { return ControlPanel; });
var ControlPanel = /** @class */ (function () {
    function ControlPanel() {
        this.onTextAdd = null;
        this.onImageAdd = null;
    }
    ControlPanel.prototype.initPanel = function (onTextAdd, onImageAdd) {
        this.onTextAdd = onTextAdd;
        this.onImageAdd = onImageAdd;
        $('#textInputSwitch').on('click', this.switchTextInput.bind(this));
        $('#sent').on('click', this.handleText.bind(this));
        $('#fileUpload').on('change', this.handleFiles.bind(this));
    };
    ;
    ControlPanel.prototype.switchTextInput = function () {
        var $textInput = $('#textInput');
        $textInput.toggleClass('visible').toggleClass('invisible');
    };
    ;
    ControlPanel.prototype.handleText = function () {
        var _this = this;
        var $input = $('#textInput>input');
        var text = String($input.val());
        if (!text)
            return;
        $input.val('').focus();
        this.onTextAdd(text);
        var $mask = $('.flashMask');
        $mask.addClass('flash');
        setTimeout(function () {
            $mask.removeClass('flash');
        }, 500);
        // mock response
        window.setTimeout(function () {
            _this.onTextAdd(text + '! ' + text + '! ' + text + '!!!');
        }, 700);
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
            $.ajax({
                url: 'apis/uploadImage',
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({ base64Image: base64Image })
            }).done(function (resp) {
                console.log(resp);
            }).fail(function (err) {
                console.log(err);
            });
        });
        FR.readAsDataURL(image);
    };
    ;
    return ControlPanel;
}());

;


/***/ }),

/***/ "./app_src/LoginPanel.ts":
/*!*******************************!*\
  !*** ./app_src/LoginPanel.ts ***!
  \*******************************/
/*! exports provided: LoginPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPanel", function() { return LoginPanel; });
var clientId = '380947346613-l6gvf9laj9fuko3ljph9ej99olo5qa3k.apps.googleusercontent.com';
var apiKey = 'AIzaSyBmozdLmtDDry_ah4NhYPqOTeZ2wr9Er2A';
var LoginPanel = /** @class */ (function () {
    function LoginPanel() {
        this.afterWordCardsAnimation = function () { };
        this.afterLogin = function () { };
    }
    LoginPanel.prototype.init = function () {
        this.setSignInButton();
        //gapi.load('client', this.initGoogleClient.bind(this));
        this.wordCardsAnimation();
    };
    ;
    LoginPanel.prototype.fadeAnimation = function (ele, times, onComplete) {
        var $ele = $(ele);
        $ele.fadeIn(times.fadeIn, undefined, function () {
            if (!times.fadeOut) {
                onComplete();
                return;
            }
            setTimeout(function () {
                $ele.fadeOut(times.fadeOut, undefined, function () {
                    onComplete();
                });
            }, times.sustain || 0);
        });
    };
    ;
    LoginPanel.prototype.fadeSequence = function (eleArray, setting, afterFunc) {
        var _this = this;
        if (eleArray.length === 0) {
            afterFunc();
            return;
        }
        setting.fadeOut = (eleArray.length > 1) ? setting.fadeOut : null;
        this.fadeAnimation(eleArray.shift(), setting, function () {
            _this.fadeSequence(eleArray, setting, afterFunc);
        });
    };
    ;
    LoginPanel.prototype.wordCardsAnimation = function () {
        var $wordCards = $('#loginPanel > div');
        var times = {
            fadeIn: 5000,
            sustain: 1000,
            fadeOut: 2000
        };
        this.fadeSequence($wordCards.toArray(), times, this.afterWordCardsAnimation);
    };
    ;
    LoginPanel.prototype.setSignInButton = function () {
        var _this = this;
        $('.sign-in-button').on('click', function (e) {
            var signInName = $('#signInName').val();
            if (signInName.length > 0)
                _this.login();
        });
    };
    ;
    LoginPanel.prototype.initGoogleClient = function () {
        var _this = this;
        gapi.client.init({
            clientId: clientId,
            apiKey: apiKey,
            discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
            scope: 'profile'
        }).then(function () {
            var isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
            if (!isSignedIn)
                _this.setGoogleSignInButton();
            else
                _this.queryUser();
        });
    };
    ;
    LoginPanel.prototype.setGoogleSignInButton = function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.login.bind(this));
        // $('#signInWrapper').show();
        $('#signinButton').on('click', function () { return gapi.auth2.getAuthInstance().signIn(); });
    };
    ;
    LoginPanel.prototype.queryUser = function () {
        var _this = this;
        gapi.client.people.people.get({
            'resourceName': 'people/me',
            'requestMask.includeField': 'person.names'
        }).then(function (resp) {
            var name = resp.result.names[0].displayName;
            _this.setLoiginButton(name);
        });
    };
    ;
    LoginPanel.prototype.setLoiginButton = function (name) {
        // $('#signInWrapper').show();
        $('#signInWrapper .buttonText').text(name);
        $('#signinButton').on('click', this.login.bind(this));
    };
    ;
    LoginPanel.prototype.login = function () {
        var $loginPanel = $('#loginPanel');
        $loginPanel.animate({ opacity: 0 }, 2000, function () { return $loginPanel.hide(); });
        this.afterLogin();
    };
    ;
    return LoginPanel;
}());

;


/***/ }),

/***/ "./app_src/MessageBoard.tsx":
/*!**********************************!*\
  !*** ./app_src/MessageBoard.tsx ***!
  \**********************************/
/*! exports provided: MessageBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageBoard", function() { return MessageBoard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ "./app_src/main.tsx");
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
        _this.props.messageCenter.observable.on('add', _this.refresh.bind(_this));
        return _this;
    }
    ;
    MessageBoard.prototype.render = function () {
        var contents = this.state.contents;
        var contentElements = contents.map(this.createContent.bind(this));
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "untouchable" }, contentElements);
    };
    ;
    MessageBoard.prototype.createContent = function (content) {
        if (content.type === _main__WEBPACK_IMPORTED_MODULE_1__["ContentType"].Text)
            return this.createTextMessage(content.content);
        else if (content.type === _main__WEBPACK_IMPORTED_MODULE_1__["ContentType"].Image)
            return this.createImageMessage(content.content);
    };
    ;
    MessageBoard.prototype.createTextMessage = function (text) {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, text);
    };
    ;
    MessageBoard.prototype.createImageMessage = function (base64string) {
        var style = {
            width: '60%',
            maxWidth: '600px'
        };
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { src: base64string, style: style }));
        /*
                const style = {
                    width: "500px",
                    backgroundImage: `url(${base64string})`
                };
                return <div style={style}></div>; */
    };
    ;
    MessageBoard.prototype.refresh = function () {
        this.setState({ contents: this.props.messageCenter.contents.slice() });
    };
    ;
    return MessageBoard;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

;


/***/ }),

/***/ "./app_src/Scene.ts":
/*!**************************!*\
  !*** ./app_src/Scene.ts ***!
  \**************************/
/*! exports provided: Scene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scene", function() { return Scene; });
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CommonUtility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CommonUtility */ "./app_src/CommonUtility.ts");
/* harmony import */ var _BabylonUtility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BabylonUtility */ "./app_src/BabylonUtility.ts");




var Scene = /** @class */ (function () {
    function Scene() {
        this.texts = [];
        this.canvas = document.getElementById("renderCanvas");
        this.engine = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Engine"](this.canvas, true);
        this.cameraLocations = [];
        this.bubbleSprays = [];
        this.colorsSetForParticle = [
            { diffuseColor: [253, 245, 134], glowColor: [255, 252, 193, 0.85] },
            { diffuseColor: [253, 229, 210], glowColor: [255, 219, 225, 0.85] },
            { diffuseColor: [252, 247, 255], glowColor: [255, 249, 254, 0.85] }
        ].map(function (set) {
            set.diffuseColor = set.diffuseColor.map(function (n) { return n / 255; });
            set.glowColor = set.glowColor.map(function (n, i) { return i !== 3 ? n / 255 : n; });
            return set;
        });
        this.particles = [];
        this.linesForLinesystem = [];
        this.linesystem = null;
        this.translateFactor = 0;
        this.translateType = 'Simple';
        this.chatRoomsNodes = [];
        this.chatRoomsCenter = [];
        this.linesForChatRooms = [];
        this.highlightForLine = null;
        this.colorSetForLines = [
            [199, 222, 205],
            [192, 231, 164],
            [168, 213, 133]
        ].map(function (set) { return set.map(function (n) { return n / 255; }); });
        this.glowColor = function () {
            var glowColorInRGB = [246 / 255, 255 / 255, 201 / 255, 0.84];
            return new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](glowColorInRGB[0], glowColorInRGB[1], glowColorInRGB[2]);
        }();
        this.textNodes = [];
    }
    /******* Add the create scene function ******/
    Scene.prototype.init = function () {
        var _this = this;
        this.initScene();
        this.getTexts();
        this.getPoints();
        this.registerRunRenderLoop();
        // new ControlPanel().initPanel(this.onTextAdd.bind(this), this.onImageAdd.bind(this));
        jquery__WEBPACK_IMPORTED_MODULE_1__('#devPanel').show();
        window.addEventListener("resize", function () {
            _this.engine.resize();
        });
    };
    ;
    Scene.prototype.initScene = function () {
        var scene = this.scene = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Scene"](this.engine);
        var camera = this.camera = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["UniversalCamera"]("Camera", new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, -25), this.scene);
        camera.speed = 0.5;
        camera.setTarget(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Zero());
        camera.attachControl(this.canvas, true);
        new babylonjs__WEBPACK_IMPORTED_MODULE_0__["HemisphericLight"]("HemiLight1", new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 10), scene).intensity = 0.8;
        new babylonjs__WEBPACK_IMPORTED_MODULE_0__["HemisphericLight"]("HemiLight2", new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, -10), scene).intensity = 0.8;
        this.lightOfCamera = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["PointLight"]("lightOfCamera", new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0), scene);
        this.lightOfCamera.diffuse = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](1, 1, 1);
        this.lightOfCamera.specular = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](0.8, 0.8, 0.2);
        this.lightOfCamera.intensity = 0.3;
        var skyboxMaterial = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["CubeTexture"]("assets/skybox/sb", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Texture"].SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](0, 0, 0);
        skyboxMaterial.specularColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](0, 0, 0);
        skyboxMaterial.disableLighting = true;
        var skybox = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateBox("skyBox", 1500.0, scene);
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skybox.renderingGroupId = 0;
    };
    ;
    Scene.prototype.createBubbleSpray = function (position) {
        // creation
        var sphere = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreateSphere("s", { diameter: 0.08, segments: 12 }, this.scene);
        var bubbleSpray = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["SolidParticleSystem"]('bubbleSpray', this.scene);
        bubbleSpray.addShape(sphere, 20);
        var mesh = bubbleSpray.buildMesh();
        mesh.material = function () {
            var bubbleMat = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("bubbleMat", this.scene);
            //mat.backFaceCulling = false;
            bubbleMat.alpha = 0.1;
            return bubbleMat;
        }.bind(this)();
        mesh.position = position;
        sphere.dispose();
        // behavior definition
        var speed = 0.01;
        // init
        bubbleSpray.initParticles = function () {
            // just recycle everything
            for (var p = 0; p < this.nbParticles; p++) {
                this.recycleParticle(this.particles[p]);
            }
        };
        // recycle
        var scale;
        bubbleSpray.recycleParticle = function (particle) {
            // Set particle new velocity, scale and rotation
            // As this function is called for each particle, we don't allocate new
            // memory by using "new BABYLON.Vector3()" but we set directly the
            // x, y, z particle properties instead
            particle.position.x = 0;
            particle.position.y = 0;
            particle.position.z = 0;
            particle.velocity.x = (Math.random() - 0.5) * speed / 3;
            particle.velocity.y = Math.random() * speed;
            particle.velocity.z = (Math.random() - 0.5) * speed / 3;
            scale = 1 * Math.random() + 0.2;
            particle.scale.x = scale;
            particle.scale.y = scale;
            particle.scale.z = scale;
            particle['age'] = Math.random() * 0.8;
            return particle;
        };
        // update : will be called by setParticles()
        bubbleSpray.updateParticle = function (particle) {
            // some physics here 
            if (particle.position.y < 0 || particle['age'] < 0) {
                bubbleSpray.recycleParticle(particle);
            }
            (particle.position).addInPlace(particle.velocity); // update particle new position
            particle.position.y += speed / 2;
            particle['age'] -= 0.01;
            return particle;
        };
        // init all particle values and set them once to apply textures, colors, etc
        bubbleSpray.initParticles();
        bubbleSpray.setParticles();
        // Tuning : 
        bubbleSpray.computeParticleColor = false;
        bubbleSpray.computeParticleTexture = false;
        bubbleSpray.computeParticleRotation = false;
        this.bubbleSprays.push(bubbleSpray);
    };
    ;
    Scene.prototype.registerRunRenderLoop = function () {
        var _this = this;
        var origin = { x: 0, y: 0, z: 0 };
        var viewport = this.camera.viewport.toGlobal(this.camera.getEngine(), null);
        var $mark = jquery__WEBPACK_IMPORTED_MODULE_1__('.mark');
        this.engine.runRenderLoop(function () {
            /** render before */
            _this.bubbleSprays.forEach(function (e) { return e.setParticles(); });
            if (_this.cameraLocations.length > 0) {
                var position = _this.camera.position = _this.cameraLocations.shift();
                if (_this.cameraLocations.length >= 1) {
                    _this.camera.setTarget(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Zero());
                    if (_this.cameraLocations.length === 1)
                        _this.createBubbleSprayAndParticles();
                }
            }
            _this.lightOfCamera.position = _this.camera.position;
            _this.translateLinesForTextNodes();
            _this.translateParticles();
            _this.bubbleSprays.forEach(function (e) { return e.setParticles(); });
            /** render before end */
            _this.scene.render();
            /** render after */
            _this.updateDevPanel();
            /*             const text = this.texts[0];
                        if (!text) return;
                        const transformationMatrix = this.camera.getViewMatrix().multiply(this.camera.getProjectionMatrix());
                        const projectedPosition = BABYLON.Vector3.Project(origin, text.computeWorldMatrix(false), transformationMatrix, viewport);
            
                        if (projectedPosition.z > 1) {
                            $mark.hide();
                            return;
                        }
                        $mark.show();
                        $mark.css('top', projectedPosition.y + 60);
                        $mark.css('left', projectedPosition.x);
                        const scale = 1 / (1 - projectedPosition.z);
                        // $mark.css('transform', 'translate(-50%, -50%) scale(' + scale + ',' + scale + ')');
                        $mark.text(JSON.stringify(projectedPosition)); */
            /** render after end */
        });
    };
    ;
    Scene.prototype.updateDevPanel = function () {
        var $fps = document.getElementById('fps');
        $fps.innerHTML = this.engine.getFps().toFixed() + ' fps';
        var $coordinate = document.getElementById('coordinate');
        $coordinate.innerHTML = _BabylonUtility__WEBPACK_IMPORTED_MODULE_3__["BabylonUtility"].positionToString(this.camera.position);
    };
    ;
    Scene.prototype.onTextAdd = function (text, x, y, z) {
        var outputplaneTexture = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["DynamicTexture"]("dynamic texture", { width: 500, height: 80 }, this.scene, true);
        outputplaneTexture.drawText(text, 0, 60, "60px verdana", "white", 'true');
        outputplaneTexture.hasAlpha = true;
        var outputplane = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("outputplane", { width: 5, height: 1 }, this.scene);
        outputplane.billboardMode = babylonjs__WEBPACK_IMPORTED_MODULE_0__["AbstractMesh"].BILLBOARDMODE_ALL;
        outputplane.position = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](x, y, z);
        outputplane.scaling.y = 1;
        outputplane['_message'] = text;
        var material = outputplane.material = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("outputplane", this.scene);
        material.diffuseTexture = outputplaneTexture;
        material.alpha = 0;
        material.backFaceCulling = false;
        this.texts.push(outputplane);
    };
    ;
    Scene.prototype.onImageAdd = function (image, x, y, z) {
        var outputplaneTexture = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Texture"].CreateFromBase64String(image, 'image-' + Date.now, this.scene);
        // outputplaneTexture.hasAlpha = true;
        var outputplane = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreatePlane("outputplane", { width: 5, height: 5 }, this.scene);
        outputplane.billboardMode = babylonjs__WEBPACK_IMPORTED_MODULE_0__["AbstractMesh"].BILLBOARDMODE_ALL;
        outputplane.position = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](x, y, z);
        outputplane.scaling.y = 1;
        var material = outputplane.material = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("outputplane", this.scene);
        material.diffuseTexture = outputplaneTexture;
        material.specularColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](0, 0, 0);
        material.emissiveColor = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](1, 1, 1);
        material.backFaceCulling = false;
    };
    ;
    Scene.prototype.createParticle = function (center) {
        var _this = this;
        var range = 15;
        var position = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](center.x + (_CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomIntInRange(range * -1, range) * 0.1), center.y + (_CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomIntInRange(range * -1, range) * 0.1), center.z + (_CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomIntInRange(range * -1, range) * 0.1));
        var colorSetIndex = _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomIntInRange(0, 2);
        var colorSet = this.colorsSetForParticle[colorSetIndex];
        var colorInRGB = colorSet.diffuseColor;
        var color = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](colorInRGB[0], colorInRGB[1], colorInRGB[2]);
        var radius = _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomIntInRange(50, 70) * 0.001;
        var core = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].CreateSphere("core-colorSetIndex:" + colorSetIndex, 2, radius, this.scene);
        core.position = position;
        var coreMaterial = core.material = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("coreMaterial", this.scene);
        coreMaterial.diffuseColor = color;
        coreMaterial.emissiveColor = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"].Black();
        if (!this.glowLayerForParticle) {
            this.glowLayerForParticle = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["GlowLayer"]("glowLayerForParticle", this.scene);
            this.glowLayerForParticle.intensity = 0.5;
            this.glowLayerForParticle.customEmissiveColorSelector = function (mesh, subMesh, material, result) {
                var colorSetIndex = mesh.name.replace('core-colorSetIndex:', '');
                var glowColor = _this.colorsSetForParticle[colorSetIndex].glowColor;
                result.set(glowColor[0], glowColor[1], glowColor[2], glowColor[3]);
            };
        }
        this.glowLayerForParticle.addIncludedOnlyMesh(core);
        var translateVector = _BabylonUtility__WEBPACK_IMPORTED_MODULE_3__["BabylonUtility"].getRandomVector3();
        this.particles.push({
            mesh: core,
            translateVector: translateVector,
            duration: this.getDurationForParticle()
        });
    };
    ;
    Scene.prototype.startUpdateTextNodeWorker = function () {
        var _this = this;
        if (!window['Worker'])
            return;
        var worker = new Worker("app/UpdateTextNodeWorker.js");
        var next = function () {
            var nodes = [];
            if (_this.translateType === 'Simple') {
                nodes = _this.textNodes.map(function (node) {
                    _BabylonUtility__WEBPACK_IMPORTED_MODULE_3__["BabylonUtility"].updatePosition(node.position, node.translateVector, node.scale * Math.cos(_this.translateFactor));
                    return node.position;
                });
                _this.translateFactor += 0.01;
            }
            else if (_this.translateType === 'ToOrigin') {
                nodes = _this.textNodes.map(function (node) {
                    var vector = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-node.position.x, -node.position.y, -node.position.z).normalize();
                    _BabylonUtility__WEBPACK_IMPORTED_MODULE_3__["BabylonUtility"].updatePosition(node.position, vector, 0.5);
                    return node.position;
                });
            }
            else if (_this.translateType === 'ToChatRoomNode') {
                _this.textNodes = _this.textNodes.slice(0, _this.chatRoomsNodes.length);
                nodes = _this.textNodes.map(function (node, i) {
                    var vector = _BabylonUtility__WEBPACK_IMPORTED_MODULE_3__["BabylonUtility"].subtractVector(_this.chatRoomsNodes[i], node.position).normalize();
                    _BabylonUtility__WEBPACK_IMPORTED_MODULE_3__["BabylonUtility"].updatePosition(node.position, vector, 0.5);
                    return node.position;
                });
            }
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
    Scene.prototype.translateLinesForTextNodes = function () {
        if (this.linesForLinesystem.length === 0)
            return;
        this.linesystem = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreateLineSystem("linesystem", {
            lines: this.linesForLinesystem,
            updatable: true,
            instance: this.linesystem || null
        }, this.scene);
        this.linesystem.color = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"].White();
    };
    ;
    Scene.prototype.translateParticles = function () {
        var _this = this;
        if (this.particles.length === 0)
            return;
        var scale = 0.003;
        this.particles.forEach(function (p) {
            if (p.duration <= 0) {
                p.translateVector = _BabylonUtility__WEBPACK_IMPORTED_MODULE_3__["BabylonUtility"].getRandomVector3();
                p.duration = _this.getDurationForParticle();
            }
            _BabylonUtility__WEBPACK_IMPORTED_MODULE_3__["BabylonUtility"].updatePosition(p.mesh.position, p.translateVector, scale);
            p.duration -= 1;
        });
    };
    ;
    // unit: frame number
    Scene.prototype.getDurationForParticle = function () {
        return _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomIntInRange(60 * 3, 60 * 6);
    };
    ;
    Scene.prototype.getPoints = function () {
        var _this = this;
        jquery__WEBPACK_IMPORTED_MODULE_1__["getJSON"]('apis/getPoints', function (data) {
            var pointInGroups = [];
            Object.keys(data).forEach(function (key, i) {
                var pointInGroup = data[key].map(function (p) {
                    return new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](p.x, p.y, _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomNumber(3) * 0.006);
                });
                _this.chatRoomsNodes = _this.chatRoomsNodes.concat(pointInGroup);
                pointInGroups[i] = pointInGroup;
            });
            var lines = [];
            var take = 120;
            pointInGroups.forEach(function (points) {
                var linesInGroup = _BabylonUtility__WEBPACK_IMPORTED_MODULE_3__["BabylonUtility"].getLineToEachOther(points);
                var maxLine = _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].sort(linesInGroup, function (e) { return e.distance; })[linesInGroup.length - 1];
                var center = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](0, 0, 0);
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
    Scene.prototype.createBubbleSprayAndParticles = function () {
        var _this = this;
        this.chatRoomsCenter.forEach(function (center) {
            _this.createBubbleSpray(center);
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
                    var highlightForLine = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["HighlightLayer"]("highlightForLine", this.scene);
                    highlightForLine.innerGlow = false;
                    return highlightForLine;
                }.bind(this)();
        var materials = this.colorSetForLines.map(function (colorInRGB, i) {
            var color = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color3"](colorInRGB[0], colorInRGB[1], colorInRGB[2]);
            var mat = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["StandardMaterial"]("lineMat" + i, _this.scene);
            mat.diffuseColor = color;
            return mat;
        });
        var meshContainer = [[], [], []];
        this.linesForChatRooms.forEach(function (e, i) {
            var materialIndex = _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomIntInRange(0, 2);
            var line = babylonjs__WEBPACK_IMPORTED_MODULE_0__["MeshBuilder"].CreateTube("line" + i, {
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
            var merged = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Mesh"].MergeMeshes(group, true, false);
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
            var startX = 64 * _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomIntInRange(0, 6);
            var startY = 64 * _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomIntInRange(0, 6);
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
            _this.textNodes = _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].sort(pixels, function (p) { return p.brightness; }).reverse()
                .slice(0, 200)
                .map(function (p, i) {
                var rate = 0.12;
                // const s = BABYLON.Mesh.CreateSphere(`pixels-${i}`, 2, 0.2, this.scene);
                var position = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"]((p.x - 32) * rate, (p.y - 32) * -1 * rate, -15 + _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomNumberInRange(0, 2, 3));
                return {
                    position: position,
                    scale: _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomNumberInRange(-0.03, 0.03, 3),
                    translateVector: _BabylonUtility__WEBPACK_IMPORTED_MODULE_3__["BabylonUtility"].getRandomVector3(false, false).normalize()
                };
            });
            _this.startUpdateTextNodeWorker();
        };
    };
    ;
    Scene.prototype.transformation = function () {
        var _this = this;
        this.translateType = 'ToOrigin';
        setTimeout(function () {
            _this.translateType = 'ToChatRoomNode';
        }, 1 * 1000);
        setTimeout(function () {
            _this.translateType = null;
            _this.textNodes.length = 0;
            _this.drawLine();
        }, 1.8 * 1000);
    };
    ;
    Scene.prototype.zoomIn = function () {
        var randomChatRoomIndex = _CommonUtility__WEBPACK_IMPORTED_MODULE_2__["CommonUtility"].getRandomIntInRange(0, this.chatRoomsCenter.length - 1);
        var chatRoom = this.chatRoomsCenter[randomChatRoomIndex];
        var destination = chatRoom ?
            new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](chatRoom.x * 3, chatRoom.y * 3, 0) :
            babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Zero();
        var curve = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Curve3"].CreateHermiteSpline(this.camera.position, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Zero(), destination, babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Zero(), 60 * 5);
        var points = curve.getPoints();
        this.cameraLocations = points;
    };
    ;
    return Scene;
}());

;


/***/ }),

/***/ "./app_src/main.tsx":
/*!**************************!*\
  !*** ./app_src/main.tsx ***!
  \**************************/
/*! exports provided: ContentType, MessageCenter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentType", function() { return ContentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageCenter", function() { return MessageCenter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Scene */ "./app_src/Scene.ts");
/* harmony import */ var _LoginPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LoginPanel */ "./app_src/LoginPanel.ts");
/* harmony import */ var _ControlPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ControlPanel */ "./app_src/ControlPanel.ts");
/* harmony import */ var _MessageBoard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MessageBoard */ "./app_src/MessageBoard.tsx");






var loginPanel = new _LoginPanel__WEBPACK_IMPORTED_MODULE_3__["LoginPanel"]();
var scene = new _Scene__WEBPACK_IMPORTED_MODULE_2__["Scene"]();
loginPanel.afterWordCardsAnimation = scene.transformation.bind(scene);
loginPanel.afterLogin = function () {
    $('.control-panel').removeClass('invisible').addClass('visible');
    scene.zoomIn.bind(scene)();
};
loginPanel.init();
scene.init();
var ContentType;
(function (ContentType) {
    ContentType[ContentType["Text"] = 0] = "Text";
    ContentType[ContentType["Image"] = 1] = "Image";
})(ContentType || (ContentType = {}));
;
;
var MessageCenter = /** @class */ (function () {
    function MessageCenter() {
        this.contents = [];
        this.observable = $({});
    }
    MessageCenter.prototype.addText = function (text) {
        this.contents.push({ type: ContentType.Text, content: text });
        this.observable.trigger('add');
    };
    ;
    MessageCenter.prototype.addImage = function (b64String) {
        this.contents.push({ type: ContentType.Image, content: b64String });
        this.observable.trigger('add');
    };
    ;
    return MessageCenter;
}());

;
var messageCenter = new MessageCenter();
new _ControlPanel__WEBPACK_IMPORTED_MODULE_4__["ControlPanel"]().initPanel(messageCenter.addText.bind(messageCenter), messageCenter.addImage.bind(messageCenter));
react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_MessageBoard__WEBPACK_IMPORTED_MODULE_5__["MessageBoard"], { messageCenter: messageCenter }), document.getElementById("app"));


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
//# sourceMappingURL=main.js.map