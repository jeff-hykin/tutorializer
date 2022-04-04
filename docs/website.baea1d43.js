// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../tutorials/tutorialize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorializerSymbol = exports.onLoad = exports.Tutorializer = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var tutorializerSymbol = Symbol.for("tutorializer");
exports.tutorializerSymbol = tutorializerSymbol;
var Tutorializer = window[tutorializerSymbol] = {
  get data() {
    return Object.fromEntries([].concat(_toConsumableArray(Tutorializer.progressData), [Object.entries(Tutorializer.pendingData)]).flat(1));
  },

  has: function has(id) {
    return id in Tutorializer.data;
  },
  add: function add(id, value) {
    Tutorializer.pendingData[id] = value;
  },
  pendingData: {},
  progressData: [],
  eventTypes: {
    next: "tutorializer:next",
    back: "tutorializer:back"
  },
  main: null,
  show: function show() {
    for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
      elements[_key] = arguments[_key];
    }

    Tutorializer.main.style.opacity = 0;
    setTimeout(function () {
      Tutorializer.main.children = elements;
      Tutorializer.main.style.opacity = 1;
    }, 600);
  },
  loadTutorial: null,
  nextClicked: function nextClicked() {
    if (Object.keys(Tutorializer.pendingData).length) {
      Tutorializer.progressData.push(Object.entries(Tutorializer.pendingData));
      Tutorializer.pendingData = {};
    }

    window.dispatchEvent(new CustomEvent(Tutorializer.eventTypes.next));
  },
  backClicked: function backClicked() {
    var previous = Tutorializer.progressData.pop();
    Tutorializer.pendingData = {}; // cancel all the previous ones

    window.dispatchEvent(new CustomEvent(Tutorializer.eventTypes.back));
    Tutorializer.loadTutorial();
  },
  nextWasClicked: function nextWasClicked() {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                var resolved = false;
                var rejected = false;
                var cleanup;

                var resolveListener = function resolveListener() {
                  if (rejected) {
                    return;
                  } else {
                    resolved = true;
                    resolve();
                    cleanup();
                  }
                };

                var rejectListener = function rejectListener() {
                  if (resolved) {
                    return;
                  } else {
                    rejected = true;
                    reject();
                    cleanup();
                  }
                };

                cleanup = function cleanup() {
                  window.removeEventListener(Tutorializer.eventTypes.next, resolveListener);
                  window.removeEventListener(Tutorializer.eventTypes.back, rejectListener);
                };

                window.addEventListener(Tutorializer.eventTypes.next, resolveListener);
                window.addEventListener(Tutorializer.eventTypes.back, rejectListener);
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};
exports.Tutorializer = Tutorializer;

var createTitle = function createTitle(text) {
  var header = document.createElement("h1");
  header.style = "\n        font-size: 32px;\n        padding: 1rem;\n        text-decoration: underline;\n    ";
  header.innerHTML = text;
  return header;
};

var createBody = function createBody(text) {
  var textElement = document.createElement("span");
  textElement.style = "\n        padding: 2rem;\n    ";
  textElement.innerHTML = text;
  return textElement;
};

function showText(_x) {
  return _showText.apply(this, arguments);
}

