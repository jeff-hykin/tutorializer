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
})({"bundle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = exports.Tutorializer = void 0;

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18;

var _excluded = ["middleware"],
    _excluded2 = ["children"],
    _excluded3 = ["children"],
    _excluded4 = ["children"],
    _excluded5 = ["children"],
    _excluded6 = ["children"],
    _excluded7 = ["children"],
    _excluded8 = ["style", "children"],
    _excluded9 = ["style", "children"];

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var e = "\uE000",
    t = "\uE001";

function o(r2) {
  var _arguments = arguments;
  var p2,
      a1,
      l,
      s,
      c = arguments,
      i = this,
      n = 0,
      d = [],
      h = 0,
      u = [],
      f = 0;
  d.root = true;

  var g = function g(e2, o2, r3) {
    o2 === void 0 && (o2 = []);
    var p3 = 0;
    return (e2 = r3 || e2 !== t ? e2.replace(/\ue001/g, function (e3) {
      return u[f++];
    }) : u[f++].slice(1, -1)) ? (e2.replace(/\ue000/g, function (t2, r4) {
      return r4 && o2.push(e2.slice(p3, r4)), p3 = r4 + 1, o2.push(c[++h]);
    }), p3 < e2.length && o2.push(e2.slice(p3)), o2.length > 1 ? o2 : o2[0]) : e2;
  },
      m = function m() {
    var _d, _d2;

    (_d = d, _d2 = _toArray(_d), d = _d2[0], s = _d2[1], p2 = _d2.slice(2), _d), d.push(i.apply(void 0, [s].concat(_toConsumableArray(p2))));
  };

  return r2.join(e).replace(/<!--[^]*-->/g, "").replace(/<!\[CDATA\[[^]*\]\]>/g, "").replace(/('|")[^\1]*?\1/g, function (e2) {
    return u.push(e2), t;
  }).replace(/\s+/g, " ").replace(/(?:^|>)([^<]*)(?:$|<)/g, function (e2, t2, r3, p3) {
    var c2, i2;
    if (r3 && p3.slice(n, r3).replace(/(\S)\/$/, "$1 /").split(" ").map(function (e3, t3) {
      if (e3[0] === "/") c2 = i2 || e3.slice(1) || 1;else if (t3) {
        if (e3) {
          var _e3$split, _e3$split2;

          var r4 = d[2] || (d[2] = {});
          e3.slice(0, 3) === "..." ? Object.assign(r4, _arguments[++h]) : ((_e3$split = e3.split("="), _e3$split2 = _slicedToArray(_e3$split, 2), a1 = _e3$split2[0], l = _e3$split2[1], _e3$split), r4[g(a1)] = !l || g(l));
        }
      } else {
        for (i2 = g(e3); o.close[d[1] + i2];) {
          m();
        }

        d = [d, i2, null], o.empty[i2] && (c2 = i2);
      }
    }), c2) for (m(); s !== c2 && o.close[s];) {
      m();
    }
    n = r3 + e2.length, t2 && t2 !== " " && g((s = 0, t2), d, true);
  }), d.root || m(), d.length > 1 ? d : d[0];
}

o.empty = {}, o.close = {}, "area base br col command embed hr img input keygen link meta param source track wbr ! !doctype ? ?xml".split(" ").map(function (e2) {
  return o.empty[e2] = o.empty[e2.toUpperCase()] = true;
});

var r = {
  li: "",
  dt: "dd",
  dd: "dt",
  p: "address article aside blockquote details div dl fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol pre section table",
  rt: "rp",
  rp: "rt",
  optgroup: "",
  option: "optgroup",
  caption: "tbody thead tfoot tr colgroup",
  colgroup: "thead tbody tfoot tr caption",
  thead: "tbody tfoot caption",
  tbody: "tfoot caption",
  tfoot: "caption",
  tr: "tbody tfoot",
  td: "th tr",
  th: "td tr tbody"
},
    p = function p(e2) {
  [].concat(_toConsumableArray(r[e2].split(" ")), [e2]).map(function (t2) {
    o.close[e2] = o.close[e2.toUpperCase()] = o.close[e2 + t2] = o.close[e2.toUpperCase() + t2] = o.close[e2 + t2.toUpperCase()] = o.close[e2.toUpperCase() + t2.toUpperCase()] = true;
  });
};

for (var a in r) {
  p(a);
}

var xhtm = o;
var ElementalSymbol = Symbol.for("Elemental");

var ElementalClass = /*#__PURE__*/function () {
  function ElementalClass() {
    var _this = this;

    var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ElementalClass);

    var middleware = options.middleware,
        errorComponentFactory = options.errorComponentFactory;
    this.components = components || {};
    this.middleware = middleware || {};
    this.errorComponentFactory = errorComponentFactory || defaultErrorComponentFactory;
    this.html = xhtm.bind(function () {
      return _this.createElement.apply(_this, arguments);
    });
    this.html[ElementalSymbol] = this;
    this.css = Elemental.css;
  }

  _createClass(ElementalClass, [{
    key: "createElement",
    value: function createElement() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      Elemental.debug && console.debug("args is:", args);

      var _iterator = _createForOfIteratorHelper((this.middleware[Elemental.allTags] || []).concat(this.middleware[args[0]] || [])),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var middleware = _step.value;

          try {
            args = eachMiddleWare(args);
          } catch (error) {
            console.error("[ElementalClass] one of the middleware functions failed:", eachMiddleWare, args);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _args = args,
          _args2 = _toArray(_args),
          key = _args2[0],
          properties = _args2[1],
          children = _args2.slice(2);

      Elemental.debug && console.debug("key, properties, children is:", key, properties, children);

      if (this.components[key] instanceof Function) {
        key = this.components[key];
      }

      if (key instanceof Function) {
        var output;

        try {
          output = isConstructor(key) ? new key(_objectSpread(_objectSpread({}, properties), {}, {
            children: children
          })) : key(_objectSpread(_objectSpread({}, properties), {}, {
            children: children
          }));
        } catch (error) {
          return this.errorComponentFactory(_objectSpread(_objectSpread({}, properties), {}, {
            children: children
          }), key, error);
        }

        if (output instanceof Promise) {
          var elementPromise = output;
          var placeholder = elementPromise.placeholder || document.createElement("div");
          setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.t0 = placeholder;
                    _context.next = 3;
                    return elementPromise;

                  case 3:
                    _context.t1 = _context.sent;
                    return _context.abrupt("return", _context.t0.replaceWith.call(_context.t0, _context.t1));

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          })), 0);
          return placeholder;
        } else {
          return output;
        }
      }

      var isSvg = Elemental.exclusivelySvgElements.has(key);
      var element = isSvg ? document.createElementNS("http://www.w3.org/2000/svg", key) : document.createElement(key);

      if (properties instanceof Object) {
        for (var _i2 = 0, _Object$entries = Object.entries(properties); _i2 < _Object$entries.length; _i2++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
              key2 = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          try {
            if (isSvg) {
              var kebabCase = key2.replace(/(?<=[a-z])([A-Z])(?=[a-z])/g, function (each2) {
                return "-".concat(each2.toLowerCase());
              });
              element.setAttribute(kebabCase, value);
            } else {
              element.setAttribute(key2.toLowerCase(), value);
            }
          } catch (error) {}

          try {
            element[key2] = value;
          } catch (error1) {}
        }
      }

      return appendChildren.apply(void 0, [element].concat(_toConsumableArray(children)));
    }
  }, {
    key: "extend",
    value: function extend() {
      var additionalComponents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var middleware = options.middleware,
          other = _objectWithoutProperties(options, _excluded);

      return Elemental(_objectSpread(_objectSpread({}, this.components), additionalComponents), _objectSpread({
        middleware: _objectSpread(_objectSpread({}, this.middleware), middleware)
      }, other));
    }
  }]);

  return ElementalClass;
}();

