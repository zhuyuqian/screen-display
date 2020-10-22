function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode:  'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var _functionToString = _shared('native-function-to-string', Function.toString);

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');

var TO_STRING = 'toString';
var TPL = ('' + _functionToString).split(TO_STRING);

_core.inspectSource = function (it) {
  return _functionToString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

// https://github.com/tc39/Array.prototype.includes

var $includes = _arrayIncludes(true);

_export(_export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_addToUnscopables('includes');

// 7.2.8 IsRegExp(argument)


var MATCH = _wks('match');
var _isRegexp = function (it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

// helper for String#{startsWith, endsWith, includes}



var _stringContext = function (that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH$1 = _wks('match');
var _failsIsRegexp = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

var INCLUDES = 'includes';

_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~_stringContext(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)






var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = _toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = _objectGops.f;
  var isEnum = _objectPie.f;
  while (aLen > index) {
    var S = _iobject(arguments[index++]);
    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

var isEl = function isEl(el) {
  return (typeof HTMLElement === "undefined" ? "undefined" : _typeof_1(HTMLElement)) === 'object' ? el instanceof HTMLElement : !!(el && _typeof_1(el) === 'object' && (el.nodeType === 1 || el.nodeType === 9) && typeof el.nodeName === 'string');
};
var getEl = function getEl(el) {
  if (isEl(el)) return el;
  return document.querySelector(el);
};
var getParentEl = function getParentEl(el) {
  return el.parentNode;
};
var getOffsetByEl = function getOffsetByEl(el) {
  return {
    offsetWidth: el.offsetWidth,
    offsetHeight: el.offsetHeight
  };
};

var elResize = {
  _handleResize: function _handleResize(e) {
    var ele = e.target || e.srcElement;
    var trigger = ele.__resizeTrigger__;

    if (trigger) {
      var handlers = trigger.__z_resizeListeners;

      if (handlers) {
        var size = handlers.length;

        for (var i = 0; i < size; i++) {
          var h = handlers[i];
          var handler = h.handler;
          var context = h.context;
          handler.apply(context, [e]);
        }
      }
    }
  },
  _removeHandler: function _removeHandler(ele, handler, context) {
    var handlers = ele.__z_resizeListeners;

    if (handlers) {
      var size = handlers.length;

      for (var i = 0; i < size; i++) {
        var h = handlers[i];

        if (h.handler === handler && h.context === context) {
          handlers.splice(i, 1);
          return;
        }
      }
    }
  },
  _createResizeTrigger: function _createResizeTrigger(ele) {
    var obj = document.createElement('object');
    obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; pointer-events: none; z-index: -1;');
    obj.onload = elResize._handleObjectLoad;
    obj.type = 'text/html';
    ele.appendChild(obj);
    obj.data = 'about:blank';
    return obj;
  },
  _handleObjectLoad: function _handleObjectLoad(evt) {
    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
    this.contentDocument.defaultView.addEventListener('resize', elResize._handleResize);
  }
};

if (document.attachEvent) {
  elResize.on = function (ele, handler, context) {
    var handlers = ele.__z_resizeListeners;

    if (!handlers) {
      handlers = [];
      ele.__z_resizeListeners = handlers;
      ele.__resizeTrigger__ = ele;
      ele.attachEvent('onresize', elResize._handleResize);
    }

    handlers.push({
      handler: handler,
      context: context
    });
  };

  elResize.off = function (ele, handler, context) {
    var handlers = ele.__z_resizeListeners;

    if (handlers) {
      elResize._removeHandler(ele, handler, context);

      if (handlers.length === 0) {
        ele.detachEvent('onresize', elResize._handleResize);
        delete ele.__z_resizeListeners;
      }
    }
  };
} else {
  elResize.on = function (ele, handler, context) {
    var handlers = ele.__z_resizeListeners;

    if (!handlers) {
      handlers = [];
      ele.__z_resizeListeners = handlers;

      if (getComputedStyle(ele, null).position === 'static') {
        ele.style.position = 'relative';
      }

      var obj = elResize._createResizeTrigger(ele);

      ele.__resizeTrigger__ = obj;
      obj.__resizeElement__ = ele;
    }

    handlers.push({
      handler: handler,
      context: context
    });
  };

  elResize.off = function (ele, handler, context) {
    var handlers = ele.__z_resizeListeners;

    if (handlers) {
      elResize._removeHandler(ele, handler, context);

      if (handlers.length === 0) {
        var trigger = ele.__resizeTrigger__;

        if (trigger) {
          trigger.contentDocument.defaultView.removeEventListener('resize', elResize._handleResize);
          ele.removeChild(trigger);
          delete ele.__resizeTrigger__;
        }

        delete ele.__z_resizeListeners;
      }
    }
  };
}

var cfg = {
  designWidth: 1920,
  designHeight: 1080,
  compatPosition: 'center-center',
  resizeTimer: '300',
  resizeEvent: 'window,parent',
  disabledResize: false
};

var ScreenDisplay = function () {
  function ScreenDisplay(options) {
    classCallCheck(this, ScreenDisplay);

    this.$options = options;
    this.$el = getEl(options.el);
    this.$parent = getParentEl(this.$el);
    this.designWidth = options.designWidth || cfg.designWidth;
    this.designHeight = options.designHeight || cfg.designHeight;
    this.compatPosition = options.compatPosition || cfg.compatPosition;
    this.resizeTimer = options.resizeTimer || cfg.resizeTimer;
    this.resizeEvent = options.resizeEvent || cfg.resizeEvent;
    this.disabledResize = options.disabledResize || cfg.disabledResize;
    this._diffUnit = 0;
    this._pWidth = 0;
    this._pHeight = 0;
    this._scaling = 0;
    this._translate = '0,0';
    this._resizeTimeout = null;

    this._resize();

    this._bindResizeByEvent();
  }

  createClass(ScreenDisplay, [{
    key: "_resize",
    value: function _resize() {
      this._calcParentNodeWH();

      this._calcScaling();

      this._calcTranslate();

      this._bindStyleText();
    }
  }, {
    key: "_calcParentNodeWH",
    value: function _calcParentNodeWH() {
      var offset = getOffsetByEl(this.$parent);
      this._pWidth = offset.offsetWidth;
      this._pHeight = offset.offsetHeight;
      this._diffUnit = this._pWidth / this._pHeight - this.designWidth / this.designHeight;
    }
  }, {
    key: "_calcScaling",
    value: function _calcScaling() {
      this._scaling = this._pWidth === this.designWidth && this._pHeight === this.designHeight ? 1 : this._diffUnit > 0 ? this._pHeight / this.designHeight : this._pWidth / this.designWidth;
    }
  }, {
    key: "_calcTranslate",
    value: function _calcTranslate() {
      switch (this.compatPosition) {
        case 'top-left':
          this._translate = '0,0';
          break;

        case 'top-center':
          this._translate = "".concat((this._pWidth - this.designWidth * this._scaling) / 2 / this._scaling, "px,0");
          break;

        case 'top-right':
          this._translate = "".concat((this._pWidth - this.designWidth * this._scaling) / this._scaling, "px,0");
          break;

        case 'bottom-left':
          this._translate = "0,".concat((this._pHeight - this.designHeight * this._scaling) / this._scaling, "px");
          break;

        case 'center-left':
          this._translate = "0,".concat((this._pHeight - this.designHeight * this._scaling) / 2 / this._scaling, "px");
          break;

        case 'center-center':
          this._translate = "".concat((this._pWidth - this.designWidth * this._scaling) / 2 / this._scaling, "px,").concat((this._pHeight - this.designHeight * this._scaling) / 2 / this._scaling, "px");
          break;
      }
    }
  }, {
    key: "_bindStyleText",
    value: function _bindStyleText() {
      Object.assign(this.$el.style, {
        "transform-origin": "0 0",
        transform: "scale(".concat(this._scaling, ",").concat(this._scaling, ") translate(").concat(this._translate, ")"),
        width: "".concat(this.designWidth, "px"),
        height: "".concat(this.designHeight, "px")
      });
      this.$options.onResize && this.$options.onResize(this, {
        actualWidth: this.designWidth * this._scaling,
        actualHeight: this.designHeight * this._scaling
      });
    }
  }, {
    key: "_bindResizeByEvent",
    value: function _bindResizeByEvent() {
      var _this = this;

      this._bind = function () {
        if (_this.disabledResize) return;

        if (_this._resizeTimeout) {
          clearTimeout(_this._resizeTimeout);
          _this._resizeTimeout = null;
        }

        _this._resizeTimeout = setTimeout(function () {
          _this._resize();

          _this._resizeTimeout = null;
        }, _this.resizeTimer);
      };

      if (this.resizeEvent.includes('window')) {
        window.addEventListener('resize', this._bind);
      }

      if (this.resizeEvent.includes('parent')) {
        elResize.on(this.$parent, function () {
          _this._bind();
        });
      }
    }
  }, {
    key: "_unbindResizeByEvent",
    value: function _unbindResizeByEvent() {
      if (this.resizeEvent.includes('window')) {
        window.removeEventListener('resize', this._bind);
      }

      if (this.resizeEvent.includes('parent')) {
        elResize.off(this.$parent);
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      this._resize();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._unbindResizeByEvent();
    }
  }]);

  return ScreenDisplay;
}();

export default ScreenDisplay;