function _showText() {
  _showText = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref) {
    var id, title, body;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = _ref.id, title = _ref.title, body = _ref.body;

            if (!Tutorializer.has(id)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", Tutorializer.data[id]);

          case 3:
            Tutorializer.show(createTitle(title), createBody(body));
            _context3.next = 6;
            return Tutorializer.nextWasClicked();

          case 6:
            Tutorializer.data[id] = true; // data was shown

            return _context3.abrupt("return", Tutorializer.data[id]);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _showText.apply(this, arguments);
}

function askLine(_x2) {
  return _askLine.apply(this, arguments);
}

function _askLine() {
  _askLine = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref2) {
    var id, question, container, inputElement;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = _ref2.id, question = _ref2.question;

            if (!Tutorializer.has(id)) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", Tutorializer.data[id]);

          case 3:
            container = document.createElement("div");
            container.style = "\n        display: flex;\n        flex-direction: column;\n    ";
            inputElement = document.createElement("input");

            inputElement.oninput = function () {
              Tutorializer.add(id, inputElement.value);
            };

            container.appendChild(createBody(question));
            container.appendChild(inputElement);
            Tutorializer.show(container);
            _context4.next = 12;
            return Tutorializer.nextWasClicked();

          case 12:
            return _context4.abrupt("return", Tutorializer.data[id]);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _askLine.apply(this, arguments);
}

var onLoad = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(progressData) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return askLine({
              id: "githubUsername",
              question: "Whats the github username for the repository?"
            });

          case 2:
            _context2.next = 4;
            return showText({
              id: "readSummary",
              title: "What This Does",
              body: "Testing testing"
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function onLoad(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.onLoad = onLoad;
},{}],"../website.jsx":[function(require,module,exports) {
"use strict";

var _tutorialize = require("./tutorials/tutorialize.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var _yield$import, router, bottomRowHeight;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.head.innerHTML += "<link rel=\"stylesheet\" href=\"https://unpkg.com/css-baseline/css/3.css\">";
          _context.next = 3;
          return import('https://cdn.skypack.dev/quik-router');

        case 3:
          _yield$import = _context.sent;
          router = _yield$import.default;
          window.router = router; // debugging
          // await router.goTo({ url: "https://cdn.jsdelivr.net/gh/jeff-hykin/tutorializer@master/virkshop/tutorialize.js" })

          _tutorialize.Tutorializer.loadTutorial = _tutorialize.onLoad; // debugging, normally it'll come from a url

          if (router.pageInfo.url) {
            try {// var {onLoad} = await import(router.pageInfo.url)
            } catch (error) {// FIXME: add error message
            }
          }

          bottomRowHeight = "7rem";
          document.body = /*#__PURE__*/React.createElement("body", {
            style: "\n            display: flex; \n            align-items: flex-start; \n            justify-content: flex-start;\n            overflow: hidden;\n            font-family: sans-serif;\n            font-size: 22px;\n            color: gray;\n            flex-direction: column;\n            height: 100%;\n            background: whitesmoke;\n        "
          }, /*#__PURE__*/React.createElement("style", null, "\n            :root {\n                --blue: cornflowerblue;\n            }\n            input {\n                background: transparent;\n                border-radius: 0;\n                border: none;\n                border-bottom: 1px solid gray;\n                color: gray;\n                outline: none;\n                transition: all 0.5s ease-in-out 0s;\n            }\n            .tutorialize-directional-buttons {\n                display: flex; \n                align-items: center; \n                justify-content: center;\n                font-size: 25px; \n                height: 100%;\n                flex-grow: 1;\n                transition: all 0.5s ease-in-out 0s;\n                color: var(--blue);\n                text-decoration: underline;\n                background: white;\n                border: 2px lightgray solid;\n                margin-left: -2px;\n            }\n            .tutorialize-directional-buttons:hover {\n                border: 2px var(--blue) solid;\n                z-index: 1;\n            }\n        "), _tutorialize.Tutorializer.main = /*#__PURE__*/React.createElement("main", {
            style: "\n                display: flex; \n                align-items: center; \n                justify-content: center;\n                transition: all 0.5s ease-in-out 0s;\n                height: 100%;\n                width: 100%;\n                padding: 2rem;\n                flex-direction: column;\n                overflow: auto;\n                max-height: calc(100vh - ".concat(bottomRowHeight, ");\n            ")
          }, "Howdy!"), /*#__PURE__*/React.createElement("div", {
            style: "\n                height: ".concat(bottomRowHeight, ";\n                display: inline-flex; \n                flex-wrap: wrap;\n                align-items: flex-start; \n                justify-content: flext-start;\n                flex-direction: row;\n                width: 100%;\n            ")
          }, /*#__PURE__*/React.createElement("a", {
            class: "tutorialize-directional-buttons",
            onclick: _tutorialize.Tutorializer.backClicked
          }, "Back"), /*#__PURE__*/React.createElement("a", {
            class: "tutorialize-directional-buttons",
            onclick: _tutorialize.Tutorializer.nextClicked
          }, "Next")));
          _context.prev = 10;
          _context.next = 13;
          return _tutorialize.Tutorializer.loadTutorial();

        case 13:
          _context.next = 17;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](10);

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[10, 15]]);
}))();
},{"./tutorials/tutorialize.js":"../tutorials/tutorialize.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62073" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../website.jsx"], null)
//# sourceMappingURL=/website.baea1d43.js.map