var proxySymbol = Symbol.for("Proxy");

var Elemental = function Elemental() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  var originalThing = _construct(ElementalClass, args).html;

  var proxyObject = new Proxy(originalThing, {
    ownKeys: function ownKeys(original) {
      return Reflect.ownKeys(original[ElementalSymbol]);
    },
    get: function get(original, key) {
      if (key == proxySymbol) {
        return true;
      }

      var originalValue = original[ElementalSymbol][key];

      if (originalValue) {
        return originalValue;
      }

      return Reflect.get.apply(Reflect, [original, key].concat(args));
    }
  });
  return proxyObject;
};

Elemental.allTags = Symbol.for("allTags");
Elemental.exclusivelySvgElements = new Set(["svg", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "switch", "symbol", "text", "textPath", "tspan", "unknown", "use", "view"]);

Elemental.css = function () {
  var element = document.createElement("div");

  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  if (args.length == 1) {
    if (args instanceof Object) {
      Object.assign(element.style, args);
    }
  } else if (args.length > 1) {
    var strings = args[0],
        values = args.slice(1);
    var finalString = "";

    var _iterator2 = _createForOfIteratorHelper(strings),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var each2 = _step2.value;
        finalString += each2;

        if (values.length > 0) {
          finalString += "".concat(values.shift());
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    element.style = finalString;
  }

  return element.style;
};

function appendChildren(element) {
  for (var _len4 = arguments.length, children = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    children[_key4 - 1] = arguments[_key4];
  }

  for (var _i3 = 0, _children = children; _i3 < _children.length; _i3++) {
    var each2 = _children[_i3];

    if (typeof each2 == "string") {
      element.appendChild(new window.Text(each2));
    } else if (each2 == null) {
      element.appendChild(new window.Text(""));
    } else if (!(each2 instanceof Object)) {
      element.appendChild(new window.Text("".concat(each2)));
    } else if (each2 instanceof Node) {
      element.appendChild(each2);
    } else if (each2 instanceof Array) {
      appendChildren.apply(void 0, [element].concat(_toConsumableArray(each2)));
    } else if (each2 instanceof Function) {
      appendChildren(element, each2());
    } else if (each2 instanceof Promise) {
      (function () {
        var elementPromise = each2;
        var placeholder = elementPromise.placeholder || document.createElement("div");
        setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.t0 = placeholder;
                  _context2.next = 3;
                  return elementPromise;

                case 3:
                  _context2.t1 = _context2.sent;
                  return _context2.abrupt("return", _context2.t0.replaceWith.call(_context2.t0, _context2.t1));

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        })), 0);
        element.appendChild(placeholder);
      })();
    } else if (each2 != null && each2 instanceof Object) {
      element.appendChild(each2);
    }
  }

  return element;
}

function defaultErrorComponentFactory(_ref3, key, error) {
  var children = _ref3.children,
      properties = _objectWithoutProperties(_ref3, _excluded2);

  var element = document.createElement("div");
  var errorDetails = document.createElement("code");
  var childContainer = document.createElement("div");
  element.style.all = "unset";
  element.style.display = "flex";
  element.style.flexDirection = "column";
  element.style.padding = "1.5rem";
  element.style.backgroundColor = "#f5a5a8";
  element.style.color = "white";
  element.style.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';
  element.style.fontSize = "18px";
  element.style.fontWeight = "400";
  element.style.overflow = "auto";
  element.innerHTML = "I'm sorry, there was an error when loading this part of the page \uD83D\uDE41 ";
  var errorElementPart;

  if (typeof key == "string") {
    errorElementPart = "<".concat(key, " />");
  } else {
    try {
      errorElementPart = "<".concat(key.prototype.constructor.name, " />");
    } catch (error2) {
      errorElementPart = "<".concat(key, " />");
    }
  }

  var errorJsonObject = {};

  for (var _i4 = 0, _Object$entries2 = Object.entries(properties); _i4 < _Object$entries2.length; _i4++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i4], 2),
        key2 = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];

    try {
      errorJsonObject[key2] = JSON.parse(JSON.stringify(value));
    } catch (error2) {
      errorJsonObject[key2] = "".concat(value);
    }
  }

  errorDetails.innerHTML = "tag: ".concat(errorElementPart, "\nproperties: ").concat(JSON.stringify(errorJsonObject), "\nerror: ").concat(error);
  errorDetails.style.padding = "1rem";
  errorDetails.style.backgroundColor = "#161b22";
  errorDetails.style.color = "#789896";
  element.appendChild(errorDetails);
  childContainer.style.all = "unset";
  childContainer.style.display = "flex";
  childContainer.style.flexDirection = "column";
  childContainer.style.marginTop = "1.3rem";

  if (children instanceof Array) {
    for (var _i5 = 0, _Object$entries3 = Object.entries(children); _i5 < _Object$entries3.length; _i5++) {
      var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i5], 2),
          _key5 = _Object$entries3$_i[0],
          _value = _Object$entries3$_i[1];

      if (typeof each == "string") {
        childContainer.appendChild(new window.Text(_value));
      } else if (_value instanceof Node) {
        childContainer.appendChild(_value);
      }
    }
  }

  element.appendChild(childContainer);
  return element;
}

function isConstructor(obj) {
  return !!obj.prototype && !!obj.prototype.constructor.name;
}

try {
  var originalHead = document.head;
  Object.defineProperty(document, "head", {
    set: function set(element) {
      return appendChildren.apply(void 0, [originalHead].concat(_toConsumableArray(element.childNodes)));
    },
    get: function get() {
      return originalHead;
    },
    writable: true
  });
} catch (error) {}

var html = Elemental();
exports.html = html;
Elemental.css;
Elemental.allTags;
[Uint16Array, Uint32Array, Uint8Array, Uint8ClampedArray, Int16Array, Int32Array, Int8Array, Float32Array, Float64Array, globalThis.BigInt64Array, globalThis.BigUint64Array].filter(function (each) {
  return each;
});

var allKeys = function allKeys(obj) {
  var keys = [];

  if (obj == null) {
    return [];
  }

  if (!(obj instanceof Object)) {
    obj = Object.getPrototypeOf(obj);
  }

  while (obj) {
    keys = keys.concat(Reflect.ownKeys(obj));
    obj = Object.getPrototypeOf(obj);
  }

  return keys;
};

var allKeyDescriptions = function allKeyDescriptions(obj) {
  var keys = [];

  if (obj == null) {
    return [];
  }

  if (!(obj instanceof Object)) {
    obj = Object.getPrototypeOf(obj);
  }

  var prevObj = obj;

  while (obj && obj != prevObj) {
    keys = keys.concat(allKeyDescriptions(obj));
    obj = Object.getPrototypeOf(obj);
  }

  return keys;
};

Object.getPrototypeOf(new Map().keys());
Object.getPrototypeOf(new Set().keys());

var GeneratorFunction = /*#__PURE__*/_createClass(function GeneratorFunction() {
  _classCallCheck(this, GeneratorFunction);
});

var AsyncGeneratorFunction = /*#__PURE__*/_createClass(function AsyncGeneratorFunction() {
  _classCallCheck(this, AsyncGeneratorFunction);
});

try {
  GeneratorFunction = eval("((function*(){})()).constructor");
  AsyncGeneratorFunction = eval("((async function*(){})()).constructor");
} catch (error1) {}

Symbol.for("deepCopy");
Symbol();
var getThis = Symbol();

Object.getPrototypeOf(function () {})[getThis] = function () {
  return this;
};

var allKeys1 = allKeys;

var get = function get(_ref4) {
  var from = _ref4.from,
      keyList = _ref4.keyList,
      failValue = _ref4.failValue;

  try {
    var _iterator3 = _createForOfIteratorHelper(keyList),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var each = _step3.value;

        if (from instanceof Object && each in from) {
          from = from[each];
        } else {
          return failValue;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  } catch (error) {
    return failValue;
  }

  return from;
};

var remove = function remove(_ref5) {
  var keyList = _ref5.keyList,
      from = _ref5.from;

  if (keyList.length == 1) {
    try {
      delete from[keyList[0]];
    } catch (error) {
      return false;
    }
  } else if (keyList.length > 1) {
    keyList = _toConsumableArray(keyList);
    var last = keyList.pop();
    var parentObj = get({
      keyList: keyList,
      from: from
    });
    return remove({
      keyList: [last],
      from: parentObj
    });
  }
};

var merge = function merge(_ref6) {
  var oldData = _ref6.oldData,
      newData = _ref6.newData;

  if (!(newData instanceof Object) || !(oldData instanceof Object)) {
    return newData;
  }

  var output = {};

  if (newData instanceof Array) {
    output = [];
  }

  Object.assign(output, oldData);

  for (var key in newData) {
    if (!(key in output)) {
      output[key] = newData[key];
    } else {
      output[key] = merge(oldData[key], newData[key]);
    }
  }

  return output;
};

var recursivelyAllKeysOf = function recursivelyAllKeysOf(obj) {
  if (!(obj instanceof Object)) {
    return [];
  }

  var output = [];

  for (var _i6 = 0, _Object$keys = Object.keys(obj); _i6 < _Object$keys.length; _i6++) {
    var eachKey = _Object$keys[_i6];
    output.push([eachKey]);
    var newAttributes = recursivelyAllKeysOf(obj[eachKey]);

    var _iterator4 = _createForOfIteratorHelper(newAttributes),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var eachNewAttributeList = _step4.value;
        eachNewAttributeList.unshift(eachKey);
        output.push(eachNewAttributeList);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }

  return output;
};

Array.isArray || function (obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) keys.push(key);
  }

  return keys;
};

var indent = function indent(_ref7) {
  var string = _ref7.string,
      _ref7$by = _ref7.by,
      by = _ref7$by === void 0 ? "    " : _ref7$by,
      _ref7$noLead = _ref7.noLead,
      noLead = _ref7$noLead === void 0 ? false : _ref7$noLead;
  return (noLead ? "" : by) + string.replace(/\n/g, "\n" + by);
};

var toRepresentation = function toRepresentation(item) {
  if (typeof item == 'string') {
    return "\"".concat(item.replace(/"|\n|\t|\r|\\/g, function (__char) {
      switch (__char) {
        case '"':
          return '\\"';

        case '\n':
          return '\\n';

        case '\t':
          return '\\t';

        case '\r':
          return '\\r';

        case '\\':
          return '\\\\';
      }
    }), "\"");
  }

  if (item instanceof Array) {
    return "[".concat(item.map(function (each) {
      return toRepresentation(each);
    }).join(","), "]");
  }

  if (item instanceof Set) {
    return "{".concat(_toConsumableArray(item).map(function (each) {
      return toRepresentation(each);
    }).join(","), "}");
  }

  if (item instanceof Object && item.constructor == Object) {
    var string = "{";

    for (var _i7 = 0, _Object$entries4 = Object.entries(item); _i7 < _Object$entries4.length; _i7++) {
      var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i7], 2),
          key = _Object$entries4$_i[0],
          value = _Object$entries4$_i[1];

      var stringKey = toRepresentation(key);
      var stringValue = toRepresentation(value);
      string += "\n  ".concat(stringKey, ": ").concat(indent({
        string: stringValue,
        by: "  ",
        noLead: true
      }), ",");
    }

    string += "\n}";
    return string;
  }

  if (item instanceof Map) {
    var _string = "Map {";

    var _iterator5 = _createForOfIteratorHelper(item.entries()),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _step5$value = _slicedToArray(_step5.value, 2),
            _key6 = _step5$value[0],
            _value2 = _step5$value[1];

        var _stringKey = toRepresentation(_key6);

        var _stringValue = toRepresentation(_value2);

        if (!_stringKey.match(/\n/g)) {
          _string += "\n  ".concat(_stringKey, " => ").concat(indent({
            string: _stringValue,
            by: "  ",
            noLead: true
          }), ",");
        } else {
          _string += "\n  ".concat(indent({
            string: _stringKey,
            by: "  ",
            noLead: true
          }), "\n    => ").concat(indent({
            string: _stringValue,
            by: "    ",
            noLead: true
          }), ",");
        }
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    _string += "\n}";
    return _string;
  }

  return item ? item.toString() : "".concat(item);
};

var Event = /*#__PURE__*/function (_Set) {
  _inherits(Event, _Set);

  var _super = _createSuper(Event);

  function Event() {
    _classCallCheck(this, Event);

    return _super.apply(this, arguments);
  }

  return _createClass(Event);
}( /*#__PURE__*/_wrapNativeSuper(Set));

var trigger = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(event) {
    var _len5,
        args,
        _key7,
        _args5 = arguments;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            for (_len5 = _args5.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key7 = 1; _key7 < _len5; _key7++) {
              args[_key7 - 1] = _args5[_key7];
            }

            return _context3.abrupt("return", Promise.all(_toConsumableArray(event).map(function (each) {
              return each.apply(void 0, args);
            })));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function trigger(_x) {
    return _ref8.apply(this, arguments);
  };
}();

var once = function once(event) {
  var selfRemovingRanFirst = false;
  var output;
  var resolve;

  var selfRemoving = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var _len6,
          args,
          _key8,
          _args6 = arguments;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              event.delete(selfRemoving);

              for (_len6 = _args6.length, args = new Array(_len6), _key8 = 0; _key8 < _len6; _key8++) {
                args[_key8] = _args6[_key8];
              }

              output = args;
              selfRemovingRanFirst = true;

              if (resolve) {
                resolve(output);
              }

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function selfRemoving() {
      return _ref9.apply(this, arguments);
    };
  }();

  event.add(selfRemoving);
  return new Promise(function (res) {
    resolve = res;

    if (selfRemovingRanFirst) {
      resolve(output);
    }
  });
};

var br = function br() {
  return html(_templateObject || (_templateObject = _taggedTemplateLiteral(["<br style=\"height: 1rem;\" />"])));
};

var title = function title(_ref10) {
  var children = _ref10.children,
      props = _objectWithoutProperties(_ref10, _excluded3);

  return html(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<h1 class=\"tutorialize-title\" ...", ">\n    ", "\n</h1>"])), props, children);
};

var text = function text(_ref11) {
  var children = _ref11.children,
      props = _objectWithoutProperties(_ref11, _excluded4);

  return html(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["<span class=\"tutorialize-text\" ...", ">\n    ", "\n</span>"])), props, children);
};

var errorText = function errorText(_ref12) {
  var children = _ref12.children,
      props = _objectWithoutProperties(_ref12, _excluded5);

  return html(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["<span class=\"tutorialize-text tutorialize-error-text\" ...", ">\n    ", "\n</span>"])), props, children);
};

var hint = function hint(_ref13) {
  var children = _ref13.children,
      props = _objectWithoutProperties(_ref13, _excluded6);

  return html(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["<span class=\"tutorialize-hint\" ...", ">\n    ", "\n</span>"])), props, children);
};

var button = function button(_ref14) {
  var children = _ref14.children,
      props = _objectWithoutProperties(_ref14, _excluded7);

  return html(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["<button class=\"tutorialize-button\" ...", ">\n    ", "\n</button>"])), props, children);
};

var container = function container(_ref15) {
  var style = _ref15.style,
      children = _ref15.children,
      props = _objectWithoutProperties(_ref15, _excluded8);

  return html(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["<div\n    style=", "\n    ...", "\n    >\n        ", "\n</div>"])), _objectSpread({
    display: "flex",
    flexDirection: "column"
  }, style), props, children);
};

var input = function input(_ref16) {
  var style = _ref16.style,
      children = _ref16.children,
      props = _objectWithoutProperties(_ref16, _excluded9);

  return html(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["<input class=\"tutorialize-input\" ...", " />"])), props);
};

var newHtml = html.extend({
  text: text,
  button: button,
  br: br,
  title: title,
  container: container,
  input: input,
  errorText: errorText,
  hint: hint
});

var autoFocus = function autoFocus(element) {
  window.focused = element;
  element.setAttribute("tabindex", "-1");
  setTimeout(function () {
    return element.focus();
  }, 0);
  setTimeout(function () {
    return element.focus();
  }, 100);
  setTimeout(function () {
    return element.focus();
  }, 200);
};

var showText = function showText(_ref17) {
  var title1 = _ref17.title,
      body = _ref17.body;
  return function (_ref18) {
    var value = _ref18.value,
        Tutorializer1 = _ref18.Tutorializer;
    return {
      loadSlide: function loadSlide() {
        Tutorializer1.content = newHtml(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["<container>\n            <title>\n                ", "\n            </title>\n            <text>\n                ", "\n            </text>\n        </container>"])), title1, body);
      },
      valueIsValid: function valueIsValid(value) {
        return true;
      }
    };
  };
};

var askYesNo = function askYesNo(_ref19) {
  var question = _ref19.question;
  return function (_ref20) {
    var value1 = _ref20.value,
        Tutorializer2 = _ref20.Tutorializer;
    return {
      loadSlide: function loadSlide() {
        Tutorializer2.content = newHtml(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["<container>\n            ", "\n            \n            <container style=", ">\n                <button onclick=", " style=", ">\n                    yes\n                </button>\n                <button onclick=", " style=", ">\n                    no\n                </button>\n            </container>\n            <hint>\n                (you can type \"y\" or \"n\" to answer faster)\n            </hint>\n        </container>"])), question, {
          gap: "1rem"
        }, function () {
          return value1.set(true), Tutorializer2.goNext();
        }, "--button-accent: var(--button-yes-color)", function () {
          return value1.set(true), Tutorializer2.goNext();
        }, "--button-accent: var(--button-no-color)");
        autoFocus(Tutorializer2.content);
        Tutorializer2.listenOnce("keydown", function (eventObject) {
          var key = eventObject.key;

          if (key == "y" || key === "Y") {
            event.stopPropagation();
            value1.set(true);
            Tutorializer2.goNext();
            return true;
          }

          if (key == "n" || key === "N") {
            event.stopPropagation();
            value1.set(false);
            Tutorializer2.goNext();
            return true;
          }
        });
      },
      valueIsValid: function valueIsValid(value) {
        return value === true || value === false;
      }
    };
  };
};

var askLine = function askLine(_ref21) {
  var question = _ref21.question,
      createErrorMessage = _ref21.createErrorMessage;
  return function (_ref22) {
    var value2 = _ref22.value,
        Tutorializer3 = _ref22.Tutorializer;
    return {
      loadSlide: function loadSlide() {
        this.errorMessageElement = newHtml(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["<errorText style=", "/>"])), {
          textAlign: "center"
        });
        var input1 = newHtml(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n            <input\n                onkeyup=", "\n                />\n        "])), function (_ref23) {
          var key = _ref23.key,
              target = _ref23.target;
          value2.set(target.value);

          if (key == "Enter") {
            Tutorializer3.goNext();
          }
        });
        autoFocus(input1);
        Tutorializer3.content = newHtml(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["<container>\n            <text>\n                ", "\n            </text>\n            ", "\n            <container style=", ">\n                ", "\n            </container>\n        </container>"])), question, input1, {
          height: "3rem",
          overflow: "visible"
        }, this.errorMessageElement);
      },
      valueIsValid: function valueIsValid(value) {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
          var errorMessage;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return createErrorMessage(value || "");

                case 2:
                  errorMessage = _context5.sent;

                  if (errorMessage) {
                    _context5.next = 7;
                    break;
                  }

                  return _context5.abrupt("return", true);

                case 7:
                  _this2.errorMessageElement.innerHTML = errorMessage;
                  return _context5.abrupt("return", false);

                case 9:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }))();
      }
    };
  };
};

var Tutorial1 = /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref24) {
    var Tutorializer, slide, githubUsername, confirmed, slide1WasRead, slide2WasRead;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            Tutorializer = _ref24.Tutorializer, slide = _ref24.slide;
            _context6.next = 3;
            return slide("githubUsername", askLine({
              question: "Whats the github username for the repository?",
              createErrorMessage: function createErrorMessage(value) {
                if (value.match(/ /)) {
                  return "Sorry, github usernames can't have spaces";
                }
              }
            }));

          case 3:
            githubUsername = _context6.sent;
            console.debug("githubUsername is:", githubUsername);
            _context6.next = 7;
            return slide("confirmedGithub", askYesNo({
              question: newHtml(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n                <span>So is this the url to your profile?</span>\n                <br>\n                <a href=", ">\n                    https://github.com/", "\n                </a>\n                <br>\n                <br>\n            "])), "https://github.com/".concat(githubUsername), githubUsername)
            }));

          case 7:
            confirmed = _context6.sent;
            console.debug("confirmed is:", confirmed);
            _context6.next = 11;
            return slide("didReadSummary1", showText({
              title: "Confirmation Check",
              body: newHtml(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n                <span>So is this the url to your profile?</span>\n                <a href=", ">\n                    https://github.com/", "\n                </a>\n            "])), "https://github.com/".concat(githubUsername), githubUsername)
            }));

          case 11:
            slide1WasRead = _context6.sent;
            console.debug("slide1WasRead is:", slide1WasRead);
            _context6.next = 15;
            return slide("didReadSummary2", showText({
              title: "What This Does",
              body: "Testing testing"
            }));

          case 15:
            slide2WasRead = _context6.sent;
            console.debug("slide2WasRead is:", slide2WasRead);

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function Tutorial1(_x2) {
    return _ref25.apply(this, arguments);
  };
}();

var theme1 = {
  name: "DefaultTheme",
  settings: {
    slideFadeInMiliseconds: 600
  },
  styles: "\n        :root {\n            --white     : 255, 255, 255;\n            --off-white : 238, 238, 238;\n            --gray      : 84 , 110, 122;\n            --light-gray: 199, 203, 205;\n            --black     : 36 , 41 ,  56;\n            --red       : 240, 113, 120;\n            --blue      : 130, 170, 255;\n            --green     : 128, 203, 171;\n            --yellow    : 254, 195,  85;\n            --orange    : 247, 140, 108;\n            --pink      : 229, 126, 179;\n            --purple    : 199, 146, 234;\n            --cyan      : 137, 221, 255;\n            \n            --background: var(--off-white);\n            --text-default-color: var(--gray);\n            --button-accent: var(--blue);\n            --button-background: rgb(var(--white));\n            --title-size: 32px;\n            --text-size: 22px;\n            --bottom-row-height: 7rem;\n            \n            --error-text-color: var(--red);\n            --button-yes-color: var(--green);\n            --button-no-color: var(--red);\n        }\n\n        .tutorialize-root {\n            display: flex; \n            flex-direction: column;\n            align-items: flex-start; \n            justify-content: flex-start;\n            overflow: hidden;\n            font-family: sans-serif;\n            height: 100%;\n            width: 100%;\n            font-size: var(--text-size);\n            color: rgb(var(--text-default-color));\n            background: rgb(var(--background));\n        }\n\n        .tutorialize-title {\n            font-size: var(--title-size);\n            padding: 1rem;\n            text-decoration: underline;\n        }\n\n        .tutorialize-text {\n            padding: 2rem;\n        }\n        \n        .tutorialize-button {\n            padding: 1rem;\n            --border-size: 2px;\n            transition: all 0.5s ease-in-out 0s;\n        }\n        .tutorialize-button:not(:hover) {\n            background: var(--button-background);\n            color: rgb(var(--button-accent));\n            border: rgb(var(--button-accent)) solid var(--border-size);\n        }\n        .tutorialize-button:hover {\n            background: rgba(var(--button-accent), 0.6);\n            color: var(--button-background);\n            border: var(--button-background) solid var(--border-size);\n        }\n\n        .tutorialize-error-text {\n            color: rgb(var(--error-text-color));\n        }\n        \n        .tutorialize-hint {\n            font-size: 0.7em;\n            opacity: 0.7;\n            text-align: center;\n            padding: 2rem;\n        }\n\n        .tutorialize-input {\n            color: rgb(var(--text-default-color));\n            background: transparent;\n            border-radius: 0;\n            border: none;\n            border-bottom: 1px solid gray;\n            transition: all 0.5s ease-in-out 0s;\n            outline: none;\n        }\n        \n        .tutorialize-arrow-buttons {\n            display: flex; \n            align-items: center; \n            justify-content: center;\n            font-size: 25px; \n            height: 100%;\n            flex-grow: 1;\n            transition: all 0.5s ease-in-out 0s;\n            color: rgb(var(--button-accent));\n            text-decoration: underline;\n            background: rgb(var(--white)));\n            --border-size: 2px;\n            margin-left: -var(--border-size);\n        }\n        .tutorialize-arrow-buttons:not(:hover) {\n            border: var(--border-size) var(--light-gray) solid;\n        }\n        .tutorialize-arrow-buttons:hover {\n            border: var(--border-size) rgb(var(--button-accent)) solid;\n            z-index: 1;\n        }\n\n        .tutorialize-main {\n            display: flex; \n            align-items: center; \n            justify-content: center;\n            transition: all 0.5s ease-in-out 0s;\n            height: 100%;\n            width: 100%;\n            padding: 2rem;\n            flex-direction: column;\n            overflow: auto;\n            max-height: calc(100vh - var(--bottom-row-height));\n        }\n\n        .tutorialize-container-of-arrow-buttons {\n            height: var(--bottom-row-height);\n            display: inline-flex; \n            flex-wrap: wrap;\n            align-items: flex-start; \n            justify-content: flext-start;\n            flex-direction: row;\n            width: 100%;\n        }\n    "
};
globalThis.allKeys = allKeys1;
var tutorializerSymbol = Symbol.for("tutorializer");

var GoingBackDontMindMeException = /*#__PURE__*/function (_Error) {
  _inherits(GoingBackDontMindMeException, _Error);

  var _super2 = _createSuper(GoingBackDontMindMeException);

  function GoingBackDontMindMeException() {
    _classCallCheck(this, GoingBackDontMindMeException);

    return _super2.apply(this, arguments);
  }

  return _createClass(GoingBackDontMindMeException);
}( /*#__PURE__*/_wrapNativeSuper(Error));

var TutorializerClass = /*#__PURE__*/function () {
  function TutorializerClass() {
    _classCallCheck(this, TutorializerClass);

    this.pendingData = {};
    this.progressData = [];
    this.tutorial = Tutorial1;
    this.main = html(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["\n            <div class=\"tutorialize-main\" >\n                Howdy!\n            </div>\n        "])));
    this.element = null;
    this.events = {
      attemptGoingToNext: new Event(),
      goingBack: new Event()
    };
    this._style = document.createElement("style");
    this._theme = theme1;
  }

  _createClass(TutorializerClass, [{
    key: "data",
    get: function get() {
      return Object.fromEntries([].concat(_toConsumableArray(this.progressData), [Object.entries(this.pendingData)]).flat(1));
    }
  }, {
    key: "has",
    value: function has(id) {
      console.log("start:has()");
      return id in this.data;
    }
  }, {
    key: "add",
    value: function add(id, value) {
      this.pendingData[id] = value;
    }
  }, {
    key: "content",
    get: function get() {
      return this.main;
    },
    set: function set(element) {
      var _this3 = this;

      console.log("start:set content");
      console.debug("this.data is:", this.data);
      this.main.style.opacity = 0;
      setTimeout(function () {
        _this3.main.children = [element];
        _this3.main.style.opacity = 1;
      }, this.theme.settings.slideFadeInMiliseconds);
    }
  }, {
    key: "theme",
    get: function get() {
      return this._theme;
    },
    set: function set(newTheme) {
      if (!(newTheme instanceof Object) || typeof newTheme.name !== 'string' || typeof newTheme.styles !== 'string') {
        throw Error("I was creating a theme, I expected an object like {name:\"blah\", styles: \".thing { color: red: }\" }\nHowever, instead I got this: ".concat(toRepresentation(newTheme)));
      }

      var name = newTheme.name,
          styles = newTheme.styles,
          settings = newTheme.settings;
      this._theme = newTheme;
      this._style.innerHTML = styles;

      if (settings instanceof Object) {
        this._theme.settings = merge({
          oldData: theme1.settings,
          newData: settings
        });
      }
    }
  }, {
    key: "slide",
    value: function () {
      var _slide = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(id, func) {
        var _this4 = this;

        var realValue, value1, slide;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                console.log("start:slide");

                if (!this.has(id)) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return", this.data[id]);

              case 3:
                realValue = undefined;
                value1 = {
                  get: function get() {
                    return realValue;
                  },
                  set: function set(value) {
                    realValue = value;

                    _this4.add(id, realValue);
                  }
                };
                _context7.next = 7;
                return func({
                  value: value1,
                  Tutorializer: this
                });

              case 7:
                slide = _context7.sent;
                _context7.next = 10;
                return slide.loadSlide();

              case 10:
                if (!true) {
                  _context7.next = 19;
                  break;
                }

                _context7.next = 13;
                return once(this.events.attemptGoingToNext);

              case 13:
                _context7.next = 15;
                return slide.valueIsValid(realValue);

              case 15:
                if (!_context7.sent) {
                  _context7.next = 17;
                  break;
                }

                return _context7.abrupt("break", 19);

              case 17:
                _context7.next = 10;
                break;

              case 19:
                this.add(id, realValue);
                this.savePendingData();
                return _context7.abrupt("return", realValue);

              case 22:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function slide(_x3, _x4) {
        return _slide.apply(this, arguments);
      }

      return slide;
    }()
  }, {
    key: "listenOnce",
    value: function listenOnce(eventType, listener) {
      var _this5 = this;

      var realListener = /*#__PURE__*/function () {
        var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(eventObject) {
          return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
              switch (_context8.prev = _context8.next) {
                case 0:
                  _context8.next = 2;
                  return listener(eventObject);

                case 2:
                  if (!_context8.sent) {
                    _context8.next = 4;
                    break;
                  }

                  _this5.content.removeEventListener(eventType, realListener);

                case 4:
                case "end":
                  return _context8.stop();
              }
            }
          }, _callee8);
        }));

        return function realListener(_x5) {
          return _ref26.apply(this, arguments);
        };
      }();

      once(this.events.goingBack).then(function () {
        _this5.content.removeEventListener(eventType, realListener);
      });
      this.content.addEventListener(eventType, realListener);
    }
  }, {
    key: "intializeWholeWebpage",
    value: function () {
      var _intializeWholeWebpage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _yield$import, router, givenUrl;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                console.log("start:intializeWholeWebpage()");
                document.head.innerHTML += "<link rel=\"stylesheet\" href=\"https://unpkg.com/css-baseline/css/3.css\">";
                document.head.appendChild(this._style);
                _context9.next = 5;
                return import("https://cdn.skypack.dev/quik-router");

              case 5:
                _yield$import = _context9.sent;
                router = _yield$import.default;
                givenUrl = router.pageInfo.url;

                if (!givenUrl) {
                  _context9.next = 11;
                  break;
                }

                _context9.next = 11;
                return this.getDataFromUrl(givenUrl);

              case 11:
                this.theme = this._theme;
                this.runTutorial();
                document.body = html(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["<body\n            style=", ">\n                ", "\n        </body>"])), {
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  overflow: "hidden",
                  fontFamily: "sans-serif",
                  flexDirection: "column",
                  height: "100%"
                }, this.createElement());

              case 14:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function intializeWholeWebpage() {
        return _intializeWholeWebpage.apply(this, arguments);
      }

      return intializeWholeWebpage;
    }()
  }, {
    key: "getDataFromUrl",
    value: function () {
      var _getDataFromUrl = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(url) {
        var _yield$import2, Tutorial, theme;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return import(url);

              case 3:
                _yield$import2 = _context10.sent;
                Tutorial = _yield$import2.Tutorial;
                theme = _yield$import2.theme;
                _context10.next = 10;
                break;

              case 8:
                _context10.prev = 8;
                _context10.t0 = _context10["catch"](0);

              case 10:
                if (theme) {
                  this._theme = theme;
                }

                if (Tutorial instanceof Function) {
                  this.tutorial = Tutorial;
                } else {
                  console.error("The Tutorial wasnt a function: ".concat(Tutorial));
                }

              case 12:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 8]]);
      }));

      function getDataFromUrl(_x6) {
        return _getDataFromUrl.apply(this, arguments);
      }

      return getDataFromUrl;
    }()
  }, {
    key: "runTutorial",
    value: function () {
      var _runTutorial = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                console.log("start:runTutorial()");
                _context11.prev = 1;
                console.log("start:tutorial()");
                _context11.next = 5;
                return this.tutorial({
                  Tutorializer: this,
                  slide: this.slide.bind(this)
                });

              case 5:
                return _context11.abrupt("return", this.data);

              case 8:
                _context11.prev = 8;
                _context11.t0 = _context11["catch"](1);

                if (_context11.t0 instanceof GoingBackDontMindMeException) {
                  _context11.next = 12;
                  break;
                }

                throw _context11.t0;

              case 12:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[1, 8]]);
      }));

      function runTutorial() {
        return _runTutorial.apply(this, arguments);
      }

      return runTutorial;
    }()
  }, {
    key: "createElement",
    value: function createElement() {
      var _this6 = this;

      console.log("start:createElement()");
      return this.element = html(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["<div class=\"tutorialize-root\">\n            ", "\n            <div class=\"tutorialize-container-of-arrow-buttons\">\n                <a class=\"tutorialize-arrow-buttons\" onclick=", ">\n                    Back\n                </a>\n                <a class=\"tutorialize-arrow-buttons\" onclick=", ">\n                    Next\n                </a>\n            </div>\n        </div>"])), this.main, function () {
        return _this6.goBack.apply(_this6, arguments);
      }, function () {
        return _this6.goNext.apply(_this6, arguments);
      });
    }
  }, {
    key: "savePendingData",
    value: function savePendingData() {
      if (Object.keys(this.pendingData).length) {
        this.progressData.push(Object.entries(this.pendingData));
        this.pendingData = {};
      }
    }
  }, {
    key: "goNext",
    value: function () {
      var _goNext = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                trigger(this.events.attemptGoingToNext);

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function goNext() {
        return _goNext.apply(this, arguments);
      }

      return goNext;
    }()
  }, {
    key: "goBack",
    value: function () {
      var _goBack = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (this.progressData.length > 0) {
                  this.progressData.pop();
                }

                this.pendingData = {};
                trigger(this.events.goingBack);
                _context13.next = 5;
                return this.runTutorial();

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function goBack() {
        return _goBack.apply(this, arguments);
      }

      return goBack;
    }()
  }]);

  return TutorializerClass;
}();

var Tutorializer = globalThis[tutorializerSymbol] = new TutorializerClass();
exports.Tutorializer = Tutorializer;
},{}],"../website.jsx":[function(require,module,exports) {
"use strict";

var _bundle = require("./autogenerated.ignore/bundle.js");

_bundle.Tutorializer.intializeWholeWebpage(); // this file mainly exists for dev work and bundling 
// everything is in JS files so they can be imported over ES6
// Tutorializer.intializeWholeWebpage()
},{"./autogenerated.ignore/bundle.js":"bundle.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57768" + '/');

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