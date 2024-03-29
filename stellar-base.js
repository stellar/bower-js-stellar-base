var StellarBase;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9282:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(4155);
/* provided dependency */ var console = __webpack_require__(5108);
// Currently in sync with Node.js lib/assert.js
// https://github.com/nodejs/node/commit/2a51ae424a513ec9a6aa3466baa0cc1d55dd4f3b
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(2136),
    _require$codes = _require.codes,
    ERR_AMBIGUOUS_ARGUMENT = _require$codes.ERR_AMBIGUOUS_ARGUMENT,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_INVALID_ARG_VALUE = _require$codes.ERR_INVALID_ARG_VALUE,
    ERR_INVALID_RETURN_VALUE = _require$codes.ERR_INVALID_RETURN_VALUE,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;

var AssertionError = __webpack_require__(5961);

var _require2 = __webpack_require__(9539),
    inspect = _require2.inspect;

var _require$types = (__webpack_require__(9539).types),
    isPromise = _require$types.isPromise,
    isRegExp = _require$types.isRegExp;

var objectAssign = Object.assign ? Object.assign : (__webpack_require__(8091).assign);
var objectIs = Object.is ? Object.is : __webpack_require__(609);
var errorCache = new Map();
var isDeepEqual;
var isDeepStrictEqual;
var parseExpressionAt;
var findNodeAround;
var decoder;

function lazyLoadComparison() {
  var comparison = __webpack_require__(9158);

  isDeepEqual = comparison.isDeepEqual;
  isDeepStrictEqual = comparison.isDeepStrictEqual;
} // Escape control characters but not \n and \t to keep the line breaks and
// indentation intact.
// eslint-disable-next-line no-control-regex


var escapeSequencesRegExp = /[\x00-\x08\x0b\x0c\x0e-\x1f]/g;
var meta = (/* unused pure expression or super */ null && (["\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", '\\b', '', '', "\\u000b", '\\f', '', "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f"]));

var escapeFn = function escapeFn(str) {
  return meta[str.charCodeAt(0)];
};

var warned = false; // The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;
var NO_EXCEPTION_SENTINEL = {}; // All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function innerFail(obj) {
  if (obj.message instanceof Error) throw obj.message;
  throw new AssertionError(obj);
}

function fail(actual, expected, message, operator, stackStartFn) {
  var argsLen = arguments.length;
  var internalMessage;

  if (argsLen === 0) {
    internalMessage = 'Failed';
  } else if (argsLen === 1) {
    message = actual;
    actual = undefined;
  } else {
    if (warned === false) {
      warned = true;
      var warn = process.emitWarning ? process.emitWarning : console.warn.bind(console);
      warn('assert.fail() with more than one argument is deprecated. ' + 'Please use assert.strictEqual() instead or only pass a message.', 'DeprecationWarning', 'DEP0094');
    }

    if (argsLen === 2) operator = '!=';
  }

  if (message instanceof Error) throw message;
  var errArgs = {
    actual: actual,
    expected: expected,
    operator: operator === undefined ? 'fail' : operator,
    stackStartFn: stackStartFn || fail
  };

  if (message !== undefined) {
    errArgs.message = message;
  }

  var err = new AssertionError(errArgs);

  if (internalMessage) {
    err.message = internalMessage;
    err.generatedMessage = true;
  }

  throw err;
}

assert.fail = fail; // The AssertionError is defined in internal/error.

assert.AssertionError = AssertionError;

function innerOk(fn, argLen, value, message) {
  if (!value) {
    var generatedMessage = false;

    if (argLen === 0) {
      generatedMessage = true;
      message = 'No value argument passed to `assert.ok()`';
    } else if (message instanceof Error) {
      throw message;
    }

    var err = new AssertionError({
      actual: value,
      expected: true,
      message: message,
      operator: '==',
      stackStartFn: fn
    });
    err.generatedMessage = generatedMessage;
    throw err;
  }
} // Pure assertion tests whether a value is truthy, as determined
// by !!value.


function ok() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  innerOk.apply(void 0, [ok, args.length].concat(args));
}

assert.ok = ok; // The equality assertion tests shallow, coercive equality with ==.

/* eslint-disable no-restricted-properties */

assert.equal = function equal(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual != expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '==',
      stackStartFn: equal
    });
  }
}; // The non-equality assertion tests for whether two objects are not
// equal with !=.


assert.notEqual = function notEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  } // eslint-disable-next-line eqeqeq


  if (actual == expected) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: '!=',
      stackStartFn: notEqual
    });
  }
}; // The equivalence assertion tests a deep equality relation.


assert.deepEqual = function deepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepEqual',
      stackStartFn: deepEqual
    });
  }
}; // The non-equivalence assertion tests for any deep inequality.


assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepEqual',
      stackStartFn: notDeepEqual
    });
  }
};
/* eslint-enable */


assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (!isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'deepStrictEqual',
      stackStartFn: deepStrictEqual
    });
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;

function notDeepStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (isDeepEqual === undefined) lazyLoadComparison();

  if (isDeepStrictEqual(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notDeepStrictEqual',
      stackStartFn: notDeepStrictEqual
    });
  }
}

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (!objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'strictEqual',
      stackStartFn: strictEqual
    });
  }
};

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (arguments.length < 2) {
    throw new ERR_MISSING_ARGS('actual', 'expected');
  }

  if (objectIs(actual, expected)) {
    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: 'notStrictEqual',
      stackStartFn: notStrictEqual
    });
  }
};

var Comparison = function Comparison(obj, keys, actual) {
  var _this = this;

  _classCallCheck(this, Comparison);

  keys.forEach(function (key) {
    if (key in obj) {
      if (actual !== undefined && typeof actual[key] === 'string' && isRegExp(obj[key]) && obj[key].test(actual[key])) {
        _this[key] = actual[key];
      } else {
        _this[key] = obj[key];
      }
    }
  });
};

function compareExceptionKey(actual, expected, key, message, keys, fn) {
  if (!(key in actual) || !isDeepStrictEqual(actual[key], expected[key])) {
    if (!message) {
      // Create placeholder objects to create a nice output.
      var a = new Comparison(actual, keys);
      var b = new Comparison(expected, keys, actual);
      var err = new AssertionError({
        actual: a,
        expected: b,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.actual = actual;
      err.expected = expected;
      err.operator = fn.name;
      throw err;
    }

    innerFail({
      actual: actual,
      expected: expected,
      message: message,
      operator: fn.name,
      stackStartFn: fn
    });
  }
}

function expectedException(actual, expected, msg, fn) {
  if (typeof expected !== 'function') {
    if (isRegExp(expected)) return expected.test(actual); // assert.doesNotThrow does not accept objects.

    if (arguments.length === 2) {
      throw new ERR_INVALID_ARG_TYPE('expected', ['Function', 'RegExp'], expected);
    } // Handle primitives properly.


    if (_typeof(actual) !== 'object' || actual === null) {
      var err = new AssertionError({
        actual: actual,
        expected: expected,
        message: msg,
        operator: 'deepStrictEqual',
        stackStartFn: fn
      });
      err.operator = fn.name;
      throw err;
    }

    var keys = Object.keys(expected); // Special handle errors to make sure the name and the message are compared
    // as well.

    if (expected instanceof Error) {
      keys.push('name', 'message');
    } else if (keys.length === 0) {
      throw new ERR_INVALID_ARG_VALUE('error', expected, 'may not be an empty object');
    }

    if (isDeepEqual === undefined) lazyLoadComparison();
    keys.forEach(function (key) {
      if (typeof actual[key] === 'string' && isRegExp(expected[key]) && expected[key].test(actual[key])) {
        return;
      }

      compareExceptionKey(actual, expected, key, msg, keys, fn);
    });
    return true;
  } // Guard instanceof against arrow functions as they don't have a prototype.


  if (expected.prototype !== undefined && actual instanceof expected) {
    return true;
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function getActual(fn) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('fn', 'Function', fn);
  }

  try {
    fn();
  } catch (e) {
    return e;
  }

  return NO_EXCEPTION_SENTINEL;
}

function checkIsPromise(obj) {
  // Accept native ES6 promises and promises that are implemented in a similar
  // way. Do not accept thenables that use a function as `obj` and that have no
  // `catch` handler.
  // TODO: thenables are checked up until they have the correct methods,
  // but according to documentation, the `then` method should receive
  // the `fulfill` and `reject` arguments as well or it may be never resolved.
  return isPromise(obj) || obj !== null && _typeof(obj) === 'object' && typeof obj.then === 'function' && typeof obj.catch === 'function';
}

function waitForActual(promiseFn) {
  return Promise.resolve().then(function () {
    var resultPromise;

    if (typeof promiseFn === 'function') {
      // Return a rejected promise if `promiseFn` throws synchronously.
      resultPromise = promiseFn(); // Fail in case no promise is returned.

      if (!checkIsPromise(resultPromise)) {
        throw new ERR_INVALID_RETURN_VALUE('instance of Promise', 'promiseFn', resultPromise);
      }
    } else if (checkIsPromise(promiseFn)) {
      resultPromise = promiseFn;
    } else {
      throw new ERR_INVALID_ARG_TYPE('promiseFn', ['Function', 'Promise'], promiseFn);
    }

    return Promise.resolve().then(function () {
      return resultPromise;
    }).then(function () {
      return NO_EXCEPTION_SENTINEL;
    }).catch(function (e) {
      return e;
    });
  });
}

function expectsError(stackStartFn, actual, error, message) {
  if (typeof error === 'string') {
    if (arguments.length === 4) {
      throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
    }

    if (_typeof(actual) === 'object' && actual !== null) {
      if (actual.message === error) {
        throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error message \"".concat(actual.message, "\" is identical to the message."));
      }
    } else if (actual === error) {
      throw new ERR_AMBIGUOUS_ARGUMENT('error/message', "The error \"".concat(actual, "\" is identical to the message."));
    }

    message = error;
    error = undefined;
  } else if (error != null && _typeof(error) !== 'object' && typeof error !== 'function') {
    throw new ERR_INVALID_ARG_TYPE('error', ['Object', 'Error', 'Function', 'RegExp'], error);
  }

  if (actual === NO_EXCEPTION_SENTINEL) {
    var details = '';

    if (error && error.name) {
      details += " (".concat(error.name, ")");
    }

    details += message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'rejects' ? 'rejection' : 'exception';
    innerFail({
      actual: undefined,
      expected: error,
      operator: stackStartFn.name,
      message: "Missing expected ".concat(fnType).concat(details),
      stackStartFn: stackStartFn
    });
  }

  if (error && !expectedException(actual, error, message, stackStartFn)) {
    throw actual;
  }
}

function expectsNoError(stackStartFn, actual, error, message) {
  if (actual === NO_EXCEPTION_SENTINEL) return;

  if (typeof error === 'string') {
    message = error;
    error = undefined;
  }

  if (!error || expectedException(actual, error)) {
    var details = message ? ": ".concat(message) : '.';
    var fnType = stackStartFn.name === 'doesNotReject' ? 'rejection' : 'exception';
    innerFail({
      actual: actual,
      expected: error,
      operator: stackStartFn.name,
      message: "Got unwanted ".concat(fnType).concat(details, "\n") + "Actual message: \"".concat(actual && actual.message, "\""),
      stackStartFn: stackStartFn
    });
  }

  throw actual;
}

assert.throws = function throws(promiseFn) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  expectsError.apply(void 0, [throws, getActual(promiseFn)].concat(args));
};

assert.rejects = function rejects(promiseFn) {
  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return waitForActual(promiseFn).then(function (result) {
    return expectsError.apply(void 0, [rejects, result].concat(args));
  });
};

assert.doesNotThrow = function doesNotThrow(fn) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  expectsNoError.apply(void 0, [doesNotThrow, getActual(fn)].concat(args));
};

assert.doesNotReject = function doesNotReject(fn) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return waitForActual(fn).then(function (result) {
    return expectsNoError.apply(void 0, [doesNotReject, result].concat(args));
  });
};

assert.ifError = function ifError(err) {
  if (err !== null && err !== undefined) {
    var message = 'ifError got unwanted exception: ';

    if (_typeof(err) === 'object' && typeof err.message === 'string') {
      if (err.message.length === 0 && err.constructor) {
        message += err.constructor.name;
      } else {
        message += err.message;
      }
    } else {
      message += inspect(err);
    }

    var newErr = new AssertionError({
      actual: err,
      expected: null,
      operator: 'ifError',
      message: message,
      stackStartFn: ifError
    }); // Make sure we actually have a stack trace!

    var origStack = err.stack;

    if (typeof origStack === 'string') {
      // This will remove any duplicated frames from the error frames taken
      // from within `ifError` and add the original error frames to the newly
      // created ones.
      var tmp2 = origStack.split('\n');
      tmp2.shift(); // Filter all frames existing in err.stack.

      var tmp1 = newErr.stack.split('\n');

      for (var i = 0; i < tmp2.length; i++) {
        // Find the first occurrence of the frame.
        var pos = tmp1.indexOf(tmp2[i]);

        if (pos !== -1) {
          // Only keep new frames.
          tmp1 = tmp1.slice(0, pos);
          break;
        }
      }

      newErr.stack = "".concat(tmp1.join('\n'), "\n").concat(tmp2.join('\n'));
    }

    throw newErr;
  }
}; // Expose a strict only variant of assert


function strict() {
  for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  innerOk.apply(void 0, [strict, args.length].concat(args));
}

assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

/***/ }),

/***/ 5961:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(4155);
// Currently in sync with Node.js lib/internal/assert/assertion_error.js
// https://github.com/nodejs/node/commit/0817840f775032169ddd70c85ac059f18ffcc81c


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _require = __webpack_require__(9539),
    inspect = _require.inspect;

var _require2 = __webpack_require__(2136),
    ERR_INVALID_ARG_TYPE = _require2.codes.ERR_INVALID_ARG_TYPE; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat


function repeat(str, count) {
  count = Math.floor(count);
  if (str.length == 0 || count == 0) return '';
  var maxCount = str.length * count;
  count = Math.floor(Math.log(count) / Math.log(2));

  while (count) {
    str += str;
    count--;
  }

  str += str.substring(0, maxCount - str.length);
  return str;
}

var blue = '';
var green = '';
var red = '';
var white = '';
var kReadableOperator = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:',
  notIdentical: 'Values identical but not reference-equal:'
}; // Comparing short primitives should just show === / !== instead of using the
// diff.

var kMaxShortLength = 10;

function copyError(source) {
  var keys = Object.keys(source);
  var target = Object.create(Object.getPrototypeOf(source));
  keys.forEach(function (key) {
    target[key] = source[key];
  });
  Object.defineProperty(target, 'message', {
    value: source.message
  });
  return target;
}

function inspectValue(val) {
  // The util.inspect default values could be changed. This makes sure the
  // error messages contain the necessary information nevertheless.
  return inspect(val, {
    compact: false,
    customInspect: false,
    depth: 1000,
    maxArrayLength: Infinity,
    // Assert compares only enumerable properties (with a few exceptions).
    showHidden: false,
    // Having a long line as error is better than wrapping the line for
    // comparison for now.
    // TODO(BridgeAR): `breakLength` should be limited as soon as soon as we
    // have meta information about the inspected properties (i.e., know where
    // in what line the property starts and ends).
    breakLength: Infinity,
    // Assert does not detect proxies currently.
    showProxy: false,
    sorted: true,
    // Inspect getters as we also check them when comparing entries.
    getters: true
  });
}

function createErrDiff(actual, expected, operator) {
  var other = '';
  var res = '';
  var lastPos = 0;
  var end = '';
  var skipped = false;
  var actualInspected = inspectValue(actual);
  var actualLines = actualInspected.split('\n');
  var expectedLines = inspectValue(expected).split('\n');
  var i = 0;
  var indicator = ''; // In case both values are objects explicitly mark them as not reference equal
  // for the `strictEqual` operator.

  if (operator === 'strictEqual' && _typeof(actual) === 'object' && _typeof(expected) === 'object' && actual !== null && expected !== null) {
    operator = 'strictEqualObject';
  } // If "actual" and "expected" fit on a single line and they are not strictly
  // equal, check further special handling.


  if (actualLines.length === 1 && expectedLines.length === 1 && actualLines[0] !== expectedLines[0]) {
    var inputLength = actualLines[0].length + expectedLines[0].length; // If the character length of "actual" and "expected" together is less than
    // kMaxShortLength and if neither is an object and at least one of them is
    // not `zero`, use the strict equal comparison to visualize the output.

    if (inputLength <= kMaxShortLength) {
      if ((_typeof(actual) !== 'object' || actual === null) && (_typeof(expected) !== 'object' || expected === null) && (actual !== 0 || expected !== 0)) {
        // -0 === +0
        return "".concat(kReadableOperator[operator], "\n\n") + "".concat(actualLines[0], " !== ").concat(expectedLines[0], "\n");
      }
    } else if (operator !== 'strictEqualObject') {
      // If the stderr is a tty and the input length is lower than the current
      // columns per line, add a mismatch indicator below the output. If it is
      // not a tty, use a default value of 80 characters.
      var maxLength = process.stderr && process.stderr.isTTY ? process.stderr.columns : 80;

      if (inputLength < maxLength) {
        while (actualLines[0][i] === expectedLines[0][i]) {
          i++;
        } // Ignore the first characters.


        if (i > 2) {
          // Add position indicator for the first mismatch in case it is a
          // single line and the input length is less than the column length.
          indicator = "\n  ".concat(repeat(' ', i), "^");
          i = 0;
        }
      }
    }
  } // Remove all ending lines that match (this optimizes the output for
  // readability by reducing the number of total changed lines).


  var a = actualLines[actualLines.length - 1];
  var b = expectedLines[expectedLines.length - 1];

  while (a === b) {
    if (i++ < 2) {
      end = "\n  ".concat(a).concat(end);
    } else {
      other = a;
    }

    actualLines.pop();
    expectedLines.pop();
    if (actualLines.length === 0 || expectedLines.length === 0) break;
    a = actualLines[actualLines.length - 1];
    b = expectedLines[expectedLines.length - 1];
  }

  var maxLines = Math.max(actualLines.length, expectedLines.length); // Strict equal with identical objects that are not identical by reference.
  // E.g., assert.deepStrictEqual({ a: Symbol() }, { a: Symbol() })

  if (maxLines === 0) {
    // We have to get the result again. The lines were all removed before.
    var _actualLines = actualInspected.split('\n'); // Only remove lines in case it makes sense to collapse those.
    // TODO: Accept env to always show the full error.


    if (_actualLines.length > 30) {
      _actualLines[26] = "".concat(blue, "...").concat(white);

      while (_actualLines.length > 27) {
        _actualLines.pop();
      }
    }

    return "".concat(kReadableOperator.notIdentical, "\n\n").concat(_actualLines.join('\n'), "\n");
  }

  if (i > 3) {
    end = "\n".concat(blue, "...").concat(white).concat(end);
    skipped = true;
  }

  if (other !== '') {
    end = "\n  ".concat(other).concat(end);
    other = '';
  }

  var printedLines = 0;
  var msg = kReadableOperator[operator] + "\n".concat(green, "+ actual").concat(white, " ").concat(red, "- expected").concat(white);
  var skippedMsg = " ".concat(blue, "...").concat(white, " Lines skipped");

  for (i = 0; i < maxLines; i++) {
    // Only extra expected lines exist
    var cur = i - lastPos;

    if (actualLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(expectedLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(expectedLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the expected line to the cache.

      other += "\n".concat(red, "-").concat(white, " ").concat(expectedLines[i]);
      printedLines++; // Only extra actual lines exist
    } else if (expectedLines.length < i + 1) {
      // If the last diverging line is more than one line above and the
      // current line is at least line three, add some of the former lines and
      // also add dots to indicate skipped entries.
      if (cur > 1 && i > 2) {
        if (cur > 4) {
          res += "\n".concat(blue, "...").concat(white);
          skipped = true;
        } else if (cur > 3) {
          res += "\n  ".concat(actualLines[i - 2]);
          printedLines++;
        }

        res += "\n  ".concat(actualLines[i - 1]);
        printedLines++;
      } // Mark the current line as the last diverging one.


      lastPos = i; // Add the actual line to the result.

      res += "\n".concat(green, "+").concat(white, " ").concat(actualLines[i]);
      printedLines++; // Lines diverge
    } else {
      var expectedLine = expectedLines[i];
      var actualLine = actualLines[i]; // If the lines diverge, specifically check for lines that only diverge by
      // a trailing comma. In that case it is actually identical and we should
      // mark it as such.

      var divergingLines = actualLine !== expectedLine && (!endsWith(actualLine, ',') || actualLine.slice(0, -1) !== expectedLine); // If the expected line has a trailing comma but is otherwise identical,
      // add a comma at the end of the actual line. Otherwise the output could
      // look weird as in:
      //
      //   [
      //     1         // No comma at the end!
      // +   2
      //   ]
      //

      if (divergingLines && endsWith(expectedLine, ',') && expectedLine.slice(0, -1) === actualLine) {
        divergingLines = false;
        actualLine += ',';
      }

      if (divergingLines) {
        // If the last diverging line is more than one line above and the
        // current line is at least line three, add some of the former lines and
        // also add dots to indicate skipped entries.
        if (cur > 1 && i > 2) {
          if (cur > 4) {
            res += "\n".concat(blue, "...").concat(white);
            skipped = true;
          } else if (cur > 3) {
            res += "\n  ".concat(actualLines[i - 2]);
            printedLines++;
          }

          res += "\n  ".concat(actualLines[i - 1]);
          printedLines++;
        } // Mark the current line as the last diverging one.


        lastPos = i; // Add the actual line to the result and cache the expected diverging
        // line so consecutive diverging lines show up as +++--- and not +-+-+-.

        res += "\n".concat(green, "+").concat(white, " ").concat(actualLine);
        other += "\n".concat(red, "-").concat(white, " ").concat(expectedLine);
        printedLines += 2; // Lines are identical
      } else {
        // Add all cached information to the result before adding other things
        // and reset the cache.
        res += other;
        other = ''; // If the last diverging line is exactly one line above or if it is the
        // very first line, add the line to the result.

        if (cur === 1 || i === 0) {
          res += "\n  ".concat(actualLine);
          printedLines++;
        }
      }
    } // Inspected object to big (Show ~20 rows max)


    if (printedLines > 20 && i < maxLines - 2) {
      return "".concat(msg).concat(skippedMsg, "\n").concat(res, "\n").concat(blue, "...").concat(white).concat(other, "\n") + "".concat(blue, "...").concat(white);
    }
  }

  return "".concat(msg).concat(skipped ? skippedMsg : '', "\n").concat(res).concat(other).concat(end).concat(indicator);
}

var AssertionError =
/*#__PURE__*/
function (_Error) {
  _inherits(AssertionError, _Error);

  function AssertionError(options) {
    var _this;

    _classCallCheck(this, AssertionError);

    if (_typeof(options) !== 'object' || options === null) {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }

    var message = options.message,
        operator = options.operator,
        stackStartFn = options.stackStartFn;
    var actual = options.actual,
        expected = options.expected;
    var limit = Error.stackTraceLimit;
    Error.stackTraceLimit = 0;

    if (message != null) {
      _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, String(message)));
    } else {
      if (process.stderr && process.stderr.isTTY) {
        // Reset on each call to make sure we handle dynamically set environment
        // variables correct.
        if (process.stderr && process.stderr.getColorDepth && process.stderr.getColorDepth() !== 1) {
          blue = "\x1B[34m";
          green = "\x1B[32m";
          white = "\x1B[39m";
          red = "\x1B[31m";
        } else {
          blue = '';
          green = '';
          white = '';
          red = '';
        }
      } // Prevent the error stack from being visible by duplicating the error
      // in a very close way to the original in case both sides are actually
      // instances of Error.


      if (_typeof(actual) === 'object' && actual !== null && _typeof(expected) === 'object' && expected !== null && 'stack' in actual && actual instanceof Error && 'stack' in expected && expected instanceof Error) {
        actual = copyError(actual);
        expected = copyError(expected);
      }

      if (operator === 'deepStrictEqual' || operator === 'strictEqual') {
        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, createErrDiff(actual, expected, operator)));
      } else if (operator === 'notDeepStrictEqual' || operator === 'notStrictEqual') {
        // In case the objects are equal but the operator requires unequal, show
        // the first object and say A equals B
        var base = kReadableOperator[operator];
        var res = inspectValue(actual).split('\n'); // In case "actual" is an object, it should not be reference equal.

        if (operator === 'notStrictEqual' && _typeof(actual) === 'object' && actual !== null) {
          base = kReadableOperator.notStrictEqualObject;
        } // Only remove lines in case it makes sense to collapse those.
        // TODO: Accept env to always show the full error.


        if (res.length > 30) {
          res[26] = "".concat(blue, "...").concat(white);

          while (res.length > 27) {
            res.pop();
          }
        } // Only print a single input.


        if (res.length === 1) {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, " ").concat(res[0])));
        } else {
          _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(base, "\n\n").concat(res.join('\n'), "\n")));
        }
      } else {
        var _res = inspectValue(actual);

        var other = '';
        var knownOperators = kReadableOperator[operator];

        if (operator === 'notDeepEqual' || operator === 'notEqual') {
          _res = "".concat(kReadableOperator[operator], "\n\n").concat(_res);

          if (_res.length > 1024) {
            _res = "".concat(_res.slice(0, 1021), "...");
          }
        } else {
          other = "".concat(inspectValue(expected));

          if (_res.length > 512) {
            _res = "".concat(_res.slice(0, 509), "...");
          }

          if (other.length > 512) {
            other = "".concat(other.slice(0, 509), "...");
          }

          if (operator === 'deepEqual' || operator === 'equal') {
            _res = "".concat(knownOperators, "\n\n").concat(_res, "\n\nshould equal\n\n");
          } else {
            other = " ".concat(operator, " ").concat(other);
          }
        }

        _this = _possibleConstructorReturn(this, _getPrototypeOf(AssertionError).call(this, "".concat(_res).concat(other)));
      }
    }

    Error.stackTraceLimit = limit;
    _this.generatedMessage = !message;
    Object.defineProperty(_assertThisInitialized(_this), 'name', {
      value: 'AssertionError [ERR_ASSERTION]',
      enumerable: false,
      writable: true,
      configurable: true
    });
    _this.code = 'ERR_ASSERTION';
    _this.actual = actual;
    _this.expected = expected;
    _this.operator = operator;

    if (Error.captureStackTrace) {
      // eslint-disable-next-line no-restricted-syntax
      Error.captureStackTrace(_assertThisInitialized(_this), stackStartFn);
    } // Create error message including the error code in the name.


    _this.stack; // Reset the name.

    _this.name = 'AssertionError';
    return _possibleConstructorReturn(_this);
  }

  _createClass(AssertionError, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message);
    }
  }, {
    key: inspect.custom,
    value: function value(recurseTimes, ctx) {
      // This limits the `actual` and `expected` property default inspection to
      // the minimum depth. Otherwise those values would be too verbose compared
      // to the actual error message which contains a combined view of these two
      // input values.
      return inspect(this, _objectSpread({}, ctx, {
        customInspect: false,
        depth: 0
      }));
    }
  }]);

  return AssertionError;
}(_wrapNativeSuper(Error));

module.exports = AssertionError;

/***/ }),

/***/ 2136:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/errors.js
// https://github.com/nodejs/node/commit/3b044962c48fe313905877a96b5d0894a5404f6f

/* eslint node-core/documented-errors: "error" */

/* eslint node-core/alphabetize-errors: "error" */

/* eslint node-core/prefer-util-format-errors: "error" */
 // The whole point behind this internal module is to allow Node.js to no
// longer be forced to treat every error message change as a semver-major
// change. The NodeError classes here all expose a `code` property whose
// value statically and permanently identifies the error. While the error
// message may change, the code should not.

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var codes = {}; // Lazy loaded

var assert;
var util;

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inherits(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      var _this;

      _classCallCheck(this, NodeError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NodeError).call(this, getMessage(arg1, arg2, arg3)));
      _this.code = code;
      return _this;
    }

    return NodeError;
  }(Base);

  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_AMBIGUOUS_ARGUMENT', 'The "%s" argument is ambiguous. %s', TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  if (assert === undefined) assert = __webpack_require__(9282);
  assert(typeof name === 'string', "'name' must be a string"); // determiner: 'must be' or 'must not be'

  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } // TODO(BridgeAR): Improve the output by showing `null` and similar.


  msg += ". Received type ".concat(_typeof(actual));
  return msg;
}, TypeError);
createErrorType('ERR_INVALID_ARG_VALUE', function (name, value) {
  var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'is invalid';
  if (util === undefined) util = __webpack_require__(9539);
  var inspected = util.inspect(value);

  if (inspected.length > 128) {
    inspected = "".concat(inspected.slice(0, 128), "...");
  }

  return "The argument '".concat(name, "' ").concat(reason, ". Received ").concat(inspected);
}, TypeError, RangeError);
createErrorType('ERR_INVALID_RETURN_VALUE', function (input, name, value) {
  var type;

  if (value && value.constructor && value.constructor.name) {
    type = "instance of ".concat(value.constructor.name);
  } else {
    type = "type ".concat(_typeof(value));
  }

  return "Expected ".concat(input, " to be returned from the \"").concat(name, "\"") + " function but got ".concat(type, ".");
}, TypeError);
createErrorType('ERR_MISSING_ARGS', function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (assert === undefined) assert = __webpack_require__(9282);
  assert(args.length > 0, 'At least one arg needs to be specified');
  var msg = 'The ';
  var len = args.length;
  args = args.map(function (a) {
    return "\"".concat(a, "\"");
  });

  switch (len) {
    case 1:
      msg += "".concat(args[0], " argument");
      break;

    case 2:
      msg += "".concat(args[0], " and ").concat(args[1], " arguments");
      break;

    default:
      msg += args.slice(0, len - 1).join(', ');
      msg += ", and ".concat(args[len - 1], " arguments");
      break;
  }

  return "".concat(msg, " must be specified");
}, TypeError);
module.exports.codes = codes;

/***/ }),

/***/ 9158:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/comparisons.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var regexFlagsSupported = /a/g.flags !== undefined;

var arrayFromSet = function arrayFromSet(set) {
  var array = [];
  set.forEach(function (value) {
    return array.push(value);
  });
  return array;
};

var arrayFromMap = function arrayFromMap(map) {
  var array = [];
  map.forEach(function (value, key) {
    return array.push([key, value]);
  });
  return array;
};

var objectIs = Object.is ? Object.is : __webpack_require__(609);
var objectGetOwnPropertySymbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () {
  return [];
};
var numberIsNaN = Number.isNaN ? Number.isNaN : __webpack_require__(360);

function uncurryThis(f) {
  return f.call.bind(f);
}

var hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
var propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
var objectToString = uncurryThis(Object.prototype.toString);

var _require$types = (__webpack_require__(9539).types),
    isAnyArrayBuffer = _require$types.isAnyArrayBuffer,
    isArrayBufferView = _require$types.isArrayBufferView,
    isDate = _require$types.isDate,
    isMap = _require$types.isMap,
    isRegExp = _require$types.isRegExp,
    isSet = _require$types.isSet,
    isNativeError = _require$types.isNativeError,
    isBoxedPrimitive = _require$types.isBoxedPrimitive,
    isNumberObject = _require$types.isNumberObject,
    isStringObject = _require$types.isStringObject,
    isBooleanObject = _require$types.isBooleanObject,
    isBigIntObject = _require$types.isBigIntObject,
    isSymbolObject = _require$types.isSymbolObject,
    isFloat32Array = _require$types.isFloat32Array,
    isFloat64Array = _require$types.isFloat64Array;

function isNonIndex(key) {
  if (key.length === 0 || key.length > 10) return true;

  for (var i = 0; i < key.length; i++) {
    var code = key.charCodeAt(i);
    if (code < 48 || code > 57) return true;
  } // The maximum size for an array is 2 ** 32 -1.


  return key.length === 10 && key >= Math.pow(2, 32);
}

function getOwnNonIndexProperties(value) {
  return Object.keys(value).filter(isNonIndex).concat(objectGetOwnPropertySymbols(value).filter(Object.prototype.propertyIsEnumerable.bind(value)));
} // Taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */


function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }

  if (y < x) {
    return 1;
  }

  return 0;
}

var ONLY_ENUMERABLE = undefined;
var kStrict = true;
var kLoose = false;
var kNoIterator = 0;
var kIsArray = 1;
var kIsSet = 2;
var kIsMap = 3; // Check if they have the same source and flags

function areSimilarRegExps(a, b) {
  return regexFlagsSupported ? a.source === b.source && a.flags === b.flags : RegExp.prototype.toString.call(a) === RegExp.prototype.toString.call(b);
}

function areSimilarFloatArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  for (var offset = 0; offset < a.byteLength; offset++) {
    if (a[offset] !== b[offset]) {
      return false;
    }
  }

  return true;
}

function areSimilarTypedArrays(a, b) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return compare(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), new Uint8Array(b.buffer, b.byteOffset, b.byteLength)) === 0;
}

function areEqualArrayBuffers(buf1, buf2) {
  return buf1.byteLength === buf2.byteLength && compare(new Uint8Array(buf1), new Uint8Array(buf2)) === 0;
}

function isEqualBoxedPrimitive(val1, val2) {
  if (isNumberObject(val1)) {
    return isNumberObject(val2) && objectIs(Number.prototype.valueOf.call(val1), Number.prototype.valueOf.call(val2));
  }

  if (isStringObject(val1)) {
    return isStringObject(val2) && String.prototype.valueOf.call(val1) === String.prototype.valueOf.call(val2);
  }

  if (isBooleanObject(val1)) {
    return isBooleanObject(val2) && Boolean.prototype.valueOf.call(val1) === Boolean.prototype.valueOf.call(val2);
  }

  if (isBigIntObject(val1)) {
    return isBigIntObject(val2) && BigInt.prototype.valueOf.call(val1) === BigInt.prototype.valueOf.call(val2);
  }

  return isSymbolObject(val2) && Symbol.prototype.valueOf.call(val1) === Symbol.prototype.valueOf.call(val2);
} // Notes: Type tags are historical [[Class]] properties that can be set by
// FunctionTemplate::SetClassName() in C++ or Symbol.toStringTag in JS
// and retrieved using Object.prototype.toString.call(obj) in JS
// See https://tc39.github.io/ecma262/#sec-object.prototype.tostring
// for a list of tags pre-defined in the spec.
// There are some unspecified tags in the wild too (e.g. typed array tags).
// Since tags can be altered, they only serve fast failures
//
// Typed arrays and buffers are checked by comparing the content in their
// underlying ArrayBuffer. This optimization requires that it's
// reasonable to interpret their underlying memory in the same way,
// which is checked by comparing their type tags.
// (e.g. a Uint8Array and a Uint16Array with the same memory content
// could still be different because they will be interpreted differently).
//
// For strict comparison, objects should have
// a) The same built-in type tags
// b) The same prototypes.


function innerDeepEqual(val1, val2, strict, memos) {
  // All identical values are equivalent, as determined by ===.
  if (val1 === val2) {
    if (val1 !== 0) return true;
    return strict ? objectIs(val1, val2) : true;
  } // Check more closely if val1 and val2 are equal.


  if (strict) {
    if (_typeof(val1) !== 'object') {
      return typeof val1 === 'number' && numberIsNaN(val1) && numberIsNaN(val2);
    }

    if (_typeof(val2) !== 'object' || val1 === null || val2 === null) {
      return false;
    }

    if (Object.getPrototypeOf(val1) !== Object.getPrototypeOf(val2)) {
      return false;
    }
  } else {
    if (val1 === null || _typeof(val1) !== 'object') {
      if (val2 === null || _typeof(val2) !== 'object') {
        // eslint-disable-next-line eqeqeq
        return val1 == val2;
      }

      return false;
    }

    if (val2 === null || _typeof(val2) !== 'object') {
      return false;
    }
  }

  var val1Tag = objectToString(val1);
  var val2Tag = objectToString(val2);

  if (val1Tag !== val2Tag) {
    return false;
  }

  if (Array.isArray(val1)) {
    // Check for sparse arrays and general fast path
    if (val1.length !== val2.length) {
      return false;
    }

    var keys1 = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);
    var keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsArray, keys1);
  } // [browserify] This triggers on certain types in IE (Map/Set) so we don't
  // wan't to early return out of the rest of the checks. However we can check
  // if the second value is one of these values and the first isn't.


  if (val1Tag === '[object Object]') {
    // return keyCheck(val1, val2, strict, memos, kNoIterator);
    if (!isMap(val1) && isMap(val2) || !isSet(val1) && isSet(val2)) {
      return false;
    }
  }

  if (isDate(val1)) {
    if (!isDate(val2) || Date.prototype.getTime.call(val1) !== Date.prototype.getTime.call(val2)) {
      return false;
    }
  } else if (isRegExp(val1)) {
    if (!isRegExp(val2) || !areSimilarRegExps(val1, val2)) {
      return false;
    }
  } else if (isNativeError(val1) || val1 instanceof Error) {
    // Do not compare the stack as it might differ even though the error itself
    // is otherwise identical.
    if (val1.message !== val2.message || val1.name !== val2.name) {
      return false;
    }
  } else if (isArrayBufferView(val1)) {
    if (!strict && (isFloat32Array(val1) || isFloat64Array(val1))) {
      if (!areSimilarFloatArrays(val1, val2)) {
        return false;
      }
    } else if (!areSimilarTypedArrays(val1, val2)) {
      return false;
    } // Buffer.compare returns true, so val1.length === val2.length. If they both
    // only contain numeric keys, we don't need to exam further than checking
    // the symbols.


    var _keys = getOwnNonIndexProperties(val1, ONLY_ENUMERABLE);

    var _keys2 = getOwnNonIndexProperties(val2, ONLY_ENUMERABLE);

    if (_keys.length !== _keys2.length) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kNoIterator, _keys);
  } else if (isSet(val1)) {
    if (!isSet(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsSet);
  } else if (isMap(val1)) {
    if (!isMap(val2) || val1.size !== val2.size) {
      return false;
    }

    return keyCheck(val1, val2, strict, memos, kIsMap);
  } else if (isAnyArrayBuffer(val1)) {
    if (!areEqualArrayBuffers(val1, val2)) {
      return false;
    }
  } else if (isBoxedPrimitive(val1) && !isEqualBoxedPrimitive(val1, val2)) {
    return false;
  }

  return keyCheck(val1, val2, strict, memos, kNoIterator);
}

function getEnumerables(val, keys) {
  return keys.filter(function (k) {
    return propertyIsEnumerable(val, k);
  });
}

function keyCheck(val1, val2, strict, memos, iterationType, aKeys) {
  // For all remaining Object pairs, including Array, objects and Maps,
  // equivalence is determined by having:
  // a) The same number of owned enumerable properties
  // b) The same set of keys/indexes (although not necessarily the same order)
  // c) Equivalent values for every corresponding key/index
  // d) For Sets and Maps, equal contents
  // Note: this accounts for both named and indexed properties on Arrays.
  if (arguments.length === 5) {
    aKeys = Object.keys(val1);
    var bKeys = Object.keys(val2); // The pair must have the same number of owned properties.

    if (aKeys.length !== bKeys.length) {
      return false;
    }
  } // Cheap key test


  var i = 0;

  for (; i < aKeys.length; i++) {
    if (!hasOwnProperty(val2, aKeys[i])) {
      return false;
    }
  }

  if (strict && arguments.length === 5) {
    var symbolKeysA = objectGetOwnPropertySymbols(val1);

    if (symbolKeysA.length !== 0) {
      var count = 0;

      for (i = 0; i < symbolKeysA.length; i++) {
        var key = symbolKeysA[i];

        if (propertyIsEnumerable(val1, key)) {
          if (!propertyIsEnumerable(val2, key)) {
            return false;
          }

          aKeys.push(key);
          count++;
        } else if (propertyIsEnumerable(val2, key)) {
          return false;
        }
      }

      var symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (symbolKeysA.length !== symbolKeysB.length && getEnumerables(val2, symbolKeysB).length !== count) {
        return false;
      }
    } else {
      var _symbolKeysB = objectGetOwnPropertySymbols(val2);

      if (_symbolKeysB.length !== 0 && getEnumerables(val2, _symbolKeysB).length !== 0) {
        return false;
      }
    }
  }

  if (aKeys.length === 0 && (iterationType === kNoIterator || iterationType === kIsArray && val1.length === 0 || val1.size === 0)) {
    return true;
  } // Use memos to handle cycles.


  if (memos === undefined) {
    memos = {
      val1: new Map(),
      val2: new Map(),
      position: 0
    };
  } else {
    // We prevent up to two map.has(x) calls by directly retrieving the value
    // and checking for undefined. The map can only contain numbers, so it is
    // safe to check for undefined only.
    var val2MemoA = memos.val1.get(val1);

    if (val2MemoA !== undefined) {
      var val2MemoB = memos.val2.get(val2);

      if (val2MemoB !== undefined) {
        return val2MemoA === val2MemoB;
      }
    }

    memos.position++;
  }

  memos.val1.set(val1, memos.position);
  memos.val2.set(val2, memos.position);
  var areEq = objEquiv(val1, val2, strict, aKeys, memos, iterationType);
  memos.val1.delete(val1);
  memos.val2.delete(val2);
  return areEq;
}

function setHasEqualElement(set, val1, strict, memo) {
  // Go looking.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var val2 = setValues[i];

    if (innerDeepEqual(val1, val2, strict, memo)) {
      // Remove the matching element to make sure we do not check that again.
      set.delete(val2);
      return true;
    }
  }

  return false;
} // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using
// Sadly it is not possible to detect corresponding values properly in case the
// type is a string, number, bigint or boolean. The reason is that those values
// can match lots of different string values (e.g., 1n == '+00001').


function findLooseMatchingPrimitives(prim) {
  switch (_typeof(prim)) {
    case 'undefined':
      return null;

    case 'object':
      // Only pass in null as object!
      return undefined;

    case 'symbol':
      return false;

    case 'string':
      prim = +prim;
    // Loose equal entries exist only if the string is possible to convert to
    // a regular number and not NaN.
    // Fall through

    case 'number':
      if (numberIsNaN(prim)) {
        return false;
      }

  }

  return true;
}

function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) return altValue;
  return b.has(altValue) && !a.has(altValue);
}

function mapMightHaveLoosePrim(a, b, prim, item, memo) {
  var altValue = findLooseMatchingPrimitives(prim);

  if (altValue != null) {
    return altValue;
  }

  var curB = b.get(altValue);

  if (curB === undefined && !b.has(altValue) || !innerDeepEqual(item, curB, false, memo)) {
    return false;
  }

  return !a.has(altValue) && innerDeepEqual(item, curB, false, memo);
}

function setEquiv(a, b, strict, memo) {
  // This is a lazily initiated Set of entries which have to be compared
  // pairwise.
  var set = null;
  var aValues = arrayFromSet(a);

  for (var i = 0; i < aValues.length; i++) {
    var val = aValues[i]; // Note: Checking for the objects first improves the performance for object
    // heavy sets but it is a minor slow down for primitives. As they are fast
    // to check this improves the worst case scenario instead.

    if (_typeof(val) === 'object' && val !== null) {
      if (set === null) {
        set = new Set();
      } // If the specified value doesn't exist in the second set its an not null
      // object (or non strict only: a not matching primitive) we'll need to go
      // hunting for something thats deep-(strict-)equal to it. To make this
      // O(n log n) complexity we have to copy these values in a new set first.


      set.add(val);
    } else if (!b.has(val)) {
      if (strict) return false; // Fast path to detect missing string, symbol, undefined and null values.

      if (!setMightHaveLoosePrim(a, b, val)) {
        return false;
      }

      if (set === null) {
        set = new Set();
      }

      set.add(val);
    }
  }

  if (set !== null) {
    var bValues = arrayFromSet(b);

    for (var _i = 0; _i < bValues.length; _i++) {
      var _val = bValues[_i]; // We have to check if a primitive value is already
      // matching and only if it's not, go hunting for it.

      if (_typeof(_val) === 'object' && _val !== null) {
        if (!setHasEqualElement(set, _val, strict, memo)) return false;
      } else if (!strict && !a.has(_val) && !setHasEqualElement(set, _val, strict, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function mapHasEqualEntry(set, map, key1, item1, strict, memo) {
  // To be able to handle cases like:
  //   Map([[{}, 'a'], [{}, 'b']]) vs Map([[{}, 'b'], [{}, 'a']])
  // ... we need to consider *all* matching keys, not just the first we find.
  var setValues = arrayFromSet(set);

  for (var i = 0; i < setValues.length; i++) {
    var key2 = setValues[i];

    if (innerDeepEqual(key1, key2, strict, memo) && innerDeepEqual(item1, map.get(key2), strict, memo)) {
      set.delete(key2);
      return true;
    }
  }

  return false;
}

function mapEquiv(a, b, strict, memo) {
  var set = null;
  var aEntries = arrayFromMap(a);

  for (var i = 0; i < aEntries.length; i++) {
    var _aEntries$i = _slicedToArray(aEntries[i], 2),
        key = _aEntries$i[0],
        item1 = _aEntries$i[1];

    if (_typeof(key) === 'object' && key !== null) {
      if (set === null) {
        set = new Set();
      }

      set.add(key);
    } else {
      // By directly retrieving the value we prevent another b.has(key) check in
      // almost all possible cases.
      var item2 = b.get(key);

      if (item2 === undefined && !b.has(key) || !innerDeepEqual(item1, item2, strict, memo)) {
        if (strict) return false; // Fast path to detect missing string, symbol, undefined and null
        // keys.

        if (!mapMightHaveLoosePrim(a, b, key, item1, memo)) return false;

        if (set === null) {
          set = new Set();
        }

        set.add(key);
      }
    }
  }

  if (set !== null) {
    var bEntries = arrayFromMap(b);

    for (var _i2 = 0; _i2 < bEntries.length; _i2++) {
      var _bEntries$_i = _slicedToArray(bEntries[_i2], 2),
          key = _bEntries$_i[0],
          item = _bEntries$_i[1];

      if (_typeof(key) === 'object' && key !== null) {
        if (!mapHasEqualEntry(set, a, key, item, strict, memo)) return false;
      } else if (!strict && (!a.has(key) || !innerDeepEqual(a.get(key), item, false, memo)) && !mapHasEqualEntry(set, a, key, item, false, memo)) {
        return false;
      }
    }

    return set.size === 0;
  }

  return true;
}

function objEquiv(a, b, strict, keys, memos, iterationType) {
  // Sets and maps don't have their entries accessible via normal object
  // properties.
  var i = 0;

  if (iterationType === kIsSet) {
    if (!setEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsMap) {
    if (!mapEquiv(a, b, strict, memos)) {
      return false;
    }
  } else if (iterationType === kIsArray) {
    for (; i < a.length; i++) {
      if (hasOwnProperty(a, i)) {
        if (!hasOwnProperty(b, i) || !innerDeepEqual(a[i], b[i], strict, memos)) {
          return false;
        }
      } else if (hasOwnProperty(b, i)) {
        return false;
      } else {
        // Array is sparse.
        var keysA = Object.keys(a);

        for (; i < keysA.length; i++) {
          var key = keysA[i];

          if (!hasOwnProperty(b, key) || !innerDeepEqual(a[key], b[key], strict, memos)) {
            return false;
          }
        }

        if (keysA.length !== Object.keys(b).length) {
          return false;
        }

        return true;
      }
    }
  } // The pair must have equivalent values for every corresponding key.
  // Possibly expensive deep test:


  for (i = 0; i < keys.length; i++) {
    var _key = keys[i];

    if (!innerDeepEqual(a[_key], b[_key], strict, memos)) {
      return false;
    }
  }

  return true;
}

function isDeepEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kLoose);
}

function isDeepStrictEqual(val1, val2) {
  return innerDeepEqual(val1, val2, kStrict);
}

module.exports = {
  isDeepEqual: isDeepEqual,
  isDeepStrictEqual: isDeepStrictEqual
};

/***/ }),

/***/ 6594:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Account: () => (/* reexport */ Account),
  Asset: () => (/* reexport */ Asset),
  AuthClawbackEnabledFlag: () => (/* reexport */ AuthClawbackEnabledFlag),
  AuthImmutableFlag: () => (/* reexport */ AuthImmutableFlag),
  AuthRequiredFlag: () => (/* reexport */ AuthRequiredFlag),
  AuthRevocableFlag: () => (/* reexport */ AuthRevocableFlag),
  BASE_FEE: () => (/* reexport */ BASE_FEE),
  Claimant: () => (/* reexport */ Claimant),
  FastSigning: () => (/* reexport */ FastSigning),
  FeeBumpTransaction: () => (/* reexport */ FeeBumpTransaction),
  Hyper: () => (/* reexport */ xdr.Hyper),
  Keypair: () => (/* reexport */ Keypair),
  LiquidityPoolAsset: () => (/* reexport */ LiquidityPoolAsset),
  LiquidityPoolFeeV18: () => (/* reexport */ LiquidityPoolFeeV18),
  LiquidityPoolId: () => (/* reexport */ LiquidityPoolId),
  Memo: () => (/* reexport */ Memo),
  MemoHash: () => (/* reexport */ MemoHash),
  MemoID: () => (/* reexport */ MemoID),
  MemoNone: () => (/* reexport */ MemoNone),
  MemoReturn: () => (/* reexport */ MemoReturn),
  MemoText: () => (/* reexport */ MemoText),
  MuxedAccount: () => (/* reexport */ MuxedAccount),
  Networks: () => (/* reexport */ Networks),
  Operation: () => (/* reexport */ Operation),
  SignerKey: () => (/* reexport */ SignerKey),
  StrKey: () => (/* reexport */ StrKey),
  TimeoutInfinite: () => (/* reexport */ TimeoutInfinite),
  Transaction: () => (/* reexport */ Transaction),
  TransactionBase: () => (/* reexport */ TransactionBase),
  TransactionBuilder: () => (/* reexport */ TransactionBuilder),
  UnsignedHyper: () => (/* reexport */ xdr.UnsignedHyper),
  decodeAddressToMuxedAccount: () => (/* reexport */ decodeAddressToMuxedAccount),
  "default": () => (/* binding */ src),
  encodeMuxedAccount: () => (/* reexport */ encodeMuxedAccount),
  encodeMuxedAccountToAddress: () => (/* reexport */ encodeMuxedAccountToAddress),
  extractBaseAddress: () => (/* reexport */ extractBaseAddress),
  getLiquidityPoolId: () => (/* reexport */ getLiquidityPoolId),
  hash: () => (/* reexport */ hashing_hash),
  sign: () => (/* reexport */ signing_sign),
  verify: () => (/* reexport */ signing_verify),
  xdr: () => (/* reexport */ src_xdr)
});

;// CONCATENATED MODULE: ./node_modules/bignumber.js/bignumber.mjs
/*
 *      bignumber.js v9.1.1
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |  sum
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


var
  isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
  mathceil = Math.ceil,
  mathfloor = Math.floor,

  bignumberError = '[BigNumber Error] ',
  tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

  BASE = 1e14,
  LOG_BASE = 14,
  MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
  // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
  POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
  SQRT_BASE = 1e7,

  // EDITABLE
  // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
  // the arguments to toExponential, toFixed, toFormat, and toPrecision.
  MAX = 1E9;                                   // 0 to MAX_INT32


/*
 * Create and return a BigNumber constructor.
 */
function clone(configObject) {
  var div, convertBase, parseNumeric,
    P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
    ONE = new BigNumber(1),


    //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


    // The default values below must be integers within the inclusive ranges stated.
    // The values can also be changed at run-time using BigNumber.set.

    // The maximum number of decimal places for operations involving division.
    DECIMAL_PLACES = 20,                     // 0 to MAX

    // The rounding mode used when rounding to the above decimal places, and when using
    // toExponential, toFixed, toFormat and toPrecision, and round (default value).
    // UP         0 Away from zero.
    // DOWN       1 Towards zero.
    // CEIL       2 Towards +Infinity.
    // FLOOR      3 Towards -Infinity.
    // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    ROUNDING_MODE = 4,                       // 0 to 8

    // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

    // The exponent value at and beneath which toString returns exponential notation.
    // Number type: -7
    TO_EXP_NEG = -7,                         // 0 to -MAX

    // The exponent value at and above which toString returns exponential notation.
    // Number type: 21
    TO_EXP_POS = 21,                         // 0 to MAX

    // RANGE : [MIN_EXP, MAX_EXP]

    // The minimum exponent value, beneath which underflow to zero occurs.
    // Number type: -324  (5e-324)
    MIN_EXP = -1e7,                          // -1 to -MAX

    // The maximum exponent value, above which overflow to Infinity occurs.
    // Number type:  308  (1.7976931348623157e+308)
    // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
    MAX_EXP = 1e7,                           // 1 to MAX

    // Whether to use cryptographically-secure random number generation, if available.
    CRYPTO = false,                          // true or false

    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP        0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN      1 The remainder has the same sign as the dividend.
    //             This modulo mode is commonly known as 'truncated division' and is
    //             equivalent to (a % n) in JavaScript.
    // FLOOR     3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
    // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
    //             The remainder is always positive.
    //
    // The truncated division, floored division, Euclidian division and IEEE 754 remainder
    // modes are commonly used for the modulus operation.
    // Although the other rounding modes can also be used, they may not give useful results.
    MODULO_MODE = 1,                         // 0 to 9

    // The maximum number of significant digits of the result of the exponentiatedBy operation.
    // If POW_PRECISION is 0, there will be unlimited significant digits.
    POW_PRECISION = 0,                       // 0 to MAX

    // The format specification used by the BigNumber.prototype.toFormat method.
    FORMAT = {
      prefix: '',
      groupSize: 3,
      secondaryGroupSize: 0,
      groupSeparator: ',',
      decimalSeparator: '.',
      fractionGroupSize: 0,
      fractionGroupSeparator: '\xA0',        // non-breaking space
      suffix: ''
    },

    // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
    // '-', '.', whitespace, or repeated character.
    // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
    ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz',
    alphabetHasNormalDecimalDigits = true;


  //------------------------------------------------------------------------------------------


  // CONSTRUCTOR


  /*
   * The BigNumber constructor and exported function.
   * Create and return a new instance of a BigNumber object.
   *
   * v {number|string|BigNumber} A numeric value.
   * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
   */
  function BigNumber(v, b) {
    var alphabet, c, caseChanged, e, i, isNum, len, str,
      x = this;

    // Enable constructor call without `new`.
    if (!(x instanceof BigNumber)) return new BigNumber(v, b);

    if (b == null) {

      if (v && v._isBigNumber === true) {
        x.s = v.s;

        if (!v.c || v.e > MAX_EXP) {
          x.c = x.e = null;
        } else if (v.e < MIN_EXP) {
          x.c = [x.e = 0];
        } else {
          x.e = v.e;
          x.c = v.c.slice();
        }

        return;
      }

      if ((isNum = typeof v == 'number') && v * 0 == 0) {

        // Use `1 / n` to handle minus zero also.
        x.s = 1 / v < 0 ? (v = -v, -1) : 1;

        // Fast path for integers, where n < 2147483648 (2**31).
        if (v === ~~v) {
          for (e = 0, i = v; i >= 10; i /= 10, e++);

          if (e > MAX_EXP) {
            x.c = x.e = null;
          } else {
            x.e = e;
            x.c = [v];
          }

          return;
        }

        str = String(v);
      } else {

        if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

        x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
      }

      // Decimal point?
      if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

      // Exponential form?
      if ((i = str.search(/e/i)) > 0) {

        // Determine exponent.
        if (e < 0) e = i;
        e += +str.slice(i + 1);
        str = str.substring(0, i);
      } else if (e < 0) {

        // Integer.
        e = str.length;
      }

    } else {

      // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
      intCheck(b, 2, ALPHABET.length, 'Base');

      // Allow exponential notation to be used with base 10 argument, while
      // also rounding to DECIMAL_PLACES as with other bases.
      if (b == 10 && alphabetHasNormalDecimalDigits) {
        x = new BigNumber(v);
        return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
      }

      str = String(v);

      if (isNum = typeof v == 'number') {

        // Avoid potential interpretation of Infinity and NaN as base 44+ values.
        if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

        x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
          throw Error
           (tooManyDigits + v);
        }
      } else {
        x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
      }

      alphabet = ALPHABET.slice(0, b);
      e = i = 0;

      // Check that str is a valid base b number.
      // Don't use RegExp, so alphabet can contain special characters.
      for (len = str.length; i < len; i++) {
        if (alphabet.indexOf(c = str.charAt(i)) < 0) {
          if (c == '.') {

            // If '.' is not the first character and it has not be found before.
            if (i > e) {
              e = len;
              continue;
            }
          } else if (!caseChanged) {

            // Allow e.g. hexadecimal 'FF' as well as 'ff'.
            if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                str == str.toLowerCase() && (str = str.toUpperCase())) {
              caseChanged = true;
              i = -1;
              e = 0;
              continue;
            }
          }

          return parseNumeric(x, String(v), isNum, b);
        }
      }

      // Prevent later check for length on converted number.
      isNum = false;
      str = convertBase(str, b, 10, x.s);

      // Decimal point?
      if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
      else e = str.length;
    }

    // Determine leading zeros.
    for (i = 0; str.charCodeAt(i) === 48; i++);

    // Determine trailing zeros.
    for (len = str.length; str.charCodeAt(--len) === 48;);

    if (str = str.slice(i, ++len)) {
      len -= i;

      // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
      if (isNum && BigNumber.DEBUG &&
        len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
          throw Error
           (tooManyDigits + (x.s * v));
      }

       // Overflow?
      if ((e = e - i - 1) > MAX_EXP) {

        // Infinity.
        x.c = x.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        x.c = [x.e = 0];
      } else {
        x.e = e;
        x.c = [];

        // Transform base

        // e is the base 10 exponent.
        // i is where to slice str to get the first element of the coefficient array.
        i = (e + 1) % LOG_BASE;
        if (e < 0) i += LOG_BASE;  // i < 1

        if (i < len) {
          if (i) x.c.push(+str.slice(0, i));

          for (len -= LOG_BASE; i < len;) {
            x.c.push(+str.slice(i, i += LOG_BASE));
          }

          i = LOG_BASE - (str = str.slice(i)).length;
        } else {
          i -= len;
        }

        for (; i--; str += '0');
        x.c.push(+str);
      }
    } else {

      // Zero.
      x.c = [x.e = 0];
    }
  }


  // CONSTRUCTOR PROPERTIES


  BigNumber.clone = clone;

  BigNumber.ROUND_UP = 0;
  BigNumber.ROUND_DOWN = 1;
  BigNumber.ROUND_CEIL = 2;
  BigNumber.ROUND_FLOOR = 3;
  BigNumber.ROUND_HALF_UP = 4;
  BigNumber.ROUND_HALF_DOWN = 5;
  BigNumber.ROUND_HALF_EVEN = 6;
  BigNumber.ROUND_HALF_CEIL = 7;
  BigNumber.ROUND_HALF_FLOOR = 8;
  BigNumber.EUCLID = 9;


  /*
   * Configure infrequently-changing library-wide settings.
   *
   * Accept an object with the following optional properties (if the value of a property is
   * a number, it must be an integer within the inclusive range stated):
   *
   *   DECIMAL_PLACES   {number}           0 to MAX
   *   ROUNDING_MODE    {number}           0 to 8
   *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
   *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
   *   CRYPTO           {boolean}          true or false
   *   MODULO_MODE      {number}           0 to 9
   *   POW_PRECISION       {number}           0 to MAX
   *   ALPHABET         {string}           A string of two or more unique characters which does
   *                                       not contain '.'.
   *   FORMAT           {object}           An object with some of the following properties:
   *     prefix                 {string}
   *     groupSize              {number}
   *     secondaryGroupSize     {number}
   *     groupSeparator         {string}
   *     decimalSeparator       {string}
   *     fractionGroupSize      {number}
   *     fractionGroupSeparator {string}
   *     suffix                 {string}
   *
   * (The values assigned to the above FORMAT object properties are not checked for validity.)
   *
   * E.g.
   * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
   *
   * Ignore properties/parameters set to null or undefined, except for ALPHABET.
   *
   * Return an object with the properties current values.
   */
  BigNumber.config = BigNumber.set = function (obj) {
    var p, v;

    if (obj != null) {

      if (typeof obj == 'object') {

        // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
        // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          DECIMAL_PLACES = v;
        }

        // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
        // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
          v = obj[p];
          intCheck(v, 0, 8, p);
          ROUNDING_MODE = v;
        }

        // EXPONENTIAL_AT {number|number[]}
        // Integer, -MAX to MAX inclusive or
        // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
        // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, 0, p);
            intCheck(v[1], 0, MAX, p);
            TO_EXP_NEG = v[0];
            TO_EXP_POS = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
          }
        }

        // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
        // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
        // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
        if (obj.hasOwnProperty(p = 'RANGE')) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, -1, p);
            intCheck(v[1], 1, MAX, p);
            MIN_EXP = v[0];
            MAX_EXP = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            if (v) {
              MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
            } else {
              throw Error
               (bignumberError + p + ' cannot be zero: ' + v);
            }
          }
        }

        // CRYPTO {boolean} true or false.
        // '[BigNumber Error] CRYPTO not true or false: {v}'
        // '[BigNumber Error] crypto unavailable'
        if (obj.hasOwnProperty(p = 'CRYPTO')) {
          v = obj[p];
          if (v === !!v) {
            if (v) {
              if (typeof crypto != 'undefined' && crypto &&
               (crypto.getRandomValues || crypto.randomBytes)) {
                CRYPTO = v;
              } else {
                CRYPTO = !v;
                throw Error
                 (bignumberError + 'crypto unavailable');
              }
            } else {
              CRYPTO = v;
            }
          } else {
            throw Error
             (bignumberError + p + ' not true or false: ' + v);
          }
        }

        // MODULO_MODE {number} Integer, 0 to 9 inclusive.
        // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
          v = obj[p];
          intCheck(v, 0, 9, p);
          MODULO_MODE = v;
        }

        // POW_PRECISION {number} Integer, 0 to MAX inclusive.
        // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          POW_PRECISION = v;
        }

        // FORMAT {object}
        // '[BigNumber Error] FORMAT not an object: {v}'
        if (obj.hasOwnProperty(p = 'FORMAT')) {
          v = obj[p];
          if (typeof v == 'object') FORMAT = v;
          else throw Error
           (bignumberError + p + ' not an object: ' + v);
        }

        // ALPHABET {string}
        // '[BigNumber Error] ALPHABET invalid: {v}'
        if (obj.hasOwnProperty(p = 'ALPHABET')) {
          v = obj[p];

          // Disallow if less than two characters,
          // or if it contains '+', '-', '.', whitespace, or a repeated character.
          if (typeof v == 'string' && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
            alphabetHasNormalDecimalDigits = v.slice(0, 10) == '0123456789';
            ALPHABET = v;
          } else {
            throw Error
             (bignumberError + p + ' invalid: ' + v);
          }
        }

      } else {

        // '[BigNumber Error] Object expected: {v}'
        throw Error
         (bignumberError + 'Object expected: ' + obj);
      }
    }

    return {
      DECIMAL_PLACES: DECIMAL_PLACES,
      ROUNDING_MODE: ROUNDING_MODE,
      EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
      RANGE: [MIN_EXP, MAX_EXP],
      CRYPTO: CRYPTO,
      MODULO_MODE: MODULO_MODE,
      POW_PRECISION: POW_PRECISION,
      FORMAT: FORMAT,
      ALPHABET: ALPHABET
    };
  };


  /*
   * Return true if v is a BigNumber instance, otherwise return false.
   *
   * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
   *
   * v {any}
   *
   * '[BigNumber Error] Invalid BigNumber: {v}'
   */
  BigNumber.isBigNumber = function (v) {
    if (!v || v._isBigNumber !== true) return false;
    if (!BigNumber.DEBUG) return true;

    var i, n,
      c = v.c,
      e = v.e,
      s = v.s;

    out: if ({}.toString.call(c) == '[object Array]') {

      if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

        // If the first element is zero, the BigNumber value must be zero.
        if (c[0] === 0) {
          if (e === 0 && c.length === 1) return true;
          break out;
        }

        // Calculate number of digits that c[0] should have, based on the exponent.
        i = (e + 1) % LOG_BASE;
        if (i < 1) i += LOG_BASE;

        // Calculate number of digits of c[0].
        //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
        if (String(c[0]).length == i) {

          for (i = 0; i < c.length; i++) {
            n = c[i];
            if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
          }

          // Last element cannot be zero, unless it is the only element.
          if (n !== 0) return true;
        }
      }

    // Infinity/NaN
    } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
      return true;
    }

    throw Error
      (bignumberError + 'Invalid BigNumber: ' + v);
  };


  /*
   * Return a new BigNumber whose value is the maximum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.maximum = BigNumber.max = function () {
    return maxOrMin(arguments, P.lt);
  };


  /*
   * Return a new BigNumber whose value is the minimum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.minimum = BigNumber.min = function () {
    return maxOrMin(arguments, P.gt);
  };


  /*
   * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
   * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
   * zeros are produced).
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
   * '[BigNumber Error] crypto unavailable'
   */
  BigNumber.random = (function () {
    var pow2_53 = 0x20000000000000;

    // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
    // Check if Math.random() produces more than 32 bits of randomness.
    // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
    // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
    var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
     ? function () { return mathfloor(Math.random() * pow2_53); }
     : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
       (Math.random() * 0x800000 | 0); };

    return function (dp) {
      var a, b, e, k, v,
        i = 0,
        c = [],
        rand = new BigNumber(ONE);

      if (dp == null) dp = DECIMAL_PLACES;
      else intCheck(dp, 0, MAX);

      k = mathceil(dp / LOG_BASE);

      if (CRYPTO) {

        // Browsers supporting crypto.getRandomValues.
        if (crypto.getRandomValues) {

          a = crypto.getRandomValues(new Uint32Array(k *= 2));

          for (; i < k;) {

            // 53 bits:
            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
            //                                     11111 11111111 11111111
            // 0x20000 is 2^21.
            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

            // Rejection sampling:
            // 0 <= v < 9007199254740992
            // Probability that v >= 9e15, is
            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
            if (v >= 9e15) {
              b = crypto.getRandomValues(new Uint32Array(2));
              a[i] = b[0];
              a[i + 1] = b[1];
            } else {

              // 0 <= v <= 8999999999999999
              // 0 <= (v % 1e14) <= 99999999999999
              c.push(v % 1e14);
              i += 2;
            }
          }
          i = k / 2;

        // Node.js supporting crypto.randomBytes.
        } else if (crypto.randomBytes) {

          // buffer
          a = crypto.randomBytes(k *= 7);

          for (; i < k;) {

            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
            // 0x100000000 is 2^32, 0x1000000 is 2^24
            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
            // 0 <= v < 9007199254740992
            v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
               (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
               (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

            if (v >= 9e15) {
              crypto.randomBytes(7).copy(a, i);
            } else {

              // 0 <= (v % 1e14) <= 99999999999999
              c.push(v % 1e14);
              i += 7;
            }
          }
          i = k / 7;
        } else {
          CRYPTO = false;
          throw Error
           (bignumberError + 'crypto unavailable');
        }
      }

      // Use Math.random.
      if (!CRYPTO) {

        for (; i < k;) {
          v = random53bitInt();
          if (v < 9e15) c[i++] = v % 1e14;
        }
      }

      k = c[--i];
      dp %= LOG_BASE;

      // Convert trailing digits to zeros according to dp.
      if (k && dp) {
        v = POWS_TEN[LOG_BASE - dp];
        c[i] = mathfloor(k / v) * v;
      }

      // Remove trailing elements which are zero.
      for (; c[i] === 0; c.pop(), i--);

      // Zero?
      if (i < 0) {
        c = [e = 0];
      } else {

        // Remove leading elements which are zero and adjust exponent accordingly.
        for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

        // Count the digits of the first element of c to determine leading zeros, and...
        for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

        // adjust the exponent accordingly.
        if (i < LOG_BASE) e -= LOG_BASE - i;
      }

      rand.e = e;
      rand.c = c;
      return rand;
    };
  })();


   /*
   * Return a BigNumber whose value is the sum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.sum = function () {
    var i = 1,
      args = arguments,
      sum = new BigNumber(args[0]);
    for (; i < args.length;) sum = sum.plus(args[i++]);
    return sum;
  };


  // PRIVATE FUNCTIONS


  // Called by BigNumber and BigNumber.prototype.toString.
  convertBase = (function () {
    var decimal = '0123456789';

    /*
     * Convert string of baseIn to an array of numbers of baseOut.
     * Eg. toBaseOut('255', 10, 16) returns [15, 15].
     * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
     */
    function toBaseOut(str, baseIn, baseOut, alphabet) {
      var j,
        arr = [0],
        arrL,
        i = 0,
        len = str.length;

      for (; i < len;) {
        for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

        arr[0] += alphabet.indexOf(str.charAt(i++));

        for (j = 0; j < arr.length; j++) {

          if (arr[j] > baseOut - 1) {
            if (arr[j + 1] == null) arr[j + 1] = 0;
            arr[j + 1] += arr[j] / baseOut | 0;
            arr[j] %= baseOut;
          }
        }
      }

      return arr.reverse();
    }

    // Convert a numeric string of baseIn to a numeric string of baseOut.
    // If the caller is toString, we are converting from base 10 to baseOut.
    // If the caller is BigNumber, we are converting from baseIn to base 10.
    return function (str, baseIn, baseOut, sign, callerIsToString) {
      var alphabet, d, e, k, r, x, xc, y,
        i = str.indexOf('.'),
        dp = DECIMAL_PLACES,
        rm = ROUNDING_MODE;

      // Non-integer.
      if (i >= 0) {
        k = POW_PRECISION;

        // Unlimited precision.
        POW_PRECISION = 0;
        str = str.replace('.', '');
        y = new BigNumber(baseIn);
        x = y.pow(str.length - i);
        POW_PRECISION = k;

        // Convert str as if an integer, then restore the fraction part by dividing the
        // result by its base raised to a power.

        y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
         10, baseOut, decimal);
        y.e = y.c.length;
      }

      // Convert the number as integer.

      xc = toBaseOut(str, baseIn, baseOut, callerIsToString
       ? (alphabet = ALPHABET, decimal)
       : (alphabet = decimal, ALPHABET));

      // xc now represents str as an integer and converted to baseOut. e is the exponent.
      e = k = xc.length;

      // Remove trailing zeros.
      for (; xc[--k] == 0; xc.pop());

      // Zero?
      if (!xc[0]) return alphabet.charAt(0);

      // Does str represent an integer? If so, no need for the division.
      if (i < 0) {
        --e;
      } else {
        x.c = xc;
        x.e = e;

        // The sign is needed for correct rounding.
        x.s = sign;
        x = div(x, y, dp, rm, baseOut);
        xc = x.c;
        r = x.r;
        e = x.e;
      }

      // xc now represents str converted to baseOut.

      // THe index of the rounding digit.
      d = e + dp + 1;

      // The rounding digit: the digit to the right of the digit that may be rounded up.
      i = xc[d];

      // Look at the rounding digits and mode to determine whether to round up.

      k = baseOut / 2;
      r = r || d < 0 || xc[d + 1] != null;

      r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
            : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
             rm == (x.s < 0 ? 8 : 7));

      // If the index of the rounding digit is not greater than zero, or xc represents
      // zero, then the result of the base conversion is zero or, if rounding up, a value
      // such as 0.00001.
      if (d < 1 || !xc[0]) {

        // 1^-dp or 0
        str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
      } else {

        // Truncate xc to the required number of decimal places.
        xc.length = d;

        // Round up?
        if (r) {

          // Rounding up may mean the previous digit has to be rounded up and so on.
          for (--baseOut; ++xc[--d] > baseOut;) {
            xc[d] = 0;

            if (!d) {
              ++e;
              xc = [1].concat(xc);
            }
          }
        }

        // Determine trailing zeros.
        for (k = xc.length; !xc[--k];);

        // E.g. [4, 11, 15] becomes 4bf.
        for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

        // Add leading zeros, decimal point and trailing zeros as required.
        str = toFixedPoint(str, e, alphabet.charAt(0));
      }

      // The caller will add the sign.
      return str;
    };
  })();


  // Perform division in the specified base. Called by div and convertBase.
  div = (function () {

    // Assume non-zero x and k.
    function multiply(x, k, base) {
      var m, temp, xlo, xhi,
        carry = 0,
        i = x.length,
        klo = k % SQRT_BASE,
        khi = k / SQRT_BASE | 0;

      for (x = x.slice(); i--;) {
        xlo = x[i] % SQRT_BASE;
        xhi = x[i] / SQRT_BASE | 0;
        m = khi * xlo + xhi * klo;
        temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
        carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
        x[i] = temp % base;
      }

      if (carry) x = [carry].concat(x);

      return x;
    }

    function compare(a, b, aL, bL) {
      var i, cmp;

      if (aL != bL) {
        cmp = aL > bL ? 1 : -1;
      } else {

        for (i = cmp = 0; i < aL; i++) {

          if (a[i] != b[i]) {
            cmp = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }

      return cmp;
    }

    function subtract(a, b, aL, base) {
      var i = 0;

      // Subtract b from a.
      for (; aL--;) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      }

      // Remove leading zeros.
      for (; !a[0] && a.length > 1; a.splice(0, 1));
    }

    // x: dividend, y: divisor.
    return function (x, y, dp, rm, base) {
      var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
        yL, yz,
        s = x.s == y.s ? 1 : -1,
        xc = x.c,
        yc = y.c;

      // Either NaN, Infinity or 0?
      if (!xc || !xc[0] || !yc || !yc[0]) {

        return new BigNumber(

         // Return NaN if either NaN, or both Infinity or 0.
         !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

          // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
          xc && xc[0] == 0 || !yc ? s * 0 : s / 0
       );
      }

      q = new BigNumber(s);
      qc = q.c = [];
      e = x.e - y.e;
      s = dp + e + 1;

      if (!base) {
        base = BASE;
        e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
        s = s / LOG_BASE | 0;
      }

      // Result exponent may be one less then the current value of e.
      // The coefficients of the BigNumbers from convertBase may have trailing zeros.
      for (i = 0; yc[i] == (xc[i] || 0); i++);

      if (yc[i] > (xc[i] || 0)) e--;

      if (s < 0) {
        qc.push(1);
        more = true;
      } else {
        xL = xc.length;
        yL = yc.length;
        i = 0;
        s += 2;

        // Normalise xc and yc so highest order digit of yc is >= base / 2.

        n = mathfloor(base / (yc[0] + 1));

        // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
        // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
        if (n > 1) {
          yc = multiply(yc, n, base);
          xc = multiply(xc, n, base);
          yL = yc.length;
          xL = xc.length;
        }

        xi = yL;
        rem = xc.slice(0, yL);
        remL = rem.length;

        // Add zeros to make remainder as long as divisor.
        for (; remL < yL; rem[remL++] = 0);
        yz = yc.slice();
        yz = [0].concat(yz);
        yc0 = yc[0];
        if (yc[1] >= base / 2) yc0++;
        // Not necessary, but to prevent trial digit n > base, when using base 3.
        // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

        do {
          n = 0;

          // Compare divisor and remainder.
          cmp = compare(yc, rem, yL, remL);

          // If divisor < remainder.
          if (cmp < 0) {

            // Calculate trial digit, n.

            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

            // n is how many times the divisor goes into the current remainder.
            n = mathfloor(rem0 / yc0);

            //  Algorithm:
            //  product = divisor multiplied by trial digit (n).
            //  Compare product and remainder.
            //  If product is greater than remainder:
            //    Subtract divisor from product, decrement trial digit.
            //  Subtract product from remainder.
            //  If product was less than remainder at the last compare:
            //    Compare new remainder and divisor.
            //    If remainder is greater than divisor:
            //      Subtract divisor from remainder, increment trial digit.

            if (n > 1) {

              // n may be > base only when base is 3.
              if (n >= base) n = base - 1;

              // product = divisor * trial digit.
              prod = multiply(yc, n, base);
              prodL = prod.length;
              remL = rem.length;

              // Compare product and remainder.
              // If product > remainder then trial digit n too high.
              // n is 1 too high about 5% of the time, and is not known to have
              // ever been more than 1 too high.
              while (compare(prod, rem, prodL, remL) == 1) {
                n--;

                // Subtract divisor from product.
                subtract(prod, yL < prodL ? yz : yc, prodL, base);
                prodL = prod.length;
                cmp = 1;
              }
            } else {

              // n is 0 or 1, cmp is -1.
              // If n is 0, there is no need to compare yc and rem again below,
              // so change cmp to 1 to avoid it.
              // If n is 1, leave cmp as -1, so yc and rem are compared again.
              if (n == 0) {

                // divisor < remainder, so n must be at least 1.
                cmp = n = 1;
              }

              // product = divisor
              prod = yc.slice();
              prodL = prod.length;
            }

            if (prodL < remL) prod = [0].concat(prod);

            // Subtract product from remainder.
            subtract(rem, prod, remL, base);
            remL = rem.length;

             // If product was < remainder.
            if (cmp == -1) {

              // Compare divisor and new remainder.
              // If divisor < new remainder, subtract divisor from remainder.
              // Trial digit n too low.
              // n is 1 too low about 5% of the time, and very rarely 2 too low.
              while (compare(yc, rem, yL, remL) < 1) {
                n++;

                // Subtract divisor from remainder.
                subtract(rem, yL < remL ? yz : yc, remL, base);
                remL = rem.length;
              }
            }
          } else if (cmp === 0) {
            n++;
            rem = [0];
          } // else cmp === 1 and n will be 0

          // Add the next digit, n, to the result array.
          qc[i++] = n;

          // Update the remainder.
          if (rem[0]) {
            rem[remL++] = xc[xi] || 0;
          } else {
            rem = [xc[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] != null) && s--);

        more = rem[0] != null;

        // Leading zero?
        if (!qc[0]) qc.splice(0, 1);
      }

      if (base == BASE) {

        // To calculate q.e, first get the number of digits of qc[0].
        for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

        round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

      // Caller is convertBase.
      } else {
        q.e = e;
        q.r = +more;
      }

      return q;
    };
  })();


  /*
   * Return a string representing the value of BigNumber n in fixed-point or exponential
   * notation rounded to the specified decimal places or significant digits.
   *
   * n: a BigNumber.
   * i: the index of the last digit required (i.e. the digit that may be rounded up).
   * rm: the rounding mode.
   * id: 1 (toExponential) or 2 (toPrecision).
   */
  function format(n, i, rm, id) {
    var c0, e, ne, len, str;

    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);

    if (!n.c) return n.toString();

    c0 = n.c[0];
    ne = n.e;

    if (i == null) {
      str = coeffToString(n.c);
      str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
       ? toExponential(str, ne)
       : toFixedPoint(str, ne, '0');
    } else {
      n = round(new BigNumber(n), i, rm);

      // n.e may have changed if the value was rounded up.
      e = n.e;

      str = coeffToString(n.c);
      len = str.length;

      // toPrecision returns exponential notation if the number of significant digits
      // specified is less than the number of digits necessary to represent the integer
      // part of the value in fixed-point notation.

      // Exponential notation.
      if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

        // Append zeros?
        for (; len < i; str += '0', len++);
        str = toExponential(str, e);

      // Fixed-point notation.
      } else {
        i -= ne;
        str = toFixedPoint(str, e, '0');

        // Append zeros?
        if (e + 1 > len) {
          if (--i > 0) for (str += '.'; i--; str += '0');
        } else {
          i += e - len;
          if (i > 0) {
            if (e + 1 == len) str += '.';
            for (; i--; str += '0');
          }
        }
      }
    }

    return n.s < 0 && c0 ? '-' + str : str;
  }


  // Handle BigNumber.max and BigNumber.min.
  function maxOrMin(args, method) {
    var n,
      i = 1,
      m = new BigNumber(args[0]);

    for (; i < args.length; i++) {
      n = new BigNumber(args[i]);

      // If any number is NaN, return NaN.
      if (!n.s) {
        m = n;
        break;
      } else if (method.call(m, n)) {
        m = n;
      }
    }

    return m;
  }


  /*
   * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
   * Called by minus, plus and times.
   */
  function normalise(n, c, e) {
    var i = 1,
      j = c.length;

     // Remove trailing zeros.
    for (; !c[--j]; c.pop());

    // Calculate the base 10 exponent. First get the number of digits of c[0].
    for (j = c[0]; j >= 10; j /= 10, i++);

    // Overflow?
    if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

      // Infinity.
      n.c = n.e = null;

    // Underflow?
    } else if (e < MIN_EXP) {

      // Zero.
      n.c = [n.e = 0];
    } else {
      n.e = e;
      n.c = c;
    }

    return n;
  }


  // Handle values that fail the validity test in BigNumber.
  parseNumeric = (function () {
    var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
      dotAfter = /^([^.]+)\.$/,
      dotBefore = /^\.([^.]+)$/,
      isInfinityOrNaN = /^-?(Infinity|NaN)$/,
      whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

    return function (x, str, isNum, b) {
      var base,
        s = isNum ? str : str.replace(whitespaceOrPlus, '');

      // No exception on ±Infinity or NaN.
      if (isInfinityOrNaN.test(s)) {
        x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
      } else {
        if (!isNum) {

          // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
          s = s.replace(basePrefix, function (m, p1, p2) {
            base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
            return !b || b == base ? p1 : m;
          });

          if (b) {
            base = b;

            // E.g. '1.' to '1', '.1' to '0.1'
            s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
          }

          if (str != s) return new BigNumber(s, base);
        }

        // '[BigNumber Error] Not a number: {n}'
        // '[BigNumber Error] Not a base {b} number: {n}'
        if (BigNumber.DEBUG) {
          throw Error
            (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
        }

        // NaN
        x.s = null;
      }

      x.c = x.e = null;
    }
  })();


  /*
   * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
   * If r is truthy, it is known that there are more digits after the rounding digit.
   */
  function round(x, sd, rm, r) {
    var d, i, j, k, n, ni, rd,
      xc = x.c,
      pows10 = POWS_TEN;

    // if x is not Infinity or NaN...
    if (xc) {

      // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
      // n is a base 1e14 number, the value of the element of array x.c containing rd.
      // ni is the index of n within x.c.
      // d is the number of digits of n.
      // i is the index of rd within n including leading zeros.
      // j is the actual index of rd within n (if < 0, rd is a leading zero).
      out: {

        // Get the number of digits of the first element of xc.
        for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
        i = sd - d;

        // If the rounding digit is in the first element of xc...
        if (i < 0) {
          i += LOG_BASE;
          j = sd;
          n = xc[ni = 0];

          // Get the rounding digit at index j of n.
          rd = n / pows10[d - j - 1] % 10 | 0;
        } else {
          ni = mathceil((i + 1) / LOG_BASE);

          if (ni >= xc.length) {

            if (r) {

              // Needed by sqrt.
              for (; xc.length <= ni; xc.push(0));
              n = rd = 0;
              d = 1;
              i %= LOG_BASE;
              j = i - LOG_BASE + 1;
            } else {
              break out;
            }
          } else {
            n = k = xc[ni];

            // Get the number of digits of n.
            for (d = 1; k >= 10; k /= 10, d++);

            // Get the index of rd within n.
            i %= LOG_BASE;

            // Get the index of rd within n, adjusted for leading zeros.
            // The number of leading zeros of n is given by LOG_BASE - d.
            j = i - LOG_BASE + d;

            // Get the rounding digit at index j of n.
            rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
          }
        }

        r = r || sd < 0 ||

        // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
         xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

        r = rm < 4
         ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
         : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

          // Check whether the digit to the left of the rounding digit is odd.
          ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
           rm == (x.s < 0 ? 8 : 7));

        if (sd < 1 || !xc[0]) {
          xc.length = 0;

          if (r) {

            // Convert sd to decimal places.
            sd -= x.e + 1;

            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
            xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
            x.e = -sd || 0;
          } else {

            // Zero.
            xc[0] = x.e = 0;
          }

          return x;
        }

        // Remove excess digits.
        if (i == 0) {
          xc.length = ni;
          k = 1;
          ni--;
        } else {
          xc.length = ni + 1;
          k = pows10[LOG_BASE - i];

          // E.g. 56700 becomes 56000 if 7 is the rounding digit.
          // j > 0 means i > number of leading zeros of n.
          xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
        }

        // Round up?
        if (r) {

          for (; ;) {

            // If the digit to be rounded up is in the first element of xc...
            if (ni == 0) {

              // i will be the length of xc[0] before k is added.
              for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
              j = xc[0] += k;
              for (k = 1; j >= 10; j /= 10, k++);

              // if i != k the length has increased.
              if (i != k) {
                x.e++;
                if (xc[0] == BASE) xc[0] = 1;
              }

              break;
            } else {
              xc[ni] += k;
              if (xc[ni] != BASE) break;
              xc[ni--] = 0;
              k = 1;
            }
          }
        }

        // Remove trailing zeros.
        for (i = xc.length; xc[--i] === 0; xc.pop());
      }

      // Overflow? Infinity.
      if (x.e > MAX_EXP) {
        x.c = x.e = null;

      // Underflow? Zero.
      } else if (x.e < MIN_EXP) {
        x.c = [x.e = 0];
      }
    }

    return x;
  }


  function valueOf(n) {
    var str,
      e = n.e;

    if (e === null) return n.toString();

    str = coeffToString(n.c);

    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
      ? toExponential(str, e)
      : toFixedPoint(str, e, '0');

    return n.s < 0 ? '-' + str : str;
  }


  // PROTOTYPE/INSTANCE METHODS


  /*
   * Return a new BigNumber whose value is the absolute value of this BigNumber.
   */
  P.absoluteValue = P.abs = function () {
    var x = new BigNumber(this);
    if (x.s < 0) x.s = 1;
    return x;
  };


  /*
   * Return
   *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
   *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
   *   0 if they have the same value,
   *   or null if the value of either is NaN.
   */
  P.comparedTo = function (y, b) {
    return compare(this, new BigNumber(y, b));
  };


  /*
   * If dp is undefined or null or true or false, return the number of decimal places of the
   * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
   *
   * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
   * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
   * ROUNDING_MODE if rm is omitted.
   *
   * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.decimalPlaces = P.dp = function (dp, rm) {
    var c, n, v,
      x = this;

    if (dp != null) {
      intCheck(dp, 0, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      return round(new BigNumber(x), dp + x.e + 1, rm);
    }

    if (!(c = x.c)) return null;
    n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

    // Subtract the number of trailing zeros of the last number.
    if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
    if (n < 0) n = 0;

    return n;
  };


  /*
   *  n / 0 = I
   *  n / N = N
   *  n / I = 0
   *  0 / n = 0
   *  0 / 0 = N
   *  0 / N = N
   *  0 / I = 0
   *  N / n = N
   *  N / 0 = N
   *  N / N = N
   *  N / I = N
   *  I / n = I
   *  I / 0 = I
   *  I / N = N
   *  I / I = N
   *
   * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
   * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
   */
  P.dividedBy = P.div = function (y, b) {
    return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
  };


  /*
   * Return a new BigNumber whose value is the integer part of dividing the value of this
   * BigNumber by the value of BigNumber(y, b).
   */
  P.dividedToIntegerBy = P.idiv = function (y, b) {
    return div(this, new BigNumber(y, b), 0, 1);
  };


  /*
   * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
   *
   * If m is present, return the result modulo m.
   * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
   * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
   *
   * The modular power operation works efficiently when x, n, and m are integers, otherwise it
   * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
   *
   * n {number|string|BigNumber} The exponent. An integer.
   * [m] {number|string|BigNumber} The modulus.
   *
   * '[BigNumber Error] Exponent not an integer: {n}'
   */
  P.exponentiatedBy = P.pow = function (n, m) {
    var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
      x = this;

    n = new BigNumber(n);

    // Allow NaN and ±Infinity, but not other non-integers.
    if (n.c && !n.isInteger()) {
      throw Error
        (bignumberError + 'Exponent not an integer: ' + valueOf(n));
    }

    if (m != null) m = new BigNumber(m);

    // Exponent of MAX_SAFE_INTEGER is 15.
    nIsBig = n.e > 14;

    // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
    if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

      // The sign of the result of pow when x is negative depends on the evenness of n.
      // If +n overflows to ±Infinity, the evenness of n would be not be known.
      y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
      return m ? y.mod(m) : y;
    }

    nIsNeg = n.s < 0;

    if (m) {

      // x % m returns NaN if abs(m) is zero, or m is NaN.
      if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

      isModExp = !nIsNeg && x.isInteger() && m.isInteger();

      if (isModExp) x = x.mod(m);

    // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
    // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
    } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
      // [1, 240000000]
      ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
      // [80000000000000]  [99999750000000]
      : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

      // If x is negative and n is odd, k = -0, else k = 0.
      k = x.s < 0 && isOdd(n) ? -0 : 0;

      // If x >= 1, k = ±Infinity.
      if (x.e > -1) k = 1 / k;

      // If n is negative return ±0, else return ±Infinity.
      return new BigNumber(nIsNeg ? 1 / k : k);

    } else if (POW_PRECISION) {

      // Truncating each coefficient array to a length of k after each multiplication
      // equates to truncating significant digits to POW_PRECISION + [28, 41],
      // i.e. there will be a minimum of 28 guard digits retained.
      k = mathceil(POW_PRECISION / LOG_BASE + 2);
    }

    if (nIsBig) {
      half = new BigNumber(0.5);
      if (nIsNeg) n.s = 1;
      nIsOdd = isOdd(n);
    } else {
      i = Math.abs(+valueOf(n));
      nIsOdd = i % 2;
    }

    y = new BigNumber(ONE);

    // Performs 54 loop iterations for n of 9007199254740991.
    for (; ;) {

      if (nIsOdd) {
        y = y.times(x);
        if (!y.c) break;

        if (k) {
          if (y.c.length > k) y.c.length = k;
        } else if (isModExp) {
          y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
        }
      }

      if (i) {
        i = mathfloor(i / 2);
        if (i === 0) break;
        nIsOdd = i % 2;
      } else {
        n = n.times(half);
        round(n, n.e + 1, 1);

        if (n.e > 14) {
          nIsOdd = isOdd(n);
        } else {
          i = +valueOf(n);
          if (i === 0) break;
          nIsOdd = i % 2;
        }
      }

      x = x.times(x);

      if (k) {
        if (x.c && x.c.length > k) x.c.length = k;
      } else if (isModExp) {
        x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
      }
    }

    if (isModExp) return y;
    if (nIsNeg) y = ONE.div(y);

    return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
   * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
   *
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
   */
  P.integerValue = function (rm) {
    var n = new BigNumber(this);
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    return round(n, n.e + 1, rm);
  };


  /*
   * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isEqualTo = P.eq = function (y, b) {
    return compare(this, new BigNumber(y, b)) === 0;
  };


  /*
   * Return true if the value of this BigNumber is a finite number, otherwise return false.
   */
  P.isFinite = function () {
    return !!this.c;
  };


  /*
   * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isGreaterThan = P.gt = function (y, b) {
    return compare(this, new BigNumber(y, b)) > 0;
  };


  /*
   * Return true if the value of this BigNumber is greater than or equal to the value of
   * BigNumber(y, b), otherwise return false.
   */
  P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
    return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

  };


  /*
   * Return true if the value of this BigNumber is an integer, otherwise return false.
   */
  P.isInteger = function () {
    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
  };


  /*
   * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isLessThan = P.lt = function (y, b) {
    return compare(this, new BigNumber(y, b)) < 0;
  };


  /*
   * Return true if the value of this BigNumber is less than or equal to the value of
   * BigNumber(y, b), otherwise return false.
   */
  P.isLessThanOrEqualTo = P.lte = function (y, b) {
    return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
  };


  /*
   * Return true if the value of this BigNumber is NaN, otherwise return false.
   */
  P.isNaN = function () {
    return !this.s;
  };


  /*
   * Return true if the value of this BigNumber is negative, otherwise return false.
   */
  P.isNegative = function () {
    return this.s < 0;
  };


  /*
   * Return true if the value of this BigNumber is positive, otherwise return false.
   */
  P.isPositive = function () {
    return this.s > 0;
  };


  /*
   * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
   */
  P.isZero = function () {
    return !!this.c && this.c[0] == 0;
  };


  /*
   *  n - 0 = n
   *  n - N = N
   *  n - I = -I
   *  0 - n = -n
   *  0 - 0 = 0
   *  0 - N = N
   *  0 - I = -I
   *  N - n = N
   *  N - 0 = N
   *  N - N = N
   *  N - I = N
   *  I - n = I
   *  I - 0 = I
   *  I - N = N
   *  I - I = N
   *
   * Return a new BigNumber whose value is the value of this BigNumber minus the value of
   * BigNumber(y, b).
   */
  P.minus = function (y, b) {
    var i, j, t, xLTy,
      x = this,
      a = x.s;

    y = new BigNumber(y, b);
    b = y.s;

    // Either NaN?
    if (!a || !b) return new BigNumber(NaN);

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }

    var xe = x.e / LOG_BASE,
      ye = y.e / LOG_BASE,
      xc = x.c,
      yc = y.c;

    if (!xe || !ye) {

      // Either Infinity?
      if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

      // Either zero?
      if (!xc[0] || !yc[0]) {

        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

         // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
         ROUNDING_MODE == 3 ? -0 : 0);
      }
    }

    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();

    // Determine which is the bigger number.
    if (a = xe - ye) {

      if (xLTy = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }

      t.reverse();

      // Prepend zeros to equalise exponents.
      for (b = a; b--; t.push(0));
      t.reverse();
    } else {

      // Exponents equal. Check digit by digit.
      j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

      for (a = b = 0; b < j; b++) {

        if (xc[b] != yc[b]) {
          xLTy = xc[b] < yc[b];
          break;
        }
      }
    }

    // x < y? Point xc to the array of the bigger number.
    if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

    b = (j = yc.length) - (i = xc.length);

    // Append zeros to xc if shorter.
    // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
    if (b > 0) for (; b--; xc[i++] = 0);
    b = BASE - 1;

    // Subtract yc from xc.
    for (; j > a;) {

      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i]; xc[i] = b);
        --xc[i];
        xc[j] += BASE;
      }

      xc[j] -= yc[j];
    }

    // Remove leading zeros and adjust exponent accordingly.
    for (; xc[0] == 0; xc.splice(0, 1), --ye);

    // Zero?
    if (!xc[0]) {

      // Following IEEE 754 (2008) 6.3,
      // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
      y.s = ROUNDING_MODE == 3 ? -1 : 1;
      y.c = [y.e = 0];
      return y;
    }

    // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
    // for finite x and y.
    return normalise(y, xc, ye);
  };


  /*
   *   n % 0 =  N
   *   n % N =  N
   *   n % I =  n
   *   0 % n =  0
   *  -0 % n = -0
   *   0 % 0 =  N
   *   0 % N =  N
   *   0 % I =  0
   *   N % n =  N
   *   N % 0 =  N
   *   N % N =  N
   *   N % I =  N
   *   I % n =  N
   *   I % 0 =  N
   *   I % N =  N
   *   I % I =  N
   *
   * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
   * BigNumber(y, b). The result depends on the value of MODULO_MODE.
   */
  P.modulo = P.mod = function (y, b) {
    var q, s,
      x = this;

    y = new BigNumber(y, b);

    // Return NaN if x is Infinity or NaN, or y is NaN or zero.
    if (!x.c || !y.s || y.c && !y.c[0]) {
      return new BigNumber(NaN);

    // Return x if y is Infinity or x is zero.
    } else if (!y.c || x.c && !x.c[0]) {
      return new BigNumber(x);
    }

    if (MODULO_MODE == 9) {

      // Euclidian division: q = sign(y) * floor(x / abs(y))
      // r = x - qy    where  0 <= r < abs(y)
      s = y.s;
      y.s = 1;
      q = div(x, y, 0, 3);
      y.s = s;
      q.s *= s;
    } else {
      q = div(x, y, 0, MODULO_MODE);
    }

    y = x.minus(q.times(y));

    // To match JavaScript %, ensure sign of zero is sign of dividend.
    if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

    return y;
  };


  /*
   *  n * 0 = 0
   *  n * N = N
   *  n * I = I
   *  0 * n = 0
   *  0 * 0 = 0
   *  0 * N = N
   *  0 * I = N
   *  N * n = N
   *  N * 0 = N
   *  N * N = N
   *  N * I = N
   *  I * n = I
   *  I * 0 = N
   *  I * N = N
   *  I * I = I
   *
   * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
   * of BigNumber(y, b).
   */
  P.multipliedBy = P.times = function (y, b) {
    var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
      base, sqrtBase,
      x = this,
      xc = x.c,
      yc = (y = new BigNumber(y, b)).c;

    // Either NaN, ±Infinity or ±0?
    if (!xc || !yc || !xc[0] || !yc[0]) {

      // Return NaN if either is NaN, or one is 0 and the other is Infinity.
      if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
        y.c = y.e = y.s = null;
      } else {
        y.s *= x.s;

        // Return ±Infinity if either is ±Infinity.
        if (!xc || !yc) {
          y.c = y.e = null;

        // Return ±0 if either is ±0.
        } else {
          y.c = [0];
          y.e = 0;
        }
      }

      return y;
    }

    e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
    y.s *= x.s;
    xcL = xc.length;
    ycL = yc.length;

    // Ensure xc points to longer array and xcL to its length.
    if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

    // Initialise the result array with zeros.
    for (i = xcL + ycL, zc = []; i--; zc.push(0));

    base = BASE;
    sqrtBase = SQRT_BASE;

    for (i = ycL; --i >= 0;) {
      c = 0;
      ylo = yc[i] % sqrtBase;
      yhi = yc[i] / sqrtBase | 0;

      for (k = xcL, j = i + k; j > i;) {
        xlo = xc[--k] % sqrtBase;
        xhi = xc[k] / sqrtBase | 0;
        m = yhi * xlo + xhi * ylo;
        xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
        c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
        zc[j--] = xlo % base;
      }

      zc[j] = c;
    }

    if (c) {
      ++e;
    } else {
      zc.splice(0, 1);
    }

    return normalise(y, zc, e);
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber negated,
   * i.e. multiplied by -1.
   */
  P.negated = function () {
    var x = new BigNumber(this);
    x.s = -x.s || null;
    return x;
  };


  /*
   *  n + 0 = n
   *  n + N = N
   *  n + I = I
   *  0 + n = n
   *  0 + 0 = 0
   *  0 + N = N
   *  0 + I = I
   *  N + n = N
   *  N + 0 = N
   *  N + N = N
   *  N + I = N
   *  I + n = I
   *  I + 0 = I
   *  I + N = N
   *  I + I = I
   *
   * Return a new BigNumber whose value is the value of this BigNumber plus the value of
   * BigNumber(y, b).
   */
  P.plus = function (y, b) {
    var t,
      x = this,
      a = x.s;

    y = new BigNumber(y, b);
    b = y.s;

    // Either NaN?
    if (!a || !b) return new BigNumber(NaN);

    // Signs differ?
     if (a != b) {
      y.s = -b;
      return x.minus(y);
    }

    var xe = x.e / LOG_BASE,
      ye = y.e / LOG_BASE,
      xc = x.c,
      yc = y.c;

    if (!xe || !ye) {

      // Return ±Infinity if either ±Infinity.
      if (!xc || !yc) return new BigNumber(a / 0);

      // Either zero?
      // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
      if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
    }

    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();

    // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
    if (a = xe - ye) {
      if (a > 0) {
        ye = xe;
        t = yc;
      } else {
        a = -a;
        t = xc;
      }

      t.reverse();
      for (; a--; t.push(0));
      t.reverse();
    }

    a = xc.length;
    b = yc.length;

    // Point xc to the longer array, and b to the shorter length.
    if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

    // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
    for (a = 0; b;) {
      a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
      xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
    }

    if (a) {
      xc = [a].concat(xc);
      ++ye;
    }

    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
    // ye = MAX_EXP + 1 possible
    return normalise(y, xc, ye);
  };


  /*
   * If sd is undefined or null or true or false, return the number of significant digits of
   * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
   * If sd is true include integer-part trailing zeros in the count.
   *
   * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
   * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
   * ROUNDING_MODE if rm is omitted.
   *
   * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
   *                     boolean: whether to count integer-part trailing zeros: true or false.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
   */
  P.precision = P.sd = function (sd, rm) {
    var c, n, v,
      x = this;

    if (sd != null && sd !== !!sd) {
      intCheck(sd, 1, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      return round(new BigNumber(x), sd, rm);
    }

    if (!(c = x.c)) return null;
    v = c.length - 1;
    n = v * LOG_BASE + 1;

    if (v = c[v]) {

      // Subtract the number of trailing zeros of the last element.
      for (; v % 10 == 0; v /= 10, n--);

      // Add the number of digits of the first element.
      for (v = c[0]; v >= 10; v /= 10, n++);
    }

    if (sd && x.e + 1 > n) n = x.e + 1;

    return n;
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
   * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
   *
   * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
   */
  P.shiftedBy = function (k) {
    intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
    return this.times('1e' + k);
  };


  /*
   *  sqrt(-n) =  N
   *  sqrt(N) =  N
   *  sqrt(-I) =  N
   *  sqrt(I) =  I
   *  sqrt(0) =  0
   *  sqrt(-0) = -0
   *
   * Return a new BigNumber whose value is the square root of the value of this BigNumber,
   * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
   */
  P.squareRoot = P.sqrt = function () {
    var m, n, r, rep, t,
      x = this,
      c = x.c,
      s = x.s,
      e = x.e,
      dp = DECIMAL_PLACES + 4,
      half = new BigNumber('0.5');

    // Negative/NaN/Infinity/zero?
    if (s !== 1 || !c || !c[0]) {
      return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
    }

    // Initial estimate.
    s = Math.sqrt(+valueOf(x));

    // Math.sqrt underflow/overflow?
    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
    if (s == 0 || s == 1 / 0) {
      n = coeffToString(c);
      if ((n.length + e) % 2 == 0) n += '0';
      s = Math.sqrt(+n);
      e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

      if (s == 1 / 0) {
        n = '5e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }

      r = new BigNumber(n);
    } else {
      r = new BigNumber(s + '');
    }

    // Check for zero.
    // r could be zero if MIN_EXP is changed after the this value was created.
    // This would cause a division by zero (x/t) and hence Infinity below, which would cause
    // coeffToString to throw.
    if (r.c[0]) {
      e = r.e;
      s = e + dp;
      if (s < 3) s = 0;

      // Newton-Raphson iteration.
      for (; ;) {
        t = r;
        r = half.times(t.plus(div(x, t, dp, 1)));

        if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

          // The exponent of r may here be one less than the final result exponent,
          // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
          // are indexed correctly.
          if (r.e < e) --s;
          n = n.slice(s - 3, s + 1);

          // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
          // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
          // iteration.
          if (n == '9999' || !rep && n == '4999') {

            // On the first iteration only, check to see if rounding up gives the
            // exact result as the nines may infinitely repeat.
            if (!rep) {
              round(t, t.e + DECIMAL_PLACES + 2, 0);

              if (t.times(t).eq(x)) {
                r = t;
                break;
              }
            }

            dp += 4;
            s += 4;
            rep = 1;
          } else {

            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
            // result. If not, then there are further digits and m will be truthy.
            if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

              // Truncate to the first rounding digit.
              round(r, r.e + DECIMAL_PLACES + 2, 1);
              m = !r.times(r).eq(x);
            }

            break;
          }
        }
      }
    }

    return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
  };


  /*
   * Return a string representing the value of this BigNumber in exponential notation and
   * rounded using ROUNDING_MODE to dp fixed decimal places.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.toExponential = function (dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp++;
    }
    return format(this, dp, rm, 1);
  };


  /*
   * Return a string representing the value of this BigNumber in fixed-point notation rounding
   * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
   *
   * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
   * but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.toFixed = function (dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp = dp + this.e + 1;
    }
    return format(this, dp, rm);
  };


  /*
   * Return a string representing the value of this BigNumber in fixed-point notation rounded
   * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
   * of the format or FORMAT object (see BigNumber.set).
   *
   * The formatting object may contain some or all of the properties shown below.
   *
   * FORMAT = {
   *   prefix: '',
   *   groupSize: 3,
   *   secondaryGroupSize: 0,
   *   groupSeparator: ',',
   *   decimalSeparator: '.',
   *   fractionGroupSize: 0,
   *   fractionGroupSeparator: '\xA0',      // non-breaking space
   *   suffix: ''
   * };
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   * [format] {object} Formatting options. See FORMAT pbject above.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   * '[BigNumber Error] Argument not an object: {format}'
   */
  P.toFormat = function (dp, rm, format) {
    var str,
      x = this;

    if (format == null) {
      if (dp != null && rm && typeof rm == 'object') {
        format = rm;
        rm = null;
      } else if (dp && typeof dp == 'object') {
        format = dp;
        dp = rm = null;
      } else {
        format = FORMAT;
      }
    } else if (typeof format != 'object') {
      throw Error
        (bignumberError + 'Argument not an object: ' + format);
    }

    str = x.toFixed(dp, rm);

    if (x.c) {
      var i,
        arr = str.split('.'),
        g1 = +format.groupSize,
        g2 = +format.secondaryGroupSize,
        groupSeparator = format.groupSeparator || '',
        intPart = arr[0],
        fractionPart = arr[1],
        isNeg = x.s < 0,
        intDigits = isNeg ? intPart.slice(1) : intPart,
        len = intDigits.length;

      if (g2) i = g1, g1 = g2, g2 = i, len -= i;

      if (g1 > 0 && len > 0) {
        i = len % g1 || g1;
        intPart = intDigits.substr(0, i);
        for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
        if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
        if (isNeg) intPart = '-' + intPart;
      }

      str = fractionPart
       ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
        ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
         '$&' + (format.fractionGroupSeparator || ''))
        : fractionPart)
       : intPart;
    }

    return (format.prefix || '') + str + (format.suffix || '');
  };


  /*
   * Return an array of two BigNumbers representing the value of this BigNumber as a simple
   * fraction with an integer numerator and an integer denominator.
   * The denominator will be a positive non-zero value less than or equal to the specified
   * maximum denominator. If a maximum denominator is not specified, the denominator will be
   * the lowest value necessary to represent the number exactly.
   *
   * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
   *
   * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
   */
  P.toFraction = function (md) {
    var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
      x = this,
      xc = x.c;

    if (md != null) {
      n = new BigNumber(md);

      // Throw if md is less than one or is not an integer, unless it is Infinity.
      if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
        throw Error
          (bignumberError + 'Argument ' +
            (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
      }
    }

    if (!xc) return new BigNumber(x);

    d = new BigNumber(ONE);
    n1 = d0 = new BigNumber(ONE);
    d1 = n0 = new BigNumber(ONE);
    s = coeffToString(xc);

    // Determine initial denominator.
    // d is a power of 10 and the minimum max denominator that specifies the value exactly.
    e = d.e = s.length - x.e - 1;
    d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
    md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

    exp = MAX_EXP;
    MAX_EXP = 1 / 0;
    n = new BigNumber(s);

    // n0 = d1 = 0
    n0.c[0] = 0;

    for (; ;)  {
      q = div(n, d, 0, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.comparedTo(md) == 1) break;
      d0 = d1;
      d1 = d2;
      n1 = n0.plus(q.times(d2 = n1));
      n0 = d2;
      d = n.minus(q.times(d2 = d));
      n = d2;
    }

    d2 = div(md.minus(d0), d1, 0, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;
    e = e * 2;

    // Determine which fraction is closer to x, n0/d0 or n1/d1
    r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
        div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

    MAX_EXP = exp;

    return r;
  };


  /*
   * Return the value of this BigNumber converted to a number primitive.
   */
  P.toNumber = function () {
    return +valueOf(this);
  };


  /*
   * Return a string representing the value of this BigNumber rounded to sd significant digits
   * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
   * necessary to represent the integer part of the value in fixed-point notation, then use
   * exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
   */
  P.toPrecision = function (sd, rm) {
    if (sd != null) intCheck(sd, 1, MAX);
    return format(this, sd, rm, 2);
  };


  /*
   * Return a string representing the value of this BigNumber in base b, or base 10 if b is
   * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
   * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
   * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
   * TO_EXP_NEG, return exponential notation.
   *
   * [b] {number} Integer, 2 to ALPHABET.length inclusive.
   *
   * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
   */
  P.toString = function (b) {
    var str,
      n = this,
      s = n.s,
      e = n.e;

    // Infinity or NaN?
    if (e === null) {
      if (s) {
        str = 'Infinity';
        if (s < 0) str = '-' + str;
      } else {
        str = 'NaN';
      }
    } else {
      if (b == null) {
        str = e <= TO_EXP_NEG || e >= TO_EXP_POS
         ? toExponential(coeffToString(n.c), e)
         : toFixedPoint(coeffToString(n.c), e, '0');
      } else if (b === 10 && alphabetHasNormalDecimalDigits) {
        n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
        str = toFixedPoint(coeffToString(n.c), n.e, '0');
      } else {
        intCheck(b, 2, ALPHABET.length, 'Base');
        str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
      }

      if (s < 0 && n.c[0]) str = '-' + str;
    }

    return str;
  };


  /*
   * Return as toString, but do not accept a base argument, and include the minus sign for
   * negative zero.
   */
  P.valueOf = P.toJSON = function () {
    return valueOf(this);
  };


  P._isBigNumber = true;

  P[Symbol.toStringTag] = 'BigNumber';

  // Node.js v10.12.0+
  P[Symbol.for('nodejs.util.inspect.custom')] = P.valueOf;

  if (configObject != null) BigNumber.set(configObject);

  return BigNumber;
}


// PRIVATE HELPER FUNCTIONS

// These functions don't need access to variables,
// e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


function bitFloor(n) {
  var i = n | 0;
  return n > 0 || n === i ? i : i - 1;
}


// Return a coefficient array as a string of base 10 digits.
function coeffToString(a) {
  var s, z,
    i = 1,
    j = a.length,
    r = a[0] + '';

  for (; i < j;) {
    s = a[i++] + '';
    z = LOG_BASE - s.length;
    for (; z--; s = '0' + s);
    r += s;
  }

  // Determine trailing zeros.
  for (j = r.length; r.charCodeAt(--j) === 48;);

  return r.slice(0, j + 1 || 1);
}


// Compare the value of BigNumbers x and y.
function compare(x, y) {
  var a, b,
    xc = x.c,
    yc = y.c,
    i = x.s,
    j = y.s,
    k = x.e,
    l = y.e;

  // Either NaN?
  if (!i || !j) return null;

  a = xc && !xc[0];
  b = yc && !yc[0];

  // Either zero?
  if (a || b) return a ? b ? 0 : -j : i;

  // Signs differ?
  if (i != j) return i;

  a = i < 0;
  b = k == l;

  // Either Infinity?
  if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

  // Compare exponents.
  if (!b) return k > l ^ a ? 1 : -1;

  j = (k = xc.length) < (l = yc.length) ? k : l;

  // Compare digit by digit.
  for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

  // Compare lengths.
  return k == l ? 0 : k > l ^ a ? 1 : -1;
}


/*
 * Check that n is a primitive number, an integer, and in range, otherwise throw.
 */
function intCheck(n, min, max, name) {
  if (n < min || n > max || n !== mathfloor(n)) {
    throw Error
     (bignumberError + (name || 'Argument') + (typeof n == 'number'
       ? n < min || n > max ? ' out of range: ' : ' not an integer: '
       : ' not a primitive number: ') + String(n));
  }
}


// Assumes finite n.
function isOdd(n) {
  var k = n.c.length - 1;
  return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
}


function toExponential(str, e) {
  return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
   (e < 0 ? 'e' : 'e+') + e;
}


function toFixedPoint(str, e, z) {
  var len, zs;

  // Negative exponent?
  if (e < 0) {

    // Prepend zeros.
    for (zs = z + '.'; ++e; zs += z);
    str = zs + str;

  // Positive exponent
  } else {
    len = str.length;

    // Append zeros.
    if (++e > len) {
      for (zs = z, e -= len; --e; zs += z);
      str += zs;
    } else if (e < len) {
      str = str.slice(0, e) + '.' + str.slice(e);
    }
  }

  return str;
}


// EXPORT


var BigNumber = clone();

/* harmony default export */ const bignumber = (BigNumber);

// EXTERNAL MODULE: ./node_modules/js-xdr/dist/xdr.js
var xdr = __webpack_require__(6269);
;// CONCATENATED MODULE: ./src/generated/curr_generated.js
// Automatically generated by xdrgen
// DO NOT EDIT or your changes may be overwritten

/* jshint maxstatements:2147483647  */
/* jshint esnext:true  */


var types = xdr.config(function (xdr) {
  // === xdr source ============================================================
  //
  //   typedef opaque Value<>;
  //
  // ===========================================================================
  xdr.typedef("Value", xdr.varOpaque());

  // === xdr source ============================================================
  //
  //   struct SCPBallot
  //   {
  //       uint32 counter; // n
  //       Value value;    // x
  //   };
  //
  // ===========================================================================
  xdr.struct("ScpBallot", [["counter", xdr.lookup("Uint32")], ["value", xdr.lookup("Value")]]);

  // === xdr source ============================================================
  //
  //   enum SCPStatementType
  //   {
  //       SCP_ST_PREPARE = 0,
  //       SCP_ST_CONFIRM = 1,
  //       SCP_ST_EXTERNALIZE = 2,
  //       SCP_ST_NOMINATE = 3
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ScpStatementType", {
    scpStPrepare: 0,
    scpStConfirm: 1,
    scpStExternalize: 2,
    scpStNominate: 3
  });

  // === xdr source ============================================================
  //
  //   struct SCPNomination
  //   {
  //       Hash quorumSetHash; // D
  //       Value votes<>;      // X
  //       Value accepted<>;   // Y
  //   };
  //
  // ===========================================================================
  xdr.struct("ScpNomination", [["quorumSetHash", xdr.lookup("Hash")], ["votes", xdr.varArray(xdr.lookup("Value"), 2147483647)], ["accepted", xdr.varArray(xdr.lookup("Value"), 2147483647)]]);

  // === xdr source ============================================================
  //
  //   struct
  //           {
  //               Hash quorumSetHash;       // D
  //               SCPBallot ballot;         // b
  //               SCPBallot* prepared;      // p
  //               SCPBallot* preparedPrime; // p'
  //               uint32 nC;                // c.n
  //               uint32 nH;                // h.n
  //           }
  //
  // ===========================================================================
  xdr.struct("ScpStatementPrepare", [["quorumSetHash", xdr.lookup("Hash")], ["ballot", xdr.lookup("ScpBallot")], ["prepared", xdr.option(xdr.lookup("ScpBallot"))], ["preparedPrime", xdr.option(xdr.lookup("ScpBallot"))], ["nC", xdr.lookup("Uint32")], ["nH", xdr.lookup("Uint32")]]);

  // === xdr source ============================================================
  //
  //   struct
  //           {
  //               SCPBallot ballot;   // b
  //               uint32 nPrepared;   // p.n
  //               uint32 nCommit;     // c.n
  //               uint32 nH;          // h.n
  //               Hash quorumSetHash; // D
  //           }
  //
  // ===========================================================================
  xdr.struct("ScpStatementConfirm", [["ballot", xdr.lookup("ScpBallot")], ["nPrepared", xdr.lookup("Uint32")], ["nCommit", xdr.lookup("Uint32")], ["nH", xdr.lookup("Uint32")], ["quorumSetHash", xdr.lookup("Hash")]]);

  // === xdr source ============================================================
  //
  //   struct
  //           {
  //               SCPBallot commit;         // c
  //               uint32 nH;                // h.n
  //               Hash commitQuorumSetHash; // D used before EXTERNALIZE
  //           }
  //
  // ===========================================================================
  xdr.struct("ScpStatementExternalize", [["commit", xdr.lookup("ScpBallot")], ["nH", xdr.lookup("Uint32")], ["commitQuorumSetHash", xdr.lookup("Hash")]]);

  // === xdr source ============================================================
  //
  //   union switch (SCPStatementType type)
  //       {
  //       case SCP_ST_PREPARE:
  //           struct
  //           {
  //               Hash quorumSetHash;       // D
  //               SCPBallot ballot;         // b
  //               SCPBallot* prepared;      // p
  //               SCPBallot* preparedPrime; // p'
  //               uint32 nC;                // c.n
  //               uint32 nH;                // h.n
  //           } prepare;
  //       case SCP_ST_CONFIRM:
  //           struct
  //           {
  //               SCPBallot ballot;   // b
  //               uint32 nPrepared;   // p.n
  //               uint32 nCommit;     // c.n
  //               uint32 nH;          // h.n
  //               Hash quorumSetHash; // D
  //           } confirm;
  //       case SCP_ST_EXTERNALIZE:
  //           struct
  //           {
  //               SCPBallot commit;         // c
  //               uint32 nH;                // h.n
  //               Hash commitQuorumSetHash; // D used before EXTERNALIZE
  //           } externalize;
  //       case SCP_ST_NOMINATE:
  //           SCPNomination nominate;
  //       }
  //
  // ===========================================================================
  xdr.union("ScpStatementPledges", {
    switchOn: xdr.lookup("ScpStatementType"),
    switchName: "type",
    switches: [["scpStPrepare", "prepare"], ["scpStConfirm", "confirm"], ["scpStExternalize", "externalize"], ["scpStNominate", "nominate"]],
    arms: {
      prepare: xdr.lookup("ScpStatementPrepare"),
      confirm: xdr.lookup("ScpStatementConfirm"),
      externalize: xdr.lookup("ScpStatementExternalize"),
      nominate: xdr.lookup("ScpNomination")
    }
  });

  // === xdr source ============================================================
  //
  //   struct SCPStatement
  //   {
  //       NodeID nodeID;    // v
  //       uint64 slotIndex; // i
  //   
  //       union switch (SCPStatementType type)
  //       {
  //       case SCP_ST_PREPARE:
  //           struct
  //           {
  //               Hash quorumSetHash;       // D
  //               SCPBallot ballot;         // b
  //               SCPBallot* prepared;      // p
  //               SCPBallot* preparedPrime; // p'
  //               uint32 nC;                // c.n
  //               uint32 nH;                // h.n
  //           } prepare;
  //       case SCP_ST_CONFIRM:
  //           struct
  //           {
  //               SCPBallot ballot;   // b
  //               uint32 nPrepared;   // p.n
  //               uint32 nCommit;     // c.n
  //               uint32 nH;          // h.n
  //               Hash quorumSetHash; // D
  //           } confirm;
  //       case SCP_ST_EXTERNALIZE:
  //           struct
  //           {
  //               SCPBallot commit;         // c
  //               uint32 nH;                // h.n
  //               Hash commitQuorumSetHash; // D used before EXTERNALIZE
  //           } externalize;
  //       case SCP_ST_NOMINATE:
  //           SCPNomination nominate;
  //       }
  //       pledges;
  //   };
  //
  // ===========================================================================
  xdr.struct("ScpStatement", [["nodeId", xdr.lookup("NodeId")], ["slotIndex", xdr.lookup("Uint64")], ["pledges", xdr.lookup("ScpStatementPledges")]]);

  // === xdr source ============================================================
  //
  //   struct SCPEnvelope
  //   {
  //       SCPStatement statement;
  //       Signature signature;
  //   };
  //
  // ===========================================================================
  xdr.struct("ScpEnvelope", [["statement", xdr.lookup("ScpStatement")], ["signature", xdr.lookup("Signature")]]);

  // === xdr source ============================================================
  //
  //   struct SCPQuorumSet
  //   {
  //       uint32 threshold;
  //       NodeID validators<>;
  //       SCPQuorumSet innerSets<>;
  //   };
  //
  // ===========================================================================
  xdr.struct("ScpQuorumSet", [["threshold", xdr.lookup("Uint32")], ["validators", xdr.varArray(xdr.lookup("NodeId"), 2147483647)], ["innerSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)]]);

  // === xdr source ============================================================
  //
  //   typedef PublicKey AccountID;
  //
  // ===========================================================================
  xdr.typedef("AccountId", xdr.lookup("PublicKey"));

  // === xdr source ============================================================
  //
  //   typedef opaque Thresholds[4];
  //
  // ===========================================================================
  xdr.typedef("Thresholds", xdr.opaque(4));

  // === xdr source ============================================================
  //
  //   typedef string string32<32>;
  //
  // ===========================================================================
  xdr.typedef("String32", xdr.string(32));

  // === xdr source ============================================================
  //
  //   typedef string string64<64>;
  //
  // ===========================================================================
  xdr.typedef("String64", xdr.string(64));

  // === xdr source ============================================================
  //
  //   typedef int64 SequenceNumber;
  //
  // ===========================================================================
  xdr.typedef("SequenceNumber", xdr.lookup("Int64"));

  // === xdr source ============================================================
  //
  //   typedef uint64 TimePoint;
  //
  // ===========================================================================
  xdr.typedef("TimePoint", xdr.lookup("Uint64"));

  // === xdr source ============================================================
  //
  //   typedef uint64 Duration;
  //
  // ===========================================================================
  xdr.typedef("Duration", xdr.lookup("Uint64"));

  // === xdr source ============================================================
  //
  //   typedef opaque DataValue<64>;
  //
  // ===========================================================================
  xdr.typedef("DataValue", xdr.varOpaque(64));

  // === xdr source ============================================================
  //
  //   typedef Hash PoolID;
  //
  // ===========================================================================
  xdr.typedef("PoolId", xdr.lookup("Hash"));

  // === xdr source ============================================================
  //
  //   typedef opaque AssetCode4[4];
  //
  // ===========================================================================
  xdr.typedef("AssetCode4", xdr.opaque(4));

  // === xdr source ============================================================
  //
  //   typedef opaque AssetCode12[12];
  //
  // ===========================================================================
  xdr.typedef("AssetCode12", xdr.opaque(12));

  // === xdr source ============================================================
  //
  //   enum AssetType
  //   {
  //       ASSET_TYPE_NATIVE = 0,
  //       ASSET_TYPE_CREDIT_ALPHANUM4 = 1,
  //       ASSET_TYPE_CREDIT_ALPHANUM12 = 2,
  //       ASSET_TYPE_POOL_SHARE = 3
  //   };
  //
  // ===========================================================================
  xdr["enum"]("AssetType", {
    assetTypeNative: 0,
    assetTypeCreditAlphanum4: 1,
    assetTypeCreditAlphanum12: 2,
    assetTypePoolShare: 3
  });

  // === xdr source ============================================================
  //
  //   union AssetCode switch (AssetType type)
  //   {
  //   case ASSET_TYPE_CREDIT_ALPHANUM4:
  //       AssetCode4 assetCode4;
  //   
  //   case ASSET_TYPE_CREDIT_ALPHANUM12:
  //       AssetCode12 assetCode12;
  //   
  //       // add other asset types here in the future
  //   };
  //
  // ===========================================================================
  xdr.union("AssetCode", {
    switchOn: xdr.lookup("AssetType"),
    switchName: "type",
    switches: [["assetTypeCreditAlphanum4", "assetCode4"], ["assetTypeCreditAlphanum12", "assetCode12"]],
    arms: {
      assetCode4: xdr.lookup("AssetCode4"),
      assetCode12: xdr.lookup("AssetCode12")
    }
  });

  // === xdr source ============================================================
  //
  //   struct AlphaNum4
  //   {
  //       AssetCode4 assetCode;
  //       AccountID issuer;
  //   };
  //
  // ===========================================================================
  xdr.struct("AlphaNum4", [["assetCode", xdr.lookup("AssetCode4")], ["issuer", xdr.lookup("AccountId")]]);

  // === xdr source ============================================================
  //
  //   struct AlphaNum12
  //   {
  //       AssetCode12 assetCode;
  //       AccountID issuer;
  //   };
  //
  // ===========================================================================
  xdr.struct("AlphaNum12", [["assetCode", xdr.lookup("AssetCode12")], ["issuer", xdr.lookup("AccountId")]]);

  // === xdr source ============================================================
  //
  //   union Asset switch (AssetType type)
  //   {
  //   case ASSET_TYPE_NATIVE: // Not credit
  //       void;
  //   
  //   case ASSET_TYPE_CREDIT_ALPHANUM4:
  //       AlphaNum4 alphaNum4;
  //   
  //   case ASSET_TYPE_CREDIT_ALPHANUM12:
  //       AlphaNum12 alphaNum12;
  //   
  //       // add other asset types here in the future
  //   };
  //
  // ===========================================================================
  xdr.union("Asset", {
    switchOn: xdr.lookup("AssetType"),
    switchName: "type",
    switches: [["assetTypeNative", xdr["void"]()], ["assetTypeCreditAlphanum4", "alphaNum4"], ["assetTypeCreditAlphanum12", "alphaNum12"]],
    arms: {
      alphaNum4: xdr.lookup("AlphaNum4"),
      alphaNum12: xdr.lookup("AlphaNum12")
    }
  });

  // === xdr source ============================================================
  //
  //   struct Price
  //   {
  //       int32 n; // numerator
  //       int32 d; // denominator
  //   };
  //
  // ===========================================================================
  xdr.struct("Price", [["n", xdr.lookup("Int32")], ["d", xdr.lookup("Int32")]]);

  // === xdr source ============================================================
  //
  //   struct Liabilities
  //   {
  //       int64 buying;
  //       int64 selling;
  //   };
  //
  // ===========================================================================
  xdr.struct("Liabilities", [["buying", xdr.lookup("Int64")], ["selling", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   enum ThresholdIndexes
  //   {
  //       THRESHOLD_MASTER_WEIGHT = 0,
  //       THRESHOLD_LOW = 1,
  //       THRESHOLD_MED = 2,
  //       THRESHOLD_HIGH = 3
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ThresholdIndices", {
    thresholdMasterWeight: 0,
    thresholdLow: 1,
    thresholdMed: 2,
    thresholdHigh: 3
  });

  // === xdr source ============================================================
  //
  //   enum LedgerEntryType
  //   {
  //       ACCOUNT = 0,
  //       TRUSTLINE = 1,
  //       OFFER = 2,
  //       DATA = 3,
  //       CLAIMABLE_BALANCE = 4,
  //       LIQUIDITY_POOL = 5
  //   };
  //
  // ===========================================================================
  xdr["enum"]("LedgerEntryType", {
    account: 0,
    trustline: 1,
    offer: 2,
    data: 3,
    claimableBalance: 4,
    liquidityPool: 5
  });

  // === xdr source ============================================================
  //
  //   struct Signer
  //   {
  //       SignerKey key;
  //       uint32 weight; // really only need 1 byte
  //   };
  //
  // ===========================================================================
  xdr.struct("Signer", [["key", xdr.lookup("SignerKey")], ["weight", xdr.lookup("Uint32")]]);

  // === xdr source ============================================================
  //
  //   enum AccountFlags
  //   { // masks for each flag
  //   
  //       // Flags set on issuer accounts
  //       // TrustLines are created with authorized set to "false" requiring
  //       // the issuer to set it for each TrustLine
  //       AUTH_REQUIRED_FLAG = 0x1,
  //       // If set, the authorized flag in TrustLines can be cleared
  //       // otherwise, authorization cannot be revoked
  //       AUTH_REVOCABLE_FLAG = 0x2,
  //       // Once set, causes all AUTH_* flags to be read-only
  //       AUTH_IMMUTABLE_FLAG = 0x4,
  //       // Trustlines are created with clawback enabled set to "true",
  //       // and claimable balances created from those trustlines are created
  //       // with clawback enabled set to "true"
  //       AUTH_CLAWBACK_ENABLED_FLAG = 0x8
  //   };
  //
  // ===========================================================================
  xdr["enum"]("AccountFlags", {
    authRequiredFlag: 1,
    authRevocableFlag: 2,
    authImmutableFlag: 4,
    authClawbackEnabledFlag: 8
  });

  // === xdr source ============================================================
  //
  //   const MASK_ACCOUNT_FLAGS = 0x7;
  //
  // ===========================================================================
  xdr["const"]("MASK_ACCOUNT_FLAGS", 0x7);

  // === xdr source ============================================================
  //
  //   const MASK_ACCOUNT_FLAGS_V17 = 0xF;
  //
  // ===========================================================================
  xdr["const"]("MASK_ACCOUNT_FLAGS_V17", 0xF);

  // === xdr source ============================================================
  //
  //   const MAX_SIGNERS = 20;
  //
  // ===========================================================================
  xdr["const"]("MAX_SIGNERS", 20);

  // === xdr source ============================================================
  //
  //   typedef AccountID* SponsorshipDescriptor;
  //
  // ===========================================================================
  xdr.typedef("SponsorshipDescriptor", xdr.option(xdr.lookup("AccountId")));

  // === xdr source ============================================================
  //
  //   struct AccountEntryExtensionV3
  //   {
  //       // We can use this to add more fields, or because it is first, to
  //       // change AccountEntryExtensionV3 into a union.
  //       ExtensionPoint ext;
  //   
  //       // Ledger number at which `seqNum` took on its present value.
  //       uint32 seqLedger;
  //   
  //       // Time at which `seqNum` took on its present value.
  //       TimePoint seqTime;
  //   };
  //
  // ===========================================================================
  xdr.struct("AccountEntryExtensionV3", [["ext", xdr.lookup("ExtensionPoint")], ["seqLedger", xdr.lookup("Uint32")], ["seqTime", xdr.lookup("TimePoint")]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 3:
  //           AccountEntryExtensionV3 v3;
  //       }
  //
  // ===========================================================================
  xdr.union("AccountEntryExtensionV2Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [3, "v3"]],
    arms: {
      v3: xdr.lookup("AccountEntryExtensionV3")
    }
  });

  // === xdr source ============================================================
  //
  //   struct AccountEntryExtensionV2
  //   {
  //       uint32 numSponsored;
  //       uint32 numSponsoring;
  //       SponsorshipDescriptor signerSponsoringIDs<MAX_SIGNERS>;
  //   
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 3:
  //           AccountEntryExtensionV3 v3;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("AccountEntryExtensionV2", [["numSponsored", xdr.lookup("Uint32")], ["numSponsoring", xdr.lookup("Uint32")], ["signerSponsoringIDs", xdr.varArray(xdr.lookup("SponsorshipDescriptor"), xdr.lookup("MAX_SIGNERS"))], ["ext", xdr.lookup("AccountEntryExtensionV2Ext")]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 2:
  //           AccountEntryExtensionV2 v2;
  //       }
  //
  // ===========================================================================
  xdr.union("AccountEntryExtensionV1Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [2, "v2"]],
    arms: {
      v2: xdr.lookup("AccountEntryExtensionV2")
    }
  });

  // === xdr source ============================================================
  //
  //   struct AccountEntryExtensionV1
  //   {
  //       Liabilities liabilities;
  //   
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 2:
  //           AccountEntryExtensionV2 v2;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("AccountEntryExtensionV1", [["liabilities", xdr.lookup("Liabilities")], ["ext", xdr.lookup("AccountEntryExtensionV1Ext")]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           AccountEntryExtensionV1 v1;
  //       }
  //
  // ===========================================================================
  xdr.union("AccountEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "v1"]],
    arms: {
      v1: xdr.lookup("AccountEntryExtensionV1")
    }
  });

  // === xdr source ============================================================
  //
  //   struct AccountEntry
  //   {
  //       AccountID accountID;      // master public key for this account
  //       int64 balance;            // in stroops
  //       SequenceNumber seqNum;    // last sequence number used for this account
  //       uint32 numSubEntries;     // number of sub-entries this account has
  //                                 // drives the reserve
  //       AccountID* inflationDest; // Account to vote for during inflation
  //       uint32 flags;             // see AccountFlags
  //   
  //       string32 homeDomain; // can be used for reverse federation and memo lookup
  //   
  //       // fields used for signatures
  //       // thresholds stores unsigned bytes: [weight of master|low|medium|high]
  //       Thresholds thresholds;
  //   
  //       Signer signers<MAX_SIGNERS>; // possible signers for this account
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           AccountEntryExtensionV1 v1;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("AccountEntry", [["accountId", xdr.lookup("AccountId")], ["balance", xdr.lookup("Int64")], ["seqNum", xdr.lookup("SequenceNumber")], ["numSubEntries", xdr.lookup("Uint32")], ["inflationDest", xdr.option(xdr.lookup("AccountId"))], ["flags", xdr.lookup("Uint32")], ["homeDomain", xdr.lookup("String32")], ["thresholds", xdr.lookup("Thresholds")], ["signers", xdr.varArray(xdr.lookup("Signer"), xdr.lookup("MAX_SIGNERS"))], ["ext", xdr.lookup("AccountEntryExt")]]);

  // === xdr source ============================================================
  //
  //   enum TrustLineFlags
  //   {
  //       // issuer has authorized account to perform transactions with its credit
  //       AUTHORIZED_FLAG = 1,
  //       // issuer has authorized account to maintain and reduce liabilities for its
  //       // credit
  //       AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG = 2,
  //       // issuer has specified that it may clawback its credit, and that claimable
  //       // balances created with its credit may also be clawed back
  //       TRUSTLINE_CLAWBACK_ENABLED_FLAG = 4
  //   };
  //
  // ===========================================================================
  xdr["enum"]("TrustLineFlags", {
    authorizedFlag: 1,
    authorizedToMaintainLiabilitiesFlag: 2,
    trustlineClawbackEnabledFlag: 4
  });

  // === xdr source ============================================================
  //
  //   const MASK_TRUSTLINE_FLAGS = 1;
  //
  // ===========================================================================
  xdr["const"]("MASK_TRUSTLINE_FLAGS", 1);

  // === xdr source ============================================================
  //
  //   const MASK_TRUSTLINE_FLAGS_V13 = 3;
  //
  // ===========================================================================
  xdr["const"]("MASK_TRUSTLINE_FLAGS_V13", 3);

  // === xdr source ============================================================
  //
  //   const MASK_TRUSTLINE_FLAGS_V17 = 7;
  //
  // ===========================================================================
  xdr["const"]("MASK_TRUSTLINE_FLAGS_V17", 7);

  // === xdr source ============================================================
  //
  //   enum LiquidityPoolType
  //   {
  //       LIQUIDITY_POOL_CONSTANT_PRODUCT = 0
  //   };
  //
  // ===========================================================================
  xdr["enum"]("LiquidityPoolType", {
    liquidityPoolConstantProduct: 0
  });

  // === xdr source ============================================================
  //
  //   union TrustLineAsset switch (AssetType type)
  //   {
  //   case ASSET_TYPE_NATIVE: // Not credit
  //       void;
  //   
  //   case ASSET_TYPE_CREDIT_ALPHANUM4:
  //       AlphaNum4 alphaNum4;
  //   
  //   case ASSET_TYPE_CREDIT_ALPHANUM12:
  //       AlphaNum12 alphaNum12;
  //   
  //   case ASSET_TYPE_POOL_SHARE:
  //       PoolID liquidityPoolID;
  //   
  //       // add other asset types here in the future
  //   };
  //
  // ===========================================================================
  xdr.union("TrustLineAsset", {
    switchOn: xdr.lookup("AssetType"),
    switchName: "type",
    switches: [["assetTypeNative", xdr["void"]()], ["assetTypeCreditAlphanum4", "alphaNum4"], ["assetTypeCreditAlphanum12", "alphaNum12"], ["assetTypePoolShare", "liquidityPoolId"]],
    arms: {
      alphaNum4: xdr.lookup("AlphaNum4"),
      alphaNum12: xdr.lookup("AlphaNum12"),
      liquidityPoolId: xdr.lookup("PoolId")
    }
  });

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("TrustLineEntryExtensionV2Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct TrustLineEntryExtensionV2
  //   {
  //       int32 liquidityPoolUseCount;
  //   
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("TrustLineEntryExtensionV2", [["liquidityPoolUseCount", xdr.lookup("Int32")], ["ext", xdr.lookup("TrustLineEntryExtensionV2Ext")]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //               {
  //               case 0:
  //                   void;
  //               case 2:
  //                   TrustLineEntryExtensionV2 v2;
  //               }
  //
  // ===========================================================================
  xdr.union("TrustLineEntryV1Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [2, "v2"]],
    arms: {
      v2: xdr.lookup("TrustLineEntryExtensionV2")
    }
  });

  // === xdr source ============================================================
  //
  //   struct
  //           {
  //               Liabilities liabilities;
  //   
  //               union switch (int v)
  //               {
  //               case 0:
  //                   void;
  //               case 2:
  //                   TrustLineEntryExtensionV2 v2;
  //               }
  //               ext;
  //           }
  //
  // ===========================================================================
  xdr.struct("TrustLineEntryV1", [["liabilities", xdr.lookup("Liabilities")], ["ext", xdr.lookup("TrustLineEntryV1Ext")]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           struct
  //           {
  //               Liabilities liabilities;
  //   
  //               union switch (int v)
  //               {
  //               case 0:
  //                   void;
  //               case 2:
  //                   TrustLineEntryExtensionV2 v2;
  //               }
  //               ext;
  //           } v1;
  //       }
  //
  // ===========================================================================
  xdr.union("TrustLineEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "v1"]],
    arms: {
      v1: xdr.lookup("TrustLineEntryV1")
    }
  });

  // === xdr source ============================================================
  //
  //   struct TrustLineEntry
  //   {
  //       AccountID accountID;  // account this trustline belongs to
  //       TrustLineAsset asset; // type of asset (with issuer)
  //       int64 balance;        // how much of this asset the user has.
  //                             // Asset defines the unit for this;
  //   
  //       int64 limit;  // balance cannot be above this
  //       uint32 flags; // see TrustLineFlags
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           struct
  //           {
  //               Liabilities liabilities;
  //   
  //               union switch (int v)
  //               {
  //               case 0:
  //                   void;
  //               case 2:
  //                   TrustLineEntryExtensionV2 v2;
  //               }
  //               ext;
  //           } v1;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("TrustLineEntry", [["accountId", xdr.lookup("AccountId")], ["asset", xdr.lookup("TrustLineAsset")], ["balance", xdr.lookup("Int64")], ["limit", xdr.lookup("Int64")], ["flags", xdr.lookup("Uint32")], ["ext", xdr.lookup("TrustLineEntryExt")]]);

  // === xdr source ============================================================
  //
  //   enum OfferEntryFlags
  //   {
  //       // an offer with this flag will not act on and take a reverse offer of equal
  //       // price
  //       PASSIVE_FLAG = 1
  //   };
  //
  // ===========================================================================
  xdr["enum"]("OfferEntryFlags", {
    passiveFlag: 1
  });

  // === xdr source ============================================================
  //
  //   const MASK_OFFERENTRY_FLAGS = 1;
  //
  // ===========================================================================
  xdr["const"]("MASK_OFFERENTRY_FLAGS", 1);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("OfferEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct OfferEntry
  //   {
  //       AccountID sellerID;
  //       int64 offerID;
  //       Asset selling; // A
  //       Asset buying;  // B
  //       int64 amount;  // amount of A
  //   
  //       /* price for this offer:
  //           price of A in terms of B
  //           price=AmountB/AmountA=priceNumerator/priceDenominator
  //           price is after fees
  //       */
  //       Price price;
  //       uint32 flags; // see OfferEntryFlags
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("OfferEntry", [["sellerId", xdr.lookup("AccountId")], ["offerId", xdr.lookup("Int64")], ["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")], ["flags", xdr.lookup("Uint32")], ["ext", xdr.lookup("OfferEntryExt")]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("DataEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct DataEntry
  //   {
  //       AccountID accountID; // account this data belongs to
  //       string64 dataName;
  //       DataValue dataValue;
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("DataEntry", [["accountId", xdr.lookup("AccountId")], ["dataName", xdr.lookup("String64")], ["dataValue", xdr.lookup("DataValue")], ["ext", xdr.lookup("DataEntryExt")]]);

  // === xdr source ============================================================
  //
  //   enum ClaimPredicateType
  //   {
  //       CLAIM_PREDICATE_UNCONDITIONAL = 0,
  //       CLAIM_PREDICATE_AND = 1,
  //       CLAIM_PREDICATE_OR = 2,
  //       CLAIM_PREDICATE_NOT = 3,
  //       CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME = 4,
  //       CLAIM_PREDICATE_BEFORE_RELATIVE_TIME = 5
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ClaimPredicateType", {
    claimPredicateUnconditional: 0,
    claimPredicateAnd: 1,
    claimPredicateOr: 2,
    claimPredicateNot: 3,
    claimPredicateBeforeAbsoluteTime: 4,
    claimPredicateBeforeRelativeTime: 5
  });

  // === xdr source ============================================================
  //
  //   union ClaimPredicate switch (ClaimPredicateType type)
  //   {
  //   case CLAIM_PREDICATE_UNCONDITIONAL:
  //       void;
  //   case CLAIM_PREDICATE_AND:
  //       ClaimPredicate andPredicates<2>;
  //   case CLAIM_PREDICATE_OR:
  //       ClaimPredicate orPredicates<2>;
  //   case CLAIM_PREDICATE_NOT:
  //       ClaimPredicate* notPredicate;
  //   case CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME:
  //       int64 absBefore; // Predicate will be true if closeTime < absBefore
  //   case CLAIM_PREDICATE_BEFORE_RELATIVE_TIME:
  //       int64 relBefore; // Seconds since closeTime of the ledger in which the
  //                        // ClaimableBalanceEntry was created
  //   };
  //
  // ===========================================================================
  xdr.union("ClaimPredicate", {
    switchOn: xdr.lookup("ClaimPredicateType"),
    switchName: "type",
    switches: [["claimPredicateUnconditional", xdr["void"]()], ["claimPredicateAnd", "andPredicates"], ["claimPredicateOr", "orPredicates"], ["claimPredicateNot", "notPredicate"], ["claimPredicateBeforeAbsoluteTime", "absBefore"], ["claimPredicateBeforeRelativeTime", "relBefore"]],
    arms: {
      andPredicates: xdr.varArray(xdr.lookup("ClaimPredicate"), 2),
      orPredicates: xdr.varArray(xdr.lookup("ClaimPredicate"), 2),
      notPredicate: xdr.option(xdr.lookup("ClaimPredicate")),
      absBefore: xdr.lookup("Int64"),
      relBefore: xdr.lookup("Int64")
    }
  });

  // === xdr source ============================================================
  //
  //   enum ClaimantType
  //   {
  //       CLAIMANT_TYPE_V0 = 0
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ClaimantType", {
    claimantTypeV0: 0
  });

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           AccountID destination;    // The account that can use this condition
  //           ClaimPredicate predicate; // Claimable if predicate is true
  //       }
  //
  // ===========================================================================
  xdr.struct("ClaimantV0", [["destination", xdr.lookup("AccountId")], ["predicate", xdr.lookup("ClaimPredicate")]]);

  // === xdr source ============================================================
  //
  //   union Claimant switch (ClaimantType type)
  //   {
  //   case CLAIMANT_TYPE_V0:
  //       struct
  //       {
  //           AccountID destination;    // The account that can use this condition
  //           ClaimPredicate predicate; // Claimable if predicate is true
  //       } v0;
  //   };
  //
  // ===========================================================================
  xdr.union("Claimant", {
    switchOn: xdr.lookup("ClaimantType"),
    switchName: "type",
    switches: [["claimantTypeV0", "v0"]],
    arms: {
      v0: xdr.lookup("ClaimantV0")
    }
  });

  // === xdr source ============================================================
  //
  //   enum ClaimableBalanceIDType
  //   {
  //       CLAIMABLE_BALANCE_ID_TYPE_V0 = 0
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ClaimableBalanceIdType", {
    claimableBalanceIdTypeV0: 0
  });

  // === xdr source ============================================================
  //
  //   union ClaimableBalanceID switch (ClaimableBalanceIDType type)
  //   {
  //   case CLAIMABLE_BALANCE_ID_TYPE_V0:
  //       Hash v0;
  //   };
  //
  // ===========================================================================
  xdr.union("ClaimableBalanceId", {
    switchOn: xdr.lookup("ClaimableBalanceIdType"),
    switchName: "type",
    switches: [["claimableBalanceIdTypeV0", "v0"]],
    arms: {
      v0: xdr.lookup("Hash")
    }
  });

  // === xdr source ============================================================
  //
  //   enum ClaimableBalanceFlags
  //   {
  //       // If set, the issuer account of the asset held by the claimable balance may
  //       // clawback the claimable balance
  //       CLAIMABLE_BALANCE_CLAWBACK_ENABLED_FLAG = 0x1
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ClaimableBalanceFlags", {
    claimableBalanceClawbackEnabledFlag: 1
  });

  // === xdr source ============================================================
  //
  //   const MASK_CLAIMABLE_BALANCE_FLAGS = 0x1;
  //
  // ===========================================================================
  xdr["const"]("MASK_CLAIMABLE_BALANCE_FLAGS", 0x1);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("ClaimableBalanceEntryExtensionV1Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct ClaimableBalanceEntryExtensionV1
  //   {
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   
  //       uint32 flags; // see ClaimableBalanceFlags
  //   };
  //
  // ===========================================================================
  xdr.struct("ClaimableBalanceEntryExtensionV1", [["ext", xdr.lookup("ClaimableBalanceEntryExtensionV1Ext")], ["flags", xdr.lookup("Uint32")]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           ClaimableBalanceEntryExtensionV1 v1;
  //       }
  //
  // ===========================================================================
  xdr.union("ClaimableBalanceEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "v1"]],
    arms: {
      v1: xdr.lookup("ClaimableBalanceEntryExtensionV1")
    }
  });

  // === xdr source ============================================================
  //
  //   struct ClaimableBalanceEntry
  //   {
  //       // Unique identifier for this ClaimableBalanceEntry
  //       ClaimableBalanceID balanceID;
  //   
  //       // List of claimants with associated predicate
  //       Claimant claimants<10>;
  //   
  //       // Any asset including native
  //       Asset asset;
  //   
  //       // Amount of asset
  //       int64 amount;
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           ClaimableBalanceEntryExtensionV1 v1;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("ClaimableBalanceEntry", [["balanceId", xdr.lookup("ClaimableBalanceId")], ["claimants", xdr.varArray(xdr.lookup("Claimant"), 10)], ["asset", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["ext", xdr.lookup("ClaimableBalanceEntryExt")]]);

  // === xdr source ============================================================
  //
  //   struct LiquidityPoolConstantProductParameters
  //   {
  //       Asset assetA; // assetA < assetB
  //       Asset assetB;
  //       int32 fee; // Fee is in basis points, so the actual rate is (fee/100)%
  //   };
  //
  // ===========================================================================
  xdr.struct("LiquidityPoolConstantProductParameters", [["assetA", xdr.lookup("Asset")], ["assetB", xdr.lookup("Asset")], ["fee", xdr.lookup("Int32")]]);

  // === xdr source ============================================================
  //
  //   struct
  //           {
  //               LiquidityPoolConstantProductParameters params;
  //   
  //               int64 reserveA;        // amount of A in the pool
  //               int64 reserveB;        // amount of B in the pool
  //               int64 totalPoolShares; // total number of pool shares issued
  //               int64 poolSharesTrustLineCount; // number of trust lines for the
  //                                               // associated pool shares
  //           }
  //
  // ===========================================================================
  xdr.struct("LiquidityPoolEntryConstantProduct", [["params", xdr.lookup("LiquidityPoolConstantProductParameters")], ["reserveA", xdr.lookup("Int64")], ["reserveB", xdr.lookup("Int64")], ["totalPoolShares", xdr.lookup("Int64")], ["poolSharesTrustLineCount", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   union switch (LiquidityPoolType type)
  //       {
  //       case LIQUIDITY_POOL_CONSTANT_PRODUCT:
  //           struct
  //           {
  //               LiquidityPoolConstantProductParameters params;
  //   
  //               int64 reserveA;        // amount of A in the pool
  //               int64 reserveB;        // amount of B in the pool
  //               int64 totalPoolShares; // total number of pool shares issued
  //               int64 poolSharesTrustLineCount; // number of trust lines for the
  //                                               // associated pool shares
  //           } constantProduct;
  //       }
  //
  // ===========================================================================
  xdr.union("LiquidityPoolEntryBody", {
    switchOn: xdr.lookup("LiquidityPoolType"),
    switchName: "type",
    switches: [["liquidityPoolConstantProduct", "constantProduct"]],
    arms: {
      constantProduct: xdr.lookup("LiquidityPoolEntryConstantProduct")
    }
  });

  // === xdr source ============================================================
  //
  //   struct LiquidityPoolEntry
  //   {
  //       PoolID liquidityPoolID;
  //   
  //       union switch (LiquidityPoolType type)
  //       {
  //       case LIQUIDITY_POOL_CONSTANT_PRODUCT:
  //           struct
  //           {
  //               LiquidityPoolConstantProductParameters params;
  //   
  //               int64 reserveA;        // amount of A in the pool
  //               int64 reserveB;        // amount of B in the pool
  //               int64 totalPoolShares; // total number of pool shares issued
  //               int64 poolSharesTrustLineCount; // number of trust lines for the
  //                                               // associated pool shares
  //           } constantProduct;
  //       }
  //       body;
  //   };
  //
  // ===========================================================================
  xdr.struct("LiquidityPoolEntry", [["liquidityPoolId", xdr.lookup("PoolId")], ["body", xdr.lookup("LiquidityPoolEntryBody")]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("LedgerEntryExtensionV1Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct LedgerEntryExtensionV1
  //   {
  //       SponsorshipDescriptor sponsoringID;
  //   
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("LedgerEntryExtensionV1", [["sponsoringId", xdr.lookup("SponsorshipDescriptor")], ["ext", xdr.lookup("LedgerEntryExtensionV1Ext")]]);

  // === xdr source ============================================================
  //
  //   union switch (LedgerEntryType type)
  //       {
  //       case ACCOUNT:
  //           AccountEntry account;
  //       case TRUSTLINE:
  //           TrustLineEntry trustLine;
  //       case OFFER:
  //           OfferEntry offer;
  //       case DATA:
  //           DataEntry data;
  //       case CLAIMABLE_BALANCE:
  //           ClaimableBalanceEntry claimableBalance;
  //       case LIQUIDITY_POOL:
  //           LiquidityPoolEntry liquidityPool;
  //       }
  //
  // ===========================================================================
  xdr.union("LedgerEntryData", {
    switchOn: xdr.lookup("LedgerEntryType"),
    switchName: "type",
    switches: [["account", "account"], ["trustline", "trustLine"], ["offer", "offer"], ["data", "data"], ["claimableBalance", "claimableBalance"], ["liquidityPool", "liquidityPool"]],
    arms: {
      account: xdr.lookup("AccountEntry"),
      trustLine: xdr.lookup("TrustLineEntry"),
      offer: xdr.lookup("OfferEntry"),
      data: xdr.lookup("DataEntry"),
      claimableBalance: xdr.lookup("ClaimableBalanceEntry"),
      liquidityPool: xdr.lookup("LiquidityPoolEntry")
    }
  });

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           LedgerEntryExtensionV1 v1;
  //       }
  //
  // ===========================================================================
  xdr.union("LedgerEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "v1"]],
    arms: {
      v1: xdr.lookup("LedgerEntryExtensionV1")
    }
  });

  // === xdr source ============================================================
  //
  //   struct LedgerEntry
  //   {
  //       uint32 lastModifiedLedgerSeq; // ledger the LedgerEntry was last changed
  //   
  //       union switch (LedgerEntryType type)
  //       {
  //       case ACCOUNT:
  //           AccountEntry account;
  //       case TRUSTLINE:
  //           TrustLineEntry trustLine;
  //       case OFFER:
  //           OfferEntry offer;
  //       case DATA:
  //           DataEntry data;
  //       case CLAIMABLE_BALANCE:
  //           ClaimableBalanceEntry claimableBalance;
  //       case LIQUIDITY_POOL:
  //           LiquidityPoolEntry liquidityPool;
  //       }
  //       data;
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           LedgerEntryExtensionV1 v1;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("LedgerEntry", [["lastModifiedLedgerSeq", xdr.lookup("Uint32")], ["data", xdr.lookup("LedgerEntryData")], ["ext", xdr.lookup("LedgerEntryExt")]]);

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           AccountID accountID;
  //       }
  //
  // ===========================================================================
  xdr.struct("LedgerKeyAccount", [["accountId", xdr.lookup("AccountId")]]);

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           AccountID accountID;
  //           TrustLineAsset asset;
  //       }
  //
  // ===========================================================================
  xdr.struct("LedgerKeyTrustLine", [["accountId", xdr.lookup("AccountId")], ["asset", xdr.lookup("TrustLineAsset")]]);

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           AccountID sellerID;
  //           int64 offerID;
  //       }
  //
  // ===========================================================================
  xdr.struct("LedgerKeyOffer", [["sellerId", xdr.lookup("AccountId")], ["offerId", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           AccountID accountID;
  //           string64 dataName;
  //       }
  //
  // ===========================================================================
  xdr.struct("LedgerKeyData", [["accountId", xdr.lookup("AccountId")], ["dataName", xdr.lookup("String64")]]);

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           ClaimableBalanceID balanceID;
  //       }
  //
  // ===========================================================================
  xdr.struct("LedgerKeyClaimableBalance", [["balanceId", xdr.lookup("ClaimableBalanceId")]]);

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           PoolID liquidityPoolID;
  //       }
  //
  // ===========================================================================
  xdr.struct("LedgerKeyLiquidityPool", [["liquidityPoolId", xdr.lookup("PoolId")]]);

  // === xdr source ============================================================
  //
  //   union LedgerKey switch (LedgerEntryType type)
  //   {
  //   case ACCOUNT:
  //       struct
  //       {
  //           AccountID accountID;
  //       } account;
  //   
  //   case TRUSTLINE:
  //       struct
  //       {
  //           AccountID accountID;
  //           TrustLineAsset asset;
  //       } trustLine;
  //   
  //   case OFFER:
  //       struct
  //       {
  //           AccountID sellerID;
  //           int64 offerID;
  //       } offer;
  //   
  //   case DATA:
  //       struct
  //       {
  //           AccountID accountID;
  //           string64 dataName;
  //       } data;
  //   
  //   case CLAIMABLE_BALANCE:
  //       struct
  //       {
  //           ClaimableBalanceID balanceID;
  //       } claimableBalance;
  //   
  //   case LIQUIDITY_POOL:
  //       struct
  //       {
  //           PoolID liquidityPoolID;
  //       } liquidityPool;
  //   };
  //
  // ===========================================================================
  xdr.union("LedgerKey", {
    switchOn: xdr.lookup("LedgerEntryType"),
    switchName: "type",
    switches: [["account", "account"], ["trustline", "trustLine"], ["offer", "offer"], ["data", "data"], ["claimableBalance", "claimableBalance"], ["liquidityPool", "liquidityPool"]],
    arms: {
      account: xdr.lookup("LedgerKeyAccount"),
      trustLine: xdr.lookup("LedgerKeyTrustLine"),
      offer: xdr.lookup("LedgerKeyOffer"),
      data: xdr.lookup("LedgerKeyData"),
      claimableBalance: xdr.lookup("LedgerKeyClaimableBalance"),
      liquidityPool: xdr.lookup("LedgerKeyLiquidityPool")
    }
  });

  // === xdr source ============================================================
  //
  //   enum EnvelopeType
  //   {
  //       ENVELOPE_TYPE_TX_V0 = 0,
  //       ENVELOPE_TYPE_SCP = 1,
  //       ENVELOPE_TYPE_TX = 2,
  //       ENVELOPE_TYPE_AUTH = 3,
  //       ENVELOPE_TYPE_SCPVALUE = 4,
  //       ENVELOPE_TYPE_TX_FEE_BUMP = 5,
  //       ENVELOPE_TYPE_OP_ID = 6,
  //       ENVELOPE_TYPE_POOL_REVOKE_OP_ID = 7
  //   };
  //
  // ===========================================================================
  xdr["enum"]("EnvelopeType", {
    envelopeTypeTxV0: 0,
    envelopeTypeScp: 1,
    envelopeTypeTx: 2,
    envelopeTypeAuth: 3,
    envelopeTypeScpvalue: 4,
    envelopeTypeTxFeeBump: 5,
    envelopeTypeOpId: 6,
    envelopeTypePoolRevokeOpId: 7
  });

  // === xdr source ============================================================
  //
  //   typedef opaque UpgradeType<128>;
  //
  // ===========================================================================
  xdr.typedef("UpgradeType", xdr.varOpaque(128));

  // === xdr source ============================================================
  //
  //   enum StellarValueType
  //   {
  //       STELLAR_VALUE_BASIC = 0,
  //       STELLAR_VALUE_SIGNED = 1
  //   };
  //
  // ===========================================================================
  xdr["enum"]("StellarValueType", {
    stellarValueBasic: 0,
    stellarValueSigned: 1
  });

  // === xdr source ============================================================
  //
  //   struct LedgerCloseValueSignature
  //   {
  //       NodeID nodeID;       // which node introduced the value
  //       Signature signature; // nodeID's signature
  //   };
  //
  // ===========================================================================
  xdr.struct("LedgerCloseValueSignature", [["nodeId", xdr.lookup("NodeId")], ["signature", xdr.lookup("Signature")]]);

  // === xdr source ============================================================
  //
  //   union switch (StellarValueType v)
  //       {
  //       case STELLAR_VALUE_BASIC:
  //           void;
  //       case STELLAR_VALUE_SIGNED:
  //           LedgerCloseValueSignature lcValueSignature;
  //       }
  //
  // ===========================================================================
  xdr.union("StellarValueExt", {
    switchOn: xdr.lookup("StellarValueType"),
    switchName: "v",
    switches: [["stellarValueBasic", xdr["void"]()], ["stellarValueSigned", "lcValueSignature"]],
    arms: {
      lcValueSignature: xdr.lookup("LedgerCloseValueSignature")
    }
  });

  // === xdr source ============================================================
  //
  //   struct StellarValue
  //   {
  //       Hash txSetHash;      // transaction set to apply to previous ledger
  //       TimePoint closeTime; // network close time
  //   
  //       // upgrades to apply to the previous ledger (usually empty)
  //       // this is a vector of encoded 'LedgerUpgrade' so that nodes can drop
  //       // unknown steps during consensus if needed.
  //       // see notes below on 'LedgerUpgrade' for more detail
  //       // max size is dictated by number of upgrade types (+ room for future)
  //       UpgradeType upgrades<6>;
  //   
  //       // reserved for future use
  //       union switch (StellarValueType v)
  //       {
  //       case STELLAR_VALUE_BASIC:
  //           void;
  //       case STELLAR_VALUE_SIGNED:
  //           LedgerCloseValueSignature lcValueSignature;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("StellarValue", [["txSetHash", xdr.lookup("Hash")], ["closeTime", xdr.lookup("TimePoint")], ["upgrades", xdr.varArray(xdr.lookup("UpgradeType"), 6)], ["ext", xdr.lookup("StellarValueExt")]]);

  // === xdr source ============================================================
  //
  //   const MASK_LEDGER_HEADER_FLAGS = 0x7;
  //
  // ===========================================================================
  xdr["const"]("MASK_LEDGER_HEADER_FLAGS", 0x7);

  // === xdr source ============================================================
  //
  //   enum LedgerHeaderFlags
  //   {
  //       DISABLE_LIQUIDITY_POOL_TRADING_FLAG = 0x1,
  //       DISABLE_LIQUIDITY_POOL_DEPOSIT_FLAG = 0x2,
  //       DISABLE_LIQUIDITY_POOL_WITHDRAWAL_FLAG = 0x4
  //   };
  //
  // ===========================================================================
  xdr["enum"]("LedgerHeaderFlags", {
    disableLiquidityPoolTradingFlag: 1,
    disableLiquidityPoolDepositFlag: 2,
    disableLiquidityPoolWithdrawalFlag: 4
  });

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("LedgerHeaderExtensionV1Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct LedgerHeaderExtensionV1
  //   {
  //       uint32 flags; // LedgerHeaderFlags
  //   
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("LedgerHeaderExtensionV1", [["flags", xdr.lookup("Uint32")], ["ext", xdr.lookup("LedgerHeaderExtensionV1Ext")]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           LedgerHeaderExtensionV1 v1;
  //       }
  //
  // ===========================================================================
  xdr.union("LedgerHeaderExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "v1"]],
    arms: {
      v1: xdr.lookup("LedgerHeaderExtensionV1")
    }
  });

  // === xdr source ============================================================
  //
  //   struct LedgerHeader
  //   {
  //       uint32 ledgerVersion;    // the protocol version of the ledger
  //       Hash previousLedgerHash; // hash of the previous ledger header
  //       StellarValue scpValue;   // what consensus agreed to
  //       Hash txSetResultHash;    // the TransactionResultSet that led to this ledger
  //       Hash bucketListHash;     // hash of the ledger state
  //   
  //       uint32 ledgerSeq; // sequence number of this ledger
  //   
  //       int64 totalCoins; // total number of stroops in existence.
  //                         // 10,000,000 stroops in 1 XLM
  //   
  //       int64 feePool;       // fees burned since last inflation run
  //       uint32 inflationSeq; // inflation sequence number
  //   
  //       uint64 idPool; // last used global ID, used for generating objects
  //   
  //       uint32 baseFee;     // base fee per operation in stroops
  //       uint32 baseReserve; // account base reserve in stroops
  //   
  //       uint32 maxTxSetSize; // maximum size a transaction set can be
  //   
  //       Hash skipList[4]; // hashes of ledgers in the past. allows you to jump back
  //                         // in time without walking the chain back ledger by ledger
  //                         // each slot contains the oldest ledger that is mod of
  //                         // either 50  5000  50000 or 500000 depending on index
  //                         // skipList[0] mod(50), skipList[1] mod(5000), etc
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           LedgerHeaderExtensionV1 v1;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("LedgerHeader", [["ledgerVersion", xdr.lookup("Uint32")], ["previousLedgerHash", xdr.lookup("Hash")], ["scpValue", xdr.lookup("StellarValue")], ["txSetResultHash", xdr.lookup("Hash")], ["bucketListHash", xdr.lookup("Hash")], ["ledgerSeq", xdr.lookup("Uint32")], ["totalCoins", xdr.lookup("Int64")], ["feePool", xdr.lookup("Int64")], ["inflationSeq", xdr.lookup("Uint32")], ["idPool", xdr.lookup("Uint64")], ["baseFee", xdr.lookup("Uint32")], ["baseReserve", xdr.lookup("Uint32")], ["maxTxSetSize", xdr.lookup("Uint32")], ["skipList", xdr.array(xdr.lookup("Hash"), 4)], ["ext", xdr.lookup("LedgerHeaderExt")]]);

  // === xdr source ============================================================
  //
  //   enum LedgerUpgradeType
  //   {
  //       LEDGER_UPGRADE_VERSION = 1,
  //       LEDGER_UPGRADE_BASE_FEE = 2,
  //       LEDGER_UPGRADE_MAX_TX_SET_SIZE = 3,
  //       LEDGER_UPGRADE_BASE_RESERVE = 4,
  //       LEDGER_UPGRADE_FLAGS = 5
  //   };
  //
  // ===========================================================================
  xdr["enum"]("LedgerUpgradeType", {
    ledgerUpgradeVersion: 1,
    ledgerUpgradeBaseFee: 2,
    ledgerUpgradeMaxTxSetSize: 3,
    ledgerUpgradeBaseReserve: 4,
    ledgerUpgradeFlags: 5
  });

  // === xdr source ============================================================
  //
  //   union LedgerUpgrade switch (LedgerUpgradeType type)
  //   {
  //   case LEDGER_UPGRADE_VERSION:
  //       uint32 newLedgerVersion; // update ledgerVersion
  //   case LEDGER_UPGRADE_BASE_FEE:
  //       uint32 newBaseFee; // update baseFee
  //   case LEDGER_UPGRADE_MAX_TX_SET_SIZE:
  //       uint32 newMaxTxSetSize; // update maxTxSetSize
  //   case LEDGER_UPGRADE_BASE_RESERVE:
  //       uint32 newBaseReserve; // update baseReserve
  //   case LEDGER_UPGRADE_FLAGS:
  //       uint32 newFlags; // update flags
  //   };
  //
  // ===========================================================================
  xdr.union("LedgerUpgrade", {
    switchOn: xdr.lookup("LedgerUpgradeType"),
    switchName: "type",
    switches: [["ledgerUpgradeVersion", "newLedgerVersion"], ["ledgerUpgradeBaseFee", "newBaseFee"], ["ledgerUpgradeMaxTxSetSize", "newMaxTxSetSize"], ["ledgerUpgradeBaseReserve", "newBaseReserve"], ["ledgerUpgradeFlags", "newFlags"]],
    arms: {
      newLedgerVersion: xdr.lookup("Uint32"),
      newBaseFee: xdr.lookup("Uint32"),
      newMaxTxSetSize: xdr.lookup("Uint32"),
      newBaseReserve: xdr.lookup("Uint32"),
      newFlags: xdr.lookup("Uint32")
    }
  });

  // === xdr source ============================================================
  //
  //   enum BucketEntryType
  //   {
  //       METAENTRY =
  //           -1, // At-and-after protocol 11: bucket metadata, should come first.
  //       LIVEENTRY = 0, // Before protocol 11: created-or-updated;
  //                      // At-and-after protocol 11: only updated.
  //       DEADENTRY = 1,
  //       INITENTRY = 2 // At-and-after protocol 11: only created.
  //   };
  //
  // ===========================================================================
  xdr["enum"]("BucketEntryType", {
    metaentry: -1,
    liveentry: 0,
    deadentry: 1,
    initentry: 2
  });

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("BucketMetadataExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct BucketMetadata
  //   {
  //       // Indicates the protocol version used to create / merge this bucket.
  //       uint32 ledgerVersion;
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("BucketMetadata", [["ledgerVersion", xdr.lookup("Uint32")], ["ext", xdr.lookup("BucketMetadataExt")]]);

  // === xdr source ============================================================
  //
  //   union BucketEntry switch (BucketEntryType type)
  //   {
  //   case LIVEENTRY:
  //   case INITENTRY:
  //       LedgerEntry liveEntry;
  //   
  //   case DEADENTRY:
  //       LedgerKey deadEntry;
  //   case METAENTRY:
  //       BucketMetadata metaEntry;
  //   };
  //
  // ===========================================================================
  xdr.union("BucketEntry", {
    switchOn: xdr.lookup("BucketEntryType"),
    switchName: "type",
    switches: [["liveentry", "liveEntry"], ["initentry", "liveEntry"], ["deadentry", "deadEntry"], ["metaentry", "metaEntry"]],
    arms: {
      liveEntry: xdr.lookup("LedgerEntry"),
      deadEntry: xdr.lookup("LedgerKey"),
      metaEntry: xdr.lookup("BucketMetadata")
    }
  });

  // === xdr source ============================================================
  //
  //   enum TxSetComponentType
  //   {
  //     // txs with effective fee <= bid derived from a base fee (if any).
  //     // If base fee is not specified, no discount is applied.
  //     TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE = 0
  //   };
  //
  // ===========================================================================
  xdr["enum"]("TxSetComponentType", {
    txsetCompTxsMaybeDiscountedFee: 0
  });

  // === xdr source ============================================================
  //
  //   struct
  //     {
  //       int64* baseFee;
  //       TransactionEnvelope txs<>;
  //     }
  //
  // ===========================================================================
  xdr.struct("TxSetComponentTxsMaybeDiscountedFee", [["baseFee", xdr.option(xdr.lookup("Int64"))], ["txes", xdr.varArray(xdr.lookup("TransactionEnvelope"), 2147483647)]]);

  // === xdr source ============================================================
  //
  //   union TxSetComponent switch (TxSetComponentType type)
  //   {
  //   case TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE:
  //     struct
  //     {
  //       int64* baseFee;
  //       TransactionEnvelope txs<>;
  //     } txsMaybeDiscountedFee;
  //   };
  //
  // ===========================================================================
  xdr.union("TxSetComponent", {
    switchOn: xdr.lookup("TxSetComponentType"),
    switchName: "type",
    switches: [["txsetCompTxsMaybeDiscountedFee", "txsMaybeDiscountedFee"]],
    arms: {
      txsMaybeDiscountedFee: xdr.lookup("TxSetComponentTxsMaybeDiscountedFee")
    }
  });

  // === xdr source ============================================================
  //
  //   union TransactionPhase switch (int v)
  //   {
  //   case 0:
  //       TxSetComponent v0Components<>;
  //   };
  //
  // ===========================================================================
  xdr.union("TransactionPhase", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, "v0Components"]],
    arms: {
      v0Components: xdr.varArray(xdr.lookup("TxSetComponent"), 2147483647)
    }
  });

  // === xdr source ============================================================
  //
  //   struct TransactionSet
  //   {
  //       Hash previousLedgerHash;
  //       TransactionEnvelope txs<>;
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionSet", [["previousLedgerHash", xdr.lookup("Hash")], ["txes", xdr.varArray(xdr.lookup("TransactionEnvelope"), 2147483647)]]);

  // === xdr source ============================================================
  //
  //   struct TransactionSetV1
  //   {
  //       Hash previousLedgerHash;
  //       TransactionPhase phases<>;
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionSetV1", [["previousLedgerHash", xdr.lookup("Hash")], ["phases", xdr.varArray(xdr.lookup("TransactionPhase"), 2147483647)]]);

  // === xdr source ============================================================
  //
  //   union GeneralizedTransactionSet switch (int v)
  //   {
  //   // We consider the legacy TransactionSet to be v0.
  //   case 1:
  //       TransactionSetV1 v1TxSet;
  //   };
  //
  // ===========================================================================
  xdr.union("GeneralizedTransactionSet", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[1, "v1TxSet"]],
    arms: {
      v1TxSet: xdr.lookup("TransactionSetV1")
    }
  });

  // === xdr source ============================================================
  //
  //   struct TransactionResultPair
  //   {
  //       Hash transactionHash;
  //       TransactionResult result; // result for the transaction
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionResultPair", [["transactionHash", xdr.lookup("Hash")], ["result", xdr.lookup("TransactionResult")]]);

  // === xdr source ============================================================
  //
  //   struct TransactionResultSet
  //   {
  //       TransactionResultPair results<>;
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionResultSet", [["results", xdr.varArray(xdr.lookup("TransactionResultPair"), 2147483647)]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           GeneralizedTransactionSet generalizedTxSet;
  //       }
  //
  // ===========================================================================
  xdr.union("TransactionHistoryEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()], [1, "generalizedTxSet"]],
    arms: {
      generalizedTxSet: xdr.lookup("GeneralizedTransactionSet")
    }
  });

  // === xdr source ============================================================
  //
  //   struct TransactionHistoryEntry
  //   {
  //       uint32 ledgerSeq;
  //       TransactionSet txSet;
  //   
  //       // when v != 0, txSet must be empty
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       case 1:
  //           GeneralizedTransactionSet generalizedTxSet;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionHistoryEntry", [["ledgerSeq", xdr.lookup("Uint32")], ["txSet", xdr.lookup("TransactionSet")], ["ext", xdr.lookup("TransactionHistoryEntryExt")]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("TransactionHistoryResultEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct TransactionHistoryResultEntry
  //   {
  //       uint32 ledgerSeq;
  //       TransactionResultSet txResultSet;
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionHistoryResultEntry", [["ledgerSeq", xdr.lookup("Uint32")], ["txResultSet", xdr.lookup("TransactionResultSet")], ["ext", xdr.lookup("TransactionHistoryResultEntryExt")]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("LedgerHeaderHistoryEntryExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct LedgerHeaderHistoryEntry
  //   {
  //       Hash hash;
  //       LedgerHeader header;
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("LedgerHeaderHistoryEntry", [["hash", xdr.lookup("Hash")], ["header", xdr.lookup("LedgerHeader")], ["ext", xdr.lookup("LedgerHeaderHistoryEntryExt")]]);

  // === xdr source ============================================================
  //
  //   struct LedgerSCPMessages
  //   {
  //       uint32 ledgerSeq;
  //       SCPEnvelope messages<>;
  //   };
  //
  // ===========================================================================
  xdr.struct("LedgerScpMessages", [["ledgerSeq", xdr.lookup("Uint32")], ["messages", xdr.varArray(xdr.lookup("ScpEnvelope"), 2147483647)]]);

  // === xdr source ============================================================
  //
  //   struct SCPHistoryEntryV0
  //   {
  //       SCPQuorumSet quorumSets<>; // additional quorum sets used by ledgerMessages
  //       LedgerSCPMessages ledgerMessages;
  //   };
  //
  // ===========================================================================
  xdr.struct("ScpHistoryEntryV0", [["quorumSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)], ["ledgerMessages", xdr.lookup("LedgerScpMessages")]]);

  // === xdr source ============================================================
  //
  //   union SCPHistoryEntry switch (int v)
  //   {
  //   case 0:
  //       SCPHistoryEntryV0 v0;
  //   };
  //
  // ===========================================================================
  xdr.union("ScpHistoryEntry", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, "v0"]],
    arms: {
      v0: xdr.lookup("ScpHistoryEntryV0")
    }
  });

  // === xdr source ============================================================
  //
  //   enum LedgerEntryChangeType
  //   {
  //       LEDGER_ENTRY_CREATED = 0, // entry was added to the ledger
  //       LEDGER_ENTRY_UPDATED = 1, // entry was modified in the ledger
  //       LEDGER_ENTRY_REMOVED = 2, // entry was removed from the ledger
  //       LEDGER_ENTRY_STATE = 3    // value of the entry
  //   };
  //
  // ===========================================================================
  xdr["enum"]("LedgerEntryChangeType", {
    ledgerEntryCreated: 0,
    ledgerEntryUpdated: 1,
    ledgerEntryRemoved: 2,
    ledgerEntryState: 3
  });

  // === xdr source ============================================================
  //
  //   union LedgerEntryChange switch (LedgerEntryChangeType type)
  //   {
  //   case LEDGER_ENTRY_CREATED:
  //       LedgerEntry created;
  //   case LEDGER_ENTRY_UPDATED:
  //       LedgerEntry updated;
  //   case LEDGER_ENTRY_REMOVED:
  //       LedgerKey removed;
  //   case LEDGER_ENTRY_STATE:
  //       LedgerEntry state;
  //   };
  //
  // ===========================================================================
  xdr.union("LedgerEntryChange", {
    switchOn: xdr.lookup("LedgerEntryChangeType"),
    switchName: "type",
    switches: [["ledgerEntryCreated", "created"], ["ledgerEntryUpdated", "updated"], ["ledgerEntryRemoved", "removed"], ["ledgerEntryState", "state"]],
    arms: {
      created: xdr.lookup("LedgerEntry"),
      updated: xdr.lookup("LedgerEntry"),
      removed: xdr.lookup("LedgerKey"),
      state: xdr.lookup("LedgerEntry")
    }
  });

  // === xdr source ============================================================
  //
  //   typedef LedgerEntryChange LedgerEntryChanges<>;
  //
  // ===========================================================================
  xdr.typedef("LedgerEntryChanges", xdr.varArray(xdr.lookup("LedgerEntryChange"), 2147483647));

  // === xdr source ============================================================
  //
  //   struct OperationMeta
  //   {
  //       LedgerEntryChanges changes;
  //   };
  //
  // ===========================================================================
  xdr.struct("OperationMeta", [["changes", xdr.lookup("LedgerEntryChanges")]]);

  // === xdr source ============================================================
  //
  //   struct TransactionMetaV1
  //   {
  //       LedgerEntryChanges txChanges; // tx level changes if any
  //       OperationMeta operations<>;   // meta for each operation
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionMetaV1", [["txChanges", xdr.lookup("LedgerEntryChanges")], ["operations", xdr.varArray(xdr.lookup("OperationMeta"), 2147483647)]]);

  // === xdr source ============================================================
  //
  //   struct TransactionMetaV2
  //   {
  //       LedgerEntryChanges txChangesBefore; // tx level changes before operations
  //                                           // are applied if any
  //       OperationMeta operations<>;         // meta for each operation
  //       LedgerEntryChanges txChangesAfter;  // tx level changes after operations are
  //                                           // applied if any
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionMetaV2", [["txChangesBefore", xdr.lookup("LedgerEntryChanges")], ["operations", xdr.varArray(xdr.lookup("OperationMeta"), 2147483647)], ["txChangesAfter", xdr.lookup("LedgerEntryChanges")]]);

  // === xdr source ============================================================
  //
  //   union TransactionMeta switch (int v)
  //   {
  //   case 0:
  //       OperationMeta operations<>;
  //   case 1:
  //       TransactionMetaV1 v1;
  //   case 2:
  //       TransactionMetaV2 v2;
  //   };
  //
  // ===========================================================================
  xdr.union("TransactionMeta", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, "operations"], [1, "v1"], [2, "v2"]],
    arms: {
      operations: xdr.varArray(xdr.lookup("OperationMeta"), 2147483647),
      v1: xdr.lookup("TransactionMetaV1"),
      v2: xdr.lookup("TransactionMetaV2")
    }
  });

  // === xdr source ============================================================
  //
  //   struct TransactionResultMeta
  //   {
  //       TransactionResultPair result;
  //       LedgerEntryChanges feeProcessing;
  //       TransactionMeta txApplyProcessing;
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionResultMeta", [["result", xdr.lookup("TransactionResultPair")], ["feeProcessing", xdr.lookup("LedgerEntryChanges")], ["txApplyProcessing", xdr.lookup("TransactionMeta")]]);

  // === xdr source ============================================================
  //
  //   struct UpgradeEntryMeta
  //   {
  //       LedgerUpgrade upgrade;
  //       LedgerEntryChanges changes;
  //   };
  //
  // ===========================================================================
  xdr.struct("UpgradeEntryMeta", [["upgrade", xdr.lookup("LedgerUpgrade")], ["changes", xdr.lookup("LedgerEntryChanges")]]);

  // === xdr source ============================================================
  //
  //   struct LedgerCloseMetaV0
  //   {
  //       LedgerHeaderHistoryEntry ledgerHeader;
  //       // NB: txSet is sorted in "Hash order"
  //       TransactionSet txSet;
  //   
  //       // NB: transactions are sorted in apply order here
  //       // fees for all transactions are processed first
  //       // followed by applying transactions
  //       TransactionResultMeta txProcessing<>;
  //   
  //       // upgrades are applied last
  //       UpgradeEntryMeta upgradesProcessing<>;
  //   
  //       // other misc information attached to the ledger close
  //       SCPHistoryEntry scpInfo<>;
  //   };
  //
  // ===========================================================================
  xdr.struct("LedgerCloseMetaV0", [["ledgerHeader", xdr.lookup("LedgerHeaderHistoryEntry")], ["txSet", xdr.lookup("TransactionSet")], ["txProcessing", xdr.varArray(xdr.lookup("TransactionResultMeta"), 2147483647)], ["upgradesProcessing", xdr.varArray(xdr.lookup("UpgradeEntryMeta"), 2147483647)], ["scpInfo", xdr.varArray(xdr.lookup("ScpHistoryEntry"), 2147483647)]]);

  // === xdr source ============================================================
  //
  //   struct LedgerCloseMetaV1
  //   {
  //       LedgerHeaderHistoryEntry ledgerHeader;
  //   
  //       GeneralizedTransactionSet txSet;
  //   
  //       // NB: transactions are sorted in apply order here
  //       // fees for all transactions are processed first
  //       // followed by applying transactions
  //       TransactionResultMeta txProcessing<>;
  //   
  //       // upgrades are applied last
  //       UpgradeEntryMeta upgradesProcessing<>;
  //   
  //       // other misc information attached to the ledger close
  //       SCPHistoryEntry scpInfo<>;
  //   };
  //
  // ===========================================================================
  xdr.struct("LedgerCloseMetaV1", [["ledgerHeader", xdr.lookup("LedgerHeaderHistoryEntry")], ["txSet", xdr.lookup("GeneralizedTransactionSet")], ["txProcessing", xdr.varArray(xdr.lookup("TransactionResultMeta"), 2147483647)], ["upgradesProcessing", xdr.varArray(xdr.lookup("UpgradeEntryMeta"), 2147483647)], ["scpInfo", xdr.varArray(xdr.lookup("ScpHistoryEntry"), 2147483647)]]);

  // === xdr source ============================================================
  //
  //   union LedgerCloseMeta switch (int v)
  //   {
  //   case 0:
  //       LedgerCloseMetaV0 v0;
  //   case 1:
  //       LedgerCloseMetaV1 v1;
  //   };
  //
  // ===========================================================================
  xdr.union("LedgerCloseMeta", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, "v0"], [1, "v1"]],
    arms: {
      v0: xdr.lookup("LedgerCloseMetaV0"),
      v1: xdr.lookup("LedgerCloseMetaV1")
    }
  });

  // === xdr source ============================================================
  //
  //   enum ErrorCode
  //   {
  //       ERR_MISC = 0, // Unspecific error
  //       ERR_DATA = 1, // Malformed data
  //       ERR_CONF = 2, // Misconfiguration error
  //       ERR_AUTH = 3, // Authentication failure
  //       ERR_LOAD = 4  // System overloaded
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ErrorCode", {
    errMisc: 0,
    errData: 1,
    errConf: 2,
    errAuth: 3,
    errLoad: 4
  });

  // === xdr source ============================================================
  //
  //   struct Error
  //   {
  //       ErrorCode code;
  //       string msg<100>;
  //   };
  //
  // ===========================================================================
  xdr.struct("Error", [["code", xdr.lookup("ErrorCode")], ["msg", xdr.string(100)]]);

  // === xdr source ============================================================
  //
  //   struct SendMore
  //   {
  //       uint32 numMessages;
  //   };
  //
  // ===========================================================================
  xdr.struct("SendMore", [["numMessages", xdr.lookup("Uint32")]]);

  // === xdr source ============================================================
  //
  //   struct AuthCert
  //   {
  //       Curve25519Public pubkey;
  //       uint64 expiration;
  //       Signature sig;
  //   };
  //
  // ===========================================================================
  xdr.struct("AuthCert", [["pubkey", xdr.lookup("Curve25519Public")], ["expiration", xdr.lookup("Uint64")], ["sig", xdr.lookup("Signature")]]);

  // === xdr source ============================================================
  //
  //   struct Hello
  //   {
  //       uint32 ledgerVersion;
  //       uint32 overlayVersion;
  //       uint32 overlayMinVersion;
  //       Hash networkID;
  //       string versionStr<100>;
  //       int listeningPort;
  //       NodeID peerID;
  //       AuthCert cert;
  //       uint256 nonce;
  //   };
  //
  // ===========================================================================
  xdr.struct("Hello", [["ledgerVersion", xdr.lookup("Uint32")], ["overlayVersion", xdr.lookup("Uint32")], ["overlayMinVersion", xdr.lookup("Uint32")], ["networkId", xdr.lookup("Hash")], ["versionStr", xdr.string(100)], ["listeningPort", xdr["int"]()], ["peerId", xdr.lookup("NodeId")], ["cert", xdr.lookup("AuthCert")], ["nonce", xdr.lookup("Uint256")]]);

  // === xdr source ============================================================
  //
  //   const AUTH_MSG_FLAG_PULL_MODE_REQUESTED = 100;
  //
  // ===========================================================================
  xdr["const"]("AUTH_MSG_FLAG_PULL_MODE_REQUESTED", 100);

  // === xdr source ============================================================
  //
  //   struct Auth
  //   {
  //       int flags;
  //   };
  //
  // ===========================================================================
  xdr.struct("Auth", [["flags", xdr["int"]()]]);

  // === xdr source ============================================================
  //
  //   enum IPAddrType
  //   {
  //       IPv4 = 0,
  //       IPv6 = 1
  //   };
  //
  // ===========================================================================
  xdr["enum"]("IpAddrType", {
    iPv4: 0,
    iPv6: 1
  });

  // === xdr source ============================================================
  //
  //   union switch (IPAddrType type)
  //       {
  //       case IPv4:
  //           opaque ipv4[4];
  //       case IPv6:
  //           opaque ipv6[16];
  //       }
  //
  // ===========================================================================
  xdr.union("PeerAddressIp", {
    switchOn: xdr.lookup("IpAddrType"),
    switchName: "type",
    switches: [["iPv4", "ipv4"], ["iPv6", "ipv6"]],
    arms: {
      ipv4: xdr.opaque(4),
      ipv6: xdr.opaque(16)
    }
  });

  // === xdr source ============================================================
  //
  //   struct PeerAddress
  //   {
  //       union switch (IPAddrType type)
  //       {
  //       case IPv4:
  //           opaque ipv4[4];
  //       case IPv6:
  //           opaque ipv6[16];
  //       }
  //       ip;
  //       uint32 port;
  //       uint32 numFailures;
  //   };
  //
  // ===========================================================================
  xdr.struct("PeerAddress", [["ip", xdr.lookup("PeerAddressIp")], ["port", xdr.lookup("Uint32")], ["numFailures", xdr.lookup("Uint32")]]);

  // === xdr source ============================================================
  //
  //   enum MessageType
  //   {
  //       ERROR_MSG = 0,
  //       AUTH = 2,
  //       DONT_HAVE = 3,
  //   
  //       GET_PEERS = 4, // gets a list of peers this guy knows about
  //       PEERS = 5,
  //   
  //       GET_TX_SET = 6, // gets a particular txset by hash
  //       TX_SET = 7,
  //       GENERALIZED_TX_SET = 17,
  //   
  //       TRANSACTION = 8, // pass on a tx you have heard about
  //   
  //       // SCP
  //       GET_SCP_QUORUMSET = 9,
  //       SCP_QUORUMSET = 10,
  //       SCP_MESSAGE = 11,
  //       GET_SCP_STATE = 12,
  //   
  //       // new messages
  //       HELLO = 13,
  //   
  //       SURVEY_REQUEST = 14,
  //       SURVEY_RESPONSE = 15,
  //   
  //       SEND_MORE = 16,
  //       FLOOD_ADVERT = 18,
  //       FLOOD_DEMAND = 19
  //   };
  //
  // ===========================================================================
  xdr["enum"]("MessageType", {
    errorMsg: 0,
    auth: 2,
    dontHave: 3,
    getPeers: 4,
    peers: 5,
    getTxSet: 6,
    txSet: 7,
    generalizedTxSet: 17,
    transaction: 8,
    getScpQuorumset: 9,
    scpQuorumset: 10,
    scpMessage: 11,
    getScpState: 12,
    hello: 13,
    surveyRequest: 14,
    surveyResponse: 15,
    sendMore: 16,
    floodAdvert: 18,
    floodDemand: 19
  });

  // === xdr source ============================================================
  //
  //   struct DontHave
  //   {
  //       MessageType type;
  //       uint256 reqHash;
  //   };
  //
  // ===========================================================================
  xdr.struct("DontHave", [["type", xdr.lookup("MessageType")], ["reqHash", xdr.lookup("Uint256")]]);

  // === xdr source ============================================================
  //
  //   enum SurveyMessageCommandType
  //   {
  //       SURVEY_TOPOLOGY = 0
  //   };
  //
  // ===========================================================================
  xdr["enum"]("SurveyMessageCommandType", {
    surveyTopology: 0
  });

  // === xdr source ============================================================
  //
  //   struct SurveyRequestMessage
  //   {
  //       NodeID surveyorPeerID;
  //       NodeID surveyedPeerID;
  //       uint32 ledgerNum;
  //       Curve25519Public encryptionKey;
  //       SurveyMessageCommandType commandType;
  //   };
  //
  // ===========================================================================
  xdr.struct("SurveyRequestMessage", [["surveyorPeerId", xdr.lookup("NodeId")], ["surveyedPeerId", xdr.lookup("NodeId")], ["ledgerNum", xdr.lookup("Uint32")], ["encryptionKey", xdr.lookup("Curve25519Public")], ["commandType", xdr.lookup("SurveyMessageCommandType")]]);

  // === xdr source ============================================================
  //
  //   struct SignedSurveyRequestMessage
  //   {
  //       Signature requestSignature;
  //       SurveyRequestMessage request;
  //   };
  //
  // ===========================================================================
  xdr.struct("SignedSurveyRequestMessage", [["requestSignature", xdr.lookup("Signature")], ["request", xdr.lookup("SurveyRequestMessage")]]);

  // === xdr source ============================================================
  //
  //   typedef opaque EncryptedBody<64000>;
  //
  // ===========================================================================
  xdr.typedef("EncryptedBody", xdr.varOpaque(64000));

  // === xdr source ============================================================
  //
  //   struct SurveyResponseMessage
  //   {
  //       NodeID surveyorPeerID;
  //       NodeID surveyedPeerID;
  //       uint32 ledgerNum;
  //       SurveyMessageCommandType commandType;
  //       EncryptedBody encryptedBody;
  //   };
  //
  // ===========================================================================
  xdr.struct("SurveyResponseMessage", [["surveyorPeerId", xdr.lookup("NodeId")], ["surveyedPeerId", xdr.lookup("NodeId")], ["ledgerNum", xdr.lookup("Uint32")], ["commandType", xdr.lookup("SurveyMessageCommandType")], ["encryptedBody", xdr.lookup("EncryptedBody")]]);

  // === xdr source ============================================================
  //
  //   struct SignedSurveyResponseMessage
  //   {
  //       Signature responseSignature;
  //       SurveyResponseMessage response;
  //   };
  //
  // ===========================================================================
  xdr.struct("SignedSurveyResponseMessage", [["responseSignature", xdr.lookup("Signature")], ["response", xdr.lookup("SurveyResponseMessage")]]);

  // === xdr source ============================================================
  //
  //   struct PeerStats
  //   {
  //       NodeID id;
  //       string versionStr<100>;
  //       uint64 messagesRead;
  //       uint64 messagesWritten;
  //       uint64 bytesRead;
  //       uint64 bytesWritten;
  //       uint64 secondsConnected;
  //   
  //       uint64 uniqueFloodBytesRecv;
  //       uint64 duplicateFloodBytesRecv;
  //       uint64 uniqueFetchBytesRecv;
  //       uint64 duplicateFetchBytesRecv;
  //   
  //       uint64 uniqueFloodMessageRecv;
  //       uint64 duplicateFloodMessageRecv;
  //       uint64 uniqueFetchMessageRecv;
  //       uint64 duplicateFetchMessageRecv;
  //   };
  //
  // ===========================================================================
  xdr.struct("PeerStats", [["id", xdr.lookup("NodeId")], ["versionStr", xdr.string(100)], ["messagesRead", xdr.lookup("Uint64")], ["messagesWritten", xdr.lookup("Uint64")], ["bytesRead", xdr.lookup("Uint64")], ["bytesWritten", xdr.lookup("Uint64")], ["secondsConnected", xdr.lookup("Uint64")], ["uniqueFloodBytesRecv", xdr.lookup("Uint64")], ["duplicateFloodBytesRecv", xdr.lookup("Uint64")], ["uniqueFetchBytesRecv", xdr.lookup("Uint64")], ["duplicateFetchBytesRecv", xdr.lookup("Uint64")], ["uniqueFloodMessageRecv", xdr.lookup("Uint64")], ["duplicateFloodMessageRecv", xdr.lookup("Uint64")], ["uniqueFetchMessageRecv", xdr.lookup("Uint64")], ["duplicateFetchMessageRecv", xdr.lookup("Uint64")]]);

  // === xdr source ============================================================
  //
  //   typedef PeerStats PeerStatList<25>;
  //
  // ===========================================================================
  xdr.typedef("PeerStatList", xdr.varArray(xdr.lookup("PeerStats"), 25));

  // === xdr source ============================================================
  //
  //   struct TopologyResponseBody
  //   {
  //       PeerStatList inboundPeers;
  //       PeerStatList outboundPeers;
  //   
  //       uint32 totalInboundPeerCount;
  //       uint32 totalOutboundPeerCount;
  //   };
  //
  // ===========================================================================
  xdr.struct("TopologyResponseBody", [["inboundPeers", xdr.lookup("PeerStatList")], ["outboundPeers", xdr.lookup("PeerStatList")], ["totalInboundPeerCount", xdr.lookup("Uint32")], ["totalOutboundPeerCount", xdr.lookup("Uint32")]]);

  // === xdr source ============================================================
  //
  //   union SurveyResponseBody switch (SurveyMessageCommandType type)
  //   {
  //   case SURVEY_TOPOLOGY:
  //       TopologyResponseBody topologyResponseBody;
  //   };
  //
  // ===========================================================================
  xdr.union("SurveyResponseBody", {
    switchOn: xdr.lookup("SurveyMessageCommandType"),
    switchName: "type",
    switches: [["surveyTopology", "topologyResponseBody"]],
    arms: {
      topologyResponseBody: xdr.lookup("TopologyResponseBody")
    }
  });

  // === xdr source ============================================================
  //
  //   const TX_ADVERT_VECTOR_MAX_SIZE = 1000;
  //
  // ===========================================================================
  xdr["const"]("TX_ADVERT_VECTOR_MAX_SIZE", 1000);

  // === xdr source ============================================================
  //
  //   typedef Hash TxAdvertVector<TX_ADVERT_VECTOR_MAX_SIZE>;
  //
  // ===========================================================================
  xdr.typedef("TxAdvertVector", xdr.varArray(xdr.lookup("Hash"), xdr.lookup("TX_ADVERT_VECTOR_MAX_SIZE")));

  // === xdr source ============================================================
  //
  //   struct FloodAdvert
  //   {
  //       TxAdvertVector txHashes;
  //   };
  //
  // ===========================================================================
  xdr.struct("FloodAdvert", [["txHashes", xdr.lookup("TxAdvertVector")]]);

  // === xdr source ============================================================
  //
  //   const TX_DEMAND_VECTOR_MAX_SIZE = 1000;
  //
  // ===========================================================================
  xdr["const"]("TX_DEMAND_VECTOR_MAX_SIZE", 1000);

  // === xdr source ============================================================
  //
  //   typedef Hash TxDemandVector<TX_DEMAND_VECTOR_MAX_SIZE>;
  //
  // ===========================================================================
  xdr.typedef("TxDemandVector", xdr.varArray(xdr.lookup("Hash"), xdr.lookup("TX_DEMAND_VECTOR_MAX_SIZE")));

  // === xdr source ============================================================
  //
  //   struct FloodDemand
  //   {
  //       TxDemandVector txHashes;
  //   };
  //
  // ===========================================================================
  xdr.struct("FloodDemand", [["txHashes", xdr.lookup("TxDemandVector")]]);

  // === xdr source ============================================================
  //
  //   union StellarMessage switch (MessageType type)
  //   {
  //   case ERROR_MSG:
  //       Error error;
  //   case HELLO:
  //       Hello hello;
  //   case AUTH:
  //       Auth auth;
  //   case DONT_HAVE:
  //       DontHave dontHave;
  //   case GET_PEERS:
  //       void;
  //   case PEERS:
  //       PeerAddress peers<100>;
  //   
  //   case GET_TX_SET:
  //       uint256 txSetHash;
  //   case TX_SET:
  //       TransactionSet txSet;
  //   case GENERALIZED_TX_SET:
  //       GeneralizedTransactionSet generalizedTxSet;
  //   
  //   case TRANSACTION:
  //       TransactionEnvelope transaction;
  //   
  //   case SURVEY_REQUEST:
  //       SignedSurveyRequestMessage signedSurveyRequestMessage;
  //   
  //   case SURVEY_RESPONSE:
  //       SignedSurveyResponseMessage signedSurveyResponseMessage;
  //   
  //   // SCP
  //   case GET_SCP_QUORUMSET:
  //       uint256 qSetHash;
  //   case SCP_QUORUMSET:
  //       SCPQuorumSet qSet;
  //   case SCP_MESSAGE:
  //       SCPEnvelope envelope;
  //   case GET_SCP_STATE:
  //       uint32 getSCPLedgerSeq; // ledger seq requested ; if 0, requests the latest
  //   case SEND_MORE:
  //       SendMore sendMoreMessage;
  //   
  //   // Pull mode
  //   case FLOOD_ADVERT:
  //        FloodAdvert floodAdvert;
  //   case FLOOD_DEMAND:
  //        FloodDemand floodDemand;
  //   };
  //
  // ===========================================================================
  xdr.union("StellarMessage", {
    switchOn: xdr.lookup("MessageType"),
    switchName: "type",
    switches: [["errorMsg", "error"], ["hello", "hello"], ["auth", "auth"], ["dontHave", "dontHave"], ["getPeers", xdr["void"]()], ["peers", "peers"], ["getTxSet", "txSetHash"], ["txSet", "txSet"], ["generalizedTxSet", "generalizedTxSet"], ["transaction", "transaction"], ["surveyRequest", "signedSurveyRequestMessage"], ["surveyResponse", "signedSurveyResponseMessage"], ["getScpQuorumset", "qSetHash"], ["scpQuorumset", "qSet"], ["scpMessage", "envelope"], ["getScpState", "getScpLedgerSeq"], ["sendMore", "sendMoreMessage"], ["floodAdvert", "floodAdvert"], ["floodDemand", "floodDemand"]],
    arms: {
      error: xdr.lookup("Error"),
      hello: xdr.lookup("Hello"),
      auth: xdr.lookup("Auth"),
      dontHave: xdr.lookup("DontHave"),
      peers: xdr.varArray(xdr.lookup("PeerAddress"), 100),
      txSetHash: xdr.lookup("Uint256"),
      txSet: xdr.lookup("TransactionSet"),
      generalizedTxSet: xdr.lookup("GeneralizedTransactionSet"),
      transaction: xdr.lookup("TransactionEnvelope"),
      signedSurveyRequestMessage: xdr.lookup("SignedSurveyRequestMessage"),
      signedSurveyResponseMessage: xdr.lookup("SignedSurveyResponseMessage"),
      qSetHash: xdr.lookup("Uint256"),
      qSet: xdr.lookup("ScpQuorumSet"),
      envelope: xdr.lookup("ScpEnvelope"),
      getScpLedgerSeq: xdr.lookup("Uint32"),
      sendMoreMessage: xdr.lookup("SendMore"),
      floodAdvert: xdr.lookup("FloodAdvert"),
      floodDemand: xdr.lookup("FloodDemand")
    }
  });

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           uint64 sequence;
  //           StellarMessage message;
  //           HmacSha256Mac mac;
  //       }
  //
  // ===========================================================================
  xdr.struct("AuthenticatedMessageV0", [["sequence", xdr.lookup("Uint64")], ["message", xdr.lookup("StellarMessage")], ["mac", xdr.lookup("HmacSha256Mac")]]);

  // === xdr source ============================================================
  //
  //   union AuthenticatedMessage switch (uint32 v)
  //   {
  //   case 0:
  //       struct
  //       {
  //           uint64 sequence;
  //           StellarMessage message;
  //           HmacSha256Mac mac;
  //       } v0;
  //   };
  //
  // ===========================================================================
  xdr.union("AuthenticatedMessage", {
    switchOn: xdr.lookup("Uint32"),
    switchName: "v",
    switches: [[0, "v0"]],
    arms: {
      v0: xdr.lookup("AuthenticatedMessageV0")
    }
  });

  // === xdr source ============================================================
  //
  //   union LiquidityPoolParameters switch (LiquidityPoolType type)
  //   {
  //   case LIQUIDITY_POOL_CONSTANT_PRODUCT:
  //       LiquidityPoolConstantProductParameters constantProduct;
  //   };
  //
  // ===========================================================================
  xdr.union("LiquidityPoolParameters", {
    switchOn: xdr.lookup("LiquidityPoolType"),
    switchName: "type",
    switches: [["liquidityPoolConstantProduct", "constantProduct"]],
    arms: {
      constantProduct: xdr.lookup("LiquidityPoolConstantProductParameters")
    }
  });

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           uint64 id;
  //           uint256 ed25519;
  //       }
  //
  // ===========================================================================
  xdr.struct("MuxedAccountMed25519", [["id", xdr.lookup("Uint64")], ["ed25519", xdr.lookup("Uint256")]]);

  // === xdr source ============================================================
  //
  //   union MuxedAccount switch (CryptoKeyType type)
  //   {
  //   case KEY_TYPE_ED25519:
  //       uint256 ed25519;
  //   case KEY_TYPE_MUXED_ED25519:
  //       struct
  //       {
  //           uint64 id;
  //           uint256 ed25519;
  //       } med25519;
  //   };
  //
  // ===========================================================================
  xdr.union("MuxedAccount", {
    switchOn: xdr.lookup("CryptoKeyType"),
    switchName: "type",
    switches: [["keyTypeEd25519", "ed25519"], ["keyTypeMuxedEd25519", "med25519"]],
    arms: {
      ed25519: xdr.lookup("Uint256"),
      med25519: xdr.lookup("MuxedAccountMed25519")
    }
  });

  // === xdr source ============================================================
  //
  //   struct DecoratedSignature
  //   {
  //       SignatureHint hint;  // last 4 bytes of the public key, used as a hint
  //       Signature signature; // actual signature
  //   };
  //
  // ===========================================================================
  xdr.struct("DecoratedSignature", [["hint", xdr.lookup("SignatureHint")], ["signature", xdr.lookup("Signature")]]);

  // === xdr source ============================================================
  //
  //   enum OperationType
  //   {
  //       CREATE_ACCOUNT = 0,
  //       PAYMENT = 1,
  //       PATH_PAYMENT_STRICT_RECEIVE = 2,
  //       MANAGE_SELL_OFFER = 3,
  //       CREATE_PASSIVE_SELL_OFFER = 4,
  //       SET_OPTIONS = 5,
  //       CHANGE_TRUST = 6,
  //       ALLOW_TRUST = 7,
  //       ACCOUNT_MERGE = 8,
  //       INFLATION = 9,
  //       MANAGE_DATA = 10,
  //       BUMP_SEQUENCE = 11,
  //       MANAGE_BUY_OFFER = 12,
  //       PATH_PAYMENT_STRICT_SEND = 13,
  //       CREATE_CLAIMABLE_BALANCE = 14,
  //       CLAIM_CLAIMABLE_BALANCE = 15,
  //       BEGIN_SPONSORING_FUTURE_RESERVES = 16,
  //       END_SPONSORING_FUTURE_RESERVES = 17,
  //       REVOKE_SPONSORSHIP = 18,
  //       CLAWBACK = 19,
  //       CLAWBACK_CLAIMABLE_BALANCE = 20,
  //       SET_TRUST_LINE_FLAGS = 21,
  //       LIQUIDITY_POOL_DEPOSIT = 22,
  //       LIQUIDITY_POOL_WITHDRAW = 23
  //   };
  //
  // ===========================================================================
  xdr["enum"]("OperationType", {
    createAccount: 0,
    payment: 1,
    pathPaymentStrictReceive: 2,
    manageSellOffer: 3,
    createPassiveSellOffer: 4,
    setOptions: 5,
    changeTrust: 6,
    allowTrust: 7,
    accountMerge: 8,
    inflation: 9,
    manageData: 10,
    bumpSequence: 11,
    manageBuyOffer: 12,
    pathPaymentStrictSend: 13,
    createClaimableBalance: 14,
    claimClaimableBalance: 15,
    beginSponsoringFutureReserves: 16,
    endSponsoringFutureReserves: 17,
    revokeSponsorship: 18,
    clawback: 19,
    clawbackClaimableBalance: 20,
    setTrustLineFlags: 21,
    liquidityPoolDeposit: 22,
    liquidityPoolWithdraw: 23
  });

  // === xdr source ============================================================
  //
  //   struct CreateAccountOp
  //   {
  //       AccountID destination; // account to create
  //       int64 startingBalance; // amount they end up with
  //   };
  //
  // ===========================================================================
  xdr.struct("CreateAccountOp", [["destination", xdr.lookup("AccountId")], ["startingBalance", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   struct PaymentOp
  //   {
  //       MuxedAccount destination; // recipient of the payment
  //       Asset asset;              // what they end up with
  //       int64 amount;             // amount they end up with
  //   };
  //
  // ===========================================================================
  xdr.struct("PaymentOp", [["destination", xdr.lookup("MuxedAccount")], ["asset", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   struct PathPaymentStrictReceiveOp
  //   {
  //       Asset sendAsset; // asset we pay with
  //       int64 sendMax;   // the maximum amount of sendAsset to
  //                        // send (excluding fees).
  //                        // The operation will fail if can't be met
  //   
  //       MuxedAccount destination; // recipient of the payment
  //       Asset destAsset;          // what they end up with
  //       int64 destAmount;         // amount they end up with
  //   
  //       Asset path<5>; // additional hops it must go through to get there
  //   };
  //
  // ===========================================================================
  xdr.struct("PathPaymentStrictReceiveOp", [["sendAsset", xdr.lookup("Asset")], ["sendMax", xdr.lookup("Int64")], ["destination", xdr.lookup("MuxedAccount")], ["destAsset", xdr.lookup("Asset")], ["destAmount", xdr.lookup("Int64")], ["path", xdr.varArray(xdr.lookup("Asset"), 5)]]);

  // === xdr source ============================================================
  //
  //   struct PathPaymentStrictSendOp
  //   {
  //       Asset sendAsset;  // asset we pay with
  //       int64 sendAmount; // amount of sendAsset to send (excluding fees)
  //   
  //       MuxedAccount destination; // recipient of the payment
  //       Asset destAsset;          // what they end up with
  //       int64 destMin;            // the minimum amount of dest asset to
  //                                 // be received
  //                                 // The operation will fail if it can't be met
  //   
  //       Asset path<5>; // additional hops it must go through to get there
  //   };
  //
  // ===========================================================================
  xdr.struct("PathPaymentStrictSendOp", [["sendAsset", xdr.lookup("Asset")], ["sendAmount", xdr.lookup("Int64")], ["destination", xdr.lookup("MuxedAccount")], ["destAsset", xdr.lookup("Asset")], ["destMin", xdr.lookup("Int64")], ["path", xdr.varArray(xdr.lookup("Asset"), 5)]]);

  // === xdr source ============================================================
  //
  //   struct ManageSellOfferOp
  //   {
  //       Asset selling;
  //       Asset buying;
  //       int64 amount; // amount being sold. if set to 0, delete the offer
  //       Price price;  // price of thing being sold in terms of what you are buying
  //   
  //       // 0=create a new offer, otherwise edit an existing offer
  //       int64 offerID;
  //   };
  //
  // ===========================================================================
  xdr.struct("ManageSellOfferOp", [["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")], ["offerId", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   struct ManageBuyOfferOp
  //   {
  //       Asset selling;
  //       Asset buying;
  //       int64 buyAmount; // amount being bought. if set to 0, delete the offer
  //       Price price;     // price of thing being bought in terms of what you are
  //                        // selling
  //   
  //       // 0=create a new offer, otherwise edit an existing offer
  //       int64 offerID;
  //   };
  //
  // ===========================================================================
  xdr.struct("ManageBuyOfferOp", [["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["buyAmount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")], ["offerId", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   struct CreatePassiveSellOfferOp
  //   {
  //       Asset selling; // A
  //       Asset buying;  // B
  //       int64 amount;  // amount taker gets
  //       Price price;   // cost of A in terms of B
  //   };
  //
  // ===========================================================================
  xdr.struct("CreatePassiveSellOfferOp", [["selling", xdr.lookup("Asset")], ["buying", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["price", xdr.lookup("Price")]]);

  // === xdr source ============================================================
  //
  //   struct SetOptionsOp
  //   {
  //       AccountID* inflationDest; // sets the inflation destination
  //   
  //       uint32* clearFlags; // which flags to clear
  //       uint32* setFlags;   // which flags to set
  //   
  //       // account threshold manipulation
  //       uint32* masterWeight; // weight of the master account
  //       uint32* lowThreshold;
  //       uint32* medThreshold;
  //       uint32* highThreshold;
  //   
  //       string32* homeDomain; // sets the home domain
  //   
  //       // Add, update or remove a signer for the account
  //       // signer is deleted if the weight is 0
  //       Signer* signer;
  //   };
  //
  // ===========================================================================
  xdr.struct("SetOptionsOp", [["inflationDest", xdr.option(xdr.lookup("AccountId"))], ["clearFlags", xdr.option(xdr.lookup("Uint32"))], ["setFlags", xdr.option(xdr.lookup("Uint32"))], ["masterWeight", xdr.option(xdr.lookup("Uint32"))], ["lowThreshold", xdr.option(xdr.lookup("Uint32"))], ["medThreshold", xdr.option(xdr.lookup("Uint32"))], ["highThreshold", xdr.option(xdr.lookup("Uint32"))], ["homeDomain", xdr.option(xdr.lookup("String32"))], ["signer", xdr.option(xdr.lookup("Signer"))]]);

  // === xdr source ============================================================
  //
  //   union ChangeTrustAsset switch (AssetType type)
  //   {
  //   case ASSET_TYPE_NATIVE: // Not credit
  //       void;
  //   
  //   case ASSET_TYPE_CREDIT_ALPHANUM4:
  //       AlphaNum4 alphaNum4;
  //   
  //   case ASSET_TYPE_CREDIT_ALPHANUM12:
  //       AlphaNum12 alphaNum12;
  //   
  //   case ASSET_TYPE_POOL_SHARE:
  //       LiquidityPoolParameters liquidityPool;
  //   
  //       // add other asset types here in the future
  //   };
  //
  // ===========================================================================
  xdr.union("ChangeTrustAsset", {
    switchOn: xdr.lookup("AssetType"),
    switchName: "type",
    switches: [["assetTypeNative", xdr["void"]()], ["assetTypeCreditAlphanum4", "alphaNum4"], ["assetTypeCreditAlphanum12", "alphaNum12"], ["assetTypePoolShare", "liquidityPool"]],
    arms: {
      alphaNum4: xdr.lookup("AlphaNum4"),
      alphaNum12: xdr.lookup("AlphaNum12"),
      liquidityPool: xdr.lookup("LiquidityPoolParameters")
    }
  });

  // === xdr source ============================================================
  //
  //   struct ChangeTrustOp
  //   {
  //       ChangeTrustAsset line;
  //   
  //       // if limit is set to 0, deletes the trust line
  //       int64 limit;
  //   };
  //
  // ===========================================================================
  xdr.struct("ChangeTrustOp", [["line", xdr.lookup("ChangeTrustAsset")], ["limit", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   struct AllowTrustOp
  //   {
  //       AccountID trustor;
  //       AssetCode asset;
  //   
  //       // One of 0, AUTHORIZED_FLAG, or AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG
  //       uint32 authorize;
  //   };
  //
  // ===========================================================================
  xdr.struct("AllowTrustOp", [["trustor", xdr.lookup("AccountId")], ["asset", xdr.lookup("AssetCode")], ["authorize", xdr.lookup("Uint32")]]);

  // === xdr source ============================================================
  //
  //   struct ManageDataOp
  //   {
  //       string64 dataName;
  //       DataValue* dataValue; // set to null to clear
  //   };
  //
  // ===========================================================================
  xdr.struct("ManageDataOp", [["dataName", xdr.lookup("String64")], ["dataValue", xdr.option(xdr.lookup("DataValue"))]]);

  // === xdr source ============================================================
  //
  //   struct BumpSequenceOp
  //   {
  //       SequenceNumber bumpTo;
  //   };
  //
  // ===========================================================================
  xdr.struct("BumpSequenceOp", [["bumpTo", xdr.lookup("SequenceNumber")]]);

  // === xdr source ============================================================
  //
  //   struct CreateClaimableBalanceOp
  //   {
  //       Asset asset;
  //       int64 amount;
  //       Claimant claimants<10>;
  //   };
  //
  // ===========================================================================
  xdr.struct("CreateClaimableBalanceOp", [["asset", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")], ["claimants", xdr.varArray(xdr.lookup("Claimant"), 10)]]);

  // === xdr source ============================================================
  //
  //   struct ClaimClaimableBalanceOp
  //   {
  //       ClaimableBalanceID balanceID;
  //   };
  //
  // ===========================================================================
  xdr.struct("ClaimClaimableBalanceOp", [["balanceId", xdr.lookup("ClaimableBalanceId")]]);

  // === xdr source ============================================================
  //
  //   struct BeginSponsoringFutureReservesOp
  //   {
  //       AccountID sponsoredID;
  //   };
  //
  // ===========================================================================
  xdr.struct("BeginSponsoringFutureReservesOp", [["sponsoredId", xdr.lookup("AccountId")]]);

  // === xdr source ============================================================
  //
  //   enum RevokeSponsorshipType
  //   {
  //       REVOKE_SPONSORSHIP_LEDGER_ENTRY = 0,
  //       REVOKE_SPONSORSHIP_SIGNER = 1
  //   };
  //
  // ===========================================================================
  xdr["enum"]("RevokeSponsorshipType", {
    revokeSponsorshipLedgerEntry: 0,
    revokeSponsorshipSigner: 1
  });

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           AccountID accountID;
  //           SignerKey signerKey;
  //       }
  //
  // ===========================================================================
  xdr.struct("RevokeSponsorshipOpSigner", [["accountId", xdr.lookup("AccountId")], ["signerKey", xdr.lookup("SignerKey")]]);

  // === xdr source ============================================================
  //
  //   union RevokeSponsorshipOp switch (RevokeSponsorshipType type)
  //   {
  //   case REVOKE_SPONSORSHIP_LEDGER_ENTRY:
  //       LedgerKey ledgerKey;
  //   case REVOKE_SPONSORSHIP_SIGNER:
  //       struct
  //       {
  //           AccountID accountID;
  //           SignerKey signerKey;
  //       } signer;
  //   };
  //
  // ===========================================================================
  xdr.union("RevokeSponsorshipOp", {
    switchOn: xdr.lookup("RevokeSponsorshipType"),
    switchName: "type",
    switches: [["revokeSponsorshipLedgerEntry", "ledgerKey"], ["revokeSponsorshipSigner", "signer"]],
    arms: {
      ledgerKey: xdr.lookup("LedgerKey"),
      signer: xdr.lookup("RevokeSponsorshipOpSigner")
    }
  });

  // === xdr source ============================================================
  //
  //   struct ClawbackOp
  //   {
  //       Asset asset;
  //       MuxedAccount from;
  //       int64 amount;
  //   };
  //
  // ===========================================================================
  xdr.struct("ClawbackOp", [["asset", xdr.lookup("Asset")], ["from", xdr.lookup("MuxedAccount")], ["amount", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   struct ClawbackClaimableBalanceOp
  //   {
  //       ClaimableBalanceID balanceID;
  //   };
  //
  // ===========================================================================
  xdr.struct("ClawbackClaimableBalanceOp", [["balanceId", xdr.lookup("ClaimableBalanceId")]]);

  // === xdr source ============================================================
  //
  //   struct SetTrustLineFlagsOp
  //   {
  //       AccountID trustor;
  //       Asset asset;
  //   
  //       uint32 clearFlags; // which flags to clear
  //       uint32 setFlags;   // which flags to set
  //   };
  //
  // ===========================================================================
  xdr.struct("SetTrustLineFlagsOp", [["trustor", xdr.lookup("AccountId")], ["asset", xdr.lookup("Asset")], ["clearFlags", xdr.lookup("Uint32")], ["setFlags", xdr.lookup("Uint32")]]);

  // === xdr source ============================================================
  //
  //   const LIQUIDITY_POOL_FEE_V18 = 30;
  //
  // ===========================================================================
  xdr["const"]("LIQUIDITY_POOL_FEE_V18", 30);

  // === xdr source ============================================================
  //
  //   struct LiquidityPoolDepositOp
  //   {
  //       PoolID liquidityPoolID;
  //       int64 maxAmountA; // maximum amount of first asset to deposit
  //       int64 maxAmountB; // maximum amount of second asset to deposit
  //       Price minPrice;   // minimum depositA/depositB
  //       Price maxPrice;   // maximum depositA/depositB
  //   };
  //
  // ===========================================================================
  xdr.struct("LiquidityPoolDepositOp", [["liquidityPoolId", xdr.lookup("PoolId")], ["maxAmountA", xdr.lookup("Int64")], ["maxAmountB", xdr.lookup("Int64")], ["minPrice", xdr.lookup("Price")], ["maxPrice", xdr.lookup("Price")]]);

  // === xdr source ============================================================
  //
  //   struct LiquidityPoolWithdrawOp
  //   {
  //       PoolID liquidityPoolID;
  //       int64 amount;     // amount of pool shares to withdraw
  //       int64 minAmountA; // minimum amount of first asset to withdraw
  //       int64 minAmountB; // minimum amount of second asset to withdraw
  //   };
  //
  // ===========================================================================
  xdr.struct("LiquidityPoolWithdrawOp", [["liquidityPoolId", xdr.lookup("PoolId")], ["amount", xdr.lookup("Int64")], ["minAmountA", xdr.lookup("Int64")], ["minAmountB", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   union switch (OperationType type)
  //       {
  //       case CREATE_ACCOUNT:
  //           CreateAccountOp createAccountOp;
  //       case PAYMENT:
  //           PaymentOp paymentOp;
  //       case PATH_PAYMENT_STRICT_RECEIVE:
  //           PathPaymentStrictReceiveOp pathPaymentStrictReceiveOp;
  //       case MANAGE_SELL_OFFER:
  //           ManageSellOfferOp manageSellOfferOp;
  //       case CREATE_PASSIVE_SELL_OFFER:
  //           CreatePassiveSellOfferOp createPassiveSellOfferOp;
  //       case SET_OPTIONS:
  //           SetOptionsOp setOptionsOp;
  //       case CHANGE_TRUST:
  //           ChangeTrustOp changeTrustOp;
  //       case ALLOW_TRUST:
  //           AllowTrustOp allowTrustOp;
  //       case ACCOUNT_MERGE:
  //           MuxedAccount destination;
  //       case INFLATION:
  //           void;
  //       case MANAGE_DATA:
  //           ManageDataOp manageDataOp;
  //       case BUMP_SEQUENCE:
  //           BumpSequenceOp bumpSequenceOp;
  //       case MANAGE_BUY_OFFER:
  //           ManageBuyOfferOp manageBuyOfferOp;
  //       case PATH_PAYMENT_STRICT_SEND:
  //           PathPaymentStrictSendOp pathPaymentStrictSendOp;
  //       case CREATE_CLAIMABLE_BALANCE:
  //           CreateClaimableBalanceOp createClaimableBalanceOp;
  //       case CLAIM_CLAIMABLE_BALANCE:
  //           ClaimClaimableBalanceOp claimClaimableBalanceOp;
  //       case BEGIN_SPONSORING_FUTURE_RESERVES:
  //           BeginSponsoringFutureReservesOp beginSponsoringFutureReservesOp;
  //       case END_SPONSORING_FUTURE_RESERVES:
  //           void;
  //       case REVOKE_SPONSORSHIP:
  //           RevokeSponsorshipOp revokeSponsorshipOp;
  //       case CLAWBACK:
  //           ClawbackOp clawbackOp;
  //       case CLAWBACK_CLAIMABLE_BALANCE:
  //           ClawbackClaimableBalanceOp clawbackClaimableBalanceOp;
  //       case SET_TRUST_LINE_FLAGS:
  //           SetTrustLineFlagsOp setTrustLineFlagsOp;
  //       case LIQUIDITY_POOL_DEPOSIT:
  //           LiquidityPoolDepositOp liquidityPoolDepositOp;
  //       case LIQUIDITY_POOL_WITHDRAW:
  //           LiquidityPoolWithdrawOp liquidityPoolWithdrawOp;
  //       }
  //
  // ===========================================================================
  xdr.union("OperationBody", {
    switchOn: xdr.lookup("OperationType"),
    switchName: "type",
    switches: [["createAccount", "createAccountOp"], ["payment", "paymentOp"], ["pathPaymentStrictReceive", "pathPaymentStrictReceiveOp"], ["manageSellOffer", "manageSellOfferOp"], ["createPassiveSellOffer", "createPassiveSellOfferOp"], ["setOptions", "setOptionsOp"], ["changeTrust", "changeTrustOp"], ["allowTrust", "allowTrustOp"], ["accountMerge", "destination"], ["inflation", xdr["void"]()], ["manageData", "manageDataOp"], ["bumpSequence", "bumpSequenceOp"], ["manageBuyOffer", "manageBuyOfferOp"], ["pathPaymentStrictSend", "pathPaymentStrictSendOp"], ["createClaimableBalance", "createClaimableBalanceOp"], ["claimClaimableBalance", "claimClaimableBalanceOp"], ["beginSponsoringFutureReserves", "beginSponsoringFutureReservesOp"], ["endSponsoringFutureReserves", xdr["void"]()], ["revokeSponsorship", "revokeSponsorshipOp"], ["clawback", "clawbackOp"], ["clawbackClaimableBalance", "clawbackClaimableBalanceOp"], ["setTrustLineFlags", "setTrustLineFlagsOp"], ["liquidityPoolDeposit", "liquidityPoolDepositOp"], ["liquidityPoolWithdraw", "liquidityPoolWithdrawOp"]],
    arms: {
      createAccountOp: xdr.lookup("CreateAccountOp"),
      paymentOp: xdr.lookup("PaymentOp"),
      pathPaymentStrictReceiveOp: xdr.lookup("PathPaymentStrictReceiveOp"),
      manageSellOfferOp: xdr.lookup("ManageSellOfferOp"),
      createPassiveSellOfferOp: xdr.lookup("CreatePassiveSellOfferOp"),
      setOptionsOp: xdr.lookup("SetOptionsOp"),
      changeTrustOp: xdr.lookup("ChangeTrustOp"),
      allowTrustOp: xdr.lookup("AllowTrustOp"),
      destination: xdr.lookup("MuxedAccount"),
      manageDataOp: xdr.lookup("ManageDataOp"),
      bumpSequenceOp: xdr.lookup("BumpSequenceOp"),
      manageBuyOfferOp: xdr.lookup("ManageBuyOfferOp"),
      pathPaymentStrictSendOp: xdr.lookup("PathPaymentStrictSendOp"),
      createClaimableBalanceOp: xdr.lookup("CreateClaimableBalanceOp"),
      claimClaimableBalanceOp: xdr.lookup("ClaimClaimableBalanceOp"),
      beginSponsoringFutureReservesOp: xdr.lookup("BeginSponsoringFutureReservesOp"),
      revokeSponsorshipOp: xdr.lookup("RevokeSponsorshipOp"),
      clawbackOp: xdr.lookup("ClawbackOp"),
      clawbackClaimableBalanceOp: xdr.lookup("ClawbackClaimableBalanceOp"),
      setTrustLineFlagsOp: xdr.lookup("SetTrustLineFlagsOp"),
      liquidityPoolDepositOp: xdr.lookup("LiquidityPoolDepositOp"),
      liquidityPoolWithdrawOp: xdr.lookup("LiquidityPoolWithdrawOp")
    }
  });

  // === xdr source ============================================================
  //
  //   struct Operation
  //   {
  //       // sourceAccount is the account used to run the operation
  //       // if not set, the runtime defaults to "sourceAccount" specified at
  //       // the transaction level
  //       MuxedAccount* sourceAccount;
  //   
  //       union switch (OperationType type)
  //       {
  //       case CREATE_ACCOUNT:
  //           CreateAccountOp createAccountOp;
  //       case PAYMENT:
  //           PaymentOp paymentOp;
  //       case PATH_PAYMENT_STRICT_RECEIVE:
  //           PathPaymentStrictReceiveOp pathPaymentStrictReceiveOp;
  //       case MANAGE_SELL_OFFER:
  //           ManageSellOfferOp manageSellOfferOp;
  //       case CREATE_PASSIVE_SELL_OFFER:
  //           CreatePassiveSellOfferOp createPassiveSellOfferOp;
  //       case SET_OPTIONS:
  //           SetOptionsOp setOptionsOp;
  //       case CHANGE_TRUST:
  //           ChangeTrustOp changeTrustOp;
  //       case ALLOW_TRUST:
  //           AllowTrustOp allowTrustOp;
  //       case ACCOUNT_MERGE:
  //           MuxedAccount destination;
  //       case INFLATION:
  //           void;
  //       case MANAGE_DATA:
  //           ManageDataOp manageDataOp;
  //       case BUMP_SEQUENCE:
  //           BumpSequenceOp bumpSequenceOp;
  //       case MANAGE_BUY_OFFER:
  //           ManageBuyOfferOp manageBuyOfferOp;
  //       case PATH_PAYMENT_STRICT_SEND:
  //           PathPaymentStrictSendOp pathPaymentStrictSendOp;
  //       case CREATE_CLAIMABLE_BALANCE:
  //           CreateClaimableBalanceOp createClaimableBalanceOp;
  //       case CLAIM_CLAIMABLE_BALANCE:
  //           ClaimClaimableBalanceOp claimClaimableBalanceOp;
  //       case BEGIN_SPONSORING_FUTURE_RESERVES:
  //           BeginSponsoringFutureReservesOp beginSponsoringFutureReservesOp;
  //       case END_SPONSORING_FUTURE_RESERVES:
  //           void;
  //       case REVOKE_SPONSORSHIP:
  //           RevokeSponsorshipOp revokeSponsorshipOp;
  //       case CLAWBACK:
  //           ClawbackOp clawbackOp;
  //       case CLAWBACK_CLAIMABLE_BALANCE:
  //           ClawbackClaimableBalanceOp clawbackClaimableBalanceOp;
  //       case SET_TRUST_LINE_FLAGS:
  //           SetTrustLineFlagsOp setTrustLineFlagsOp;
  //       case LIQUIDITY_POOL_DEPOSIT:
  //           LiquidityPoolDepositOp liquidityPoolDepositOp;
  //       case LIQUIDITY_POOL_WITHDRAW:
  //           LiquidityPoolWithdrawOp liquidityPoolWithdrawOp;
  //       }
  //       body;
  //   };
  //
  // ===========================================================================
  xdr.struct("Operation", [["sourceAccount", xdr.option(xdr.lookup("MuxedAccount"))], ["body", xdr.lookup("OperationBody")]]);

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           AccountID sourceAccount;
  //           SequenceNumber seqNum;
  //           uint32 opNum;
  //       }
  //
  // ===========================================================================
  xdr.struct("HashIdPreimageOperationId", [["sourceAccount", xdr.lookup("AccountId")], ["seqNum", xdr.lookup("SequenceNumber")], ["opNum", xdr.lookup("Uint32")]]);

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           AccountID sourceAccount;
  //           SequenceNumber seqNum;
  //           uint32 opNum;
  //           PoolID liquidityPoolID;
  //           Asset asset;
  //       }
  //
  // ===========================================================================
  xdr.struct("HashIdPreimageRevokeId", [["sourceAccount", xdr.lookup("AccountId")], ["seqNum", xdr.lookup("SequenceNumber")], ["opNum", xdr.lookup("Uint32")], ["liquidityPoolId", xdr.lookup("PoolId")], ["asset", xdr.lookup("Asset")]]);

  // === xdr source ============================================================
  //
  //   union HashIDPreimage switch (EnvelopeType type)
  //   {
  //   case ENVELOPE_TYPE_OP_ID:
  //       struct
  //       {
  //           AccountID sourceAccount;
  //           SequenceNumber seqNum;
  //           uint32 opNum;
  //       } operationID;
  //   case ENVELOPE_TYPE_POOL_REVOKE_OP_ID:
  //       struct
  //       {
  //           AccountID sourceAccount;
  //           SequenceNumber seqNum;
  //           uint32 opNum;
  //           PoolID liquidityPoolID;
  //           Asset asset;
  //       } revokeID;
  //   };
  //
  // ===========================================================================
  xdr.union("HashIdPreimage", {
    switchOn: xdr.lookup("EnvelopeType"),
    switchName: "type",
    switches: [["envelopeTypeOpId", "operationId"], ["envelopeTypePoolRevokeOpId", "revokeId"]],
    arms: {
      operationId: xdr.lookup("HashIdPreimageOperationId"),
      revokeId: xdr.lookup("HashIdPreimageRevokeId")
    }
  });

  // === xdr source ============================================================
  //
  //   enum MemoType
  //   {
  //       MEMO_NONE = 0,
  //       MEMO_TEXT = 1,
  //       MEMO_ID = 2,
  //       MEMO_HASH = 3,
  //       MEMO_RETURN = 4
  //   };
  //
  // ===========================================================================
  xdr["enum"]("MemoType", {
    memoNone: 0,
    memoText: 1,
    memoId: 2,
    memoHash: 3,
    memoReturn: 4
  });

  // === xdr source ============================================================
  //
  //   union Memo switch (MemoType type)
  //   {
  //   case MEMO_NONE:
  //       void;
  //   case MEMO_TEXT:
  //       string text<28>;
  //   case MEMO_ID:
  //       uint64 id;
  //   case MEMO_HASH:
  //       Hash hash; // the hash of what to pull from the content server
  //   case MEMO_RETURN:
  //       Hash retHash; // the hash of the tx you are rejecting
  //   };
  //
  // ===========================================================================
  xdr.union("Memo", {
    switchOn: xdr.lookup("MemoType"),
    switchName: "type",
    switches: [["memoNone", xdr["void"]()], ["memoText", "text"], ["memoId", "id"], ["memoHash", "hash"], ["memoReturn", "retHash"]],
    arms: {
      text: xdr.string(28),
      id: xdr.lookup("Uint64"),
      hash: xdr.lookup("Hash"),
      retHash: xdr.lookup("Hash")
    }
  });

  // === xdr source ============================================================
  //
  //   struct TimeBounds
  //   {
  //       TimePoint minTime;
  //       TimePoint maxTime; // 0 here means no maxTime
  //   };
  //
  // ===========================================================================
  xdr.struct("TimeBounds", [["minTime", xdr.lookup("TimePoint")], ["maxTime", xdr.lookup("TimePoint")]]);

  // === xdr source ============================================================
  //
  //   struct LedgerBounds
  //   {
  //       uint32 minLedger;
  //       uint32 maxLedger; // 0 here means no maxLedger
  //   };
  //
  // ===========================================================================
  xdr.struct("LedgerBounds", [["minLedger", xdr.lookup("Uint32")], ["maxLedger", xdr.lookup("Uint32")]]);

  // === xdr source ============================================================
  //
  //   struct PreconditionsV2
  //   {
  //       TimeBounds* timeBounds;
  //   
  //       // Transaction only valid for ledger numbers n such that
  //       // minLedger <= n < maxLedger (if maxLedger == 0, then
  //       // only minLedger is checked)
  //       LedgerBounds* ledgerBounds;
  //   
  //       // If NULL, only valid when sourceAccount's sequence number
  //       // is seqNum - 1.  Otherwise, valid when sourceAccount's
  //       // sequence number n satisfies minSeqNum <= n < tx.seqNum.
  //       // Note that after execution the account's sequence number
  //       // is always raised to tx.seqNum, and a transaction is not
  //       // valid if tx.seqNum is too high to ensure replay protection.
  //       SequenceNumber* minSeqNum;
  //   
  //       // For the transaction to be valid, the current ledger time must
  //       // be at least minSeqAge greater than sourceAccount's seqTime.
  //       Duration minSeqAge;
  //   
  //       // For the transaction to be valid, the current ledger number
  //       // must be at least minSeqLedgerGap greater than sourceAccount's
  //       // seqLedger.
  //       uint32 minSeqLedgerGap;
  //   
  //       // For the transaction to be valid, there must be a signature
  //       // corresponding to every Signer in this array, even if the
  //       // signature is not otherwise required by the sourceAccount or
  //       // operations.
  //       SignerKey extraSigners<2>;
  //   };
  //
  // ===========================================================================
  xdr.struct("PreconditionsV2", [["timeBounds", xdr.option(xdr.lookup("TimeBounds"))], ["ledgerBounds", xdr.option(xdr.lookup("LedgerBounds"))], ["minSeqNum", xdr.option(xdr.lookup("SequenceNumber"))], ["minSeqAge", xdr.lookup("Duration")], ["minSeqLedgerGap", xdr.lookup("Uint32")], ["extraSigners", xdr.varArray(xdr.lookup("SignerKey"), 2)]]);

  // === xdr source ============================================================
  //
  //   enum PreconditionType
  //   {
  //       PRECOND_NONE = 0,
  //       PRECOND_TIME = 1,
  //       PRECOND_V2 = 2
  //   };
  //
  // ===========================================================================
  xdr["enum"]("PreconditionType", {
    precondNone: 0,
    precondTime: 1,
    precondV2: 2
  });

  // === xdr source ============================================================
  //
  //   union Preconditions switch (PreconditionType type)
  //   {
  //   case PRECOND_NONE:
  //       void;
  //   case PRECOND_TIME:
  //       TimeBounds timeBounds;
  //   case PRECOND_V2:
  //       PreconditionsV2 v2;
  //   };
  //
  // ===========================================================================
  xdr.union("Preconditions", {
    switchOn: xdr.lookup("PreconditionType"),
    switchName: "type",
    switches: [["precondNone", xdr["void"]()], ["precondTime", "timeBounds"], ["precondV2", "v2"]],
    arms: {
      timeBounds: xdr.lookup("TimeBounds"),
      v2: xdr.lookup("PreconditionsV2")
    }
  });

  // === xdr source ============================================================
  //
  //   const MAX_OPS_PER_TX = 100;
  //
  // ===========================================================================
  xdr["const"]("MAX_OPS_PER_TX", 100);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("TransactionV0Ext", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct TransactionV0
  //   {
  //       uint256 sourceAccountEd25519;
  //       uint32 fee;
  //       SequenceNumber seqNum;
  //       TimeBounds* timeBounds;
  //       Memo memo;
  //       Operation operations<MAX_OPS_PER_TX>;
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionV0", [["sourceAccountEd25519", xdr.lookup("Uint256")], ["fee", xdr.lookup("Uint32")], ["seqNum", xdr.lookup("SequenceNumber")], ["timeBounds", xdr.option(xdr.lookup("TimeBounds"))], ["memo", xdr.lookup("Memo")], ["operations", xdr.varArray(xdr.lookup("Operation"), xdr.lookup("MAX_OPS_PER_TX"))], ["ext", xdr.lookup("TransactionV0Ext")]]);

  // === xdr source ============================================================
  //
  //   struct TransactionV0Envelope
  //   {
  //       TransactionV0 tx;
  //       /* Each decorated signature is a signature over the SHA256 hash of
  //        * a TransactionSignaturePayload */
  //       DecoratedSignature signatures<20>;
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionV0Envelope", [["tx", xdr.lookup("TransactionV0")], ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)]]);

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("TransactionExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct Transaction
  //   {
  //       // account used to run the transaction
  //       MuxedAccount sourceAccount;
  //   
  //       // the fee the sourceAccount will pay
  //       uint32 fee;
  //   
  //       // sequence number to consume in the account
  //       SequenceNumber seqNum;
  //   
  //       // validity conditions
  //       Preconditions cond;
  //   
  //       Memo memo;
  //   
  //       Operation operations<MAX_OPS_PER_TX>;
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("Transaction", [["sourceAccount", xdr.lookup("MuxedAccount")], ["fee", xdr.lookup("Uint32")], ["seqNum", xdr.lookup("SequenceNumber")], ["cond", xdr.lookup("Preconditions")], ["memo", xdr.lookup("Memo")], ["operations", xdr.varArray(xdr.lookup("Operation"), xdr.lookup("MAX_OPS_PER_TX"))], ["ext", xdr.lookup("TransactionExt")]]);

  // === xdr source ============================================================
  //
  //   struct TransactionV1Envelope
  //   {
  //       Transaction tx;
  //       /* Each decorated signature is a signature over the SHA256 hash of
  //        * a TransactionSignaturePayload */
  //       DecoratedSignature signatures<20>;
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionV1Envelope", [["tx", xdr.lookup("Transaction")], ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)]]);

  // === xdr source ============================================================
  //
  //   union switch (EnvelopeType type)
  //       {
  //       case ENVELOPE_TYPE_TX:
  //           TransactionV1Envelope v1;
  //       }
  //
  // ===========================================================================
  xdr.union("FeeBumpTransactionInnerTx", {
    switchOn: xdr.lookup("EnvelopeType"),
    switchName: "type",
    switches: [["envelopeTypeTx", "v1"]],
    arms: {
      v1: xdr.lookup("TransactionV1Envelope")
    }
  });

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("FeeBumpTransactionExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct FeeBumpTransaction
  //   {
  //       MuxedAccount feeSource;
  //       int64 fee;
  //       union switch (EnvelopeType type)
  //       {
  //       case ENVELOPE_TYPE_TX:
  //           TransactionV1Envelope v1;
  //       }
  //       innerTx;
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("FeeBumpTransaction", [["feeSource", xdr.lookup("MuxedAccount")], ["fee", xdr.lookup("Int64")], ["innerTx", xdr.lookup("FeeBumpTransactionInnerTx")], ["ext", xdr.lookup("FeeBumpTransactionExt")]]);

  // === xdr source ============================================================
  //
  //   struct FeeBumpTransactionEnvelope
  //   {
  //       FeeBumpTransaction tx;
  //       /* Each decorated signature is a signature over the SHA256 hash of
  //        * a TransactionSignaturePayload */
  //       DecoratedSignature signatures<20>;
  //   };
  //
  // ===========================================================================
  xdr.struct("FeeBumpTransactionEnvelope", [["tx", xdr.lookup("FeeBumpTransaction")], ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)]]);

  // === xdr source ============================================================
  //
  //   union TransactionEnvelope switch (EnvelopeType type)
  //   {
  //   case ENVELOPE_TYPE_TX_V0:
  //       TransactionV0Envelope v0;
  //   case ENVELOPE_TYPE_TX:
  //       TransactionV1Envelope v1;
  //   case ENVELOPE_TYPE_TX_FEE_BUMP:
  //       FeeBumpTransactionEnvelope feeBump;
  //   };
  //
  // ===========================================================================
  xdr.union("TransactionEnvelope", {
    switchOn: xdr.lookup("EnvelopeType"),
    switchName: "type",
    switches: [["envelopeTypeTxV0", "v0"], ["envelopeTypeTx", "v1"], ["envelopeTypeTxFeeBump", "feeBump"]],
    arms: {
      v0: xdr.lookup("TransactionV0Envelope"),
      v1: xdr.lookup("TransactionV1Envelope"),
      feeBump: xdr.lookup("FeeBumpTransactionEnvelope")
    }
  });

  // === xdr source ============================================================
  //
  //   union switch (EnvelopeType type)
  //       {
  //       // Backwards Compatibility: Use ENVELOPE_TYPE_TX to sign ENVELOPE_TYPE_TX_V0
  //       case ENVELOPE_TYPE_TX:
  //           Transaction tx;
  //       case ENVELOPE_TYPE_TX_FEE_BUMP:
  //           FeeBumpTransaction feeBump;
  //       }
  //
  // ===========================================================================
  xdr.union("TransactionSignaturePayloadTaggedTransaction", {
    switchOn: xdr.lookup("EnvelopeType"),
    switchName: "type",
    switches: [["envelopeTypeTx", "tx"], ["envelopeTypeTxFeeBump", "feeBump"]],
    arms: {
      tx: xdr.lookup("Transaction"),
      feeBump: xdr.lookup("FeeBumpTransaction")
    }
  });

  // === xdr source ============================================================
  //
  //   struct TransactionSignaturePayload
  //   {
  //       Hash networkId;
  //       union switch (EnvelopeType type)
  //       {
  //       // Backwards Compatibility: Use ENVELOPE_TYPE_TX to sign ENVELOPE_TYPE_TX_V0
  //       case ENVELOPE_TYPE_TX:
  //           Transaction tx;
  //       case ENVELOPE_TYPE_TX_FEE_BUMP:
  //           FeeBumpTransaction feeBump;
  //       }
  //       taggedTransaction;
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionSignaturePayload", [["networkId", xdr.lookup("Hash")], ["taggedTransaction", xdr.lookup("TransactionSignaturePayloadTaggedTransaction")]]);

  // === xdr source ============================================================
  //
  //   enum ClaimAtomType
  //   {
  //       CLAIM_ATOM_TYPE_V0 = 0,
  //       CLAIM_ATOM_TYPE_ORDER_BOOK = 1,
  //       CLAIM_ATOM_TYPE_LIQUIDITY_POOL = 2
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ClaimAtomType", {
    claimAtomTypeV0: 0,
    claimAtomTypeOrderBook: 1,
    claimAtomTypeLiquidityPool: 2
  });

  // === xdr source ============================================================
  //
  //   struct ClaimOfferAtomV0
  //   {
  //       // emitted to identify the offer
  //       uint256 sellerEd25519; // Account that owns the offer
  //       int64 offerID;
  //   
  //       // amount and asset taken from the owner
  //       Asset assetSold;
  //       int64 amountSold;
  //   
  //       // amount and asset sent to the owner
  //       Asset assetBought;
  //       int64 amountBought;
  //   };
  //
  // ===========================================================================
  xdr.struct("ClaimOfferAtomV0", [["sellerEd25519", xdr.lookup("Uint256")], ["offerId", xdr.lookup("Int64")], ["assetSold", xdr.lookup("Asset")], ["amountSold", xdr.lookup("Int64")], ["assetBought", xdr.lookup("Asset")], ["amountBought", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   struct ClaimOfferAtom
  //   {
  //       // emitted to identify the offer
  //       AccountID sellerID; // Account that owns the offer
  //       int64 offerID;
  //   
  //       // amount and asset taken from the owner
  //       Asset assetSold;
  //       int64 amountSold;
  //   
  //       // amount and asset sent to the owner
  //       Asset assetBought;
  //       int64 amountBought;
  //   };
  //
  // ===========================================================================
  xdr.struct("ClaimOfferAtom", [["sellerId", xdr.lookup("AccountId")], ["offerId", xdr.lookup("Int64")], ["assetSold", xdr.lookup("Asset")], ["amountSold", xdr.lookup("Int64")], ["assetBought", xdr.lookup("Asset")], ["amountBought", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   struct ClaimLiquidityAtom
  //   {
  //       PoolID liquidityPoolID;
  //   
  //       // amount and asset taken from the pool
  //       Asset assetSold;
  //       int64 amountSold;
  //   
  //       // amount and asset sent to the pool
  //       Asset assetBought;
  //       int64 amountBought;
  //   };
  //
  // ===========================================================================
  xdr.struct("ClaimLiquidityAtom", [["liquidityPoolId", xdr.lookup("PoolId")], ["assetSold", xdr.lookup("Asset")], ["amountSold", xdr.lookup("Int64")], ["assetBought", xdr.lookup("Asset")], ["amountBought", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   union ClaimAtom switch (ClaimAtomType type)
  //   {
  //   case CLAIM_ATOM_TYPE_V0:
  //       ClaimOfferAtomV0 v0;
  //   case CLAIM_ATOM_TYPE_ORDER_BOOK:
  //       ClaimOfferAtom orderBook;
  //   case CLAIM_ATOM_TYPE_LIQUIDITY_POOL:
  //       ClaimLiquidityAtom liquidityPool;
  //   };
  //
  // ===========================================================================
  xdr.union("ClaimAtom", {
    switchOn: xdr.lookup("ClaimAtomType"),
    switchName: "type",
    switches: [["claimAtomTypeV0", "v0"], ["claimAtomTypeOrderBook", "orderBook"], ["claimAtomTypeLiquidityPool", "liquidityPool"]],
    arms: {
      v0: xdr.lookup("ClaimOfferAtomV0"),
      orderBook: xdr.lookup("ClaimOfferAtom"),
      liquidityPool: xdr.lookup("ClaimLiquidityAtom")
    }
  });

  // === xdr source ============================================================
  //
  //   enum CreateAccountResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       CREATE_ACCOUNT_SUCCESS = 0, // account was created
  //   
  //       // codes considered as "failure" for the operation
  //       CREATE_ACCOUNT_MALFORMED = -1,   // invalid destination
  //       CREATE_ACCOUNT_UNDERFUNDED = -2, // not enough funds in source account
  //       CREATE_ACCOUNT_LOW_RESERVE =
  //           -3, // would create an account below the min reserve
  //       CREATE_ACCOUNT_ALREADY_EXIST = -4 // account already exists
  //   };
  //
  // ===========================================================================
  xdr["enum"]("CreateAccountResultCode", {
    createAccountSuccess: 0,
    createAccountMalformed: -1,
    createAccountUnderfunded: -2,
    createAccountLowReserve: -3,
    createAccountAlreadyExist: -4
  });

  // === xdr source ============================================================
  //
  //   union CreateAccountResult switch (CreateAccountResultCode code)
  //   {
  //   case CREATE_ACCOUNT_SUCCESS:
  //       void;
  //   case CREATE_ACCOUNT_MALFORMED:
  //   case CREATE_ACCOUNT_UNDERFUNDED:
  //   case CREATE_ACCOUNT_LOW_RESERVE:
  //   case CREATE_ACCOUNT_ALREADY_EXIST:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("CreateAccountResult", {
    switchOn: xdr.lookup("CreateAccountResultCode"),
    switchName: "code",
    switches: [["createAccountSuccess", xdr["void"]()], ["createAccountMalformed", xdr["void"]()], ["createAccountUnderfunded", xdr["void"]()], ["createAccountLowReserve", xdr["void"]()], ["createAccountAlreadyExist", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum PaymentResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       PAYMENT_SUCCESS = 0, // payment successfully completed
  //   
  //       // codes considered as "failure" for the operation
  //       PAYMENT_MALFORMED = -1,          // bad input
  //       PAYMENT_UNDERFUNDED = -2,        // not enough funds in source account
  //       PAYMENT_SRC_NO_TRUST = -3,       // no trust line on source account
  //       PAYMENT_SRC_NOT_AUTHORIZED = -4, // source not authorized to transfer
  //       PAYMENT_NO_DESTINATION = -5,     // destination account does not exist
  //       PAYMENT_NO_TRUST = -6,       // destination missing a trust line for asset
  //       PAYMENT_NOT_AUTHORIZED = -7, // destination not authorized to hold asset
  //       PAYMENT_LINE_FULL = -8,      // destination would go above their limit
  //       PAYMENT_NO_ISSUER = -9       // missing issuer on asset
  //   };
  //
  // ===========================================================================
  xdr["enum"]("PaymentResultCode", {
    paymentSuccess: 0,
    paymentMalformed: -1,
    paymentUnderfunded: -2,
    paymentSrcNoTrust: -3,
    paymentSrcNotAuthorized: -4,
    paymentNoDestination: -5,
    paymentNoTrust: -6,
    paymentNotAuthorized: -7,
    paymentLineFull: -8,
    paymentNoIssuer: -9
  });

  // === xdr source ============================================================
  //
  //   union PaymentResult switch (PaymentResultCode code)
  //   {
  //   case PAYMENT_SUCCESS:
  //       void;
  //   case PAYMENT_MALFORMED:
  //   case PAYMENT_UNDERFUNDED:
  //   case PAYMENT_SRC_NO_TRUST:
  //   case PAYMENT_SRC_NOT_AUTHORIZED:
  //   case PAYMENT_NO_DESTINATION:
  //   case PAYMENT_NO_TRUST:
  //   case PAYMENT_NOT_AUTHORIZED:
  //   case PAYMENT_LINE_FULL:
  //   case PAYMENT_NO_ISSUER:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("PaymentResult", {
    switchOn: xdr.lookup("PaymentResultCode"),
    switchName: "code",
    switches: [["paymentSuccess", xdr["void"]()], ["paymentMalformed", xdr["void"]()], ["paymentUnderfunded", xdr["void"]()], ["paymentSrcNoTrust", xdr["void"]()], ["paymentSrcNotAuthorized", xdr["void"]()], ["paymentNoDestination", xdr["void"]()], ["paymentNoTrust", xdr["void"]()], ["paymentNotAuthorized", xdr["void"]()], ["paymentLineFull", xdr["void"]()], ["paymentNoIssuer", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum PathPaymentStrictReceiveResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       PATH_PAYMENT_STRICT_RECEIVE_SUCCESS = 0, // success
  //   
  //       // codes considered as "failure" for the operation
  //       PATH_PAYMENT_STRICT_RECEIVE_MALFORMED = -1, // bad input
  //       PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED =
  //           -2, // not enough funds in source account
  //       PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST =
  //           -3, // no trust line on source account
  //       PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED =
  //           -4, // source not authorized to transfer
  //       PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION =
  //           -5, // destination account does not exist
  //       PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST =
  //           -6, // dest missing a trust line for asset
  //       PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED =
  //           -7, // dest not authorized to hold asset
  //       PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL =
  //           -8, // dest would go above their limit
  //       PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER = -9, // missing issuer on one asset
  //       PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS =
  //           -10, // not enough offers to satisfy path
  //       PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF =
  //           -11, // would cross one of its own offers
  //       PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX = -12 // could not satisfy sendmax
  //   };
  //
  // ===========================================================================
  xdr["enum"]("PathPaymentStrictReceiveResultCode", {
    pathPaymentStrictReceiveSuccess: 0,
    pathPaymentStrictReceiveMalformed: -1,
    pathPaymentStrictReceiveUnderfunded: -2,
    pathPaymentStrictReceiveSrcNoTrust: -3,
    pathPaymentStrictReceiveSrcNotAuthorized: -4,
    pathPaymentStrictReceiveNoDestination: -5,
    pathPaymentStrictReceiveNoTrust: -6,
    pathPaymentStrictReceiveNotAuthorized: -7,
    pathPaymentStrictReceiveLineFull: -8,
    pathPaymentStrictReceiveNoIssuer: -9,
    pathPaymentStrictReceiveTooFewOffers: -10,
    pathPaymentStrictReceiveOfferCrossSelf: -11,
    pathPaymentStrictReceiveOverSendmax: -12
  });

  // === xdr source ============================================================
  //
  //   struct SimplePaymentResult
  //   {
  //       AccountID destination;
  //       Asset asset;
  //       int64 amount;
  //   };
  //
  // ===========================================================================
  xdr.struct("SimplePaymentResult", [["destination", xdr.lookup("AccountId")], ["asset", xdr.lookup("Asset")], ["amount", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           ClaimAtom offers<>;
  //           SimplePaymentResult last;
  //       }
  //
  // ===========================================================================
  xdr.struct("PathPaymentStrictReceiveResultSuccess", [["offers", xdr.varArray(xdr.lookup("ClaimAtom"), 2147483647)], ["last", xdr.lookup("SimplePaymentResult")]]);

  // === xdr source ============================================================
  //
  //   union PathPaymentStrictReceiveResult switch (
  //       PathPaymentStrictReceiveResultCode code)
  //   {
  //   case PATH_PAYMENT_STRICT_RECEIVE_SUCCESS:
  //       struct
  //       {
  //           ClaimAtom offers<>;
  //           SimplePaymentResult last;
  //       } success;
  //   case PATH_PAYMENT_STRICT_RECEIVE_MALFORMED:
  //   case PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED:
  //   case PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST:
  //   case PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED:
  //   case PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION:
  //   case PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST:
  //   case PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED:
  //   case PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL:
  //       void;
  //   case PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER:
  //       Asset noIssuer; // the asset that caused the error
  //   case PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS:
  //   case PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF:
  //   case PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("PathPaymentStrictReceiveResult", {
    switchOn: xdr.lookup("PathPaymentStrictReceiveResultCode"),
    switchName: "code",
    switches: [["pathPaymentStrictReceiveSuccess", "success"], ["pathPaymentStrictReceiveMalformed", xdr["void"]()], ["pathPaymentStrictReceiveUnderfunded", xdr["void"]()], ["pathPaymentStrictReceiveSrcNoTrust", xdr["void"]()], ["pathPaymentStrictReceiveSrcNotAuthorized", xdr["void"]()], ["pathPaymentStrictReceiveNoDestination", xdr["void"]()], ["pathPaymentStrictReceiveNoTrust", xdr["void"]()], ["pathPaymentStrictReceiveNotAuthorized", xdr["void"]()], ["pathPaymentStrictReceiveLineFull", xdr["void"]()], ["pathPaymentStrictReceiveNoIssuer", "noIssuer"], ["pathPaymentStrictReceiveTooFewOffers", xdr["void"]()], ["pathPaymentStrictReceiveOfferCrossSelf", xdr["void"]()], ["pathPaymentStrictReceiveOverSendmax", xdr["void"]()]],
    arms: {
      success: xdr.lookup("PathPaymentStrictReceiveResultSuccess"),
      noIssuer: xdr.lookup("Asset")
    }
  });

  // === xdr source ============================================================
  //
  //   enum PathPaymentStrictSendResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       PATH_PAYMENT_STRICT_SEND_SUCCESS = 0, // success
  //   
  //       // codes considered as "failure" for the operation
  //       PATH_PAYMENT_STRICT_SEND_MALFORMED = -1, // bad input
  //       PATH_PAYMENT_STRICT_SEND_UNDERFUNDED =
  //           -2, // not enough funds in source account
  //       PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST =
  //           -3, // no trust line on source account
  //       PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED =
  //           -4, // source not authorized to transfer
  //       PATH_PAYMENT_STRICT_SEND_NO_DESTINATION =
  //           -5, // destination account does not exist
  //       PATH_PAYMENT_STRICT_SEND_NO_TRUST =
  //           -6, // dest missing a trust line for asset
  //       PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED =
  //           -7, // dest not authorized to hold asset
  //       PATH_PAYMENT_STRICT_SEND_LINE_FULL = -8, // dest would go above their limit
  //       PATH_PAYMENT_STRICT_SEND_NO_ISSUER = -9, // missing issuer on one asset
  //       PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS =
  //           -10, // not enough offers to satisfy path
  //       PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF =
  //           -11, // would cross one of its own offers
  //       PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN = -12 // could not satisfy destMin
  //   };
  //
  // ===========================================================================
  xdr["enum"]("PathPaymentStrictSendResultCode", {
    pathPaymentStrictSendSuccess: 0,
    pathPaymentStrictSendMalformed: -1,
    pathPaymentStrictSendUnderfunded: -2,
    pathPaymentStrictSendSrcNoTrust: -3,
    pathPaymentStrictSendSrcNotAuthorized: -4,
    pathPaymentStrictSendNoDestination: -5,
    pathPaymentStrictSendNoTrust: -6,
    pathPaymentStrictSendNotAuthorized: -7,
    pathPaymentStrictSendLineFull: -8,
    pathPaymentStrictSendNoIssuer: -9,
    pathPaymentStrictSendTooFewOffers: -10,
    pathPaymentStrictSendOfferCrossSelf: -11,
    pathPaymentStrictSendUnderDestmin: -12
  });

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           ClaimAtom offers<>;
  //           SimplePaymentResult last;
  //       }
  //
  // ===========================================================================
  xdr.struct("PathPaymentStrictSendResultSuccess", [["offers", xdr.varArray(xdr.lookup("ClaimAtom"), 2147483647)], ["last", xdr.lookup("SimplePaymentResult")]]);

  // === xdr source ============================================================
  //
  //   union PathPaymentStrictSendResult switch (PathPaymentStrictSendResultCode code)
  //   {
  //   case PATH_PAYMENT_STRICT_SEND_SUCCESS:
  //       struct
  //       {
  //           ClaimAtom offers<>;
  //           SimplePaymentResult last;
  //       } success;
  //   case PATH_PAYMENT_STRICT_SEND_MALFORMED:
  //   case PATH_PAYMENT_STRICT_SEND_UNDERFUNDED:
  //   case PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST:
  //   case PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED:
  //   case PATH_PAYMENT_STRICT_SEND_NO_DESTINATION:
  //   case PATH_PAYMENT_STRICT_SEND_NO_TRUST:
  //   case PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED:
  //   case PATH_PAYMENT_STRICT_SEND_LINE_FULL:
  //       void;
  //   case PATH_PAYMENT_STRICT_SEND_NO_ISSUER:
  //       Asset noIssuer; // the asset that caused the error
  //   case PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS:
  //   case PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF:
  //   case PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("PathPaymentStrictSendResult", {
    switchOn: xdr.lookup("PathPaymentStrictSendResultCode"),
    switchName: "code",
    switches: [["pathPaymentStrictSendSuccess", "success"], ["pathPaymentStrictSendMalformed", xdr["void"]()], ["pathPaymentStrictSendUnderfunded", xdr["void"]()], ["pathPaymentStrictSendSrcNoTrust", xdr["void"]()], ["pathPaymentStrictSendSrcNotAuthorized", xdr["void"]()], ["pathPaymentStrictSendNoDestination", xdr["void"]()], ["pathPaymentStrictSendNoTrust", xdr["void"]()], ["pathPaymentStrictSendNotAuthorized", xdr["void"]()], ["pathPaymentStrictSendLineFull", xdr["void"]()], ["pathPaymentStrictSendNoIssuer", "noIssuer"], ["pathPaymentStrictSendTooFewOffers", xdr["void"]()], ["pathPaymentStrictSendOfferCrossSelf", xdr["void"]()], ["pathPaymentStrictSendUnderDestmin", xdr["void"]()]],
    arms: {
      success: xdr.lookup("PathPaymentStrictSendResultSuccess"),
      noIssuer: xdr.lookup("Asset")
    }
  });

  // === xdr source ============================================================
  //
  //   enum ManageSellOfferResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       MANAGE_SELL_OFFER_SUCCESS = 0,
  //   
  //       // codes considered as "failure" for the operation
  //       MANAGE_SELL_OFFER_MALFORMED = -1, // generated offer would be invalid
  //       MANAGE_SELL_OFFER_SELL_NO_TRUST =
  //           -2,                              // no trust line for what we're selling
  //       MANAGE_SELL_OFFER_BUY_NO_TRUST = -3, // no trust line for what we're buying
  //       MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED = -4, // not authorized to sell
  //       MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED = -5,  // not authorized to buy
  //       MANAGE_SELL_OFFER_LINE_FULL = -6, // can't receive more of what it's buying
  //       MANAGE_SELL_OFFER_UNDERFUNDED = -7, // doesn't hold what it's trying to sell
  //       MANAGE_SELL_OFFER_CROSS_SELF =
  //           -8, // would cross an offer from the same user
  //       MANAGE_SELL_OFFER_SELL_NO_ISSUER = -9, // no issuer for what we're selling
  //       MANAGE_SELL_OFFER_BUY_NO_ISSUER = -10, // no issuer for what we're buying
  //   
  //       // update errors
  //       MANAGE_SELL_OFFER_NOT_FOUND =
  //           -11, // offerID does not match an existing offer
  //   
  //       MANAGE_SELL_OFFER_LOW_RESERVE =
  //           -12 // not enough funds to create a new Offer
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ManageSellOfferResultCode", {
    manageSellOfferSuccess: 0,
    manageSellOfferMalformed: -1,
    manageSellOfferSellNoTrust: -2,
    manageSellOfferBuyNoTrust: -3,
    manageSellOfferSellNotAuthorized: -4,
    manageSellOfferBuyNotAuthorized: -5,
    manageSellOfferLineFull: -6,
    manageSellOfferUnderfunded: -7,
    manageSellOfferCrossSelf: -8,
    manageSellOfferSellNoIssuer: -9,
    manageSellOfferBuyNoIssuer: -10,
    manageSellOfferNotFound: -11,
    manageSellOfferLowReserve: -12
  });

  // === xdr source ============================================================
  //
  //   enum ManageOfferEffect
  //   {
  //       MANAGE_OFFER_CREATED = 0,
  //       MANAGE_OFFER_UPDATED = 1,
  //       MANAGE_OFFER_DELETED = 2
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ManageOfferEffect", {
    manageOfferCreated: 0,
    manageOfferUpdated: 1,
    manageOfferDeleted: 2
  });

  // === xdr source ============================================================
  //
  //   union switch (ManageOfferEffect effect)
  //       {
  //       case MANAGE_OFFER_CREATED:
  //       case MANAGE_OFFER_UPDATED:
  //           OfferEntry offer;
  //       case MANAGE_OFFER_DELETED:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("ManageOfferSuccessResultOffer", {
    switchOn: xdr.lookup("ManageOfferEffect"),
    switchName: "effect",
    switches: [["manageOfferCreated", "offer"], ["manageOfferUpdated", "offer"], ["manageOfferDeleted", xdr["void"]()]],
    arms: {
      offer: xdr.lookup("OfferEntry")
    }
  });

  // === xdr source ============================================================
  //
  //   struct ManageOfferSuccessResult
  //   {
  //       // offers that got claimed while creating this offer
  //       ClaimAtom offersClaimed<>;
  //   
  //       union switch (ManageOfferEffect effect)
  //       {
  //       case MANAGE_OFFER_CREATED:
  //       case MANAGE_OFFER_UPDATED:
  //           OfferEntry offer;
  //       case MANAGE_OFFER_DELETED:
  //           void;
  //       }
  //       offer;
  //   };
  //
  // ===========================================================================
  xdr.struct("ManageOfferSuccessResult", [["offersClaimed", xdr.varArray(xdr.lookup("ClaimAtom"), 2147483647)], ["offer", xdr.lookup("ManageOfferSuccessResultOffer")]]);

  // === xdr source ============================================================
  //
  //   union ManageSellOfferResult switch (ManageSellOfferResultCode code)
  //   {
  //   case MANAGE_SELL_OFFER_SUCCESS:
  //       ManageOfferSuccessResult success;
  //   case MANAGE_SELL_OFFER_MALFORMED:
  //   case MANAGE_SELL_OFFER_SELL_NO_TRUST:
  //   case MANAGE_SELL_OFFER_BUY_NO_TRUST:
  //   case MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED:
  //   case MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED:
  //   case MANAGE_SELL_OFFER_LINE_FULL:
  //   case MANAGE_SELL_OFFER_UNDERFUNDED:
  //   case MANAGE_SELL_OFFER_CROSS_SELF:
  //   case MANAGE_SELL_OFFER_SELL_NO_ISSUER:
  //   case MANAGE_SELL_OFFER_BUY_NO_ISSUER:
  //   case MANAGE_SELL_OFFER_NOT_FOUND:
  //   case MANAGE_SELL_OFFER_LOW_RESERVE:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("ManageSellOfferResult", {
    switchOn: xdr.lookup("ManageSellOfferResultCode"),
    switchName: "code",
    switches: [["manageSellOfferSuccess", "success"], ["manageSellOfferMalformed", xdr["void"]()], ["manageSellOfferSellNoTrust", xdr["void"]()], ["manageSellOfferBuyNoTrust", xdr["void"]()], ["manageSellOfferSellNotAuthorized", xdr["void"]()], ["manageSellOfferBuyNotAuthorized", xdr["void"]()], ["manageSellOfferLineFull", xdr["void"]()], ["manageSellOfferUnderfunded", xdr["void"]()], ["manageSellOfferCrossSelf", xdr["void"]()], ["manageSellOfferSellNoIssuer", xdr["void"]()], ["manageSellOfferBuyNoIssuer", xdr["void"]()], ["manageSellOfferNotFound", xdr["void"]()], ["manageSellOfferLowReserve", xdr["void"]()]],
    arms: {
      success: xdr.lookup("ManageOfferSuccessResult")
    }
  });

  // === xdr source ============================================================
  //
  //   enum ManageBuyOfferResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       MANAGE_BUY_OFFER_SUCCESS = 0,
  //   
  //       // codes considered as "failure" for the operation
  //       MANAGE_BUY_OFFER_MALFORMED = -1,     // generated offer would be invalid
  //       MANAGE_BUY_OFFER_SELL_NO_TRUST = -2, // no trust line for what we're selling
  //       MANAGE_BUY_OFFER_BUY_NO_TRUST = -3,  // no trust line for what we're buying
  //       MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED = -4, // not authorized to sell
  //       MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED = -5,  // not authorized to buy
  //       MANAGE_BUY_OFFER_LINE_FULL = -6,   // can't receive more of what it's buying
  //       MANAGE_BUY_OFFER_UNDERFUNDED = -7, // doesn't hold what it's trying to sell
  //       MANAGE_BUY_OFFER_CROSS_SELF = -8, // would cross an offer from the same user
  //       MANAGE_BUY_OFFER_SELL_NO_ISSUER = -9, // no issuer for what we're selling
  //       MANAGE_BUY_OFFER_BUY_NO_ISSUER = -10, // no issuer for what we're buying
  //   
  //       // update errors
  //       MANAGE_BUY_OFFER_NOT_FOUND =
  //           -11, // offerID does not match an existing offer
  //   
  //       MANAGE_BUY_OFFER_LOW_RESERVE = -12 // not enough funds to create a new Offer
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ManageBuyOfferResultCode", {
    manageBuyOfferSuccess: 0,
    manageBuyOfferMalformed: -1,
    manageBuyOfferSellNoTrust: -2,
    manageBuyOfferBuyNoTrust: -3,
    manageBuyOfferSellNotAuthorized: -4,
    manageBuyOfferBuyNotAuthorized: -5,
    manageBuyOfferLineFull: -6,
    manageBuyOfferUnderfunded: -7,
    manageBuyOfferCrossSelf: -8,
    manageBuyOfferSellNoIssuer: -9,
    manageBuyOfferBuyNoIssuer: -10,
    manageBuyOfferNotFound: -11,
    manageBuyOfferLowReserve: -12
  });

  // === xdr source ============================================================
  //
  //   union ManageBuyOfferResult switch (ManageBuyOfferResultCode code)
  //   {
  //   case MANAGE_BUY_OFFER_SUCCESS:
  //       ManageOfferSuccessResult success;
  //   case MANAGE_BUY_OFFER_MALFORMED:
  //   case MANAGE_BUY_OFFER_SELL_NO_TRUST:
  //   case MANAGE_BUY_OFFER_BUY_NO_TRUST:
  //   case MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED:
  //   case MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED:
  //   case MANAGE_BUY_OFFER_LINE_FULL:
  //   case MANAGE_BUY_OFFER_UNDERFUNDED:
  //   case MANAGE_BUY_OFFER_CROSS_SELF:
  //   case MANAGE_BUY_OFFER_SELL_NO_ISSUER:
  //   case MANAGE_BUY_OFFER_BUY_NO_ISSUER:
  //   case MANAGE_BUY_OFFER_NOT_FOUND:
  //   case MANAGE_BUY_OFFER_LOW_RESERVE:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("ManageBuyOfferResult", {
    switchOn: xdr.lookup("ManageBuyOfferResultCode"),
    switchName: "code",
    switches: [["manageBuyOfferSuccess", "success"], ["manageBuyOfferMalformed", xdr["void"]()], ["manageBuyOfferSellNoTrust", xdr["void"]()], ["manageBuyOfferBuyNoTrust", xdr["void"]()], ["manageBuyOfferSellNotAuthorized", xdr["void"]()], ["manageBuyOfferBuyNotAuthorized", xdr["void"]()], ["manageBuyOfferLineFull", xdr["void"]()], ["manageBuyOfferUnderfunded", xdr["void"]()], ["manageBuyOfferCrossSelf", xdr["void"]()], ["manageBuyOfferSellNoIssuer", xdr["void"]()], ["manageBuyOfferBuyNoIssuer", xdr["void"]()], ["manageBuyOfferNotFound", xdr["void"]()], ["manageBuyOfferLowReserve", xdr["void"]()]],
    arms: {
      success: xdr.lookup("ManageOfferSuccessResult")
    }
  });

  // === xdr source ============================================================
  //
  //   enum SetOptionsResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       SET_OPTIONS_SUCCESS = 0,
  //       // codes considered as "failure" for the operation
  //       SET_OPTIONS_LOW_RESERVE = -1,      // not enough funds to add a signer
  //       SET_OPTIONS_TOO_MANY_SIGNERS = -2, // max number of signers already reached
  //       SET_OPTIONS_BAD_FLAGS = -3,        // invalid combination of clear/set flags
  //       SET_OPTIONS_INVALID_INFLATION = -4,      // inflation account does not exist
  //       SET_OPTIONS_CANT_CHANGE = -5,            // can no longer change this option
  //       SET_OPTIONS_UNKNOWN_FLAG = -6,           // can't set an unknown flag
  //       SET_OPTIONS_THRESHOLD_OUT_OF_RANGE = -7, // bad value for weight/threshold
  //       SET_OPTIONS_BAD_SIGNER = -8,             // signer cannot be masterkey
  //       SET_OPTIONS_INVALID_HOME_DOMAIN = -9,    // malformed home domain
  //       SET_OPTIONS_AUTH_REVOCABLE_REQUIRED =
  //           -10 // auth revocable is required for clawback
  //   };
  //
  // ===========================================================================
  xdr["enum"]("SetOptionsResultCode", {
    setOptionsSuccess: 0,
    setOptionsLowReserve: -1,
    setOptionsTooManySigners: -2,
    setOptionsBadFlags: -3,
    setOptionsInvalidInflation: -4,
    setOptionsCantChange: -5,
    setOptionsUnknownFlag: -6,
    setOptionsThresholdOutOfRange: -7,
    setOptionsBadSigner: -8,
    setOptionsInvalidHomeDomain: -9,
    setOptionsAuthRevocableRequired: -10
  });

  // === xdr source ============================================================
  //
  //   union SetOptionsResult switch (SetOptionsResultCode code)
  //   {
  //   case SET_OPTIONS_SUCCESS:
  //       void;
  //   case SET_OPTIONS_LOW_RESERVE:
  //   case SET_OPTIONS_TOO_MANY_SIGNERS:
  //   case SET_OPTIONS_BAD_FLAGS:
  //   case SET_OPTIONS_INVALID_INFLATION:
  //   case SET_OPTIONS_CANT_CHANGE:
  //   case SET_OPTIONS_UNKNOWN_FLAG:
  //   case SET_OPTIONS_THRESHOLD_OUT_OF_RANGE:
  //   case SET_OPTIONS_BAD_SIGNER:
  //   case SET_OPTIONS_INVALID_HOME_DOMAIN:
  //   case SET_OPTIONS_AUTH_REVOCABLE_REQUIRED:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("SetOptionsResult", {
    switchOn: xdr.lookup("SetOptionsResultCode"),
    switchName: "code",
    switches: [["setOptionsSuccess", xdr["void"]()], ["setOptionsLowReserve", xdr["void"]()], ["setOptionsTooManySigners", xdr["void"]()], ["setOptionsBadFlags", xdr["void"]()], ["setOptionsInvalidInflation", xdr["void"]()], ["setOptionsCantChange", xdr["void"]()], ["setOptionsUnknownFlag", xdr["void"]()], ["setOptionsThresholdOutOfRange", xdr["void"]()], ["setOptionsBadSigner", xdr["void"]()], ["setOptionsInvalidHomeDomain", xdr["void"]()], ["setOptionsAuthRevocableRequired", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum ChangeTrustResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       CHANGE_TRUST_SUCCESS = 0,
  //       // codes considered as "failure" for the operation
  //       CHANGE_TRUST_MALFORMED = -1,     // bad input
  //       CHANGE_TRUST_NO_ISSUER = -2,     // could not find issuer
  //       CHANGE_TRUST_INVALID_LIMIT = -3, // cannot drop limit below balance
  //                                        // cannot create with a limit of 0
  //       CHANGE_TRUST_LOW_RESERVE =
  //           -4, // not enough funds to create a new trust line,
  //       CHANGE_TRUST_SELF_NOT_ALLOWED = -5,   // trusting self is not allowed
  //       CHANGE_TRUST_TRUST_LINE_MISSING = -6, // Asset trustline is missing for pool
  //       CHANGE_TRUST_CANNOT_DELETE =
  //           -7, // Asset trustline is still referenced in a pool
  //       CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES =
  //           -8 // Asset trustline is deauthorized
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ChangeTrustResultCode", {
    changeTrustSuccess: 0,
    changeTrustMalformed: -1,
    changeTrustNoIssuer: -2,
    changeTrustInvalidLimit: -3,
    changeTrustLowReserve: -4,
    changeTrustSelfNotAllowed: -5,
    changeTrustTrustLineMissing: -6,
    changeTrustCannotDelete: -7,
    changeTrustNotAuthMaintainLiabilities: -8
  });

  // === xdr source ============================================================
  //
  //   union ChangeTrustResult switch (ChangeTrustResultCode code)
  //   {
  //   case CHANGE_TRUST_SUCCESS:
  //       void;
  //   case CHANGE_TRUST_MALFORMED:
  //   case CHANGE_TRUST_NO_ISSUER:
  //   case CHANGE_TRUST_INVALID_LIMIT:
  //   case CHANGE_TRUST_LOW_RESERVE:
  //   case CHANGE_TRUST_SELF_NOT_ALLOWED:
  //   case CHANGE_TRUST_TRUST_LINE_MISSING:
  //   case CHANGE_TRUST_CANNOT_DELETE:
  //   case CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("ChangeTrustResult", {
    switchOn: xdr.lookup("ChangeTrustResultCode"),
    switchName: "code",
    switches: [["changeTrustSuccess", xdr["void"]()], ["changeTrustMalformed", xdr["void"]()], ["changeTrustNoIssuer", xdr["void"]()], ["changeTrustInvalidLimit", xdr["void"]()], ["changeTrustLowReserve", xdr["void"]()], ["changeTrustSelfNotAllowed", xdr["void"]()], ["changeTrustTrustLineMissing", xdr["void"]()], ["changeTrustCannotDelete", xdr["void"]()], ["changeTrustNotAuthMaintainLiabilities", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum AllowTrustResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       ALLOW_TRUST_SUCCESS = 0,
  //       // codes considered as "failure" for the operation
  //       ALLOW_TRUST_MALFORMED = -1,     // asset is not ASSET_TYPE_ALPHANUM
  //       ALLOW_TRUST_NO_TRUST_LINE = -2, // trustor does not have a trustline
  //                                       // source account does not require trust
  //       ALLOW_TRUST_TRUST_NOT_REQUIRED = -3,
  //       ALLOW_TRUST_CANT_REVOKE = -4,      // source account can't revoke trust,
  //       ALLOW_TRUST_SELF_NOT_ALLOWED = -5, // trusting self is not allowed
  //       ALLOW_TRUST_LOW_RESERVE = -6       // claimable balances can't be created
  //                                          // on revoke due to low reserves
  //   };
  //
  // ===========================================================================
  xdr["enum"]("AllowTrustResultCode", {
    allowTrustSuccess: 0,
    allowTrustMalformed: -1,
    allowTrustNoTrustLine: -2,
    allowTrustTrustNotRequired: -3,
    allowTrustCantRevoke: -4,
    allowTrustSelfNotAllowed: -5,
    allowTrustLowReserve: -6
  });

  // === xdr source ============================================================
  //
  //   union AllowTrustResult switch (AllowTrustResultCode code)
  //   {
  //   case ALLOW_TRUST_SUCCESS:
  //       void;
  //   case ALLOW_TRUST_MALFORMED:
  //   case ALLOW_TRUST_NO_TRUST_LINE:
  //   case ALLOW_TRUST_TRUST_NOT_REQUIRED:
  //   case ALLOW_TRUST_CANT_REVOKE:
  //   case ALLOW_TRUST_SELF_NOT_ALLOWED:
  //   case ALLOW_TRUST_LOW_RESERVE:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("AllowTrustResult", {
    switchOn: xdr.lookup("AllowTrustResultCode"),
    switchName: "code",
    switches: [["allowTrustSuccess", xdr["void"]()], ["allowTrustMalformed", xdr["void"]()], ["allowTrustNoTrustLine", xdr["void"]()], ["allowTrustTrustNotRequired", xdr["void"]()], ["allowTrustCantRevoke", xdr["void"]()], ["allowTrustSelfNotAllowed", xdr["void"]()], ["allowTrustLowReserve", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum AccountMergeResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       ACCOUNT_MERGE_SUCCESS = 0,
  //       // codes considered as "failure" for the operation
  //       ACCOUNT_MERGE_MALFORMED = -1,       // can't merge onto itself
  //       ACCOUNT_MERGE_NO_ACCOUNT = -2,      // destination does not exist
  //       ACCOUNT_MERGE_IMMUTABLE_SET = -3,   // source account has AUTH_IMMUTABLE set
  //       ACCOUNT_MERGE_HAS_SUB_ENTRIES = -4, // account has trust lines/offers
  //       ACCOUNT_MERGE_SEQNUM_TOO_FAR = -5,  // sequence number is over max allowed
  //       ACCOUNT_MERGE_DEST_FULL = -6,       // can't add source balance to
  //                                           // destination balance
  //       ACCOUNT_MERGE_IS_SPONSOR = -7       // can't merge account that is a sponsor
  //   };
  //
  // ===========================================================================
  xdr["enum"]("AccountMergeResultCode", {
    accountMergeSuccess: 0,
    accountMergeMalformed: -1,
    accountMergeNoAccount: -2,
    accountMergeImmutableSet: -3,
    accountMergeHasSubEntries: -4,
    accountMergeSeqnumTooFar: -5,
    accountMergeDestFull: -6,
    accountMergeIsSponsor: -7
  });

  // === xdr source ============================================================
  //
  //   union AccountMergeResult switch (AccountMergeResultCode code)
  //   {
  //   case ACCOUNT_MERGE_SUCCESS:
  //       int64 sourceAccountBalance; // how much got transferred from source account
  //   case ACCOUNT_MERGE_MALFORMED:
  //   case ACCOUNT_MERGE_NO_ACCOUNT:
  //   case ACCOUNT_MERGE_IMMUTABLE_SET:
  //   case ACCOUNT_MERGE_HAS_SUB_ENTRIES:
  //   case ACCOUNT_MERGE_SEQNUM_TOO_FAR:
  //   case ACCOUNT_MERGE_DEST_FULL:
  //   case ACCOUNT_MERGE_IS_SPONSOR:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("AccountMergeResult", {
    switchOn: xdr.lookup("AccountMergeResultCode"),
    switchName: "code",
    switches: [["accountMergeSuccess", "sourceAccountBalance"], ["accountMergeMalformed", xdr["void"]()], ["accountMergeNoAccount", xdr["void"]()], ["accountMergeImmutableSet", xdr["void"]()], ["accountMergeHasSubEntries", xdr["void"]()], ["accountMergeSeqnumTooFar", xdr["void"]()], ["accountMergeDestFull", xdr["void"]()], ["accountMergeIsSponsor", xdr["void"]()]],
    arms: {
      sourceAccountBalance: xdr.lookup("Int64")
    }
  });

  // === xdr source ============================================================
  //
  //   enum InflationResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       INFLATION_SUCCESS = 0,
  //       // codes considered as "failure" for the operation
  //       INFLATION_NOT_TIME = -1
  //   };
  //
  // ===========================================================================
  xdr["enum"]("InflationResultCode", {
    inflationSuccess: 0,
    inflationNotTime: -1
  });

  // === xdr source ============================================================
  //
  //   struct InflationPayout // or use PaymentResultAtom to limit types?
  //   {
  //       AccountID destination;
  //       int64 amount;
  //   };
  //
  // ===========================================================================
  xdr.struct("InflationPayout", [["destination", xdr.lookup("AccountId")], ["amount", xdr.lookup("Int64")]]);

  // === xdr source ============================================================
  //
  //   union InflationResult switch (InflationResultCode code)
  //   {
  //   case INFLATION_SUCCESS:
  //       InflationPayout payouts<>;
  //   case INFLATION_NOT_TIME:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("InflationResult", {
    switchOn: xdr.lookup("InflationResultCode"),
    switchName: "code",
    switches: [["inflationSuccess", "payouts"], ["inflationNotTime", xdr["void"]()]],
    arms: {
      payouts: xdr.varArray(xdr.lookup("InflationPayout"), 2147483647)
    }
  });

  // === xdr source ============================================================
  //
  //   enum ManageDataResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       MANAGE_DATA_SUCCESS = 0,
  //       // codes considered as "failure" for the operation
  //       MANAGE_DATA_NOT_SUPPORTED_YET =
  //           -1, // The network hasn't moved to this protocol change yet
  //       MANAGE_DATA_NAME_NOT_FOUND =
  //           -2, // Trying to remove a Data Entry that isn't there
  //       MANAGE_DATA_LOW_RESERVE = -3, // not enough funds to create a new Data Entry
  //       MANAGE_DATA_INVALID_NAME = -4 // Name not a valid string
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ManageDataResultCode", {
    manageDataSuccess: 0,
    manageDataNotSupportedYet: -1,
    manageDataNameNotFound: -2,
    manageDataLowReserve: -3,
    manageDataInvalidName: -4
  });

  // === xdr source ============================================================
  //
  //   union ManageDataResult switch (ManageDataResultCode code)
  //   {
  //   case MANAGE_DATA_SUCCESS:
  //       void;
  //   case MANAGE_DATA_NOT_SUPPORTED_YET:
  //   case MANAGE_DATA_NAME_NOT_FOUND:
  //   case MANAGE_DATA_LOW_RESERVE:
  //   case MANAGE_DATA_INVALID_NAME:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("ManageDataResult", {
    switchOn: xdr.lookup("ManageDataResultCode"),
    switchName: "code",
    switches: [["manageDataSuccess", xdr["void"]()], ["manageDataNotSupportedYet", xdr["void"]()], ["manageDataNameNotFound", xdr["void"]()], ["manageDataLowReserve", xdr["void"]()], ["manageDataInvalidName", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum BumpSequenceResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       BUMP_SEQUENCE_SUCCESS = 0,
  //       // codes considered as "failure" for the operation
  //       BUMP_SEQUENCE_BAD_SEQ = -1 // `bumpTo` is not within bounds
  //   };
  //
  // ===========================================================================
  xdr["enum"]("BumpSequenceResultCode", {
    bumpSequenceSuccess: 0,
    bumpSequenceBadSeq: -1
  });

  // === xdr source ============================================================
  //
  //   union BumpSequenceResult switch (BumpSequenceResultCode code)
  //   {
  //   case BUMP_SEQUENCE_SUCCESS:
  //       void;
  //   case BUMP_SEQUENCE_BAD_SEQ:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("BumpSequenceResult", {
    switchOn: xdr.lookup("BumpSequenceResultCode"),
    switchName: "code",
    switches: [["bumpSequenceSuccess", xdr["void"]()], ["bumpSequenceBadSeq", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum CreateClaimableBalanceResultCode
  //   {
  //       CREATE_CLAIMABLE_BALANCE_SUCCESS = 0,
  //       CREATE_CLAIMABLE_BALANCE_MALFORMED = -1,
  //       CREATE_CLAIMABLE_BALANCE_LOW_RESERVE = -2,
  //       CREATE_CLAIMABLE_BALANCE_NO_TRUST = -3,
  //       CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED = -4,
  //       CREATE_CLAIMABLE_BALANCE_UNDERFUNDED = -5
  //   };
  //
  // ===========================================================================
  xdr["enum"]("CreateClaimableBalanceResultCode", {
    createClaimableBalanceSuccess: 0,
    createClaimableBalanceMalformed: -1,
    createClaimableBalanceLowReserve: -2,
    createClaimableBalanceNoTrust: -3,
    createClaimableBalanceNotAuthorized: -4,
    createClaimableBalanceUnderfunded: -5
  });

  // === xdr source ============================================================
  //
  //   union CreateClaimableBalanceResult switch (
  //       CreateClaimableBalanceResultCode code)
  //   {
  //   case CREATE_CLAIMABLE_BALANCE_SUCCESS:
  //       ClaimableBalanceID balanceID;
  //   case CREATE_CLAIMABLE_BALANCE_MALFORMED:
  //   case CREATE_CLAIMABLE_BALANCE_LOW_RESERVE:
  //   case CREATE_CLAIMABLE_BALANCE_NO_TRUST:
  //   case CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED:
  //   case CREATE_CLAIMABLE_BALANCE_UNDERFUNDED:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("CreateClaimableBalanceResult", {
    switchOn: xdr.lookup("CreateClaimableBalanceResultCode"),
    switchName: "code",
    switches: [["createClaimableBalanceSuccess", "balanceId"], ["createClaimableBalanceMalformed", xdr["void"]()], ["createClaimableBalanceLowReserve", xdr["void"]()], ["createClaimableBalanceNoTrust", xdr["void"]()], ["createClaimableBalanceNotAuthorized", xdr["void"]()], ["createClaimableBalanceUnderfunded", xdr["void"]()]],
    arms: {
      balanceId: xdr.lookup("ClaimableBalanceId")
    }
  });

  // === xdr source ============================================================
  //
  //   enum ClaimClaimableBalanceResultCode
  //   {
  //       CLAIM_CLAIMABLE_BALANCE_SUCCESS = 0,
  //       CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST = -1,
  //       CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM = -2,
  //       CLAIM_CLAIMABLE_BALANCE_LINE_FULL = -3,
  //       CLAIM_CLAIMABLE_BALANCE_NO_TRUST = -4,
  //       CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED = -5
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ClaimClaimableBalanceResultCode", {
    claimClaimableBalanceSuccess: 0,
    claimClaimableBalanceDoesNotExist: -1,
    claimClaimableBalanceCannotClaim: -2,
    claimClaimableBalanceLineFull: -3,
    claimClaimableBalanceNoTrust: -4,
    claimClaimableBalanceNotAuthorized: -5
  });

  // === xdr source ============================================================
  //
  //   union ClaimClaimableBalanceResult switch (ClaimClaimableBalanceResultCode code)
  //   {
  //   case CLAIM_CLAIMABLE_BALANCE_SUCCESS:
  //       void;
  //   case CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST:
  //   case CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM:
  //   case CLAIM_CLAIMABLE_BALANCE_LINE_FULL:
  //   case CLAIM_CLAIMABLE_BALANCE_NO_TRUST:
  //   case CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("ClaimClaimableBalanceResult", {
    switchOn: xdr.lookup("ClaimClaimableBalanceResultCode"),
    switchName: "code",
    switches: [["claimClaimableBalanceSuccess", xdr["void"]()], ["claimClaimableBalanceDoesNotExist", xdr["void"]()], ["claimClaimableBalanceCannotClaim", xdr["void"]()], ["claimClaimableBalanceLineFull", xdr["void"]()], ["claimClaimableBalanceNoTrust", xdr["void"]()], ["claimClaimableBalanceNotAuthorized", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum BeginSponsoringFutureReservesResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS = 0,
  //   
  //       // codes considered as "failure" for the operation
  //       BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED = -1,
  //       BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED = -2,
  //       BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE = -3
  //   };
  //
  // ===========================================================================
  xdr["enum"]("BeginSponsoringFutureReservesResultCode", {
    beginSponsoringFutureReservesSuccess: 0,
    beginSponsoringFutureReservesMalformed: -1,
    beginSponsoringFutureReservesAlreadySponsored: -2,
    beginSponsoringFutureReservesRecursive: -3
  });

  // === xdr source ============================================================
  //
  //   union BeginSponsoringFutureReservesResult switch (
  //       BeginSponsoringFutureReservesResultCode code)
  //   {
  //   case BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS:
  //       void;
  //   case BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED:
  //   case BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED:
  //   case BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("BeginSponsoringFutureReservesResult", {
    switchOn: xdr.lookup("BeginSponsoringFutureReservesResultCode"),
    switchName: "code",
    switches: [["beginSponsoringFutureReservesSuccess", xdr["void"]()], ["beginSponsoringFutureReservesMalformed", xdr["void"]()], ["beginSponsoringFutureReservesAlreadySponsored", xdr["void"]()], ["beginSponsoringFutureReservesRecursive", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum EndSponsoringFutureReservesResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       END_SPONSORING_FUTURE_RESERVES_SUCCESS = 0,
  //   
  //       // codes considered as "failure" for the operation
  //       END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED = -1
  //   };
  //
  // ===========================================================================
  xdr["enum"]("EndSponsoringFutureReservesResultCode", {
    endSponsoringFutureReservesSuccess: 0,
    endSponsoringFutureReservesNotSponsored: -1
  });

  // === xdr source ============================================================
  //
  //   union EndSponsoringFutureReservesResult switch (
  //       EndSponsoringFutureReservesResultCode code)
  //   {
  //   case END_SPONSORING_FUTURE_RESERVES_SUCCESS:
  //       void;
  //   case END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("EndSponsoringFutureReservesResult", {
    switchOn: xdr.lookup("EndSponsoringFutureReservesResultCode"),
    switchName: "code",
    switches: [["endSponsoringFutureReservesSuccess", xdr["void"]()], ["endSponsoringFutureReservesNotSponsored", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum RevokeSponsorshipResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       REVOKE_SPONSORSHIP_SUCCESS = 0,
  //   
  //       // codes considered as "failure" for the operation
  //       REVOKE_SPONSORSHIP_DOES_NOT_EXIST = -1,
  //       REVOKE_SPONSORSHIP_NOT_SPONSOR = -2,
  //       REVOKE_SPONSORSHIP_LOW_RESERVE = -3,
  //       REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE = -4,
  //       REVOKE_SPONSORSHIP_MALFORMED = -5
  //   };
  //
  // ===========================================================================
  xdr["enum"]("RevokeSponsorshipResultCode", {
    revokeSponsorshipSuccess: 0,
    revokeSponsorshipDoesNotExist: -1,
    revokeSponsorshipNotSponsor: -2,
    revokeSponsorshipLowReserve: -3,
    revokeSponsorshipOnlyTransferable: -4,
    revokeSponsorshipMalformed: -5
  });

  // === xdr source ============================================================
  //
  //   union RevokeSponsorshipResult switch (RevokeSponsorshipResultCode code)
  //   {
  //   case REVOKE_SPONSORSHIP_SUCCESS:
  //       void;
  //   case REVOKE_SPONSORSHIP_DOES_NOT_EXIST:
  //   case REVOKE_SPONSORSHIP_NOT_SPONSOR:
  //   case REVOKE_SPONSORSHIP_LOW_RESERVE:
  //   case REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE:
  //   case REVOKE_SPONSORSHIP_MALFORMED:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("RevokeSponsorshipResult", {
    switchOn: xdr.lookup("RevokeSponsorshipResultCode"),
    switchName: "code",
    switches: [["revokeSponsorshipSuccess", xdr["void"]()], ["revokeSponsorshipDoesNotExist", xdr["void"]()], ["revokeSponsorshipNotSponsor", xdr["void"]()], ["revokeSponsorshipLowReserve", xdr["void"]()], ["revokeSponsorshipOnlyTransferable", xdr["void"]()], ["revokeSponsorshipMalformed", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum ClawbackResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       CLAWBACK_SUCCESS = 0,
  //   
  //       // codes considered as "failure" for the operation
  //       CLAWBACK_MALFORMED = -1,
  //       CLAWBACK_NOT_CLAWBACK_ENABLED = -2,
  //       CLAWBACK_NO_TRUST = -3,
  //       CLAWBACK_UNDERFUNDED = -4
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ClawbackResultCode", {
    clawbackSuccess: 0,
    clawbackMalformed: -1,
    clawbackNotClawbackEnabled: -2,
    clawbackNoTrust: -3,
    clawbackUnderfunded: -4
  });

  // === xdr source ============================================================
  //
  //   union ClawbackResult switch (ClawbackResultCode code)
  //   {
  //   case CLAWBACK_SUCCESS:
  //       void;
  //   case CLAWBACK_MALFORMED:
  //   case CLAWBACK_NOT_CLAWBACK_ENABLED:
  //   case CLAWBACK_NO_TRUST:
  //   case CLAWBACK_UNDERFUNDED:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("ClawbackResult", {
    switchOn: xdr.lookup("ClawbackResultCode"),
    switchName: "code",
    switches: [["clawbackSuccess", xdr["void"]()], ["clawbackMalformed", xdr["void"]()], ["clawbackNotClawbackEnabled", xdr["void"]()], ["clawbackNoTrust", xdr["void"]()], ["clawbackUnderfunded", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum ClawbackClaimableBalanceResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       CLAWBACK_CLAIMABLE_BALANCE_SUCCESS = 0,
  //   
  //       // codes considered as "failure" for the operation
  //       CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST = -1,
  //       CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER = -2,
  //       CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED = -3
  //   };
  //
  // ===========================================================================
  xdr["enum"]("ClawbackClaimableBalanceResultCode", {
    clawbackClaimableBalanceSuccess: 0,
    clawbackClaimableBalanceDoesNotExist: -1,
    clawbackClaimableBalanceNotIssuer: -2,
    clawbackClaimableBalanceNotClawbackEnabled: -3
  });

  // === xdr source ============================================================
  //
  //   union ClawbackClaimableBalanceResult switch (
  //       ClawbackClaimableBalanceResultCode code)
  //   {
  //   case CLAWBACK_CLAIMABLE_BALANCE_SUCCESS:
  //       void;
  //   case CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST:
  //   case CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER:
  //   case CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("ClawbackClaimableBalanceResult", {
    switchOn: xdr.lookup("ClawbackClaimableBalanceResultCode"),
    switchName: "code",
    switches: [["clawbackClaimableBalanceSuccess", xdr["void"]()], ["clawbackClaimableBalanceDoesNotExist", xdr["void"]()], ["clawbackClaimableBalanceNotIssuer", xdr["void"]()], ["clawbackClaimableBalanceNotClawbackEnabled", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum SetTrustLineFlagsResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       SET_TRUST_LINE_FLAGS_SUCCESS = 0,
  //   
  //       // codes considered as "failure" for the operation
  //       SET_TRUST_LINE_FLAGS_MALFORMED = -1,
  //       SET_TRUST_LINE_FLAGS_NO_TRUST_LINE = -2,
  //       SET_TRUST_LINE_FLAGS_CANT_REVOKE = -3,
  //       SET_TRUST_LINE_FLAGS_INVALID_STATE = -4,
  //       SET_TRUST_LINE_FLAGS_LOW_RESERVE = -5 // claimable balances can't be created
  //                                             // on revoke due to low reserves
  //   };
  //
  // ===========================================================================
  xdr["enum"]("SetTrustLineFlagsResultCode", {
    setTrustLineFlagsSuccess: 0,
    setTrustLineFlagsMalformed: -1,
    setTrustLineFlagsNoTrustLine: -2,
    setTrustLineFlagsCantRevoke: -3,
    setTrustLineFlagsInvalidState: -4,
    setTrustLineFlagsLowReserve: -5
  });

  // === xdr source ============================================================
  //
  //   union SetTrustLineFlagsResult switch (SetTrustLineFlagsResultCode code)
  //   {
  //   case SET_TRUST_LINE_FLAGS_SUCCESS:
  //       void;
  //   case SET_TRUST_LINE_FLAGS_MALFORMED:
  //   case SET_TRUST_LINE_FLAGS_NO_TRUST_LINE:
  //   case SET_TRUST_LINE_FLAGS_CANT_REVOKE:
  //   case SET_TRUST_LINE_FLAGS_INVALID_STATE:
  //   case SET_TRUST_LINE_FLAGS_LOW_RESERVE:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("SetTrustLineFlagsResult", {
    switchOn: xdr.lookup("SetTrustLineFlagsResultCode"),
    switchName: "code",
    switches: [["setTrustLineFlagsSuccess", xdr["void"]()], ["setTrustLineFlagsMalformed", xdr["void"]()], ["setTrustLineFlagsNoTrustLine", xdr["void"]()], ["setTrustLineFlagsCantRevoke", xdr["void"]()], ["setTrustLineFlagsInvalidState", xdr["void"]()], ["setTrustLineFlagsLowReserve", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum LiquidityPoolDepositResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       LIQUIDITY_POOL_DEPOSIT_SUCCESS = 0,
  //   
  //       // codes considered as "failure" for the operation
  //       LIQUIDITY_POOL_DEPOSIT_MALFORMED = -1,      // bad input
  //       LIQUIDITY_POOL_DEPOSIT_NO_TRUST = -2,       // no trust line for one of the
  //                                                   // assets
  //       LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED = -3, // not authorized for one of the
  //                                                   // assets
  //       LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED = -4,    // not enough balance for one of
  //                                                   // the assets
  //       LIQUIDITY_POOL_DEPOSIT_LINE_FULL = -5,      // pool share trust line doesn't
  //                                                   // have sufficient limit
  //       LIQUIDITY_POOL_DEPOSIT_BAD_PRICE = -6,      // deposit price outside bounds
  //       LIQUIDITY_POOL_DEPOSIT_POOL_FULL = -7       // pool reserves are full
  //   };
  //
  // ===========================================================================
  xdr["enum"]("LiquidityPoolDepositResultCode", {
    liquidityPoolDepositSuccess: 0,
    liquidityPoolDepositMalformed: -1,
    liquidityPoolDepositNoTrust: -2,
    liquidityPoolDepositNotAuthorized: -3,
    liquidityPoolDepositUnderfunded: -4,
    liquidityPoolDepositLineFull: -5,
    liquidityPoolDepositBadPrice: -6,
    liquidityPoolDepositPoolFull: -7
  });

  // === xdr source ============================================================
  //
  //   union LiquidityPoolDepositResult switch (LiquidityPoolDepositResultCode code)
  //   {
  //   case LIQUIDITY_POOL_DEPOSIT_SUCCESS:
  //       void;
  //   case LIQUIDITY_POOL_DEPOSIT_MALFORMED:
  //   case LIQUIDITY_POOL_DEPOSIT_NO_TRUST:
  //   case LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED:
  //   case LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED:
  //   case LIQUIDITY_POOL_DEPOSIT_LINE_FULL:
  //   case LIQUIDITY_POOL_DEPOSIT_BAD_PRICE:
  //   case LIQUIDITY_POOL_DEPOSIT_POOL_FULL:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("LiquidityPoolDepositResult", {
    switchOn: xdr.lookup("LiquidityPoolDepositResultCode"),
    switchName: "code",
    switches: [["liquidityPoolDepositSuccess", xdr["void"]()], ["liquidityPoolDepositMalformed", xdr["void"]()], ["liquidityPoolDepositNoTrust", xdr["void"]()], ["liquidityPoolDepositNotAuthorized", xdr["void"]()], ["liquidityPoolDepositUnderfunded", xdr["void"]()], ["liquidityPoolDepositLineFull", xdr["void"]()], ["liquidityPoolDepositBadPrice", xdr["void"]()], ["liquidityPoolDepositPoolFull", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum LiquidityPoolWithdrawResultCode
  //   {
  //       // codes considered as "success" for the operation
  //       LIQUIDITY_POOL_WITHDRAW_SUCCESS = 0,
  //   
  //       // codes considered as "failure" for the operation
  //       LIQUIDITY_POOL_WITHDRAW_MALFORMED = -1,    // bad input
  //       LIQUIDITY_POOL_WITHDRAW_NO_TRUST = -2,     // no trust line for one of the
  //                                                  // assets
  //       LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED = -3,  // not enough balance of the
  //                                                  // pool share
  //       LIQUIDITY_POOL_WITHDRAW_LINE_FULL = -4,    // would go above limit for one
  //                                                  // of the assets
  //       LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM = -5 // didn't withdraw enough
  //   };
  //
  // ===========================================================================
  xdr["enum"]("LiquidityPoolWithdrawResultCode", {
    liquidityPoolWithdrawSuccess: 0,
    liquidityPoolWithdrawMalformed: -1,
    liquidityPoolWithdrawNoTrust: -2,
    liquidityPoolWithdrawUnderfunded: -3,
    liquidityPoolWithdrawLineFull: -4,
    liquidityPoolWithdrawUnderMinimum: -5
  });

  // === xdr source ============================================================
  //
  //   union LiquidityPoolWithdrawResult switch (LiquidityPoolWithdrawResultCode code)
  //   {
  //   case LIQUIDITY_POOL_WITHDRAW_SUCCESS:
  //       void;
  //   case LIQUIDITY_POOL_WITHDRAW_MALFORMED:
  //   case LIQUIDITY_POOL_WITHDRAW_NO_TRUST:
  //   case LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED:
  //   case LIQUIDITY_POOL_WITHDRAW_LINE_FULL:
  //   case LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("LiquidityPoolWithdrawResult", {
    switchOn: xdr.lookup("LiquidityPoolWithdrawResultCode"),
    switchName: "code",
    switches: [["liquidityPoolWithdrawSuccess", xdr["void"]()], ["liquidityPoolWithdrawMalformed", xdr["void"]()], ["liquidityPoolWithdrawNoTrust", xdr["void"]()], ["liquidityPoolWithdrawUnderfunded", xdr["void"]()], ["liquidityPoolWithdrawLineFull", xdr["void"]()], ["liquidityPoolWithdrawUnderMinimum", xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum OperationResultCode
  //   {
  //       opINNER = 0, // inner object result is valid
  //   
  //       opBAD_AUTH = -1,            // too few valid signatures / wrong network
  //       opNO_ACCOUNT = -2,          // source account was not found
  //       opNOT_SUPPORTED = -3,       // operation not supported at this time
  //       opTOO_MANY_SUBENTRIES = -4, // max number of subentries already reached
  //       opEXCEEDED_WORK_LIMIT = -5, // operation did too much work
  //       opTOO_MANY_SPONSORING = -6  // account is sponsoring too many entries
  //   };
  //
  // ===========================================================================
  xdr["enum"]("OperationResultCode", {
    opInner: 0,
    opBadAuth: -1,
    opNoAccount: -2,
    opNotSupported: -3,
    opTooManySubentries: -4,
    opExceededWorkLimit: -5,
    opTooManySponsoring: -6
  });

  // === xdr source ============================================================
  //
  //   union switch (OperationType type)
  //       {
  //       case CREATE_ACCOUNT:
  //           CreateAccountResult createAccountResult;
  //       case PAYMENT:
  //           PaymentResult paymentResult;
  //       case PATH_PAYMENT_STRICT_RECEIVE:
  //           PathPaymentStrictReceiveResult pathPaymentStrictReceiveResult;
  //       case MANAGE_SELL_OFFER:
  //           ManageSellOfferResult manageSellOfferResult;
  //       case CREATE_PASSIVE_SELL_OFFER:
  //           ManageSellOfferResult createPassiveSellOfferResult;
  //       case SET_OPTIONS:
  //           SetOptionsResult setOptionsResult;
  //       case CHANGE_TRUST:
  //           ChangeTrustResult changeTrustResult;
  //       case ALLOW_TRUST:
  //           AllowTrustResult allowTrustResult;
  //       case ACCOUNT_MERGE:
  //           AccountMergeResult accountMergeResult;
  //       case INFLATION:
  //           InflationResult inflationResult;
  //       case MANAGE_DATA:
  //           ManageDataResult manageDataResult;
  //       case BUMP_SEQUENCE:
  //           BumpSequenceResult bumpSeqResult;
  //       case MANAGE_BUY_OFFER:
  //           ManageBuyOfferResult manageBuyOfferResult;
  //       case PATH_PAYMENT_STRICT_SEND:
  //           PathPaymentStrictSendResult pathPaymentStrictSendResult;
  //       case CREATE_CLAIMABLE_BALANCE:
  //           CreateClaimableBalanceResult createClaimableBalanceResult;
  //       case CLAIM_CLAIMABLE_BALANCE:
  //           ClaimClaimableBalanceResult claimClaimableBalanceResult;
  //       case BEGIN_SPONSORING_FUTURE_RESERVES:
  //           BeginSponsoringFutureReservesResult beginSponsoringFutureReservesResult;
  //       case END_SPONSORING_FUTURE_RESERVES:
  //           EndSponsoringFutureReservesResult endSponsoringFutureReservesResult;
  //       case REVOKE_SPONSORSHIP:
  //           RevokeSponsorshipResult revokeSponsorshipResult;
  //       case CLAWBACK:
  //           ClawbackResult clawbackResult;
  //       case CLAWBACK_CLAIMABLE_BALANCE:
  //           ClawbackClaimableBalanceResult clawbackClaimableBalanceResult;
  //       case SET_TRUST_LINE_FLAGS:
  //           SetTrustLineFlagsResult setTrustLineFlagsResult;
  //       case LIQUIDITY_POOL_DEPOSIT:
  //           LiquidityPoolDepositResult liquidityPoolDepositResult;
  //       case LIQUIDITY_POOL_WITHDRAW:
  //           LiquidityPoolWithdrawResult liquidityPoolWithdrawResult;
  //       }
  //
  // ===========================================================================
  xdr.union("OperationResultTr", {
    switchOn: xdr.lookup("OperationType"),
    switchName: "type",
    switches: [["createAccount", "createAccountResult"], ["payment", "paymentResult"], ["pathPaymentStrictReceive", "pathPaymentStrictReceiveResult"], ["manageSellOffer", "manageSellOfferResult"], ["createPassiveSellOffer", "createPassiveSellOfferResult"], ["setOptions", "setOptionsResult"], ["changeTrust", "changeTrustResult"], ["allowTrust", "allowTrustResult"], ["accountMerge", "accountMergeResult"], ["inflation", "inflationResult"], ["manageData", "manageDataResult"], ["bumpSequence", "bumpSeqResult"], ["manageBuyOffer", "manageBuyOfferResult"], ["pathPaymentStrictSend", "pathPaymentStrictSendResult"], ["createClaimableBalance", "createClaimableBalanceResult"], ["claimClaimableBalance", "claimClaimableBalanceResult"], ["beginSponsoringFutureReserves", "beginSponsoringFutureReservesResult"], ["endSponsoringFutureReserves", "endSponsoringFutureReservesResult"], ["revokeSponsorship", "revokeSponsorshipResult"], ["clawback", "clawbackResult"], ["clawbackClaimableBalance", "clawbackClaimableBalanceResult"], ["setTrustLineFlags", "setTrustLineFlagsResult"], ["liquidityPoolDeposit", "liquidityPoolDepositResult"], ["liquidityPoolWithdraw", "liquidityPoolWithdrawResult"]],
    arms: {
      createAccountResult: xdr.lookup("CreateAccountResult"),
      paymentResult: xdr.lookup("PaymentResult"),
      pathPaymentStrictReceiveResult: xdr.lookup("PathPaymentStrictReceiveResult"),
      manageSellOfferResult: xdr.lookup("ManageSellOfferResult"),
      createPassiveSellOfferResult: xdr.lookup("ManageSellOfferResult"),
      setOptionsResult: xdr.lookup("SetOptionsResult"),
      changeTrustResult: xdr.lookup("ChangeTrustResult"),
      allowTrustResult: xdr.lookup("AllowTrustResult"),
      accountMergeResult: xdr.lookup("AccountMergeResult"),
      inflationResult: xdr.lookup("InflationResult"),
      manageDataResult: xdr.lookup("ManageDataResult"),
      bumpSeqResult: xdr.lookup("BumpSequenceResult"),
      manageBuyOfferResult: xdr.lookup("ManageBuyOfferResult"),
      pathPaymentStrictSendResult: xdr.lookup("PathPaymentStrictSendResult"),
      createClaimableBalanceResult: xdr.lookup("CreateClaimableBalanceResult"),
      claimClaimableBalanceResult: xdr.lookup("ClaimClaimableBalanceResult"),
      beginSponsoringFutureReservesResult: xdr.lookup("BeginSponsoringFutureReservesResult"),
      endSponsoringFutureReservesResult: xdr.lookup("EndSponsoringFutureReservesResult"),
      revokeSponsorshipResult: xdr.lookup("RevokeSponsorshipResult"),
      clawbackResult: xdr.lookup("ClawbackResult"),
      clawbackClaimableBalanceResult: xdr.lookup("ClawbackClaimableBalanceResult"),
      setTrustLineFlagsResult: xdr.lookup("SetTrustLineFlagsResult"),
      liquidityPoolDepositResult: xdr.lookup("LiquidityPoolDepositResult"),
      liquidityPoolWithdrawResult: xdr.lookup("LiquidityPoolWithdrawResult")
    }
  });

  // === xdr source ============================================================
  //
  //   union OperationResult switch (OperationResultCode code)
  //   {
  //   case opINNER:
  //       union switch (OperationType type)
  //       {
  //       case CREATE_ACCOUNT:
  //           CreateAccountResult createAccountResult;
  //       case PAYMENT:
  //           PaymentResult paymentResult;
  //       case PATH_PAYMENT_STRICT_RECEIVE:
  //           PathPaymentStrictReceiveResult pathPaymentStrictReceiveResult;
  //       case MANAGE_SELL_OFFER:
  //           ManageSellOfferResult manageSellOfferResult;
  //       case CREATE_PASSIVE_SELL_OFFER:
  //           ManageSellOfferResult createPassiveSellOfferResult;
  //       case SET_OPTIONS:
  //           SetOptionsResult setOptionsResult;
  //       case CHANGE_TRUST:
  //           ChangeTrustResult changeTrustResult;
  //       case ALLOW_TRUST:
  //           AllowTrustResult allowTrustResult;
  //       case ACCOUNT_MERGE:
  //           AccountMergeResult accountMergeResult;
  //       case INFLATION:
  //           InflationResult inflationResult;
  //       case MANAGE_DATA:
  //           ManageDataResult manageDataResult;
  //       case BUMP_SEQUENCE:
  //           BumpSequenceResult bumpSeqResult;
  //       case MANAGE_BUY_OFFER:
  //           ManageBuyOfferResult manageBuyOfferResult;
  //       case PATH_PAYMENT_STRICT_SEND:
  //           PathPaymentStrictSendResult pathPaymentStrictSendResult;
  //       case CREATE_CLAIMABLE_BALANCE:
  //           CreateClaimableBalanceResult createClaimableBalanceResult;
  //       case CLAIM_CLAIMABLE_BALANCE:
  //           ClaimClaimableBalanceResult claimClaimableBalanceResult;
  //       case BEGIN_SPONSORING_FUTURE_RESERVES:
  //           BeginSponsoringFutureReservesResult beginSponsoringFutureReservesResult;
  //       case END_SPONSORING_FUTURE_RESERVES:
  //           EndSponsoringFutureReservesResult endSponsoringFutureReservesResult;
  //       case REVOKE_SPONSORSHIP:
  //           RevokeSponsorshipResult revokeSponsorshipResult;
  //       case CLAWBACK:
  //           ClawbackResult clawbackResult;
  //       case CLAWBACK_CLAIMABLE_BALANCE:
  //           ClawbackClaimableBalanceResult clawbackClaimableBalanceResult;
  //       case SET_TRUST_LINE_FLAGS:
  //           SetTrustLineFlagsResult setTrustLineFlagsResult;
  //       case LIQUIDITY_POOL_DEPOSIT:
  //           LiquidityPoolDepositResult liquidityPoolDepositResult;
  //       case LIQUIDITY_POOL_WITHDRAW:
  //           LiquidityPoolWithdrawResult liquidityPoolWithdrawResult;
  //       }
  //       tr;
  //   case opBAD_AUTH:
  //   case opNO_ACCOUNT:
  //   case opNOT_SUPPORTED:
  //   case opTOO_MANY_SUBENTRIES:
  //   case opEXCEEDED_WORK_LIMIT:
  //   case opTOO_MANY_SPONSORING:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("OperationResult", {
    switchOn: xdr.lookup("OperationResultCode"),
    switchName: "code",
    switches: [["opInner", "tr"], ["opBadAuth", xdr["void"]()], ["opNoAccount", xdr["void"]()], ["opNotSupported", xdr["void"]()], ["opTooManySubentries", xdr["void"]()], ["opExceededWorkLimit", xdr["void"]()], ["opTooManySponsoring", xdr["void"]()]],
    arms: {
      tr: xdr.lookup("OperationResultTr")
    }
  });

  // === xdr source ============================================================
  //
  //   enum TransactionResultCode
  //   {
  //       txFEE_BUMP_INNER_SUCCESS = 1, // fee bump inner transaction succeeded
  //       txSUCCESS = 0,                // all operations succeeded
  //   
  //       txFAILED = -1, // one of the operations failed (none were applied)
  //   
  //       txTOO_EARLY = -2,         // ledger closeTime before minTime
  //       txTOO_LATE = -3,          // ledger closeTime after maxTime
  //       txMISSING_OPERATION = -4, // no operation was specified
  //       txBAD_SEQ = -5,           // sequence number does not match source account
  //   
  //       txBAD_AUTH = -6,             // too few valid signatures / wrong network
  //       txINSUFFICIENT_BALANCE = -7, // fee would bring account below reserve
  //       txNO_ACCOUNT = -8,           // source account not found
  //       txINSUFFICIENT_FEE = -9,     // fee is too small
  //       txBAD_AUTH_EXTRA = -10,      // unused signatures attached to transaction
  //       txINTERNAL_ERROR = -11,      // an unknown error occurred
  //   
  //       txNOT_SUPPORTED = -12,         // transaction type not supported
  //       txFEE_BUMP_INNER_FAILED = -13, // fee bump inner transaction failed
  //       txBAD_SPONSORSHIP = -14,       // sponsorship not confirmed
  //       txBAD_MIN_SEQ_AGE_OR_GAP =
  //           -15, // minSeqAge or minSeqLedgerGap conditions not met
  //       txMALFORMED = -16 // precondition is invalid
  //   };
  //
  // ===========================================================================
  xdr["enum"]("TransactionResultCode", {
    txFeeBumpInnerSuccess: 1,
    txSuccess: 0,
    txFailed: -1,
    txTooEarly: -2,
    txTooLate: -3,
    txMissingOperation: -4,
    txBadSeq: -5,
    txBadAuth: -6,
    txInsufficientBalance: -7,
    txNoAccount: -8,
    txInsufficientFee: -9,
    txBadAuthExtra: -10,
    txInternalError: -11,
    txNotSupported: -12,
    txFeeBumpInnerFailed: -13,
    txBadSponsorship: -14,
    txBadMinSeqAgeOrGap: -15,
    txMalformed: -16
  });

  // === xdr source ============================================================
  //
  //   union switch (TransactionResultCode code)
  //       {
  //       // txFEE_BUMP_INNER_SUCCESS is not included
  //       case txSUCCESS:
  //       case txFAILED:
  //           OperationResult results<>;
  //       case txTOO_EARLY:
  //       case txTOO_LATE:
  //       case txMISSING_OPERATION:
  //       case txBAD_SEQ:
  //       case txBAD_AUTH:
  //       case txINSUFFICIENT_BALANCE:
  //       case txNO_ACCOUNT:
  //       case txINSUFFICIENT_FEE:
  //       case txBAD_AUTH_EXTRA:
  //       case txINTERNAL_ERROR:
  //       case txNOT_SUPPORTED:
  //       // txFEE_BUMP_INNER_FAILED is not included
  //       case txBAD_SPONSORSHIP:
  //       case txBAD_MIN_SEQ_AGE_OR_GAP:
  //       case txMALFORMED:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("InnerTransactionResultResult", {
    switchOn: xdr.lookup("TransactionResultCode"),
    switchName: "code",
    switches: [["txSuccess", "results"], ["txFailed", "results"], ["txTooEarly", xdr["void"]()], ["txTooLate", xdr["void"]()], ["txMissingOperation", xdr["void"]()], ["txBadSeq", xdr["void"]()], ["txBadAuth", xdr["void"]()], ["txInsufficientBalance", xdr["void"]()], ["txNoAccount", xdr["void"]()], ["txInsufficientFee", xdr["void"]()], ["txBadAuthExtra", xdr["void"]()], ["txInternalError", xdr["void"]()], ["txNotSupported", xdr["void"]()], ["txBadSponsorship", xdr["void"]()], ["txBadMinSeqAgeOrGap", xdr["void"]()], ["txMalformed", xdr["void"]()]],
    arms: {
      results: xdr.varArray(xdr.lookup("OperationResult"), 2147483647)
    }
  });

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("InnerTransactionResultExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct InnerTransactionResult
  //   {
  //       // Always 0. Here for binary compatibility.
  //       int64 feeCharged;
  //   
  //       union switch (TransactionResultCode code)
  //       {
  //       // txFEE_BUMP_INNER_SUCCESS is not included
  //       case txSUCCESS:
  //       case txFAILED:
  //           OperationResult results<>;
  //       case txTOO_EARLY:
  //       case txTOO_LATE:
  //       case txMISSING_OPERATION:
  //       case txBAD_SEQ:
  //       case txBAD_AUTH:
  //       case txINSUFFICIENT_BALANCE:
  //       case txNO_ACCOUNT:
  //       case txINSUFFICIENT_FEE:
  //       case txBAD_AUTH_EXTRA:
  //       case txINTERNAL_ERROR:
  //       case txNOT_SUPPORTED:
  //       // txFEE_BUMP_INNER_FAILED is not included
  //       case txBAD_SPONSORSHIP:
  //       case txBAD_MIN_SEQ_AGE_OR_GAP:
  //       case txMALFORMED:
  //           void;
  //       }
  //       result;
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("InnerTransactionResult", [["feeCharged", xdr.lookup("Int64")], ["result", xdr.lookup("InnerTransactionResultResult")], ["ext", xdr.lookup("InnerTransactionResultExt")]]);

  // === xdr source ============================================================
  //
  //   struct InnerTransactionResultPair
  //   {
  //       Hash transactionHash;          // hash of the inner transaction
  //       InnerTransactionResult result; // result for the inner transaction
  //   };
  //
  // ===========================================================================
  xdr.struct("InnerTransactionResultPair", [["transactionHash", xdr.lookup("Hash")], ["result", xdr.lookup("InnerTransactionResult")]]);

  // === xdr source ============================================================
  //
  //   union switch (TransactionResultCode code)
  //       {
  //       case txFEE_BUMP_INNER_SUCCESS:
  //       case txFEE_BUMP_INNER_FAILED:
  //           InnerTransactionResultPair innerResultPair;
  //       case txSUCCESS:
  //       case txFAILED:
  //           OperationResult results<>;
  //       case txTOO_EARLY:
  //       case txTOO_LATE:
  //       case txMISSING_OPERATION:
  //       case txBAD_SEQ:
  //       case txBAD_AUTH:
  //       case txINSUFFICIENT_BALANCE:
  //       case txNO_ACCOUNT:
  //       case txINSUFFICIENT_FEE:
  //       case txBAD_AUTH_EXTRA:
  //       case txINTERNAL_ERROR:
  //       case txNOT_SUPPORTED:
  //       // case txFEE_BUMP_INNER_FAILED: handled above
  //       case txBAD_SPONSORSHIP:
  //       case txBAD_MIN_SEQ_AGE_OR_GAP:
  //       case txMALFORMED:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("TransactionResultResult", {
    switchOn: xdr.lookup("TransactionResultCode"),
    switchName: "code",
    switches: [["txFeeBumpInnerSuccess", "innerResultPair"], ["txFeeBumpInnerFailed", "innerResultPair"], ["txSuccess", "results"], ["txFailed", "results"], ["txTooEarly", xdr["void"]()], ["txTooLate", xdr["void"]()], ["txMissingOperation", xdr["void"]()], ["txBadSeq", xdr["void"]()], ["txBadAuth", xdr["void"]()], ["txInsufficientBalance", xdr["void"]()], ["txNoAccount", xdr["void"]()], ["txInsufficientFee", xdr["void"]()], ["txBadAuthExtra", xdr["void"]()], ["txInternalError", xdr["void"]()], ["txNotSupported", xdr["void"]()], ["txBadSponsorship", xdr["void"]()], ["txBadMinSeqAgeOrGap", xdr["void"]()], ["txMalformed", xdr["void"]()]],
    arms: {
      innerResultPair: xdr.lookup("InnerTransactionResultPair"),
      results: xdr.varArray(xdr.lookup("OperationResult"), 2147483647)
    }
  });

  // === xdr source ============================================================
  //
  //   union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //
  // ===========================================================================
  xdr.union("TransactionResultExt", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   struct TransactionResult
  //   {
  //       int64 feeCharged; // actual fee charged for the transaction
  //   
  //       union switch (TransactionResultCode code)
  //       {
  //       case txFEE_BUMP_INNER_SUCCESS:
  //       case txFEE_BUMP_INNER_FAILED:
  //           InnerTransactionResultPair innerResultPair;
  //       case txSUCCESS:
  //       case txFAILED:
  //           OperationResult results<>;
  //       case txTOO_EARLY:
  //       case txTOO_LATE:
  //       case txMISSING_OPERATION:
  //       case txBAD_SEQ:
  //       case txBAD_AUTH:
  //       case txINSUFFICIENT_BALANCE:
  //       case txNO_ACCOUNT:
  //       case txINSUFFICIENT_FEE:
  //       case txBAD_AUTH_EXTRA:
  //       case txINTERNAL_ERROR:
  //       case txNOT_SUPPORTED:
  //       // case txFEE_BUMP_INNER_FAILED: handled above
  //       case txBAD_SPONSORSHIP:
  //       case txBAD_MIN_SEQ_AGE_OR_GAP:
  //       case txMALFORMED:
  //           void;
  //       }
  //       result;
  //   
  //       // reserved for future use
  //       union switch (int v)
  //       {
  //       case 0:
  //           void;
  //       }
  //       ext;
  //   };
  //
  // ===========================================================================
  xdr.struct("TransactionResult", [["feeCharged", xdr.lookup("Int64")], ["result", xdr.lookup("TransactionResultResult")], ["ext", xdr.lookup("TransactionResultExt")]]);

  // === xdr source ============================================================
  //
  //   typedef opaque Hash[32];
  //
  // ===========================================================================
  xdr.typedef("Hash", xdr.opaque(32));

  // === xdr source ============================================================
  //
  //   typedef opaque uint256[32];
  //
  // ===========================================================================
  xdr.typedef("Uint256", xdr.opaque(32));

  // === xdr source ============================================================
  //
  //   typedef unsigned int uint32;
  //
  // ===========================================================================
  xdr.typedef("Uint32", xdr.uint());

  // === xdr source ============================================================
  //
  //   typedef int int32;
  //
  // ===========================================================================
  xdr.typedef("Int32", xdr["int"]());

  // === xdr source ============================================================
  //
  //   typedef unsigned hyper uint64;
  //
  // ===========================================================================
  xdr.typedef("Uint64", xdr.uhyper());

  // === xdr source ============================================================
  //
  //   typedef hyper int64;
  //
  // ===========================================================================
  xdr.typedef("Int64", xdr.hyper());

  // === xdr source ============================================================
  //
  //   union ExtensionPoint switch (int v)
  //   {
  //   case 0:
  //       void;
  //   };
  //
  // ===========================================================================
  xdr.union("ExtensionPoint", {
    switchOn: xdr["int"](),
    switchName: "v",
    switches: [[0, xdr["void"]()]],
    arms: {}
  });

  // === xdr source ============================================================
  //
  //   enum CryptoKeyType
  //   {
  //       KEY_TYPE_ED25519 = 0,
  //       KEY_TYPE_PRE_AUTH_TX = 1,
  //       KEY_TYPE_HASH_X = 2,
  //       KEY_TYPE_ED25519_SIGNED_PAYLOAD = 3,
  //       // MUXED enum values for supported type are derived from the enum values
  //       // above by ORing them with 0x100
  //       KEY_TYPE_MUXED_ED25519 = 0x100
  //   };
  //
  // ===========================================================================
  xdr["enum"]("CryptoKeyType", {
    keyTypeEd25519: 0,
    keyTypePreAuthTx: 1,
    keyTypeHashX: 2,
    keyTypeEd25519SignedPayload: 3,
    keyTypeMuxedEd25519: 256
  });

  // === xdr source ============================================================
  //
  //   enum PublicKeyType
  //   {
  //       PUBLIC_KEY_TYPE_ED25519 = KEY_TYPE_ED25519
  //   };
  //
  // ===========================================================================
  xdr["enum"]("PublicKeyType", {
    publicKeyTypeEd25519: 0
  });

  // === xdr source ============================================================
  //
  //   enum SignerKeyType
  //   {
  //       SIGNER_KEY_TYPE_ED25519 = KEY_TYPE_ED25519,
  //       SIGNER_KEY_TYPE_PRE_AUTH_TX = KEY_TYPE_PRE_AUTH_TX,
  //       SIGNER_KEY_TYPE_HASH_X = KEY_TYPE_HASH_X,
  //       SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD = KEY_TYPE_ED25519_SIGNED_PAYLOAD
  //   };
  //
  // ===========================================================================
  xdr["enum"]("SignerKeyType", {
    signerKeyTypeEd25519: 0,
    signerKeyTypePreAuthTx: 1,
    signerKeyTypeHashX: 2,
    signerKeyTypeEd25519SignedPayload: 3
  });

  // === xdr source ============================================================
  //
  //   union PublicKey switch (PublicKeyType type)
  //   {
  //   case PUBLIC_KEY_TYPE_ED25519:
  //       uint256 ed25519;
  //   };
  //
  // ===========================================================================
  xdr.union("PublicKey", {
    switchOn: xdr.lookup("PublicKeyType"),
    switchName: "type",
    switches: [["publicKeyTypeEd25519", "ed25519"]],
    arms: {
      ed25519: xdr.lookup("Uint256")
    }
  });

  // === xdr source ============================================================
  //
  //   struct
  //       {
  //           /* Public key that must sign the payload. */
  //           uint256 ed25519;
  //           /* Payload to be raw signed by ed25519. */
  //           opaque payload<64>;
  //       }
  //
  // ===========================================================================
  xdr.struct("SignerKeyEd25519SignedPayload", [["ed25519", xdr.lookup("Uint256")], ["payload", xdr.varOpaque(64)]]);

  // === xdr source ============================================================
  //
  //   union SignerKey switch (SignerKeyType type)
  //   {
  //   case SIGNER_KEY_TYPE_ED25519:
  //       uint256 ed25519;
  //   case SIGNER_KEY_TYPE_PRE_AUTH_TX:
  //       /* SHA-256 Hash of TransactionSignaturePayload structure */
  //       uint256 preAuthTx;
  //   case SIGNER_KEY_TYPE_HASH_X:
  //       /* Hash of random 256 bit preimage X */
  //       uint256 hashX;
  //   case SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD:
  //       struct
  //       {
  //           /* Public key that must sign the payload. */
  //           uint256 ed25519;
  //           /* Payload to be raw signed by ed25519. */
  //           opaque payload<64>;
  //       } ed25519SignedPayload;
  //   };
  //
  // ===========================================================================
  xdr.union("SignerKey", {
    switchOn: xdr.lookup("SignerKeyType"),
    switchName: "type",
    switches: [["signerKeyTypeEd25519", "ed25519"], ["signerKeyTypePreAuthTx", "preAuthTx"], ["signerKeyTypeHashX", "hashX"], ["signerKeyTypeEd25519SignedPayload", "ed25519SignedPayload"]],
    arms: {
      ed25519: xdr.lookup("Uint256"),
      preAuthTx: xdr.lookup("Uint256"),
      hashX: xdr.lookup("Uint256"),
      ed25519SignedPayload: xdr.lookup("SignerKeyEd25519SignedPayload")
    }
  });

  // === xdr source ============================================================
  //
  //   typedef opaque Signature<64>;
  //
  // ===========================================================================
  xdr.typedef("Signature", xdr.varOpaque(64));

  // === xdr source ============================================================
  //
  //   typedef opaque SignatureHint[4];
  //
  // ===========================================================================
  xdr.typedef("SignatureHint", xdr.opaque(4));

  // === xdr source ============================================================
  //
  //   typedef PublicKey NodeID;
  //
  // ===========================================================================
  xdr.typedef("NodeId", xdr.lookup("PublicKey"));

  // === xdr source ============================================================
  //
  //   struct Curve25519Secret
  //   {
  //       opaque key[32];
  //   };
  //
  // ===========================================================================
  xdr.struct("Curve25519Secret", [["key", xdr.opaque(32)]]);

  // === xdr source ============================================================
  //
  //   struct Curve25519Public
  //   {
  //       opaque key[32];
  //   };
  //
  // ===========================================================================
  xdr.struct("Curve25519Public", [["key", xdr.opaque(32)]]);

  // === xdr source ============================================================
  //
  //   struct HmacSha256Key
  //   {
  //       opaque key[32];
  //   };
  //
  // ===========================================================================
  xdr.struct("HmacSha256Key", [["key", xdr.opaque(32)]]);

  // === xdr source ============================================================
  //
  //   struct HmacSha256Mac
  //   {
  //       opaque mac[32];
  //   };
  //
  // ===========================================================================
  xdr.struct("HmacSha256Mac", [["mac", xdr.opaque(32)]]);
});
/* harmony default export */ const curr_generated = (types);
;// CONCATENATED MODULE: ./src/xdr.js

/* harmony default export */ const src_xdr = (curr_generated);
// EXTERNAL MODULE: ./node_modules/sha.js/index.js
var sha_js = __webpack_require__(9072);
;// CONCATENATED MODULE: ./src/hashing.js

function hashing_hash(data) {
  var hasher = new sha_js.sha256();
  hasher.update(data, 'utf8');
  return hasher.digest();
}
;// CONCATENATED MODULE: ./src/signing.js
/* provided dependency */ var Buffer = __webpack_require__(8764)["Buffer"];
//  This module provides the signing functionality used by the stellar network
//  The code below may look a little strange... this is because we try to provide
//  the most efficient signing method possible.  First, we try to load the
//  native `sodium-native` package for node.js environments, and if that fails we
//  fallback to `tweetnacl`

var actualMethods = {};

/**
 * Use this flag to check if fast signing (provided by `sodium-native` package) is available.
 * If your app is signing a large number of transaction or verifying a large number
 * of signatures make sure `sodium-native` package is installed.
 */
var FastSigning = checkFastSigning();
function signing_sign(data, secretKey) {
  return actualMethods.sign(data, secretKey);
}
function signing_verify(data, signature, publicKey) {
  return actualMethods.verify(data, signature, publicKey);
}
function generate(secretKey) {
  return actualMethods.generate(secretKey);
}
function checkFastSigning() {
  return typeof window === 'undefined' ? checkFastSigningNode() : checkFastSigningBrowser();
}
function checkFastSigningNode() {
  // NOTE: we use commonjs style require here because es6 imports
  // can only occur at the top level.  thanks, obama.
  var sodium;
  try {
    // eslint-disable-next-line
    sodium = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'sodium-native'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
  } catch (err) {
    return checkFastSigningBrowser();
  }
  if (!Object.keys(sodium).length) {
    return checkFastSigningBrowser();
  }
  actualMethods.generate = function (secretKey) {
    var pk = Buffer.alloc(sodium.crypto_sign_PUBLICKEYBYTES);
    var sk = Buffer.alloc(sodium.crypto_sign_SECRETKEYBYTES);
    sodium.crypto_sign_seed_keypair(pk, sk, secretKey);
    return pk;
  };
  actualMethods.sign = function (data, secretKey) {
    data = Buffer.from(data);
    var signature = Buffer.alloc(sodium.crypto_sign_BYTES);
    sodium.crypto_sign_detached(signature, data, secretKey);
    return signature;
  };
  actualMethods.verify = function (data, signature, publicKey) {
    data = Buffer.from(data);
    try {
      return sodium.crypto_sign_verify_detached(signature, data, publicKey);
    } catch (e) {
      return false;
    }
  };
  return true;
}
function checkFastSigningBrowser() {
  // fallback to `tweetnacl` if we're in the browser or
  // if there was a failure installing `sodium-native`
  // eslint-disable-next-line
  var nacl = __webpack_require__(780);
  actualMethods.generate = function (secretKey) {
    var secretKeyUint8 = new Uint8Array(secretKey);
    var naclKeys = nacl.sign.keyPair.fromSeed(secretKeyUint8);
    return Buffer.from(naclKeys.publicKey);
  };
  actualMethods.sign = function (data, secretKey) {
    data = Buffer.from(data);
    data = new Uint8Array(data.toJSON().data);
    secretKey = new Uint8Array(secretKey.toJSON().data);
    var signature = nacl.sign.detached(data, secretKey);
    return Buffer.from(signature);
  };
  actualMethods.verify = function (data, signature, publicKey) {
    data = Buffer.from(data);
    data = new Uint8Array(data.toJSON().data);
    signature = new Uint8Array(signature.toJSON().data);
    publicKey = new Uint8Array(publicKey.toJSON().data);
    return nacl.sign.detached.verify(data, signature, publicKey);
  };
  return false;
}
;// CONCATENATED MODULE: ./src/util/util.js
var trimEnd = function trimEnd(input, _char) {
  var isNumber = typeof input === 'number';
  var str = String(input);
  while (str.endsWith(_char)) {
    str = str.slice(0, -1);
  }
  return isNumber ? Number(str) : str;
};
// EXTERNAL MODULE: ./node_modules/tweetnacl/nacl-fast.js
var nacl_fast = __webpack_require__(780);
var nacl_fast_default = /*#__PURE__*/__webpack_require__.n(nacl_fast);
// EXTERNAL MODULE: ./node_modules/base32.js/base32.js
var base32 = __webpack_require__(6906);
;// CONCATENATED MODULE: ./src/util/checksum.js
function verifyChecksum(expected, actual) {
  if (expected.length !== actual.length) {
    return false;
  }
  if (expected.length === 0) {
    return true;
  }
  for (var i = 0; i < expected.length; i += 1) {
    if (expected[i] !== actual[i]) {
      return false;
    }
  }
  return true;
}
;// CONCATENATED MODULE: ./src/strkey.js
/* provided dependency */ var strkey_Buffer = __webpack_require__(8764)["Buffer"];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint no-bitwise: ["error", {"allow": ["<<", ">>", "^", "&", "&="]}] */



var versionBytes = {
  ed25519PublicKey: 6 << 3,
  // G (when encoded in base32)
  ed25519SecretSeed: 18 << 3,
  // S
  med25519PublicKey: 12 << 3,
  // M
  preAuthTx: 19 << 3,
  // T
  sha256Hash: 23 << 3,
  // X
  signedPayload: 15 << 3 // P
};

var strkeyTypes = {
  G: 'ed25519PublicKey',
  S: 'ed25519SecretSeed',
  M: 'med25519PublicKey',
  T: 'preAuthTx',
  X: 'sha256Hash',
  P: 'signedPayload'
};

/**
 * StrKey is a helper class that allows encoding and decoding Stellar keys
 * to/from strings, i.e. between their binary (Buffer, xdr.PublicKey, etc.) and
 * string (i.e. "GABCD...", etc.) representations.
 */
var StrKey = /*#__PURE__*/function () {
  function StrKey() {
    _classCallCheck(this, StrKey);
  }
  _createClass(StrKey, null, [{
    key: "encodeEd25519PublicKey",
    value:
    /**
     * Encodes `data` to strkey ed25519 public key.
     *
     * @param   {Buffer} data   raw data to encode
     * @returns {string}        "G..." representation of the key
     */
    function encodeEd25519PublicKey(data) {
      return encodeCheck('ed25519PublicKey', data);
    }

    /**
     * Decodes strkey ed25519 public key to raw data.
     *
     * If the parameter is a muxed account key ("M..."), this will only encode it
     * as a basic Ed25519 key (as if in "G..." format).
     *
     * @param   {string} data   "G..." (or "M...") key representation to decode
     * @returns {Buffer}        raw key
     */
  }, {
    key: "decodeEd25519PublicKey",
    value: function decodeEd25519PublicKey(data) {
      return decodeCheck('ed25519PublicKey', data);
    }

    /**
     * Returns true if the given Stellar public key is a valid ed25519 public key.
     * @param {string} publicKey public key to check
     * @returns {boolean}
     */
  }, {
    key: "isValidEd25519PublicKey",
    value: function isValidEd25519PublicKey(publicKey) {
      return isValid('ed25519PublicKey', publicKey);
    }

    /**
     * Encodes data to strkey ed25519 seed.
     * @param {Buffer} data data to encode
     * @returns {string}
     */
  }, {
    key: "encodeEd25519SecretSeed",
    value: function encodeEd25519SecretSeed(data) {
      return encodeCheck('ed25519SecretSeed', data);
    }

    /**
     * Decodes strkey ed25519 seed to raw data.
     * @param {string} address data to decode
     * @returns {Buffer}
     */
  }, {
    key: "decodeEd25519SecretSeed",
    value: function decodeEd25519SecretSeed(address) {
      return decodeCheck('ed25519SecretSeed', address);
    }

    /**
     * Returns true if the given Stellar secret key is a valid ed25519 secret seed.
     * @param {string} seed seed to check
     * @returns {boolean}
     */
  }, {
    key: "isValidEd25519SecretSeed",
    value: function isValidEd25519SecretSeed(seed) {
      return isValid('ed25519SecretSeed', seed);
    }

    /**
     * Encodes data to strkey med25519 public key.
     * @param {Buffer} data data to encode
     * @returns {string}
     */
  }, {
    key: "encodeMed25519PublicKey",
    value: function encodeMed25519PublicKey(data) {
      return encodeCheck('med25519PublicKey', data);
    }

    /**
     * Decodes strkey med25519 public key to raw data.
     * @param {string} address data to decode
     * @returns {Buffer}
     */
  }, {
    key: "decodeMed25519PublicKey",
    value: function decodeMed25519PublicKey(address) {
      return decodeCheck('med25519PublicKey', address);
    }

    /**
     * Returns true if the given Stellar public key is a valid med25519 public key.
     * @param {string} publicKey public key to check
     * @returns {boolean}
     */
  }, {
    key: "isValidMed25519PublicKey",
    value: function isValidMed25519PublicKey(publicKey) {
      return isValid('med25519PublicKey', publicKey);
    }

    /**
     * Encodes data to strkey preAuthTx.
     * @param {Buffer} data data to encode
     * @returns {string}
     */
  }, {
    key: "encodePreAuthTx",
    value: function encodePreAuthTx(data) {
      return encodeCheck('preAuthTx', data);
    }

    /**
     * Decodes strkey PreAuthTx to raw data.
     * @param {string} address data to decode
     * @returns {Buffer}
     */
  }, {
    key: "decodePreAuthTx",
    value: function decodePreAuthTx(address) {
      return decodeCheck('preAuthTx', address);
    }

    /**
     * Encodes data to strkey sha256 hash.
     * @param {Buffer} data data to encode
     * @returns {string}
     */
  }, {
    key: "encodeSha256Hash",
    value: function encodeSha256Hash(data) {
      return encodeCheck('sha256Hash', data);
    }

    /**
     * Decodes strkey sha256 hash to raw data.
     * @param {string} address data to decode
     * @returns {Buffer}
     */
  }, {
    key: "decodeSha256Hash",
    value: function decodeSha256Hash(address) {
      return decodeCheck('sha256Hash', address);
    }

    /**
     * Encodes raw data to strkey signed payload (P...).
     * @param   {Buffer} data  data to encode
     * @returns {string}
     */
  }, {
    key: "encodeSignedPayload",
    value: function encodeSignedPayload(data) {
      return encodeCheck('signedPayload', data);
    }

    /**
     * Decodes strkey signed payload (P...) to raw data.
     * @param   {string} address  address to decode
     * @returns {Buffer}
     */
  }, {
    key: "decodeSignedPayload",
    value: function decodeSignedPayload(address) {
      return decodeCheck('signedPayload', address);
    }

    /**
     * Checks validity of alleged signed payload (P...) strkey address.
     * @param   {string} address  signer key to check
     * @returns {boolean}
     */
  }, {
    key: "isValidSignedPayload",
    value: function isValidSignedPayload(address) {
      return isValid('signedPayload', address);
    }
  }, {
    key: "getVersionByteForPrefix",
    value: function getVersionByteForPrefix(address) {
      return strkeyTypes[address[0]];
    }
  }]);
  return StrKey;
}();

/**
 * Sanity-checks whether or not a strkey *appears* valid.
 *
 * @param  {string}  versionByteName the type of strkey to expect in `encoded`
 * @param  {string}  encoded         the strkey to validate
 *
 * @return {Boolean} whether or not the `encoded` strkey appears valid for the
 *     `versionByteName` strkey type (see `versionBytes`, above).
 *
 * @note This isn't a *definitive* check of validity, but rather a best-effort
 *     check based on (a) input length, (b) whether or not it can be decoded,
 *     and (c) output length.
 */
function isValid(versionByteName, encoded) {
  if (typeof encoded !== 'string') {
    return false;
  }

  // basic length checks on the strkey lengths
  switch (versionByteName) {
    case 'ed25519PublicKey': // falls through
    case 'ed25519SecretSeed': // falls through
    case 'preAuthTx': // falls through
    case 'sha256Hash':
      if (encoded.length !== 56) {
        return false;
      }
      break;
    case 'med25519PublicKey':
      if (encoded.length !== 69) {
        return false;
      }
      break;
    case 'signedPayload':
      if (encoded.length < 56 || encoded.length > 165) {
        return false;
      }
      break;
    default:
      return false;
  }
  var decoded = '';
  try {
    decoded = decodeCheck(versionByteName, encoded);
  } catch (err) {
    return false;
  }

  // basic length checks on the resulting buffer sizes
  switch (versionByteName) {
    case 'ed25519PublicKey': // falls through
    case 'ed25519SecretSeed': // falls through
    case 'preAuthTx': // falls through
    case 'sha256Hash':
      return decoded.length === 32;
    case 'med25519PublicKey':
      return decoded.length === 40;
    // +8 bytes for the ID

    case 'signedPayload':
      return (
        // 32 for the signer, +4 for the payload size, then either +4 for the
        // min or +64 for the max payload
        decoded.length >= 32 + 4 + 4 && decoded.length <= 32 + 4 + 64
      );
    default:
      return false;
  }
}
function decodeCheck(versionByteName, encoded) {
  if (typeof encoded !== 'string') {
    throw new TypeError('encoded argument must be of type String');
  }
  var decoded = base32.decode(encoded);
  var versionByte = decoded[0];
  var payload = decoded.slice(0, -2);
  var data = payload.slice(1);
  var checksum = decoded.slice(-2);
  if (encoded !== base32.encode(decoded)) {
    throw new Error('invalid encoded string');
  }
  var expectedVersion = versionBytes[versionByteName];
  if (expectedVersion === undefined) {
    throw new Error("".concat(versionByteName, " is not a valid version byte name. ") + "Expected one of ".concat(Object.keys(versionBytes).join(', ')));
  }
  if (versionByte !== expectedVersion) {
    throw new Error("invalid version byte. expected ".concat(expectedVersion, ", got ").concat(versionByte));
  }
  var expectedChecksum = calculateChecksum(payload);
  if (!verifyChecksum(expectedChecksum, checksum)) {
    throw new Error("invalid checksum");
  }
  return strkey_Buffer.from(data);
}
function encodeCheck(versionByteName, data) {
  if (data === null || data === undefined) {
    throw new Error('cannot encode null data');
  }
  var versionByte = versionBytes[versionByteName];
  if (versionByte === undefined) {
    throw new Error("".concat(versionByteName, " is not a valid version byte name. ") + "Expected one of ".concat(Object.keys(versionBytes).join(', ')));
  }
  data = strkey_Buffer.from(data);
  var versionBuffer = strkey_Buffer.from([versionByte]);
  var payload = strkey_Buffer.concat([versionBuffer, data]);
  var checksum = calculateChecksum(payload);
  var unencoded = strkey_Buffer.concat([payload, checksum]);
  return base32.encode(unencoded);
}

// Computes the CRC16-XModem checksum of `payload` in little-endian order
function calculateChecksum(payload) {
  var crcTable = [0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6, 0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d, 0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823, 0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a, 0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70, 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067, 0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x02b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d, 0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634, 0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a, 0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1, 0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0];
  var crc16 = 0x0;
  for (var i = 0; i < payload.length; i += 1) {
    var _byte = payload[i];
    var lookupIndex = crc16 >> 8 ^ _byte;
    crc16 = crc16 << 8 ^ crcTable[lookupIndex];
    crc16 &= 0xffff;
  }
  var checksum = new Uint8Array(2);
  checksum[0] = crc16 & 0xff;
  checksum[1] = crc16 >> 8 & 0xff;
  return checksum;
}
;// CONCATENATED MODULE: ./src/keypair.js
/* provided dependency */ var keypair_Buffer = __webpack_require__(8764)["Buffer"];
function keypair_typeof(obj) { "@babel/helpers - typeof"; return keypair_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, keypair_typeof(obj); }
function keypair_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function keypair_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, keypair_toPropertyKey(descriptor.key), descriptor); } }
function keypair_createClass(Constructor, protoProps, staticProps) { if (protoProps) keypair_defineProperties(Constructor.prototype, protoProps); if (staticProps) keypair_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function keypair_toPropertyKey(arg) { var key = keypair_toPrimitive(arg, "string"); return keypair_typeof(key) === "symbol" ? key : String(key); }
function keypair_toPrimitive(input, hint) { if (keypair_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (keypair_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint no-bitwise: ["error", {"allow": ["^"]}] */







/**
 * `Keypair` represents public (and secret) keys of the account.
 *
 * Currently `Keypair` only supports ed25519 but in a future this class can be abstraction layer for other
 * public-key signature systems.
 *
 * Use more convenient methods to create `Keypair` object:
 * * `{@link Keypair.fromPublicKey}`
 * * `{@link Keypair.fromSecret}`
 * * `{@link Keypair.random}`
 *
 * @constructor
 * @param {object} keys At least one of keys must be provided.
 * @param {string} keys.type Public-key signature system name. (currently only `ed25519` keys are supported)
 * @param {Buffer} [keys.publicKey] Raw public key
 * @param {Buffer} [keys.secretKey] Raw secret key (32-byte secret seed in ed25519`)
 */
var Keypair = /*#__PURE__*/function () {
  function Keypair(keys) {
    keypair_classCallCheck(this, Keypair);
    if (keys.type !== 'ed25519') {
      throw new Error('Invalid keys type');
    }
    this.type = keys.type;
    if (keys.secretKey) {
      keys.secretKey = keypair_Buffer.from(keys.secretKey);
      if (keys.secretKey.length !== 32) {
        throw new Error('secretKey length is invalid');
      }
      this._secretSeed = keys.secretKey;
      this._publicKey = generate(keys.secretKey);
      this._secretKey = keypair_Buffer.concat([keys.secretKey, this._publicKey]);
      if (keys.publicKey && !this._publicKey.equals(keypair_Buffer.from(keys.publicKey))) {
        throw new Error('secretKey does not match publicKey');
      }
    } else {
      this._publicKey = keypair_Buffer.from(keys.publicKey);
      if (this._publicKey.length !== 32) {
        throw new Error('publicKey length is invalid');
      }
    }
  }

  /**
   * Creates a new `Keypair` instance from secret. This can either be secret key or secret seed depending
   * on underlying public-key signature system. Currently `Keypair` only supports ed25519.
   * @param {string} secret secret key (ex. `SDAKFNYEIAORZKKCYRILFQKLLOCNPL5SWJ3YY5NM3ZH6GJSZGXHZEPQS`)
   * @returns {Keypair}
   */
  keypair_createClass(Keypair, [{
    key: "xdrAccountId",
    value: function xdrAccountId() {
      return new src_xdr.AccountId.publicKeyTypeEd25519(this._publicKey);
    }
  }, {
    key: "xdrPublicKey",
    value: function xdrPublicKey() {
      return new src_xdr.PublicKey.publicKeyTypeEd25519(this._publicKey);
    }

    /**
     * Creates a {@link xdr.MuxedAccount} object from the public key.
     *
     * You will get a different type of muxed account depending on whether or not
     * you pass an ID.
     *
     * @param  {string} [id] - stringified integer indicating the underlying muxed
     *     ID of the new account object
     *
     * @return {xdr.MuxedAccount}
     */
  }, {
    key: "xdrMuxedAccount",
    value: function xdrMuxedAccount(id) {
      if (typeof id !== 'undefined') {
        if (typeof id !== 'string') {
          throw new TypeError("expected string for ID, got ".concat(keypair_typeof(id)));
        }
        return src_xdr.MuxedAccount.keyTypeMuxedEd25519(new src_xdr.MuxedAccountMed25519({
          id: src_xdr.Uint64.fromString(id),
          ed25519: this._publicKey
        }));
      }
      return new src_xdr.MuxedAccount.keyTypeEd25519(this._publicKey);
    }

    /**
     * Returns raw public key
     * @returns {Buffer}
     */
  }, {
    key: "rawPublicKey",
    value: function rawPublicKey() {
      return this._publicKey;
    }
  }, {
    key: "signatureHint",
    value: function signatureHint() {
      var a = this.xdrAccountId().toXDR();
      return a.slice(a.length - 4);
    }

    /**
     * Returns public key associated with this `Keypair` object.
     * @returns {string}
     */
  }, {
    key: "publicKey",
    value: function publicKey() {
      return StrKey.encodeEd25519PublicKey(this._publicKey);
    }

    /**
     * Returns secret key associated with this `Keypair` object
     * @returns {string}
     */
  }, {
    key: "secret",
    value: function secret() {
      if (!this._secretSeed) {
        throw new Error('no secret key available');
      }
      if (this.type === 'ed25519') {
        return StrKey.encodeEd25519SecretSeed(this._secretSeed);
      }
      throw new Error('Invalid Keypair type');
    }

    /**
     * Returns raw secret key.
     * @returns {Buffer}
     */
  }, {
    key: "rawSecretKey",
    value: function rawSecretKey() {
      return this._secretSeed;
    }

    /**
     * Returns `true` if this `Keypair` object contains secret key and can sign.
     * @returns {boolean}
     */
  }, {
    key: "canSign",
    value: function canSign() {
      return !!this._secretKey;
    }

    /**
     * Signs data.
     * @param {Buffer} data Data to sign
     * @returns {Buffer}
     */
  }, {
    key: "sign",
    value: function sign(data) {
      if (!this.canSign()) {
        throw new Error('cannot sign: no secret key available');
      }
      return signing_sign(data, this._secretKey);
    }

    /**
     * Verifies if `signature` for `data` is valid.
     * @param {Buffer} data Signed data
     * @param {Buffer} signature Signature
     * @returns {boolean}
     */
  }, {
    key: "verify",
    value: function verify(data, signature) {
      return signing_verify(data, signature, this._publicKey);
    }

    /**
     * Returns the decorated signature (hint+sig) for arbitrary data.
     *
     * @param  {Buffer} data  arbitrary data to sign
     * @return {xdr.DecoratedSignature}   the raw signature structure which can be
     *     added directly to a transaction envelope
     *
     * @see TransactionBase.addDecoratedSignature
     */
  }, {
    key: "signDecorated",
    value: function signDecorated(data) {
      var signature = this.sign(data);
      var hint = this.signatureHint();
      return new src_xdr.DecoratedSignature({
        hint: hint,
        signature: signature
      });
    }

    /**
     * Returns the raw decorated signature (hint+sig) for a signed payload signer.
     *
     *  The hint is defined as the last 4 bytes of the signer key XORed with last
     *  4 bytes of the payload (zero-left-padded if necessary).
     *
     * @param  {Buffer} data    data to both sign and treat as the payload
     * @return {xdr.DecoratedSignature}
     *
     * @see https://github.com/stellar/stellar-protocol/blob/master/core/cap-0040.md#signature-hint
     * @see TransactionBase.addDecoratedSignature
     */
  }, {
    key: "signPayloadDecorated",
    value: function signPayloadDecorated(data) {
      var signature = this.sign(data);
      var keyHint = this.signatureHint();
      var hint = keypair_Buffer.from(data.slice(-4));
      if (hint.length < 4) {
        // append zeroes as needed
        hint = keypair_Buffer.concat([hint, keypair_Buffer.alloc(4 - data.length, 0)]);
      }
      return new src_xdr.DecoratedSignature({
        hint: hint.map(function (_byte, i) {
          return _byte ^ keyHint[i];
        }),
        signature: signature
      });
    }
  }], [{
    key: "fromSecret",
    value: function fromSecret(secret) {
      var rawSecret = StrKey.decodeEd25519SecretSeed(secret);
      return this.fromRawEd25519Seed(rawSecret);
    }

    /**
     * Creates a new `Keypair` object from ed25519 secret key seed raw bytes.
     *
     * @param {Buffer} rawSeed Raw 32-byte ed25519 secret key seed
     * @returns {Keypair}
     */
  }, {
    key: "fromRawEd25519Seed",
    value: function fromRawEd25519Seed(rawSeed) {
      return new this({
        type: 'ed25519',
        secretKey: rawSeed
      });
    }

    /**
     * Returns `Keypair` object representing network master key.
     * @param {string} networkPassphrase passphrase of the target stellar network (e.g. "Public Global Stellar Network ; September 2015").
     * @returns {Keypair}
     */
  }, {
    key: "master",
    value: function master(networkPassphrase) {
      if (!networkPassphrase) {
        throw new Error('No network selected. Please pass a network argument, e.g. `Keypair.master(Networks.PUBLIC)`.');
      }
      return this.fromRawEd25519Seed(hashing_hash(networkPassphrase));
    }

    /**
     * Creates a new `Keypair` object from public key.
     * @param {string} publicKey public key (ex. `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`)
     * @returns {Keypair}
     */
  }, {
    key: "fromPublicKey",
    value: function fromPublicKey(publicKey) {
      publicKey = StrKey.decodeEd25519PublicKey(publicKey);
      if (publicKey.length !== 32) {
        throw new Error('Invalid Stellar public key');
      }
      return new this({
        type: 'ed25519',
        publicKey: publicKey
      });
    }

    /**
     * Create a random `Keypair` object.
     * @returns {Keypair}
     */
  }, {
    key: "random",
    value: function random() {
      var secret = nacl_fast_default().randomBytes(32);
      return this.fromRawEd25519Seed(secret);
    }
  }]);
  return Keypair;
}();
;// CONCATENATED MODULE: ./src/asset.js
/* provided dependency */ var asset_Buffer = __webpack_require__(8764)["Buffer"];
function asset_typeof(obj) { "@babel/helpers - typeof"; return asset_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, asset_typeof(obj); }
function asset_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function asset_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, asset_toPropertyKey(descriptor.key), descriptor); } }
function asset_createClass(Constructor, protoProps, staticProps) { if (protoProps) asset_defineProperties(Constructor.prototype, protoProps); if (staticProps) asset_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function asset_toPropertyKey(arg) { var key = asset_toPrimitive(arg, "string"); return asset_typeof(key) === "symbol" ? key : String(key); }
function asset_toPrimitive(input, hint) { if (asset_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (asset_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





/**
 * Asset class represents an asset, either the native asset (`XLM`)
 * or an asset code / issuer account ID pair.
 *
 * An asset code describes an asset code and issuer pair. In the case of the native
 * asset XLM, the issuer will be null.
 *
 * @constructor
 * @param {string} code - The asset code.
 * @param {string} issuer - The account ID of the issuer.
 */
var Asset = /*#__PURE__*/function () {
  function Asset(code, issuer) {
    asset_classCallCheck(this, Asset);
    if (!/^[a-zA-Z0-9]{1,12}$/.test(code)) {
      throw new Error('Asset code is invalid (maximum alphanumeric, 12 characters at max)');
    }
    if (String(code).toLowerCase() !== 'xlm' && !issuer) {
      throw new Error('Issuer cannot be null');
    }
    if (issuer && !StrKey.isValidEd25519PublicKey(issuer)) {
      throw new Error('Issuer is invalid');
    }
    if (String(code).toLowerCase() === 'xlm') {
      // transform all xLM, Xlm, etc. variants -> XLM
      this.code = 'XLM';
    } else {
      this.code = code;
    }
    this.issuer = issuer;
  }

  /**
   * Returns an asset object for the native asset.
   * @Return {Asset}
   */
  asset_createClass(Asset, [{
    key: "toXDRObject",
    value:
    /**
     * Returns the xdr.Asset object for this asset.
     * @returns {xdr.Asset} XDR asset object
     */
    function toXDRObject() {
      return this._toXDRObject(src_xdr.Asset);
    }

    /**
     * Returns the xdr.ChangeTrustAsset object for this asset.
     * @returns {xdr.ChangeTrustAsset} XDR asset object
     */
  }, {
    key: "toChangeTrustXDRObject",
    value: function toChangeTrustXDRObject() {
      return this._toXDRObject(src_xdr.ChangeTrustAsset);
    }

    /**
     * Returns the xdr.TrustLineAsset object for this asset.
     * @returns {xdr.TrustLineAsset} XDR asset object
     */
  }, {
    key: "toTrustLineXDRObject",
    value: function toTrustLineXDRObject() {
      return this._toXDRObject(src_xdr.TrustLineAsset);
    }

    /**
     * Returns the xdr object for this asset.
     * @param {xdr.Asset | xdr.ChangeTrustAsset} xdrAsset - The asset xdr object.
     * @returns {xdr.Asset | xdr.ChangeTrustAsset | xdr.TrustLineAsset} XDR Asset object
     */
  }, {
    key: "_toXDRObject",
    value: function _toXDRObject() {
      var xdrAsset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : src_xdr.Asset;
      if (this.isNative()) {
        return xdrAsset.assetTypeNative();
      }
      var xdrType;
      var xdrTypeString;
      if (this.code.length <= 4) {
        xdrType = src_xdr.AlphaNum4;
        xdrTypeString = 'assetTypeCreditAlphanum4';
      } else {
        xdrType = src_xdr.AlphaNum12;
        xdrTypeString = 'assetTypeCreditAlphanum12';
      }

      // pad code with null bytes if necessary
      var padLength = this.code.length <= 4 ? 4 : 12;
      var paddedCode = this.code.padEnd(padLength, '\0');

      // eslint-disable-next-line new-cap
      var assetType = new xdrType({
        assetCode: paddedCode,
        issuer: Keypair.fromPublicKey(this.issuer).xdrAccountId()
      });
      return new xdrAsset(xdrTypeString, assetType);
    }

    /**
     * @returns {string} Asset code
     */
  }, {
    key: "getCode",
    value: function getCode() {
      if (this.code === undefined) {
        return undefined;
      }
      return String(this.code);
    }

    /**
     * @returns {string} Asset issuer
     */
  }, {
    key: "getIssuer",
    value: function getIssuer() {
      if (this.issuer === undefined) {
        return undefined;
      }
      return String(this.issuer);
    }

    /**
     * @see [Assets concept](https://developers.stellar.org/docs/glossary/assets/)
     * @returns {string} Asset type. Can be one of following types:
     *
     *  - `native`,
     *  - `credit_alphanum4`,
     *  - `credit_alphanum12`, or
     *  - `unknown` as the error case (which should never occur)
     */
  }, {
    key: "getAssetType",
    value: function getAssetType() {
      switch (this.getRawAssetType()) {
        case src_xdr.AssetType.assetTypeNative():
          return 'native';
        case src_xdr.AssetType.assetTypeCreditAlphanum4():
          return 'credit_alphanum4';
        case src_xdr.AssetType.assetTypeCreditAlphanum12():
          return 'credit_alphanum12';
        default:
          return 'unknown';
      }
    }

    /**
     * @returns {xdr.AssetType}  the raw XDR representation of the asset type
     */
  }, {
    key: "getRawAssetType",
    value: function getRawAssetType() {
      if (this.isNative()) {
        return src_xdr.AssetType.assetTypeNative();
      }
      if (this.code.length <= 4) {
        return src_xdr.AssetType.assetTypeCreditAlphanum4();
      }
      return src_xdr.AssetType.assetTypeCreditAlphanum12();
    }

    /**
     * @returns {boolean}  true if this asset object is the native asset.
     */
  }, {
    key: "isNative",
    value: function isNative() {
      return !this.issuer;
    }

    /**
     * @param {Asset} asset Asset to compare
     * @returns {boolean} true if this asset equals the given asset.
     */
  }, {
    key: "equals",
    value: function equals(asset) {
      return this.code === asset.getCode() && this.issuer === asset.getIssuer();
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this.isNative()) {
        return 'native';
      }
      return "".concat(this.getCode(), ":").concat(this.getIssuer());
    }

    /**
     * Compares two assets according to the criteria:
     *
     *  1. First compare the type (native < alphanum4 < alphanum12).
     *  2. If the types are equal, compare the assets codes.
     *  3. If the asset codes are equal, compare the issuers.
     *
     * @param   {Asset} assetA - the first asset
     * @param   {Asset} assetB - the second asset
     * @returns {number} `-1` if assetA < assetB, `0` if assetA == assetB, `1` if assetA > assetB.
     *
     * @static
     * @memberof Asset
     */
  }], [{
    key: "native",
    value: function native() {
      return new Asset('XLM');
    }

    /**
     * Returns an asset object from its XDR object representation.
     * @param {xdr.Asset} assetXdr - The asset xdr object.
     * @returns {Asset}
     */
  }, {
    key: "fromOperation",
    value: function fromOperation(assetXdr) {
      var anum;
      var code;
      var issuer;
      switch (assetXdr["switch"]()) {
        case src_xdr.AssetType.assetTypeNative():
          return this["native"]();
        case src_xdr.AssetType.assetTypeCreditAlphanum4():
          anum = assetXdr.alphaNum4();
        /* falls through */
        case src_xdr.AssetType.assetTypeCreditAlphanum12():
          anum = anum || assetXdr.alphaNum12();
          issuer = StrKey.encodeEd25519PublicKey(anum.issuer().ed25519());
          code = trimEnd(anum.assetCode(), '\0');
          return new this(code, issuer);
        default:
          throw new Error("Invalid asset type: ".concat(assetXdr["switch"]().name));
      }
    }
  }, {
    key: "compare",
    value: function compare(assetA, assetB) {
      if (!assetA || !(assetA instanceof Asset)) {
        throw new Error('assetA is invalid');
      }
      if (!assetB || !(assetB instanceof Asset)) {
        throw new Error('assetB is invalid');
      }
      if (assetA.equals(assetB)) {
        return 0;
      }

      // Compare asset types.
      var xdrAtype = assetA.getRawAssetType().value;
      var xdrBtype = assetB.getRawAssetType().value;
      if (xdrAtype !== xdrBtype) {
        return xdrAtype < xdrBtype ? -1 : 1;
      }

      // Compare asset codes.
      var result = asciiCompare(assetA.getCode(), assetB.getCode());
      if (result !== 0) {
        return result;
      }

      // Compare asset issuers.
      return asciiCompare(assetA.getIssuer(), assetB.getIssuer());
    }
  }]);
  return Asset;
}();

/**
 * Compares two ASCII strings in lexographic order with uppercase precedence.
 *
 * @param   {string} a - the first string to compare
 * @param   {string} b - the second
 * @returns {number} like all `compare()`s:
 *     -1 if `a < b`, 0 if `a == b`, and 1 if `a > b`
 *
 * @warning No type-checks are done on the parameters
 */
function asciiCompare(a, b) {
  return asset_Buffer.compare(asset_Buffer.from(a, 'ascii'), asset_Buffer.from(b, 'ascii'));
}
;// CONCATENATED MODULE: ./src/get_liquidity_pool_id.js
/* provided dependency */ var get_liquidity_pool_id_Buffer = __webpack_require__(8764)["Buffer"];




// LiquidityPoolFeeV18 is the default liquidity pool fee in protocol v18. It defaults to 30 base points (0.3%).
var LiquidityPoolFeeV18 = 30;

/**
 * getLiquidityPoolId computes the Pool ID for the given assets, fee and pool type.
 *
 * @see [stellar-core getPoolID](https://github.com/stellar/stellar-core/blob/9f3a48c6a8f1aa77b6043a055d0638661f718080/src/ledger/test/LedgerTxnTests.cpp#L3746-L3751)
 *
 * @export
 * @param {string} liquidityPoolType – A string representing the liquidity pool type.
 * @param {object} liquidityPoolParameters        – The liquidity pool parameters.
 * @param {Asset}  liquidityPoolParameters.assetA – The first asset in the Pool, it must respect the rule assetA < assetB.
 * @param {Asset}  liquidityPoolParameters.assetB – The second asset in the Pool, it must respect the rule assetA < assetB.
 * @param {number} liquidityPoolParameters.fee    – The liquidity pool fee. For now the only fee supported is `30`.
 *
 * @return {Buffer} the raw Pool ID buffer, which can be stringfied with `toString('hex')`
 */
function getLiquidityPoolId(liquidityPoolType) {
  var liquidityPoolParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (liquidityPoolType !== 'constant_product') {
    throw new Error('liquidityPoolType is invalid');
  }
  var assetA = liquidityPoolParameters.assetA,
    assetB = liquidityPoolParameters.assetB,
    fee = liquidityPoolParameters.fee;
  if (!assetA || !(assetA instanceof Asset)) {
    throw new Error('assetA is invalid');
  }
  if (!assetB || !(assetB instanceof Asset)) {
    throw new Error('assetB is invalid');
  }
  if (!fee || fee !== LiquidityPoolFeeV18) {
    throw new Error('fee is invalid');
  }
  if (Asset.compare(assetA, assetB) !== -1) {
    throw new Error('Assets are not in lexicographic order');
  }
  var lpTypeData = src_xdr.LiquidityPoolType.liquidityPoolConstantProduct().toXDR();
  var lpParamsData = new src_xdr.LiquidityPoolConstantProductParameters({
    assetA: assetA.toXDRObject(),
    assetB: assetB.toXDRObject(),
    fee: fee
  }).toXDR();
  var payload = get_liquidity_pool_id_Buffer.concat([lpTypeData, lpParamsData]);
  return hashing_hash(payload);
}
;// CONCATENATED MODULE: ./src/transaction_base.js
/* provided dependency */ var transaction_base_Buffer = __webpack_require__(8764)["Buffer"];
function transaction_base_typeof(obj) { "@babel/helpers - typeof"; return transaction_base_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, transaction_base_typeof(obj); }
function transaction_base_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function transaction_base_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, transaction_base_toPropertyKey(descriptor.key), descriptor); } }
function transaction_base_createClass(Constructor, protoProps, staticProps) { if (protoProps) transaction_base_defineProperties(Constructor.prototype, protoProps); if (staticProps) transaction_base_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function transaction_base_toPropertyKey(arg) { var key = transaction_base_toPrimitive(arg, "string"); return transaction_base_typeof(key) === "symbol" ? key : String(key); }
function transaction_base_toPrimitive(input, hint) { if (transaction_base_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (transaction_base_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/**
 * @ignore
 */
var TransactionBase = /*#__PURE__*/function () {
  function TransactionBase(tx, signatures, fee, networkPassphrase) {
    transaction_base_classCallCheck(this, TransactionBase);
    if (typeof networkPassphrase !== 'string') {
      throw new Error("Invalid passphrase provided to Transaction: expected a string but got a ".concat(transaction_base_typeof(networkPassphrase)));
    }
    this._networkPassphrase = networkPassphrase;
    this._tx = tx;
    this._signatures = signatures;
    this._fee = fee;
  }

  /**
   * @type {Array.<xdr.DecoratedSignature>}
   * @readonly
   */
  transaction_base_createClass(TransactionBase, [{
    key: "signatures",
    get: function get() {
      return this._signatures;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }
  }, {
    key: "tx",
    get: function get() {
      return this._tx;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * @type {string}
     * @readonly
     */
  }, {
    key: "fee",
    get: function get() {
      return this._fee;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * @type {string}
     * @readonly
     */
  }, {
    key: "networkPassphrase",
    get: function get() {
      return this._networkPassphrase;
    },
    set: function set(networkPassphrase) {
      this._networkPassphrase = networkPassphrase;
    }

    /**
     * Signs the transaction with the given {@link Keypair}.
     * @param {...Keypair} keypairs Keypairs of signers
     * @returns {void}
     */
  }, {
    key: "sign",
    value: function sign() {
      var _this = this;
      var txHash = this.hash();
      for (var _len = arguments.length, keypairs = new Array(_len), _key = 0; _key < _len; _key++) {
        keypairs[_key] = arguments[_key];
      }
      keypairs.forEach(function (kp) {
        var sig = kp.signDecorated(txHash);
        _this.signatures.push(sig);
      });
    }

    /**
     * Signs a transaction with the given {@link Keypair}. Useful if someone sends
     * you a transaction XDR for you to sign and return (see
     * [addSignature](#addSignature) for more information).
     *
     * When you get a transaction XDR to sign....
     * - Instantiate a `Transaction` object with the XDR
     * - Use {@link Keypair} to generate a keypair object for your Stellar seed.
     * - Run `getKeypairSignature` with that keypair
     * - Send back the signature along with your publicKey (not your secret seed!)
     *
     * Example:
     * ```javascript
     * // `transactionXDR` is a string from the person generating the transaction
     * const transaction = new Transaction(transactionXDR, networkPassphrase);
     * const keypair = Keypair.fromSecret(myStellarSeed);
     * return transaction.getKeypairSignature(keypair);
     * ```
     *
     * @param {Keypair} keypair Keypair of signer
     * @returns {string} Signature string
     */
  }, {
    key: "getKeypairSignature",
    value: function getKeypairSignature(keypair) {
      return keypair.sign(this.hash()).toString('base64');
    }

    /**
     * Add a signature to the transaction. Useful when a party wants to pre-sign
     * a transaction but doesn't want to give access to their secret keys.
     * This will also verify whether the signature is valid.
     *
     * Here's how you would use this feature to solicit multiple signatures.
     * - Use `TransactionBuilder` to build a new transaction.
     * - Make sure to set a long enough timeout on that transaction to give your
     * signers enough time to sign!
     * - Once you build the transaction, use `transaction.toXDR()` to get the
     * base64-encoded XDR string.
     * - _Warning!_ Once you've built this transaction, don't submit any other
     * transactions onto your account! Doing so will invalidate this pre-compiled
     * transaction!
     * - Send this XDR string to your other parties. They can use the instructions
     * for [getKeypairSignature](#getKeypairSignature) to sign the transaction.
     * - They should send you back their `publicKey` and the `signature` string
     * from [getKeypairSignature](#getKeypairSignature), both of which you pass to
     * this function.
     *
     * @param {string} publicKey The public key of the signer
     * @param {string} signature The base64 value of the signature XDR
     * @returns {void}
     */
  }, {
    key: "addSignature",
    value: function addSignature() {
      var publicKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var signature = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      if (!signature || typeof signature !== 'string') {
        throw new Error('Invalid signature');
      }
      if (!publicKey || typeof publicKey !== 'string') {
        throw new Error('Invalid publicKey');
      }
      var keypair;
      var hint;
      var signatureBuffer = transaction_base_Buffer.from(signature, 'base64');
      try {
        keypair = Keypair.fromPublicKey(publicKey);
        hint = keypair.signatureHint();
      } catch (e) {
        throw new Error('Invalid publicKey');
      }
      if (!keypair.verify(this.hash(), signatureBuffer)) {
        throw new Error('Invalid signature');
      }
      this.signatures.push(new src_xdr.DecoratedSignature({
        hint: hint,
        signature: signatureBuffer
      }));
    }

    /**
     * Add a decorated signature directly to the transaction envelope.
     *
     * @param {xdr.DecoratedSignature} signature    raw signature to add
     * @returns {void}
     *
     * @see Keypair.signDecorated
     * @see Keypair.signPayloadDecorated
     */
  }, {
    key: "addDecoratedSignature",
    value: function addDecoratedSignature(signature) {
      this.signatures.push(signature);
    }

    /**
     * Add `hashX` signer preimage as signature.
     * @param {Buffer|String} preimage Preimage of hash used as signer
     * @returns {void}
     */
  }, {
    key: "signHashX",
    value: function signHashX(preimage) {
      if (typeof preimage === 'string') {
        preimage = transaction_base_Buffer.from(preimage, 'hex');
      }
      if (preimage.length > 64) {
        throw new Error('preimage cannnot be longer than 64 bytes');
      }
      var signature = preimage;
      var hashX = hashing_hash(preimage);
      var hint = hashX.slice(hashX.length - 4);
      this.signatures.push(new src_xdr.DecoratedSignature({
        hint: hint,
        signature: signature
      }));
    }

    /**
     * Returns a hash for this transaction, suitable for signing.
     * @returns {Buffer}
     */
  }, {
    key: "hash",
    value: function hash() {
      return hashing_hash(this.signatureBase());
    }
  }, {
    key: "signatureBase",
    value: function signatureBase() {
      throw new Error('Implement in subclass');
    }
  }, {
    key: "toEnvelope",
    value: function toEnvelope() {
      throw new Error('Implement in subclass');
    }

    /**
     * Get the transaction envelope as a base64-encoded string
     * @returns {string} XDR string
     */
  }, {
    key: "toXDR",
    value: function toXDR() {
      return this.toEnvelope().toXDR().toString('base64');
    }
  }]);
  return TransactionBase;
}();
;// CONCATENATED MODULE: ./src/util/continued_fraction.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


// eslint-disable-next-line no-bitwise
var MAX_INT = (1 << 31 >>> 0) - 1;

/**
 * Calculates and returns the best rational approximation of the given real number.
 * @private
 * @param {string|number|BigNumber} rawNumber Real number
 * @throws Error Throws `Error` when the best rational approximation cannot be found.
 * @returns {array} first element is n (numerator), second element is d (denominator)
 */
function best_r(rawNumber) {
  var number = new bignumber(rawNumber);
  var a;
  var f;
  var fractions = [[new bignumber(0), new bignumber(1)], [new bignumber(1), new bignumber(0)]];
  var i = 2;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (number.gt(MAX_INT)) {
      break;
    }
    a = number.integerValue(bignumber.ROUND_FLOOR);
    f = number.minus(a);
    var h = a.times(fractions[i - 1][0]).plus(fractions[i - 2][0]);
    var k = a.times(fractions[i - 1][1]).plus(fractions[i - 2][1]);
    if (h.gt(MAX_INT) || k.gt(MAX_INT)) {
      break;
    }
    fractions.push([h, k]);
    if (f.eq(0)) {
      break;
    }
    number = new bignumber(1).div(f);
    i += 1;
  }
  var _fractions = _slicedToArray(fractions[fractions.length - 1], 2),
    n = _fractions[0],
    d = _fractions[1];
  if (n.isZero() || d.isZero()) {
    throw new Error("Couldn't find approximation");
  }
  return [n.toNumber(), d.toNumber()];
}
;// CONCATENATED MODULE: ./src/liquidity_pool_asset.js
function liquidity_pool_asset_typeof(obj) { "@babel/helpers - typeof"; return liquidity_pool_asset_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, liquidity_pool_asset_typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = liquidity_pool_asset_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function liquidity_pool_asset_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function liquidity_pool_asset_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, liquidity_pool_asset_toPropertyKey(descriptor.key), descriptor); } }
function liquidity_pool_asset_createClass(Constructor, protoProps, staticProps) { if (protoProps) liquidity_pool_asset_defineProperties(Constructor.prototype, protoProps); if (staticProps) liquidity_pool_asset_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function liquidity_pool_asset_toPropertyKey(arg) { var key = liquidity_pool_asset_toPrimitive(arg, "string"); return liquidity_pool_asset_typeof(key) === "symbol" ? key : String(key); }
function liquidity_pool_asset_toPrimitive(input, hint) { if (liquidity_pool_asset_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (liquidity_pool_asset_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/**
 * LiquidityPoolAsset class represents a liquidity pool trustline change.
 *
 * @constructor
 * @param {Asset} assetA – The first asset in the Pool, it must respect the rule assetA < assetB. See {@link Asset.compare} for more details on how assets are sorted.
 * @param {Asset} assetB – The second asset in the Pool, it must respect the rule assetA < assetB. See {@link Asset.compare} for more details on how assets are sorted.
 * @param {number} fee – The liquidity pool fee. For now the only fee supported is `30`.
 */
var LiquidityPoolAsset = /*#__PURE__*/function () {
  function LiquidityPoolAsset(assetA, assetB, fee) {
    liquidity_pool_asset_classCallCheck(this, LiquidityPoolAsset);
    if (!assetA || !(assetA instanceof Asset)) {
      throw new Error('assetA is invalid');
    }
    if (!assetB || !(assetB instanceof Asset)) {
      throw new Error('assetB is invalid');
    }
    if (Asset.compare(assetA, assetB) !== -1) {
      throw new Error('Assets are not in lexicographic order');
    }
    if (!fee || fee !== LiquidityPoolFeeV18) {
      throw new Error('fee is invalid');
    }
    this.assetA = assetA;
    this.assetB = assetB;
    this.fee = fee;
  }

  /**
   * Returns a liquidity pool asset object from its XDR ChangeTrustAsset object
   * representation.
   * @param {xdr.ChangeTrustAsset} ctAssetXdr - The asset XDR object.
   * @returns {LiquidityPoolAsset}
   */
  liquidity_pool_asset_createClass(LiquidityPoolAsset, [{
    key: "toXDRObject",
    value:
    /**
     * Returns the `xdr.ChangeTrustAsset` object for this liquidity pool asset.
     *
     * Note: To convert from an {@link Asset `Asset`} to `xdr.ChangeTrustAsset`
     * please refer to the
     * {@link Asset.toChangeTrustXDRObject `Asset.toChangeTrustXDRObject`} method.
     *
     * @returns {xdr.ChangeTrustAsset} XDR ChangeTrustAsset object.
     */
    function toXDRObject() {
      var lpConstantProductParamsXdr = new src_xdr.LiquidityPoolConstantProductParameters({
        assetA: this.assetA.toXDRObject(),
        assetB: this.assetB.toXDRObject(),
        fee: this.fee
      });
      var lpParamsXdr = new src_xdr.LiquidityPoolParameters('liquidityPoolConstantProduct', lpConstantProductParamsXdr);
      return new src_xdr.ChangeTrustAsset('assetTypePoolShare', lpParamsXdr);
    }

    /**
     * @returns {LiquidityPoolParameters} Liquidity pool parameters.
     */
  }, {
    key: "getLiquidityPoolParameters",
    value: function getLiquidityPoolParameters() {
      return _objectSpread(_objectSpread({}, this), {}, {
        assetA: this.assetA,
        assetB: this.assetB,
        fee: this.fee
      });
    }

    /**
     * @see [Assets concept](https://developers.stellar.org/docs/glossary/assets/)
     * @returns {AssetType.liquidityPoolShares} asset type. Can only be `liquidity_pool_shares`.
     */
  }, {
    key: "getAssetType",
    value: function getAssetType() {
      return 'liquidity_pool_shares';
    }

    /**
     * @param {LiquidityPoolAsset} other the LiquidityPoolAsset to compare
     * @returns {boolean} `true` if this asset equals the given asset.
     */
  }, {
    key: "equals",
    value: function equals(other) {
      return this.assetA.equals(other.assetA) && this.assetB.equals(other.assetB) && this.fee === other.fee;
    }
  }, {
    key: "toString",
    value: function toString() {
      var poolId = getLiquidityPoolId('constant_product', this.getLiquidityPoolParameters()).toString('hex');
      return "liquidity_pool:".concat(poolId);
    }
  }], [{
    key: "fromOperation",
    value: function fromOperation(ctAssetXdr) {
      var assetType = ctAssetXdr["switch"]();
      if (assetType === src_xdr.AssetType.assetTypePoolShare()) {
        var liquidityPoolParameters = ctAssetXdr.liquidityPool().constantProduct();
        return new this(Asset.fromOperation(liquidityPoolParameters.assetA()), Asset.fromOperation(liquidityPoolParameters.assetB()), liquidityPoolParameters.fee());
      }
      throw new Error("Invalid asset type: ".concat(assetType.name));
    }
  }]);
  return LiquidityPoolAsset;
}();
;// CONCATENATED MODULE: ./src/claimant.js
function claimant_typeof(obj) { "@babel/helpers - typeof"; return claimant_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, claimant_typeof(obj); }
function claimant_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function claimant_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, claimant_toPropertyKey(descriptor.key), descriptor); } }
function claimant_createClass(Constructor, protoProps, staticProps) { if (protoProps) claimant_defineProperties(Constructor.prototype, protoProps); if (staticProps) claimant_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function claimant_toPropertyKey(arg) { var key = claimant_toPrimitive(arg, "string"); return claimant_typeof(key) === "symbol" ? key : String(key); }
function claimant_toPrimitive(input, hint) { if (claimant_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (claimant_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/**
 * Claimant class represents an xdr.Claimant
 *
 * The claim predicate is optional, it defaults to unconditional if none is specified.
 *
 * @constructor
 * @param {string} destination - The destination account ID.
 * @param {xdr.ClaimPredicate} [predicate] - The claim predicate.
 */
var Claimant = /*#__PURE__*/function () {
  function Claimant(destination, predicate) {
    claimant_classCallCheck(this, Claimant);
    if (destination && !StrKey.isValidEd25519PublicKey(destination)) {
      throw new Error('Destination is invalid');
    }
    this._destination = destination;
    if (!predicate) {
      this._predicate = src_xdr.ClaimPredicate.claimPredicateUnconditional();
    } else if (predicate instanceof src_xdr.ClaimPredicate) {
      this._predicate = predicate;
    } else {
      throw new Error('Predicate should be an xdr.ClaimPredicate');
    }
  }

  /**
   * Returns an unconditional claim predicate
   * @Return {xdr.ClaimPredicate}
   */
  claimant_createClass(Claimant, [{
    key: "toXDRObject",
    value:
    /**
     * Returns the xdr object for this claimant.
     * @returns {xdr.Claimant} XDR Claimant object
     */
    function toXDRObject() {
      var claimant = new src_xdr.ClaimantV0({
        destination: Keypair.fromPublicKey(this._destination).xdrAccountId(),
        predicate: this._predicate
      });
      return src_xdr.Claimant.claimantTypeV0(claimant);
    }

    /**
     * @type {string}
     * @readonly
     */
  }, {
    key: "destination",
    get: function get() {
      return this._destination;
    },
    set: function set(value) {
      throw new Error('Claimant is immutable');
    }

    /**
     * @type {xdr.ClaimPredicate}
     * @readonly
     */
  }, {
    key: "predicate",
    get: function get() {
      return this._predicate;
    },
    set: function set(value) {
      throw new Error('Claimant is immutable');
    }
  }], [{
    key: "predicateUnconditional",
    value: function predicateUnconditional() {
      return src_xdr.ClaimPredicate.claimPredicateUnconditional();
    }

    /**
     * Returns an `and` claim predicate
     * @param {xdr.ClaimPredicate} left an xdr.ClaimPredicate
     * @param {xdr.ClaimPredicate} right an xdr.ClaimPredicate
     * @Return {xdr.ClaimPredicate}
     */
  }, {
    key: "predicateAnd",
    value: function predicateAnd(left, right) {
      if (!(left instanceof src_xdr.ClaimPredicate)) {
        throw new Error('left Predicate should be an xdr.ClaimPredicate');
      }
      if (!(right instanceof src_xdr.ClaimPredicate)) {
        throw new Error('right Predicate should be an xdr.ClaimPredicate');
      }
      return src_xdr.ClaimPredicate.claimPredicateAnd([left, right]);
    }

    /**
     * Returns an `or` claim predicate
     * @param {xdr.ClaimPredicate} left an xdr.ClaimPredicate
     * @param {xdr.ClaimPredicate} right an xdr.ClaimPredicate
     * @Return {xdr.ClaimPredicate}
     */
  }, {
    key: "predicateOr",
    value: function predicateOr(left, right) {
      if (!(left instanceof src_xdr.ClaimPredicate)) {
        throw new Error('left Predicate should be an xdr.ClaimPredicate');
      }
      if (!(right instanceof src_xdr.ClaimPredicate)) {
        throw new Error('right Predicate should be an xdr.ClaimPredicate');
      }
      return src_xdr.ClaimPredicate.claimPredicateOr([left, right]);
    }

    /**
     * Returns a `not` claim predicate
     * @param {xdr.ClaimPredicate} predicate an xdr.ClaimPredicate
     * @Return {xdr.ClaimPredicate}
     */
  }, {
    key: "predicateNot",
    value: function predicateNot(predicate) {
      if (!(predicate instanceof src_xdr.ClaimPredicate)) {
        throw new Error('right Predicate should be an xdr.ClaimPredicate');
      }
      return src_xdr.ClaimPredicate.claimPredicateNot(predicate);
    }

    /**
     * Returns a `BeforeAbsoluteTime` claim predicate
     *
     * This predicate will be fulfilled if the closing time of the ledger that
     * includes the CreateClaimableBalance operation is less than this (absolute)
     * Unix timestamp (expressed in seconds).
     *
     * @param {string} absBefore Unix epoch (in seconds) as a string
     * @Return {xdr.ClaimPredicate}
     */
  }, {
    key: "predicateBeforeAbsoluteTime",
    value: function predicateBeforeAbsoluteTime(absBefore) {
      return src_xdr.ClaimPredicate.claimPredicateBeforeAbsoluteTime(src_xdr.Int64.fromString(absBefore));
    }

    /**
     * Returns a `BeforeRelativeTime` claim predicate
     *
     * This predicate will be fulfilled if the closing time of the ledger that
     * includes the CreateClaimableBalance operation plus this relative time delta
     * (in seconds) is less than the current time.
     *
     * @param {strings} seconds seconds since closeTime of the ledger in which the ClaimableBalanceEntry was created (as string)
     * @Return {xdr.ClaimPredicate}
     */
  }, {
    key: "predicateBeforeRelativeTime",
    value: function predicateBeforeRelativeTime(seconds) {
      return src_xdr.ClaimPredicate.claimPredicateBeforeRelativeTime(src_xdr.Int64.fromString(seconds));
    }

    /**
     * Returns a claimant object from its XDR object representation.
     * @param {xdr.Claimant} claimantXdr - The claimant xdr object.
     * @returns {Claimant}
     */
  }, {
    key: "fromXDR",
    value: function fromXDR(claimantXdr) {
      var value;
      switch (claimantXdr["switch"]()) {
        case src_xdr.ClaimantType.claimantTypeV0():
          value = claimantXdr.v0();
          return new this(StrKey.encodeEd25519PublicKey(value.destination().ed25519()), value.predicate());
        default:
          throw new Error("Invalid claimant type: ".concat(claimantXdr["switch"]().name));
      }
    }
  }]);
  return Claimant;
}();
;// CONCATENATED MODULE: ./src/liquidity_pool_id.js
function liquidity_pool_id_typeof(obj) { "@babel/helpers - typeof"; return liquidity_pool_id_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, liquidity_pool_id_typeof(obj); }
function liquidity_pool_id_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function liquidity_pool_id_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, liquidity_pool_id_toPropertyKey(descriptor.key), descriptor); } }
function liquidity_pool_id_createClass(Constructor, protoProps, staticProps) { if (protoProps) liquidity_pool_id_defineProperties(Constructor.prototype, protoProps); if (staticProps) liquidity_pool_id_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function liquidity_pool_id_toPropertyKey(arg) { var key = liquidity_pool_id_toPrimitive(arg, "string"); return liquidity_pool_id_typeof(key) === "symbol" ? key : String(key); }
function liquidity_pool_id_toPrimitive(input, hint) { if (liquidity_pool_id_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (liquidity_pool_id_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


/**
 * LiquidityPoolId class represents the asset referenced by a trustline to a
 * liquidity pool.
 *
 * @constructor
 * @param {string} liquidityPoolId - The ID of the liquidity pool in string 'hex'.
 */
var LiquidityPoolId = /*#__PURE__*/function () {
  function LiquidityPoolId(liquidityPoolId) {
    liquidity_pool_id_classCallCheck(this, LiquidityPoolId);
    if (!liquidityPoolId) {
      throw new Error('liquidityPoolId cannot be empty');
    }
    if (!/^[a-f0-9]{64}$/.test(liquidityPoolId)) {
      throw new Error('Liquidity pool ID is not a valid hash');
    }
    this.liquidityPoolId = liquidityPoolId;
  }

  /**
   * Returns a liquidity pool ID object from its xdr.TrustLineAsset representation.
   * @param {xdr.TrustLineAsset} tlAssetXdr - The asset XDR object.
   * @returns {LiquidityPoolId}
   */
  liquidity_pool_id_createClass(LiquidityPoolId, [{
    key: "toXDRObject",
    value:
    /**
     * Returns the `xdr.TrustLineAsset` object for this liquidity pool ID.
     *
     * Note: To convert from {@link Asset `Asset`} to `xdr.TrustLineAsset` please
     * refer to the
     * {@link Asset.toTrustLineXDRObject `Asset.toTrustLineXDRObject`} method.
     *
     * @returns {xdr.TrustLineAsset} XDR LiquidityPoolId object
     */
    function toXDRObject() {
      var xdrPoolId = src_xdr.PoolId.fromXDR(this.liquidityPoolId, 'hex');
      return new src_xdr.TrustLineAsset('assetTypePoolShare', xdrPoolId);
    }

    /**
     * @returns {string} Liquidity pool ID.
     */
  }, {
    key: "getLiquidityPoolId",
    value: function getLiquidityPoolId() {
      return String(this.liquidityPoolId);
    }

    /**
     * @see [Assets concept](https://developers.stellar.org/docs/glossary/assets/)
     * @returns {AssetType.liquidityPoolShares} asset type. Can only be `liquidity_pool_shares`.
     */
  }, {
    key: "getAssetType",
    value: function getAssetType() {
      return 'liquidity_pool_shares';
    }

    /**
     * @param {LiquidityPoolId} asset LiquidityPoolId to compare.
     * @returns {boolean} `true` if this asset equals the given asset.
     */
  }, {
    key: "equals",
    value: function equals(asset) {
      return this.liquidityPoolId === asset.getLiquidityPoolId();
    }
  }, {
    key: "toString",
    value: function toString() {
      return "liquidity_pool:".concat(this.liquidityPoolId);
    }
  }], [{
    key: "fromOperation",
    value: function fromOperation(tlAssetXdr) {
      var assetType = tlAssetXdr["switch"]();
      if (assetType === src_xdr.AssetType.assetTypePoolShare()) {
        var liquidityPoolId = tlAssetXdr.liquidityPoolId().toString('hex');
        return new this(liquidityPoolId);
      }
      throw new Error("Invalid asset type: ".concat(assetType.name));
    }
  }]);
  return LiquidityPoolId;
}();
;// CONCATENATED MODULE: ./src/operations/manage_sell_offer.js


/**
 * Returns a XDR ManageSellOfferOp. A "manage sell offer" operation creates, updates, or
 * deletes an offer.
 * @function
 * @alias Operation.manageSellOffer
 * @param {object} opts Options object
 * @param {Asset} opts.selling - What you're selling.
 * @param {Asset} opts.buying - What you're buying.
 * @param {string} opts.amount - The total amount you're selling. If 0, deletes the offer.
 * @param {number|string|BigNumber|Object} opts.price - Price of 1 unit of `selling` in terms of `buying`.
 * @param {number} opts.price.n - If `opts.price` is an object: the price numerator
 * @param {number} opts.price.d - If `opts.price` is an object: the price denominator
 * @param {number|string} [opts.offerId ] - If `0`, will create a new offer (default). Otherwise, edits an exisiting offer.
 * @param {string} [opts.source] - The source account (defaults to transaction source).
 * @throws {Error} Throws `Error` when the best rational approximation of `price` cannot be found.
 * @returns {xdr.ManageSellOfferOp} Manage Sell Offer operation
 */
function manageSellOffer(opts) {
  var attributes = {};
  attributes.selling = opts.selling.toXDRObject();
  attributes.buying = opts.buying.toXDRObject();
  if (!this.isValidAmount(opts.amount, true)) {
    throw new TypeError(this.constructAmountRequirementsError('amount'));
  }
  attributes.amount = this._toXDRAmount(opts.amount);
  if (opts.price === undefined) {
    throw new TypeError('price argument is required');
  }
  attributes.price = this._toXDRPrice(opts.price);
  if (opts.offerId !== undefined) {
    opts.offerId = opts.offerId.toString();
  } else {
    opts.offerId = '0';
  }
  attributes.offerId = xdr.Hyper.fromString(opts.offerId);
  var manageSellOfferOp = new src_xdr.ManageSellOfferOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.manageSellOffer(manageSellOfferOp);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/create_passive_sell_offer.js


/**
 * Returns a XDR CreatePasiveSellOfferOp. A "create passive offer" operation creates an
 * offer that won't consume a counter offer that exactly matches this offer. This is
 * useful for offers just used as 1:1 exchanges for path payments. Use manage offer
 * to manage this offer after using this operation to create it.
 * @function
 * @alias Operation.createPassiveSellOffer
 * @param {object} opts Options object
 * @param {Asset} opts.selling - What you're selling.
 * @param {Asset} opts.buying - What you're buying.
 * @param {string} opts.amount - The total amount you're selling. If 0, deletes the offer.
 * @param {number|string|BigNumber|Object} opts.price - Price of 1 unit of `selling` in terms of `buying`.
 * @param {number} opts.price.n - If `opts.price` is an object: the price numerator
 * @param {number} opts.price.d - If `opts.price` is an object: the price denominator
 * @param {string} [opts.source] - The source account (defaults to transaction source).
 * @throws {Error} Throws `Error` when the best rational approximation of `price` cannot be found.
 * @returns {xdr.CreatePassiveSellOfferOp} Create Passive Sell Offer operation
 */
function createPassiveSellOffer(opts) {
  var attributes = {};
  attributes.selling = opts.selling.toXDRObject();
  attributes.buying = opts.buying.toXDRObject();
  if (!this.isValidAmount(opts.amount)) {
    throw new TypeError(this.constructAmountRequirementsError('amount'));
  }
  attributes.amount = this._toXDRAmount(opts.amount);
  if (opts.price === undefined) {
    throw new TypeError('price argument is required');
  }
  attributes.price = this._toXDRPrice(opts.price);
  var createPassiveSellOfferOp = new src_xdr.CreatePassiveSellOfferOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.createPassiveSellOffer(createPassiveSellOfferOp);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/util/decode_encode_muxed_account.js
/* provided dependency */ var decode_encode_muxed_account_Buffer = __webpack_require__(8764)["Buffer"];



/**
 * Converts a Stellar address (in G... or M... form) to an `xdr.MuxedAccount`
 * structure, using the ed25519 representation when possible.
 *
 * This supports full muxed accounts, where an `M...` address will resolve to
 * both its underlying `G...` address and an integer ID.
 *
 * @param   {string}  address   G... or M... address to encode into XDR
 * @returns {xdr.MuxedAccount}  a muxed account object for this address string
 */
function decodeAddressToMuxedAccount(address) {
  if (StrKey.isValidMed25519PublicKey(address)) {
    return _decodeAddressFullyToMuxedAccount(address);
  }
  return src_xdr.MuxedAccount.keyTypeEd25519(StrKey.decodeEd25519PublicKey(address));
}

/**
 * Converts an xdr.MuxedAccount to its StrKey representation.
 *
 * This returns its "M..." string representation if there is a muxing ID within
 * the object and returns the "G..." representation otherwise.
 *
 * @param   {xdr.MuxedAccount} muxedAccount   Raw account to stringify
 * @returns {string} Stringified G... (corresponding to the underlying pubkey)
 *     or M... address (corresponding to both the key and the muxed ID)
 *
 * @see https://stellar.org/protocol/sep-23
 */
function encodeMuxedAccountToAddress(muxedAccount) {
  if (muxedAccount["switch"]().value === src_xdr.CryptoKeyType.keyTypeMuxedEd25519().value) {
    return _encodeMuxedAccountFullyToAddress(muxedAccount);
  }
  return StrKey.encodeEd25519PublicKey(muxedAccount.ed25519());
}

/**
 * Transform a Stellar address (G...) and an ID into its XDR representation.
 *
 * @param  {string} address   - a Stellar G... address
 * @param  {string} id        - a Uint64 ID represented as a string
 *
 * @return {xdr.MuxedAccount} - XDR representation of the above muxed account
 */
function encodeMuxedAccount(address, id) {
  if (!StrKey.isValidEd25519PublicKey(address)) {
    throw new Error('address should be a Stellar account ID (G...)');
  }
  if (typeof id !== 'string') {
    throw new Error('id should be a string representing a number (uint64)');
  }
  return src_xdr.MuxedAccount.keyTypeMuxedEd25519(new src_xdr.MuxedAccountMed25519({
    id: src_xdr.Uint64.fromString(id),
    ed25519: StrKey.decodeEd25519PublicKey(address)
  }));
}

/**
 * Extracts the underlying base (G...) address from an M-address.
 * @param  {string} address   an account address (either M... or G...)
 * @return {string} a Stellar public key address (G...)
 */
function extractBaseAddress(address) {
  if (StrKey.isValidEd25519PublicKey(address)) {
    return address;
  }
  if (!StrKey.isValidMed25519PublicKey(address)) {
    throw new TypeError("expected muxed account (M...), got ".concat(address));
  }
  var muxedAccount = decodeAddressToMuxedAccount(address);
  return StrKey.encodeEd25519PublicKey(muxedAccount.med25519().ed25519());
}

// Decodes an "M..." account ID into its MuxedAccount object representation.
function _decodeAddressFullyToMuxedAccount(address) {
  var rawBytes = StrKey.decodeMed25519PublicKey(address);

  // Decoding M... addresses cannot be done through a simple
  // MuxedAccountMed25519.fromXDR() call, because the definition is:
  //
  //    constructor(attributes: { id: Uint64; ed25519: Buffer });
  //
  // Note the ID is the first attribute. However, the ID comes *last* in the
  // stringified (base32-encoded) address itself (it's the last 8-byte suffix).
  // The `fromXDR()` method interprets bytes in order, so we need to parse out
  // the raw binary into its requisite parts, i.e. use the MuxedAccountMed25519
  // constructor directly.
  //
  // Refer to https://github.com/stellar/go/blob/master/xdr/muxed_account.go#L26
  // for the Golang implementation of the M... parsing.
  return src_xdr.MuxedAccount.keyTypeMuxedEd25519(new src_xdr.MuxedAccountMed25519({
    id: src_xdr.Uint64.fromXDR(rawBytes.subarray(-8)),
    ed25519: rawBytes.subarray(0, -8)
  }));
}

// Converts an xdr.MuxedAccount into its *true* "M..." string representation.
function _encodeMuxedAccountFullyToAddress(muxedAccount) {
  if (muxedAccount["switch"]() === src_xdr.CryptoKeyType.keyTypeEd25519()) {
    return encodeMuxedAccountToAddress(muxedAccount);
  }
  var muxed = muxedAccount.med25519();
  return StrKey.encodeMed25519PublicKey(decode_encode_muxed_account_Buffer.concat([muxed.ed25519(), muxed.id().toXDR('raw')]));
}
;// CONCATENATED MODULE: ./src/operations/account_merge.js



/**
 * Transfers native balance to destination account.
 *
 * @function
 * @alias Operation.accountMerge
 *
 * @param {object} opts - options object
 * @param {string} opts.destination - destination to merge the source account into
 * @param {string} [opts.source]    - operation source account (defaults to
 *     transaction source)
 *
 * @returns {xdr.Operation} an Account Merge operation (xdr.AccountMergeOp)
 */
function accountMerge(opts) {
  var opAttributes = {};
  try {
    opAttributes.body = src_xdr.OperationBody.accountMerge(decodeAddressToMuxedAccount(opts.destination));
  } catch (e) {
    throw new Error('destination is invalid');
  }
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/allow_trust.js




/**
 * @deprecated since v5.0
 *
 * Returns an XDR AllowTrustOp. An "allow trust" operation authorizes another
 * account to hold your account's credit for a given asset.
 *
 * @function
 * @alias Operation.allowTrust
 *
 * @param {object} opts Options object
 * @param {string} opts.trustor - The trusting account (the one being authorized)
 * @param {string} opts.assetCode - The asset code being authorized.
 * @param {(0|1|2)} opts.authorize - `1` to authorize, `2` to authorize to maintain liabilities, and `0` to deauthorize.
 * @param {string} [opts.source] - The source account (defaults to transaction source).
 *
 * @returns {xdr.AllowTrustOp} Allow Trust operation
 */
function allowTrust(opts) {
  if (!StrKey.isValidEd25519PublicKey(opts.trustor)) {
    throw new Error('trustor is invalid');
  }
  var attributes = {};
  attributes.trustor = Keypair.fromPublicKey(opts.trustor).xdrAccountId();
  if (opts.assetCode.length <= 4) {
    var code = opts.assetCode.padEnd(4, '\0');
    attributes.asset = src_xdr.AssetCode.assetTypeCreditAlphanum4(code);
  } else if (opts.assetCode.length <= 12) {
    var _code = opts.assetCode.padEnd(12, '\0');
    attributes.asset = src_xdr.AssetCode.assetTypeCreditAlphanum12(_code);
  } else {
    throw new Error('Asset code must be 12 characters at max.');
  }
  if (typeof opts.authorize === 'boolean') {
    if (opts.authorize) {
      attributes.authorize = src_xdr.TrustLineFlags.authorizedFlag().value;
    } else {
      attributes.authorize = 0;
    }
  } else {
    attributes.authorize = opts.authorize;
  }
  var allowTrustOp = new src_xdr.AllowTrustOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.allowTrust(allowTrustOp);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/bump_sequence.js




/**
 * This operation bumps sequence number.
 * @function
 * @alias Operation.bumpSequence
 * @param {object} opts Options object
 * @param {string} opts.bumpTo - Sequence number to bump to.
 * @param {string} [opts.source] - The optional source account.
 * @returns {xdr.BumpSequenceOp} Operation
 */
function bumpSequence(opts) {
  var attributes = {};
  if (typeof opts.bumpTo !== 'string') {
    throw new Error('bumpTo must be a string');
  }
  try {
    // eslint-disable-next-line no-new
    new bignumber(opts.bumpTo);
  } catch (e) {
    throw new Error('bumpTo must be a stringified number');
  }
  attributes.bumpTo = xdr.Hyper.fromString(opts.bumpTo);
  var bumpSequenceOp = new src_xdr.BumpSequenceOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.bumpSequence(bumpSequenceOp);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/change_trust.js





var MAX_INT64 = '9223372036854775807';

/**
 * Returns an XDR ChangeTrustOp. A "change trust" operation adds, removes, or updates a
 * trust line for a given asset from the source account to another.
 * @function
 * @alias Operation.changeTrust
 * @param {object} opts Options object
 * @param {Asset | LiquidityPoolAsset} opts.asset - The asset for the trust line.
 * @param {string} [opts.limit] - The limit for the asset, defaults to max int64.
 *                                If the limit is set to "0" it deletes the trustline.
 * @param {string} [opts.source] - The source account (defaults to transaction source).
 * @returns {xdr.ChangeTrustOp} Change Trust operation
 */
function changeTrust(opts) {
  var attributes = {};
  if (opts.asset instanceof Asset) {
    attributes.line = opts.asset.toChangeTrustXDRObject();
  } else if (opts.asset instanceof LiquidityPoolAsset) {
    attributes.line = opts.asset.toXDRObject();
  } else {
    throw new TypeError('asset must be Asset or LiquidityPoolAsset');
  }
  if (opts.limit !== undefined && !this.isValidAmount(opts.limit, true)) {
    throw new TypeError(this.constructAmountRequirementsError('limit'));
  }
  if (opts.limit) {
    attributes.limit = this._toXDRAmount(opts.limit);
  } else {
    attributes.limit = xdr.Hyper.fromString(new bignumber(MAX_INT64).toString());
  }
  if (opts.source) {
    attributes.source = opts.source.masterKeypair;
  }
  var changeTrustOP = new src_xdr.ChangeTrustOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.changeTrust(changeTrustOP);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/create_account.js




/**
 * Create and fund a non existent account.
 * @function
 * @alias Operation.createAccount
 * @param {object} opts Options object
 * @param {string} opts.destination - Destination account ID to create an account for.
 * @param {string} opts.startingBalance - Amount in XLM the account should be funded for. Must be greater
 *                                   than the [reserve balance amount](https://developers.stellar.org/docs/glossary/fees/).
 * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
 * @returns {xdr.CreateAccountOp} Create account operation
 */
function createAccount(opts) {
  if (!StrKey.isValidEd25519PublicKey(opts.destination)) {
    throw new Error('destination is invalid');
  }
  if (!this.isValidAmount(opts.startingBalance, true)) {
    throw new TypeError('startingBalance must be of type String, represent a non-negative number and have at most 7 digits after the decimal');
  }
  var attributes = {};
  attributes.destination = Keypair.fromPublicKey(opts.destination).xdrAccountId();
  attributes.startingBalance = this._toXDRAmount(opts.startingBalance);
  var createAccountOp = new src_xdr.CreateAccountOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.createAccount(createAccountOp);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/create_claimable_balance.js



/**
 * Create a new claimable balance operation.
 *
 * @function
 * @alias Operation.createClaimableBalance
 *
 * @param {object} opts Options object
 * @param {Asset} opts.asset - The asset for the claimable balance.
 * @param {string} opts.amount - Amount.
 * @param {Claimant[]} opts.claimants - An array of Claimants
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 *
 * @returns {xdr.Operation} Create claimable balance operation
 *
 * @example
 * const asset = new Asset(
 *   'USD',
 *   'GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7'
 * );
 * const amount = '100.0000000';
 * const claimants = [
 *   new Claimant(
 *     'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ',
 *      Claimant.predicateBeforeAbsoluteTime("4102444800000")
 *   )
 * ];
 *
 * const op = Operation.createClaimableBalance({
 *   asset,
 *   amount,
 *   claimants
 * });
 *
 */
function createClaimableBalance(opts) {
  if (!(opts.asset instanceof Asset)) {
    throw new Error('must provide an asset for create claimable balance operation');
  }
  if (!this.isValidAmount(opts.amount)) {
    throw new TypeError(this.constructAmountRequirementsError('amount'));
  }
  if (!Array.isArray(opts.claimants) || opts.claimants.length === 0) {
    throw new Error('must provide at least one claimant');
  }
  var attributes = {};
  attributes.asset = opts.asset.toXDRObject();
  attributes.amount = this._toXDRAmount(opts.amount);
  attributes.claimants = Object.values(opts.claimants).map(function (c) {
    return c.toXDRObject();
  });
  var createClaimableBalanceOp = new src_xdr.CreateClaimableBalanceOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.createClaimableBalance(createClaimableBalanceOp);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/claim_claimable_balance.js


/**
 * Create a new claim claimable balance operation.
 * @function
 * @alias Operation.claimClaimableBalance
 * @param {object} opts Options object
 * @param {string} opts.balanceId - The claimable balance id to be claimed.
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 * @returns {xdr.Operation} Claim claimable balance operation
 *
 * @example
 * const op = Operation.claimClaimableBalance({
 *   balanceId: '00000000da0d57da7d4850e7fc10d2a9d0ebc731f7afb40574c03395b17d49149b91f5be',
 * });
 *
 */
function claimClaimableBalance() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  validateClaimableBalanceId(opts.balanceId);
  var attributes = {};
  attributes.balanceId = src_xdr.ClaimableBalanceId.fromXDR(opts.balanceId, 'hex');
  var claimClaimableBalanceOp = new src_xdr.ClaimClaimableBalanceOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.claimClaimableBalance(claimClaimableBalanceOp);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
function validateClaimableBalanceId(balanceId) {
  if (typeof balanceId !== 'string' || balanceId.length !== 8 + 64 /* 8b discriminant + 64b string */) {
    throw new Error('must provide a valid claimable balance id');
  }
}
;// CONCATENATED MODULE: ./src/operations/clawback_claimable_balance.js



/**
 * Creates a clawback operation for a claimable balance.
 *
 * @function
 * @alias Operation.clawbackClaimableBalance
 * @param {object} opts - Options object
 * @param {string} opts.balanceId - The claimable balance ID to be clawed back.
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 *
 * @return {xdr.ClawbackClaimableBalanceOp}
 *
 * @example
 * const op = Operation.clawbackClaimableBalance({
 *   balanceId: '00000000da0d57da7d4850e7fc10d2a9d0ebc731f7afb40574c03395b17d49149b91f5be',
 * });
 *
 * @link https://github.com/stellar/stellar-protocol/blob/master/core/cap-0035.md#clawback-claimable-balance-operation
 */
function clawbackClaimableBalance() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  validateClaimableBalanceId(opts.balanceId);
  var attributes = {
    balanceId: src_xdr.ClaimableBalanceId.fromXDR(opts.balanceId, 'hex')
  };
  var opAttributes = {
    body: src_xdr.OperationBody.clawbackClaimableBalance(new src_xdr.ClawbackClaimableBalanceOp(attributes))
  };
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/inflation.js


/**
 * This operation generates the inflation.
 * @function
 * @alias Operation.inflation
 * @param {object} [opts] Options object
 * @param {string} [opts.source] - The optional source account.
 * @returns {xdr.InflationOp} Inflation operation
 */
function inflation() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.inflation();
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/manage_data.js
/* provided dependency */ var manage_data_Buffer = __webpack_require__(8764)["Buffer"];


/**
 * This operation adds data entry to the ledger.
 * @function
 * @alias Operation.manageData
 * @param {object} opts Options object
 * @param {string} opts.name - The name of the data entry.
 * @param {string|Buffer} opts.value - The value of the data entry.
 * @param {string} [opts.source] - The optional source account.
 * @returns {xdr.ManageDataOp} Manage Data operation
 */
function manageData(opts) {
  var attributes = {};
  if (!(typeof opts.name === 'string' && opts.name.length <= 64)) {
    throw new Error('name must be a string, up to 64 characters');
  }
  attributes.dataName = opts.name;
  if (typeof opts.value !== 'string' && !manage_data_Buffer.isBuffer(opts.value) && opts.value !== null) {
    throw new Error('value must be a string, Buffer or null');
  }
  if (typeof opts.value === 'string') {
    attributes.dataValue = manage_data_Buffer.from(opts.value);
  } else {
    attributes.dataValue = opts.value;
  }
  if (attributes.dataValue !== null && attributes.dataValue.length > 64) {
    throw new Error('value cannot be longer that 64 bytes');
  }
  var manageDataOp = new src_xdr.ManageDataOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.manageData(manageDataOp);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/manage_buy_offer.js


/**
 * Returns a XDR ManageBuyOfferOp. A "manage buy offer" operation creates, updates, or
 * deletes a buy offer.
 * @function
 * @alias Operation.manageBuyOffer
 * @param {object} opts Options object
 * @param {Asset} opts.selling - What you're selling.
 * @param {Asset} opts.buying - What you're buying.
 * @param {string} opts.buyAmount - The total amount you're buying. If 0, deletes the offer.
 * @param {number|string|BigNumber|Object} opts.price - Price of 1 unit of `buying` in terms of `selling`.
 * @param {number} opts.price.n - If `opts.price` is an object: the price numerator
 * @param {number} opts.price.d - If `opts.price` is an object: the price denominator
 * @param {number|string} [opts.offerId ] - If `0`, will create a new offer (default). Otherwise, edits an exisiting offer.
 * @param {string} [opts.source] - The source account (defaults to transaction source).
 * @throws {Error} Throws `Error` when the best rational approximation of `price` cannot be found.
 * @returns {xdr.ManageBuyOfferOp} Manage Buy Offer operation
 */
function manageBuyOffer(opts) {
  var attributes = {};
  attributes.selling = opts.selling.toXDRObject();
  attributes.buying = opts.buying.toXDRObject();
  if (!this.isValidAmount(opts.buyAmount, true)) {
    throw new TypeError(this.constructAmountRequirementsError('buyAmount'));
  }
  attributes.buyAmount = this._toXDRAmount(opts.buyAmount);
  if (opts.price === undefined) {
    throw new TypeError('price argument is required');
  }
  attributes.price = this._toXDRPrice(opts.price);
  if (opts.offerId !== undefined) {
    opts.offerId = opts.offerId.toString();
  } else {
    opts.offerId = '0';
  }
  attributes.offerId = xdr.Hyper.fromString(opts.offerId);
  var manageBuyOfferOp = new src_xdr.ManageBuyOfferOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.manageBuyOffer(manageBuyOfferOp);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/path_payment_strict_receive.js



/**
 * Creates a PathPaymentStrictReceive operation.
 *
 * A `PathPaymentStrictReceive` operation sends the specified amount to the
 * destination account. It credits the destination with `destAmount` of
 * `destAsset`, while debiting at most `sendMax` of `sendAsset` from the source.
 * The transfer optionally occurs through a path. XLM payments create the
 * destination account if it does not exist.
 *
 * @function
 * @alias Operation.pathPaymentStrictReceive
 * @see https://developers.stellar.org/docs/start/list-of-operations/#path-payment-strict-receive
 *
 * @param {object}  opts - Options object
 * @param {Asset}   opts.sendAsset    - asset to pay with
 * @param {string}  opts.sendMax      - maximum amount of sendAsset to send
 * @param {string}  opts.destination  - destination account to send to
 * @param {Asset}   opts.destAsset    - asset the destination will receive
 * @param {string}  opts.destAmount   - amount the destination receives
 * @param {Asset[]} opts.path         - array of Asset objects to use as the path
 *
 * @param {string}  [opts.source]     - The source account for the payment.
 *     Defaults to the transaction's source account.
 *
 * @returns {xdr.PathPaymentStrictReceiveOp} the resulting path payment op
 */
function pathPaymentStrictReceive(opts) {
  switch (true) {
    case !opts.sendAsset:
      throw new Error('Must specify a send asset');
    case !this.isValidAmount(opts.sendMax):
      throw new TypeError(this.constructAmountRequirementsError('sendMax'));
    case !opts.destAsset:
      throw new Error('Must provide a destAsset for a payment operation');
    case !this.isValidAmount(opts.destAmount):
      throw new TypeError(this.constructAmountRequirementsError('destAmount'));
    default:
      break;
  }
  var attributes = {};
  attributes.sendAsset = opts.sendAsset.toXDRObject();
  attributes.sendMax = this._toXDRAmount(opts.sendMax);
  try {
    attributes.destination = decodeAddressToMuxedAccount(opts.destination);
  } catch (e) {
    throw new Error('destination is invalid');
  }
  attributes.destAsset = opts.destAsset.toXDRObject();
  attributes.destAmount = this._toXDRAmount(opts.destAmount);
  var path = opts.path ? opts.path : [];
  attributes.path = path.map(function (x) {
    return x.toXDRObject();
  });
  var payment = new src_xdr.PathPaymentStrictReceiveOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.pathPaymentStrictReceive(payment);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/path_payment_strict_send.js



/**
 * Creates a PathPaymentStrictSend operation.
 *
 * A `PathPaymentStrictSend` operation sends the specified amount to the
 * destination account crediting at least `destMin` of `destAsset`, optionally
 * through a path. XLM payments create the destination account if it does not
 * exist.
 *
 * @function
 * @alias Operation.pathPaymentStrictSend
 * @see https://developers.stellar.org/docs/start/list-of-operations/#path-payment-strict-send
 *
 * @param {object}  opts - Options object
 * @param {Asset}   opts.sendAsset    - asset to pay with
 * @param {string}  opts.sendAmount   - amount of sendAsset to send (excluding fees)
 * @param {string}  opts.destination  - destination account to send to
 * @param {Asset}   opts.destAsset    - asset the destination will receive
 * @param {string}  opts.destMin      - minimum amount of destAsset to be receive
 * @param {Asset[]} opts.path         - array of Asset objects to use as the path
 *
 * @param {string}  [opts.source]     - The source account for the payment.
 *     Defaults to the transaction's source account.
 *
 * @returns {xdr.Operation}   the resulting path payment operation
 *     (xdr.PathPaymentStrictSendOp)
 */
function pathPaymentStrictSend(opts) {
  switch (true) {
    case !opts.sendAsset:
      throw new Error('Must specify a send asset');
    case !this.isValidAmount(opts.sendAmount):
      throw new TypeError(this.constructAmountRequirementsError('sendAmount'));
    case !opts.destAsset:
      throw new Error('Must provide a destAsset for a payment operation');
    case !this.isValidAmount(opts.destMin):
      throw new TypeError(this.constructAmountRequirementsError('destMin'));
    default:
      break;
  }
  var attributes = {};
  attributes.sendAsset = opts.sendAsset.toXDRObject();
  attributes.sendAmount = this._toXDRAmount(opts.sendAmount);
  try {
    attributes.destination = decodeAddressToMuxedAccount(opts.destination);
  } catch (e) {
    throw new Error('destination is invalid');
  }
  attributes.destAsset = opts.destAsset.toXDRObject();
  attributes.destMin = this._toXDRAmount(opts.destMin);
  var path = opts.path ? opts.path : [];
  attributes.path = path.map(function (x) {
    return x.toXDRObject();
  });
  var payment = new src_xdr.PathPaymentStrictSendOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.pathPaymentStrictSend(payment);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/payment.js



/**
 * Create a payment operation.
 *
 * @function
 * @alias Operation.payment
 * @see https://developers.stellar.org/docs/start/list-of-operations/#payment
 *
 * @param {object}  opts - Options object
 * @param {string}  opts.destination  - destination account ID
 * @param {Asset}   opts.asset        - asset to send
 * @param {string}  opts.amount       - amount to send
 *
 * @param {string}  [opts.source]     - The source account for the payment.
 *     Defaults to the transaction's source account.
 *
 * @returns {xdr.Operation}   The resulting payment operation (xdr.PaymentOp)
 */
function payment(opts) {
  if (!opts.asset) {
    throw new Error('Must provide an asset for a payment operation');
  }
  if (!this.isValidAmount(opts.amount)) {
    throw new TypeError(this.constructAmountRequirementsError('amount'));
  }
  var attributes = {};
  try {
    attributes.destination = decodeAddressToMuxedAccount(opts.destination);
  } catch (e) {
    throw new Error('destination is invalid');
  }
  attributes.asset = opts.asset.toXDRObject();
  attributes.amount = this._toXDRAmount(opts.amount);
  var paymentOp = new src_xdr.PaymentOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.payment(paymentOp);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/set_options.js
/* provided dependency */ var set_options_Buffer = __webpack_require__(8764)["Buffer"];
/* eslint-disable no-param-reassign */




function weightCheckFunction(value, name) {
  if (value >= 0 && value <= 255) {
    return true;
  }
  throw new Error("".concat(name, " value must be between 0 and 255"));
}

/**
 * Returns an XDR SetOptionsOp. A "set options" operations set or clear account flags,
 * set the account's inflation destination, and/or add new signers to the account.
 * The flags used in `opts.clearFlags` and `opts.setFlags` can be the following:
 *   - `{@link AuthRequiredFlag}`
 *   - `{@link AuthRevocableFlag}`
 *   - `{@link AuthImmutableFlag}`
 *   - `{@link AuthClawbackEnabledFlag}`
 *
 * It's possible to set/clear multiple flags at once using logical or.
 *
 * @function
 * @alias Operation.setOptions
 *
 * @param {object} opts Options object
 * @param {string} [opts.inflationDest] - Set this account ID as the account's inflation destination.
 * @param {(number|string)} [opts.clearFlags] - Bitmap integer for which account flags to clear.
 * @param {(number|string)} [opts.setFlags] - Bitmap integer for which account flags to set.
 * @param {number|string} [opts.masterWeight] - The master key weight.
 * @param {number|string} [opts.lowThreshold] - The sum weight for the low threshold.
 * @param {number|string} [opts.medThreshold] - The sum weight for the medium threshold.
 * @param {number|string} [opts.highThreshold] - The sum weight for the high threshold.
 * @param {object} [opts.signer] - Add or remove a signer from the account. The signer is
 *                                 deleted if the weight is 0. Only one of `ed25519PublicKey`, `sha256Hash`, `preAuthTx` should be defined.
 * @param {string} [opts.signer.ed25519PublicKey] - The ed25519 public key of the signer.
 * @param {Buffer|string} [opts.signer.sha256Hash] - sha256 hash (Buffer or hex string) of preimage that will unlock funds. Preimage should be used as signature of future transaction.
 * @param {Buffer|string} [opts.signer.preAuthTx] - Hash (Buffer or hex string) of transaction that will unlock funds.
 * @param {string} [opts.signer.ed25519SignedPayload] - Signed payload signer (ed25519 public key + raw payload) for atomic transaction signature disclosure.
 * @param {number|string} [opts.signer.weight] - The weight of the new signer (0 to delete or 1-255)
 * @param {string} [opts.homeDomain] - sets the home domain used for reverse federation lookup.
 * @param {string} [opts.source] - The source account (defaults to transaction source).
 *
 * @returns {xdr.SetOptionsOp}  XDR operation
 * @see [Account flags](https://developers.stellar.org/docs/glossary/accounts/#flags)
 */
function setOptions(opts) {
  var attributes = {};
  if (opts.inflationDest) {
    if (!StrKey.isValidEd25519PublicKey(opts.inflationDest)) {
      throw new Error('inflationDest is invalid');
    }
    attributes.inflationDest = Keypair.fromPublicKey(opts.inflationDest).xdrAccountId();
  }
  attributes.clearFlags = this._checkUnsignedIntValue('clearFlags', opts.clearFlags);
  attributes.setFlags = this._checkUnsignedIntValue('setFlags', opts.setFlags);
  attributes.masterWeight = this._checkUnsignedIntValue('masterWeight', opts.masterWeight, weightCheckFunction);
  attributes.lowThreshold = this._checkUnsignedIntValue('lowThreshold', opts.lowThreshold, weightCheckFunction);
  attributes.medThreshold = this._checkUnsignedIntValue('medThreshold', opts.medThreshold, weightCheckFunction);
  attributes.highThreshold = this._checkUnsignedIntValue('highThreshold', opts.highThreshold, weightCheckFunction);
  if (opts.homeDomain !== undefined && typeof opts.homeDomain !== 'string') {
    throw new TypeError('homeDomain argument must be of type String');
  }
  attributes.homeDomain = opts.homeDomain;
  if (opts.signer) {
    var weight = this._checkUnsignedIntValue('signer.weight', opts.signer.weight, weightCheckFunction);
    var key;
    var setValues = 0;
    if (opts.signer.ed25519PublicKey) {
      if (!StrKey.isValidEd25519PublicKey(opts.signer.ed25519PublicKey)) {
        throw new Error('signer.ed25519PublicKey is invalid.');
      }
      var rawKey = StrKey.decodeEd25519PublicKey(opts.signer.ed25519PublicKey);

      // eslint-disable-next-line new-cap
      key = new src_xdr.SignerKey.signerKeyTypeEd25519(rawKey);
      setValues += 1;
    }
    if (opts.signer.preAuthTx) {
      if (typeof opts.signer.preAuthTx === 'string') {
        opts.signer.preAuthTx = set_options_Buffer.from(opts.signer.preAuthTx, 'hex');
      }
      if (!(set_options_Buffer.isBuffer(opts.signer.preAuthTx) && opts.signer.preAuthTx.length === 32)) {
        throw new Error('signer.preAuthTx must be 32 bytes Buffer.');
      }

      // eslint-disable-next-line new-cap
      key = new src_xdr.SignerKey.signerKeyTypePreAuthTx(opts.signer.preAuthTx);
      setValues += 1;
    }
    if (opts.signer.sha256Hash) {
      if (typeof opts.signer.sha256Hash === 'string') {
        opts.signer.sha256Hash = set_options_Buffer.from(opts.signer.sha256Hash, 'hex');
      }
      if (!(set_options_Buffer.isBuffer(opts.signer.sha256Hash) && opts.signer.sha256Hash.length === 32)) {
        throw new Error('signer.sha256Hash must be 32 bytes Buffer.');
      }

      // eslint-disable-next-line new-cap
      key = new src_xdr.SignerKey.signerKeyTypeHashX(opts.signer.sha256Hash);
      setValues += 1;
    }
    if (opts.signer.ed25519SignedPayload) {
      if (!StrKey.isValidSignedPayload(opts.signer.ed25519SignedPayload)) {
        throw new Error('signer.ed25519SignedPayload is invalid.');
      }
      var _rawKey = StrKey.decodeSignedPayload(opts.signer.ed25519SignedPayload);
      var signedPayloadXdr = src_xdr.SignerKeyEd25519SignedPayload.fromXDR(_rawKey);

      // eslint-disable-next-line new-cap
      key = src_xdr.SignerKey.signerKeyTypeEd25519SignedPayload(signedPayloadXdr);
      setValues += 1;
    }
    if (setValues !== 1) {
      throw new Error('Signer object must contain exactly one of signer.ed25519PublicKey, signer.sha256Hash, signer.preAuthTx.');
    }
    attributes.signer = new src_xdr.Signer({
      key: key,
      weight: weight
    });
  }
  var setOptionsOp = new src_xdr.SetOptionsOp(attributes);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.setOptions(setOptionsOp);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/begin_sponsoring_future_reserves.js




/**
 * Create a "begin sponsoring future reserves" operation.
 * @function
 * @alias Operation.beginSponsoringFutureReserves
 * @param {object} opts Options object
 * @param {string} opts.sponsoredId - The sponsored account id.
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 * @returns {xdr.Operation} xdr operation
 *
 * @example
 * const op = Operation.beginSponsoringFutureReserves({
 *   sponsoredId: 'GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7'
 * });
 *
 */
function beginSponsoringFutureReserves() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!StrKey.isValidEd25519PublicKey(opts.sponsoredId)) {
    throw new Error('sponsoredId is invalid');
  }
  var op = new src_xdr.BeginSponsoringFutureReservesOp({
    sponsoredId: Keypair.fromPublicKey(opts.sponsoredId).xdrAccountId()
  });
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.beginSponsoringFutureReserves(op);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/end_sponsoring_future_reserves.js


/**
 * Create an "end sponsoring future reserves" operation.
 * @function
 * @alias Operation.endSponsoringFutureReserves
 * @param {object} opts Options object
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 * @returns {xdr.Operation} xdr operation
 *
 * @example
 * const op = Operation.endSponsoringFutureReserves();
 *
 */
function endSponsoringFutureReserves() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.endSponsoringFutureReserves();
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/revoke_sponsorship.js
/* provided dependency */ var revoke_sponsorship_Buffer = __webpack_require__(8764)["Buffer"];






/**
 * Create a "revoke sponsorship" operation for an account.
 *
 * @function
 * @alias Operation.revokeAccountSponsorship
 * @param {object} opts Options object
 * @param {string} opts.account - The sponsored account ID.
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 * @returns {xdr.Operation} xdr operation
 *
 * @example
 * const op = Operation.revokeAccountSponsorship({
 *   account: 'GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7
 * });
 *
 */
function revokeAccountSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!StrKey.isValidEd25519PublicKey(opts.account)) {
    throw new Error('account is invalid');
  }
  var ledgerKey = src_xdr.LedgerKey.account(new src_xdr.LedgerKeyAccount({
    accountId: Keypair.fromPublicKey(opts.account).xdrAccountId()
  }));
  var op = src_xdr.RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}

/**
 * Create a "revoke sponsorship" operation for a trustline.
 *
 * @function
 * @alias Operation.revokeTrustlineSponsorship
 * @param {object} opts Options object
 * @param {string} opts.account - The account ID which owns the trustline.
 * @param {Asset | LiquidityPoolId} opts.asset - The trustline asset.
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 * @returns {xdr.Operation} xdr operation
 *
 * @example
 * const op = Operation.revokeTrustlineSponsorship({
 *   account: 'GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7
 *   asset: new StellarBase.LiquidityPoolId(
 *     'USDUSD',
 *     'GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7'
 *   )
 * });
 *
 */
function revokeTrustlineSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!StrKey.isValidEd25519PublicKey(opts.account)) {
    throw new Error('account is invalid');
  }
  var asset;
  if (opts.asset instanceof Asset) {
    asset = opts.asset.toTrustLineXDRObject();
  } else if (opts.asset instanceof LiquidityPoolId) {
    asset = opts.asset.toXDRObject();
  } else {
    throw new TypeError('asset must be an Asset or LiquidityPoolId');
  }
  var ledgerKey = src_xdr.LedgerKey.trustline(new src_xdr.LedgerKeyTrustLine({
    accountId: Keypair.fromPublicKey(opts.account).xdrAccountId(),
    asset: asset
  }));
  var op = src_xdr.RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}

/**
 * Create a "revoke sponsorship" operation for an offer.
 *
 * @function
 * @alias Operation.revokeOfferSponsorship
 * @param {object} opts Options object
 * @param {string} opts.seller - The account ID which created the offer.
 * @param {string} opts.offerId - The offer ID.
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 * @returns {xdr.Operation} xdr operation
 *
 * @example
 * const op = Operation.revokeOfferSponsorship({
 *   seller: 'GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7
 *   offerId: '1234'
 * });
 *
 */
function revokeOfferSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!StrKey.isValidEd25519PublicKey(opts.seller)) {
    throw new Error('seller is invalid');
  }
  if (typeof opts.offerId !== 'string') {
    throw new Error('offerId is invalid');
  }
  var ledgerKey = src_xdr.LedgerKey.offer(new src_xdr.LedgerKeyOffer({
    sellerId: Keypair.fromPublicKey(opts.seller).xdrAccountId(),
    offerId: src_xdr.Int64.fromString(opts.offerId)
  }));
  var op = src_xdr.RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}

/**
 * Create a "revoke sponsorship" operation for a data entry.
 *
 * @function
 * @alias Operation.revokeDataSponsorship
 * @param {object} opts Options object
 * @param {string} opts.account - The account ID which owns the data entry.
 * @param {string} opts.name - The name of the data entry
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 * @returns {xdr.Operation} xdr operation
 *
 * @example
 * const op = Operation.revokeDataSponsorship({
 *   account: 'GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7
 *   name: 'foo'
 * });
 *
 */
function revokeDataSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!StrKey.isValidEd25519PublicKey(opts.account)) {
    throw new Error('account is invalid');
  }
  if (typeof opts.name !== 'string' || opts.name.length > 64) {
    throw new Error('name must be a string, up to 64 characters');
  }
  var ledgerKey = src_xdr.LedgerKey.data(new src_xdr.LedgerKeyData({
    accountId: Keypair.fromPublicKey(opts.account).xdrAccountId(),
    dataName: opts.name
  }));
  var op = src_xdr.RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}

/**
 * Create a "revoke sponsorship" operation for a claimable balance.
 *
 * @function
 * @alias Operation.revokeClaimableBalanceSponsorship
 * @param {object} opts Options object
 * @param {string} opts.balanceId - The sponsored claimable balance ID.
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 * @returns {xdr.Operation} xdr operation
 *
 * @example
 * const op = Operation.revokeClaimableBalanceSponsorship({
 *   balanceId: '00000000da0d57da7d4850e7fc10d2a9d0ebc731f7afb40574c03395b17d49149b91f5be',
 * });
 *
 */
function revokeClaimableBalanceSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof opts.balanceId !== 'string') {
    throw new Error('balanceId is invalid');
  }
  var ledgerKey = src_xdr.LedgerKey.claimableBalance(new src_xdr.LedgerKeyClaimableBalance({
    balanceId: src_xdr.ClaimableBalanceId.fromXDR(opts.balanceId, 'hex')
  }));
  var op = src_xdr.RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}

/**
 * Creates a "revoke sponsorship" operation for a liquidity pool.
 *
 * @function
 * @alias Operation.revokeLiquidityPoolSponsorship
 * @param {object} opts – Options object.
 * @param {string} opts.liquidityPoolId - The sponsored liquidity pool ID in 'hex' string.
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 * @returns {xdr.Operation} xdr Operation.
 *
 * @example
 * const op = Operation.revokeLiquidityPoolSponsorship({
 *   liquidityPoolId: 'dd7b1ab831c273310ddbec6f97870aa83c2fbd78ce22aded37ecbf4f3380fac7',
 * });
 *
 */
function revokeLiquidityPoolSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof opts.liquidityPoolId !== 'string') {
    throw new Error('liquidityPoolId is invalid');
  }
  var ledgerKey = src_xdr.LedgerKey.liquidityPool(new src_xdr.LedgerKeyLiquidityPool({
    liquidityPoolId: src_xdr.PoolId.fromXDR(opts.liquidityPoolId, 'hex')
  }));
  var op = src_xdr.RevokeSponsorshipOp.revokeSponsorshipLedgerEntry(ledgerKey);
  var opAttributes = {
    body: src_xdr.OperationBody.revokeSponsorship(op)
  };
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}

/**
 * Create a "revoke sponsorship" operation for a signer.
 *
 * @function
 * @alias Operation.revokeSignerSponsorship
 * @param {object} opts Options object
 * @param {string} opts.account - The account ID where the signer sponsorship is being removed from.
 * @param {object} opts.signer - The signer whose sponsorship is being removed.
 * @param {string} [opts.signer.ed25519PublicKey] - The ed25519 public key of the signer.
 * @param {Buffer|string} [opts.signer.sha256Hash] - sha256 hash (Buffer or hex string).
 * @param {Buffer|string} [opts.signer.preAuthTx] - Hash (Buffer or hex string) of transaction.
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 * @returns {xdr.Operation} xdr operation
 *
 * @example
 * const op = Operation.revokeSignerSponsorship({
 *   account: 'GDGU5OAPHNPU5UCLE5RDJHG7PXZFQYWKCFOEXSXNMR6KRQRI5T6XXCD7
 *   signer: {
 *     ed25519PublicKey: 'GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ'
 *   }
 * })
 *
 */
function revokeSignerSponsorship() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!StrKey.isValidEd25519PublicKey(opts.account)) {
    throw new Error('account is invalid');
  }
  var key;
  if (opts.signer.ed25519PublicKey) {
    if (!StrKey.isValidEd25519PublicKey(opts.signer.ed25519PublicKey)) {
      throw new Error('signer.ed25519PublicKey is invalid.');
    }
    var rawKey = StrKey.decodeEd25519PublicKey(opts.signer.ed25519PublicKey);
    key = new src_xdr.SignerKey.signerKeyTypeEd25519(rawKey);
  } else if (opts.signer.preAuthTx) {
    var buffer;
    if (typeof opts.signer.preAuthTx === 'string') {
      buffer = revoke_sponsorship_Buffer.from(opts.signer.preAuthTx, 'hex');
    } else {
      buffer = opts.signer.preAuthTx;
    }
    if (!(revoke_sponsorship_Buffer.isBuffer(buffer) && buffer.length === 32)) {
      throw new Error('signer.preAuthTx must be 32 bytes Buffer.');
    }
    key = new src_xdr.SignerKey.signerKeyTypePreAuthTx(buffer);
  } else if (opts.signer.sha256Hash) {
    var _buffer;
    if (typeof opts.signer.sha256Hash === 'string') {
      _buffer = revoke_sponsorship_Buffer.from(opts.signer.sha256Hash, 'hex');
    } else {
      _buffer = opts.signer.sha256Hash;
    }
    if (!(revoke_sponsorship_Buffer.isBuffer(_buffer) && _buffer.length === 32)) {
      throw new Error('signer.sha256Hash must be 32 bytes Buffer.');
    }
    key = new src_xdr.SignerKey.signerKeyTypeHashX(_buffer);
  } else {
    throw new Error('signer is invalid');
  }
  var signer = new src_xdr.RevokeSponsorshipOpSigner({
    accountId: Keypair.fromPublicKey(opts.account).xdrAccountId(),
    signerKey: key
  });
  var op = src_xdr.RevokeSponsorshipOp.revokeSponsorshipSigner(signer);
  var opAttributes = {};
  opAttributes.body = src_xdr.OperationBody.revokeSponsorship(op);
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/clawback.js



/**
 * Creates a clawback operation.
 *
 * @function
 * @alias Operation.clawback
 *
 * @param {object} opts - Options object
 * @param {Asset}  opts.asset   - The asset being clawed back.
 * @param {string} opts.amount  - The amount of the asset to claw back.
 * @param {string} opts.from    - The public key of the (optionally-muxed)
 *     account to claw back from.
 *
 * @param {string} [opts.source] - The source account for the operation.
 *     Defaults to the transaction's source account.
 *
 * @return {xdr.ClawbackOp}
 *
 * @see https://github.com/stellar/stellar-protocol/blob/master/core/cap-0035.md#clawback-operation
 */
function clawback(opts) {
  var attributes = {};
  if (!this.isValidAmount(opts.amount)) {
    throw new TypeError(this.constructAmountRequirementsError('amount'));
  }
  attributes.amount = this._toXDRAmount(opts.amount);
  attributes.asset = opts.asset.toXDRObject();
  try {
    attributes.from = decodeAddressToMuxedAccount(opts.from);
  } catch (e) {
    throw new Error('from address is invalid');
  }
  var opAttributes = {
    body: src_xdr.OperationBody.clawback(new src_xdr.ClawbackOp(attributes))
  };
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/set_trustline_flags.js
function set_trustline_flags_typeof(obj) { "@babel/helpers - typeof"; return set_trustline_flags_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, set_trustline_flags_typeof(obj); }



/**
 * Creates a trustline flag configuring operation.
 *
 * For the flags, set them to true to enable them and false to disable them. Any
 * unmodified operations will be marked `undefined` in the result.
 *
 * Note that you can only **clear** the clawbackEnabled flag set; it must be set
 * account-wide via operations.SetOptions (setting
 * xdr.AccountFlags.clawbackEnabled).
 *
 * @function
 * @alias Operation.setTrustLineFlags
 *
 * @param {object} opts - Options object
 * @param {string} opts.trustor     - the account whose trustline this is
 * @param {Asset}  opts.asset       - the asset on the trustline
 * @param {object} opts.flags       - the set of flags to modify
 *
 * @param {bool}   [opts.flags.authorized]  - authorize account to perform
 *     transactions with its credit
 * @param {bool}   [opts.flags.authorizedToMaintainLiabilities] - authorize
 *     account to maintain and reduce liabilities for its credit
 * @param {bool}   [opts.flags.clawbackEnabled] - stop claimable balances on
 *     this trustlines from having clawbacks enabled (this flag can only be set
 *     to false!)
 * @param {string} [opts.source] - The source account for the operation.
 *                                 Defaults to the transaction's source account.
 *
 * @note You must include at least one flag.
 *
 * @return {xdr.SetTrustLineFlagsOp}
 *
 * @link xdr.AccountFlags
 * @link xdr.TrustLineFlags
 * @see https://github.com/stellar/stellar-protocol/blob/master/core/cap-0035.md#set-trustline-flags-operation
 * @see https://developers.stellar.org/docs/start/list-of-operations/#set-options
 */
function setTrustLineFlags() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var attributes = {};
  if (set_trustline_flags_typeof(opts.flags) !== 'object' || Object.keys(opts.flags).length === 0) {
    throw new Error('opts.flags must be a map of boolean flags to modify');
  }
  var mapping = {
    authorized: src_xdr.TrustLineFlags.authorizedFlag(),
    authorizedToMaintainLiabilities: src_xdr.TrustLineFlags.authorizedToMaintainLiabilitiesFlag(),
    clawbackEnabled: src_xdr.TrustLineFlags.trustlineClawbackEnabledFlag()
  };

  /* eslint no-bitwise: "off" */
  var clearFlag = 0;
  var setFlag = 0;
  Object.keys(opts.flags).forEach(function (flagName) {
    if (!Object.prototype.hasOwnProperty.call(mapping, flagName)) {
      throw new Error("unsupported flag name specified: ".concat(flagName));
    }
    var flagValue = opts.flags[flagName];
    var bit = mapping[flagName].value;
    if (flagValue === true) {
      setFlag |= bit;
    } else if (flagValue === false) {
      clearFlag |= bit;
    }
  });
  attributes.trustor = Keypair.fromPublicKey(opts.trustor).xdrAccountId();
  attributes.asset = opts.asset.toXDRObject();
  attributes.clearFlags = clearFlag;
  attributes.setFlags = setFlag;
  var opAttributes = {
    body: src_xdr.OperationBody.setTrustLineFlags(new src_xdr.SetTrustLineFlagsOp(attributes))
  };
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/liquidity_pool_deposit.js


/**
 * Creates a liquidity pool deposit operation.
 *
 * @function
 * @alias Operation.liquidityPoolDeposit
 * @see https://developers.stellar.org/docs/start/list-of-operations/#liquidity-pool-deposit
 *
 * @param {object} opts - Options object
 * @param {string} opts.liquidityPoolId - The liquidity pool ID.
 * @param {string} opts.maxAmountA - Maximum amount of first asset to deposit.
 * @param {string} opts.maxAmountB - Maximum amount of second asset to deposit.
 * @param {number|string|BigNumber|Object} opts.minPrice -  Minimum depositA/depositB price.
 * @param {number} opts.minPrice.n - If `opts.minPrice` is an object: the price numerator
 * @param {number} opts.minPrice.d - If `opts.minPrice` is an object: the price denominator
 * @param {number|string|BigNumber|Object} opts.maxPrice -  Maximum depositA/depositB price.
 * @param {number} opts.maxPrice.n - If `opts.maxPrice` is an object: the price numerator
 * @param {number} opts.maxPrice.d - If `opts.maxPrice` is an object: the price denominator
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 *
 * @returns {xdr.Operation} The resulting operation (xdr.LiquidityPoolDepositOp).
 */
function liquidityPoolDeposit() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var liquidityPoolId = opts.liquidityPoolId,
    maxAmountA = opts.maxAmountA,
    maxAmountB = opts.maxAmountB,
    minPrice = opts.minPrice,
    maxPrice = opts.maxPrice;
  var attributes = {};
  if (!liquidityPoolId) {
    throw new TypeError('liquidityPoolId argument is required');
  }
  attributes.liquidityPoolId = src_xdr.PoolId.fromXDR(liquidityPoolId, 'hex');
  if (!this.isValidAmount(maxAmountA, true)) {
    throw new TypeError('maxAmountA argument is required');
  }
  attributes.maxAmountA = this._toXDRAmount(maxAmountA);
  if (!this.isValidAmount(maxAmountB, true)) {
    throw new TypeError('maxAmountB argument is required');
  }
  attributes.maxAmountB = this._toXDRAmount(maxAmountB);
  if (minPrice === undefined) {
    throw new TypeError('minPrice argument is required');
  }
  attributes.minPrice = this._toXDRPrice(minPrice);
  if (maxPrice === undefined) {
    throw new TypeError('maxPrice argument is required');
  }
  attributes.maxPrice = this._toXDRPrice(maxPrice);
  var liquidityPoolDepositOp = new src_xdr.LiquidityPoolDepositOp(attributes);
  var opAttributes = {
    body: src_xdr.OperationBody.liquidityPoolDeposit(liquidityPoolDepositOp)
  };
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/liquidity_pool_withdraw.js


/**
 * Creates a liquidity pool withdraw operation.
 *
 * @function
 * @alias Operation.liquidityPoolWithdraw
 * @see https://developers.stellar.org/docs/start/list-of-operations/#liquidity-pool-withdraw
 *
 * @param {object} opts - Options object
 * @param {string} opts.liquidityPoolId - The liquidity pool ID.
 * @param {string} opts.amount - Amount of pool shares to withdraw.
 * @param {string} opts.minAmountA - Minimum amount of first asset to withdraw.
 * @param {string} opts.minAmountB - Minimum amount of second asset to withdraw.
 * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
 *
 * @returns {xdr.Operation}   The resulting operation (xdr.LiquidityPoolWithdrawOp).
 */
function liquidityPoolWithdraw() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var attributes = {};
  if (!opts.liquidityPoolId) {
    throw new TypeError('liquidityPoolId argument is required');
  }
  attributes.liquidityPoolId = src_xdr.PoolId.fromXDR(opts.liquidityPoolId, 'hex');
  if (!this.isValidAmount(opts.amount)) {
    throw new TypeError('amount argument is required');
  }
  attributes.amount = this._toXDRAmount(opts.amount);
  if (!this.isValidAmount(opts.minAmountA, true)) {
    throw new TypeError('minAmountA argument is required');
  }
  attributes.minAmountA = this._toXDRAmount(opts.minAmountA);
  if (!this.isValidAmount(opts.minAmountB, true)) {
    throw new TypeError('minAmountB argument is required');
  }
  attributes.minAmountB = this._toXDRAmount(opts.minAmountB);
  var liquidityPoolWithdrawOp = new src_xdr.LiquidityPoolWithdrawOp(attributes);
  var opAttributes = {
    body: src_xdr.OperationBody.liquidityPoolWithdraw(liquidityPoolWithdrawOp)
  };
  this.setSourceAccount(opAttributes, opts);
  return new src_xdr.Operation(opAttributes);
}
;// CONCATENATED MODULE: ./src/operations/index.js
























;// CONCATENATED MODULE: ./src/operation.js
function operation_typeof(obj) { "@babel/helpers - typeof"; return operation_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, operation_typeof(obj); }
function operation_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function operation_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, operation_toPropertyKey(descriptor.key), descriptor); } }
function operation_createClass(Constructor, protoProps, staticProps) { if (protoProps) operation_defineProperties(Constructor.prototype, protoProps); if (staticProps) operation_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function operation_toPropertyKey(arg) { var key = operation_toPrimitive(arg, "string"); return operation_typeof(key) === "symbol" ? key : String(key); }
function operation_toPrimitive(input, hint) { if (operation_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (operation_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/* eslint-disable no-bitwise */













var ONE = 10000000;
var operation_MAX_INT64 = '9223372036854775807';

/**
 * When set using `{@link Operation.setOptions}` option, requires the issuing
 * account to give other accounts permission before they can hold the issuing
 * account’s credit.
 *
 * @constant
 * @see [Account flags](https://developers.stellar.org/docs/glossary/accounts/#flags)
 */
var AuthRequiredFlag = 1 << 0;
/**
 * When set using `{@link Operation.setOptions}` option, allows the issuing
 * account to revoke its credit held by other accounts.
 *
 * @constant
 * @see [Account flags](https://developers.stellar.org/docs/glossary/accounts/#flags)
 */
var AuthRevocableFlag = 1 << 1;
/**
 * When set using `{@link Operation.setOptions}` option, then none of the
 * authorization flags can be set and the account can never be deleted.
 *
 * @constant
 * @see [Account flags](https://developers.stellar.org/docs/glossary/accounts/#flags)
 */
var AuthImmutableFlag = 1 << 2;

/**
 * When set using `{@link Operation.setOptions}` option, then any trustlines
 * created by this account can have a ClawbackOp operation submitted for the
 * corresponding asset.
 *
 * @constant
 * @see [Account flags](https://developers.stellar.org/docs/glossary/accounts/#flags)
 */
var AuthClawbackEnabledFlag = 1 << 3;

/**
 * `Operation` class represents [operations](https://developers.stellar.org/docs/glossary/operations/) in Stellar network.
 * Use one of static methods to create operations:
 * * `{@link Operation.createAccount}`
 * * `{@link Operation.payment}`
 * * `{@link Operation.pathPaymentStrictReceive}`
 * * `{@link Operation.pathPaymentStrictSend}`
 * * `{@link Operation.manageSellOffer}`
 * * `{@link Operation.manageBuyOffer}`
 * * `{@link Operation.createPassiveSellOffer}`
 * * `{@link Operation.setOptions}`
 * * `{@link Operation.changeTrust}`
 * * `{@link Operation.allowTrust}`
 * * `{@link Operation.accountMerge}`
 * * `{@link Operation.inflation}`
 * * `{@link Operation.manageData}`
 * * `{@link Operation.bumpSequence}`
 * * `{@link Operation.createClaimableBalance}`
 * * `{@link Operation.claimClaimableBalance}`
 * * `{@link Operation.beginSponsoringFutureReserves}`
 * * `{@link Operation.endSponsoringFutureReserves}`
 * * `{@link Operation.revokeAccountSponsorship}`
 * * `{@link Operation.revokeTrustlineSponsorship}`
 * * `{@link Operation.revokeOfferSponsorship}`
 * * `{@link Operation.revokeDataSponsorship}`
 * * `{@link Operation.revokeClaimableBalanceSponsorship}`
 * * `{@link Operation.revokeLiquidityPoolSponsorship}`
 * * `{@link Operation.revokeSignerSponsorship}`
 * * `{@link Operation.clawback}`
 * * `{@link Operation.clawbackClaimableBalance}`
 * * `{@link Operation.setTrustLineFlags}`
 * * `{@link Operation.liquidityPoolDeposit}`
 * * `{@link Operation.liquidityPoolWithdraw}`
 *
 * @class Operation
 */
var Operation = /*#__PURE__*/function () {
  function Operation() {
    operation_classCallCheck(this, Operation);
  }
  operation_createClass(Operation, null, [{
    key: "setSourceAccount",
    value: function setSourceAccount(opAttributes, opts) {
      if (opts.source) {
        try {
          opAttributes.sourceAccount = decodeAddressToMuxedAccount(opts.source);
        } catch (e) {
          throw new Error('Source address is invalid');
        }
      }
    }

    /**
     * Deconstructs the raw XDR operation object into the structured object that
     * was used to create the operation (i.e. the `opts` parameter to most ops).
     *
     * @param {xdr.Operation}   operation - An XDR Operation.
     * @return {Operation}
     */
  }, {
    key: "fromXDRObject",
    value: function fromXDRObject(operation) {
      var result = {};
      if (operation.sourceAccount()) {
        result.source = encodeMuxedAccountToAddress(operation.sourceAccount());
      }
      var attrs = operation.body().value();
      var operationName = operation.body()["switch"]().name;
      switch (operationName) {
        case 'createAccount':
          {
            result.type = 'createAccount';
            result.destination = accountIdtoAddress(attrs.destination());
            result.startingBalance = this._fromXDRAmount(attrs.startingBalance());
            break;
          }
        case 'payment':
          {
            result.type = 'payment';
            result.destination = encodeMuxedAccountToAddress(attrs.destination());
            result.asset = Asset.fromOperation(attrs.asset());
            result.amount = this._fromXDRAmount(attrs.amount());
            break;
          }
        case 'pathPaymentStrictReceive':
          {
            result.type = 'pathPaymentStrictReceive';
            result.sendAsset = Asset.fromOperation(attrs.sendAsset());
            result.sendMax = this._fromXDRAmount(attrs.sendMax());
            result.destination = encodeMuxedAccountToAddress(attrs.destination());
            result.destAsset = Asset.fromOperation(attrs.destAsset());
            result.destAmount = this._fromXDRAmount(attrs.destAmount());
            result.path = [];
            var path = attrs.path();

            // note that Object.values isn't supported by node 6!
            Object.keys(path).forEach(function (pathKey) {
              result.path.push(Asset.fromOperation(path[pathKey]));
            });
            break;
          }
        case 'pathPaymentStrictSend':
          {
            result.type = 'pathPaymentStrictSend';
            result.sendAsset = Asset.fromOperation(attrs.sendAsset());
            result.sendAmount = this._fromXDRAmount(attrs.sendAmount());
            result.destination = encodeMuxedAccountToAddress(attrs.destination());
            result.destAsset = Asset.fromOperation(attrs.destAsset());
            result.destMin = this._fromXDRAmount(attrs.destMin());
            result.path = [];
            var _path = attrs.path();

            // note that Object.values isn't supported by node 6!
            Object.keys(_path).forEach(function (pathKey) {
              result.path.push(Asset.fromOperation(_path[pathKey]));
            });
            break;
          }
        case 'changeTrust':
          {
            result.type = 'changeTrust';
            switch (attrs.line()["switch"]()) {
              case src_xdr.AssetType.assetTypePoolShare():
                result.line = LiquidityPoolAsset.fromOperation(attrs.line());
                break;
              default:
                result.line = Asset.fromOperation(attrs.line());
                break;
            }
            result.limit = this._fromXDRAmount(attrs.limit());
            break;
          }
        case 'allowTrust':
          {
            result.type = 'allowTrust';
            result.trustor = accountIdtoAddress(attrs.trustor());
            result.assetCode = attrs.asset().value().toString();
            result.assetCode = trimEnd(result.assetCode, '\0');
            result.authorize = attrs.authorize();
            break;
          }
        case 'setOptions':
          {
            result.type = 'setOptions';
            if (attrs.inflationDest()) {
              result.inflationDest = accountIdtoAddress(attrs.inflationDest());
            }
            result.clearFlags = attrs.clearFlags();
            result.setFlags = attrs.setFlags();
            result.masterWeight = attrs.masterWeight();
            result.lowThreshold = attrs.lowThreshold();
            result.medThreshold = attrs.medThreshold();
            result.highThreshold = attrs.highThreshold();
            // home_domain is checked by iscntrl in stellar-core
            result.homeDomain = attrs.homeDomain() !== undefined ? attrs.homeDomain().toString('ascii') : undefined;
            if (attrs.signer()) {
              var signer = {};
              var arm = attrs.signer().key().arm();
              if (arm === 'ed25519') {
                signer.ed25519PublicKey = accountIdtoAddress(attrs.signer().key());
              } else if (arm === 'preAuthTx') {
                signer.preAuthTx = attrs.signer().key().preAuthTx();
              } else if (arm === 'hashX') {
                signer.sha256Hash = attrs.signer().key().hashX();
              } else if (arm === 'ed25519SignedPayload') {
                var signedPayload = attrs.signer().key().ed25519SignedPayload();
                signer.ed25519SignedPayload = StrKey.encodeSignedPayload(signedPayload.toXDR());
              }
              signer.weight = attrs.signer().weight();
              result.signer = signer;
            }
            break;
          }
        // the next case intentionally falls through!
        case 'manageOffer':
        case 'manageSellOffer':
          {
            result.type = 'manageSellOffer';
            result.selling = Asset.fromOperation(attrs.selling());
            result.buying = Asset.fromOperation(attrs.buying());
            result.amount = this._fromXDRAmount(attrs.amount());
            result.price = this._fromXDRPrice(attrs.price());
            result.offerId = attrs.offerId().toString();
            break;
          }
        case 'manageBuyOffer':
          {
            result.type = 'manageBuyOffer';
            result.selling = Asset.fromOperation(attrs.selling());
            result.buying = Asset.fromOperation(attrs.buying());
            result.buyAmount = this._fromXDRAmount(attrs.buyAmount());
            result.price = this._fromXDRPrice(attrs.price());
            result.offerId = attrs.offerId().toString();
            break;
          }
        // the next case intentionally falls through!
        case 'createPassiveOffer':
        case 'createPassiveSellOffer':
          {
            result.type = 'createPassiveSellOffer';
            result.selling = Asset.fromOperation(attrs.selling());
            result.buying = Asset.fromOperation(attrs.buying());
            result.amount = this._fromXDRAmount(attrs.amount());
            result.price = this._fromXDRPrice(attrs.price());
            break;
          }
        case 'accountMerge':
          {
            result.type = 'accountMerge';
            result.destination = encodeMuxedAccountToAddress(attrs);
            break;
          }
        case 'manageData':
          {
            result.type = 'manageData';
            // manage_data.name is checked by iscntrl in stellar-core
            result.name = attrs.dataName().toString('ascii');
            result.value = attrs.dataValue();
            break;
          }
        case 'inflation':
          {
            result.type = 'inflation';
            break;
          }
        case 'bumpSequence':
          {
            result.type = 'bumpSequence';
            result.bumpTo = attrs.bumpTo().toString();
            break;
          }
        case 'createClaimableBalance':
          {
            result.type = 'createClaimableBalance';
            result.asset = Asset.fromOperation(attrs.asset());
            result.amount = this._fromXDRAmount(attrs.amount());
            result.claimants = [];
            attrs.claimants().forEach(function (claimant) {
              result.claimants.push(Claimant.fromXDR(claimant));
            });
            break;
          }
        case 'claimClaimableBalance':
          {
            result.type = 'claimClaimableBalance';
            result.balanceId = attrs.toXDR('hex');
            break;
          }
        case 'beginSponsoringFutureReserves':
          {
            result.type = 'beginSponsoringFutureReserves';
            result.sponsoredId = accountIdtoAddress(attrs.sponsoredId());
            break;
          }
        case 'endSponsoringFutureReserves':
          {
            result.type = 'endSponsoringFutureReserves';
            break;
          }
        case 'revokeSponsorship':
          {
            extractRevokeSponshipDetails(attrs, result);
            break;
          }
        case 'clawback':
          {
            result.type = 'clawback';
            result.amount = this._fromXDRAmount(attrs.amount());
            result.from = encodeMuxedAccountToAddress(attrs.from());
            result.asset = Asset.fromOperation(attrs.asset());
            break;
          }
        case 'clawbackClaimableBalance':
          {
            result.type = 'clawbackClaimableBalance';
            result.balanceId = attrs.toXDR('hex');
            break;
          }
        case 'setTrustLineFlags':
          {
            result.type = 'setTrustLineFlags';
            result.asset = Asset.fromOperation(attrs.asset());
            result.trustor = accountIdtoAddress(attrs.trustor());

            // Convert from the integer-bitwised flag into a sensible object that
            // indicates true/false for each flag that's on/off.
            var clears = attrs.clearFlags();
            var sets = attrs.setFlags();
            var mapping = {
              authorized: src_xdr.TrustLineFlags.authorizedFlag(),
              authorizedToMaintainLiabilities: src_xdr.TrustLineFlags.authorizedToMaintainLiabilitiesFlag(),
              clawbackEnabled: src_xdr.TrustLineFlags.trustlineClawbackEnabledFlag()
            };
            var getFlagValue = function getFlagValue(key) {
              var bit = mapping[key].value;
              if (sets & bit) {
                return true;
              }
              if (clears & bit) {
                return false;
              }
              return undefined;
            };
            result.flags = {};
            Object.keys(mapping).forEach(function (flagName) {
              result.flags[flagName] = getFlagValue(flagName);
            });
            break;
          }
        case 'liquidityPoolDeposit':
          {
            result.type = 'liquidityPoolDeposit';
            result.liquidityPoolId = attrs.liquidityPoolId().toString('hex');
            result.maxAmountA = this._fromXDRAmount(attrs.maxAmountA());
            result.maxAmountB = this._fromXDRAmount(attrs.maxAmountB());
            result.minPrice = this._fromXDRPrice(attrs.minPrice());
            result.maxPrice = this._fromXDRPrice(attrs.maxPrice());
            break;
          }
        case 'liquidityPoolWithdraw':
          {
            result.type = 'liquidityPoolWithdraw';
            result.liquidityPoolId = attrs.liquidityPoolId().toString('hex');
            result.amount = this._fromXDRAmount(attrs.amount());
            result.minAmountA = this._fromXDRAmount(attrs.minAmountA());
            result.minAmountB = this._fromXDRAmount(attrs.minAmountB());
            break;
          }
        default:
          {
            throw new Error("Unknown operation: ".concat(operationName));
          }
      }
      return result;
    }

    /**
     * Validates that a given amount is possible for a Stellar asset.
     *
     * Specifically, this means that the amount is well, a valid number, but also
     * that it is within the int64 range and has no more than 7 decimal levels of
     * precision.
     *
     * Note that while smart contracts allow larger amounts, this is oriented
     * towards validating the standard Stellar operations.
     *
     * @param {string}  value       the amount to validate
     * @param {boolean} allowZero   optionally, whether or not zero is valid (default: no)
     *
     * @returns {boolean}
     */
  }, {
    key: "isValidAmount",
    value: function isValidAmount(value) {
      var allowZero = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (typeof value !== 'string') {
        return false;
      }
      var amount;
      try {
        amount = new bignumber(value);
      } catch (e) {
        return false;
      }
      if (
      // == 0
      !allowZero && amount.isZero() ||
      // < 0
      amount.isNegative() ||
      // > Max value
      amount.times(ONE).gt(new bignumber(operation_MAX_INT64).toString()) ||
      // Decimal places (max 7)
      amount.decimalPlaces() > 7 ||
      // NaN or Infinity
      amount.isNaN() || !amount.isFinite()) {
        return false;
      }
      return true;
    }
  }, {
    key: "constructAmountRequirementsError",
    value: function constructAmountRequirementsError(arg) {
      return "".concat(arg, " argument must be of type String, represent a positive number and have at most 7 digits after the decimal");
    }

    /**
     * Returns value converted to uint32 value or undefined.
     * If `value` is not `Number`, `String` or `Undefined` then throws an error.
     * Used in {@link Operation.setOptions}.
     * @private
     * @param {string} name Name of the property (used in error message only)
     * @param {*} value Value to check
     * @param {function(value, name)} isValidFunction Function to check other constraints (the argument will be a `Number`)
     * @returns {undefined|Number}
     */
  }, {
    key: "_checkUnsignedIntValue",
    value: function _checkUnsignedIntValue(name, value) {
      var isValidFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (typeof value === 'undefined') {
        return undefined;
      }
      if (typeof value === 'string') {
        value = parseFloat(value);
      }
      switch (true) {
        case typeof value !== 'number' || !Number.isFinite(value) || value % 1 !== 0:
          throw new Error("".concat(name, " value is invalid"));
        case value < 0:
          throw new Error("".concat(name, " value must be unsigned"));
        case !isValidFunction || isValidFunction && isValidFunction(value, name):
          return value;
        default:
          throw new Error("".concat(name, " value is invalid"));
      }
    }
    /**
     * @private
     * @param {string|BigNumber} value Value
     * @returns {Hyper} XDR amount
     */
  }, {
    key: "_toXDRAmount",
    value: function _toXDRAmount(value) {
      var amount = new bignumber(value).times(ONE);
      return xdr.Hyper.fromString(amount.toString());
    }

    /**
     * @private
     * @param {string|BigNumber} value XDR amount
     * @returns {BigNumber} Number
     */
  }, {
    key: "_fromXDRAmount",
    value: function _fromXDRAmount(value) {
      return new bignumber(value).div(ONE).toFixed(7);
    }

    /**
     * @private
     * @param {object} price Price object
     * @param {function} price.n numerator function that returns a value
     * @param {function} price.d denominator function that returns a value
     * @returns {BigNumber} Big string
     */
  }, {
    key: "_fromXDRPrice",
    value: function _fromXDRPrice(price) {
      var n = new bignumber(price.n());
      return n.div(new bignumber(price.d())).toString();
    }

    /**
     * @private
     * @param {object} price Price object
     * @param {function} price.n numerator function that returns a value
     * @param {function} price.d denominator function that returns a value
     * @returns {object} XDR price object
     */
  }, {
    key: "_toXDRPrice",
    value: function _toXDRPrice(price) {
      var xdrObject;
      if (price.n && price.d) {
        xdrObject = new src_xdr.Price(price);
      } else {
        var approx = best_r(price);
        xdrObject = new src_xdr.Price({
          n: parseInt(approx[0], 10),
          d: parseInt(approx[1], 10)
        });
      }
      if (xdrObject.n() < 0 || xdrObject.d() < 0) {
        throw new Error('price must be positive');
      }
      return xdrObject;
    }
  }]);
  return Operation;
}();
function extractRevokeSponshipDetails(attrs, result) {
  switch (attrs["switch"]().name) {
    case 'revokeSponsorshipLedgerEntry':
      {
        var ledgerKey = attrs.ledgerKey();
        switch (ledgerKey["switch"]().name) {
          case src_xdr.LedgerEntryType.account().name:
            {
              result.type = 'revokeAccountSponsorship';
              result.account = accountIdtoAddress(ledgerKey.account().accountId());
              break;
            }
          case src_xdr.LedgerEntryType.trustline().name:
            {
              result.type = 'revokeTrustlineSponsorship';
              result.account = accountIdtoAddress(ledgerKey.trustLine().accountId());
              var xdrAsset = ledgerKey.trustLine().asset();
              switch (xdrAsset["switch"]()) {
                case src_xdr.AssetType.assetTypePoolShare():
                  result.asset = LiquidityPoolId.fromOperation(xdrAsset);
                  break;
                default:
                  result.asset = Asset.fromOperation(xdrAsset);
                  break;
              }
              break;
            }
          case src_xdr.LedgerEntryType.offer().name:
            {
              result.type = 'revokeOfferSponsorship';
              result.seller = accountIdtoAddress(ledgerKey.offer().sellerId());
              result.offerId = ledgerKey.offer().offerId().toString();
              break;
            }
          case src_xdr.LedgerEntryType.data().name:
            {
              result.type = 'revokeDataSponsorship';
              result.account = accountIdtoAddress(ledgerKey.data().accountId());
              result.name = ledgerKey.data().dataName().toString('ascii');
              break;
            }
          case src_xdr.LedgerEntryType.claimableBalance().name:
            {
              result.type = 'revokeClaimableBalanceSponsorship';
              result.balanceId = ledgerKey.claimableBalance().balanceId().toXDR('hex');
              break;
            }
          case src_xdr.LedgerEntryType.liquidityPool().name:
            {
              result.type = 'revokeLiquidityPoolSponsorship';
              result.liquidityPoolId = ledgerKey.liquidityPool().liquidityPoolId().toString('hex');
              break;
            }
          default:
            {
              throw new Error("Unknown ledgerKey: ".concat(attrs["switch"]().name));
            }
        }
        break;
      }
    case 'revokeSponsorshipSigner':
      {
        result.type = 'revokeSignerSponsorship';
        result.account = accountIdtoAddress(attrs.signer().accountId());
        result.signer = convertXDRSignerKeyToObject(attrs.signer().signerKey());
        break;
      }
    default:
      {
        throw new Error("Unknown revokeSponsorship: ".concat(attrs["switch"]().name));
      }
  }
}
function convertXDRSignerKeyToObject(signerKey) {
  var attrs = {};
  switch (signerKey["switch"]().name) {
    case src_xdr.SignerKeyType.signerKeyTypeEd25519().name:
      {
        attrs.ed25519PublicKey = StrKey.encodeEd25519PublicKey(signerKey.ed25519());
        break;
      }
    case src_xdr.SignerKeyType.signerKeyTypePreAuthTx().name:
      {
        attrs.preAuthTx = signerKey.preAuthTx().toString('hex');
        break;
      }
    case src_xdr.SignerKeyType.signerKeyTypeHashX().name:
      {
        attrs.sha256Hash = signerKey.hashX().toString('hex');
        break;
      }
    default:
      {
        throw new Error("Unknown signerKey: ".concat(signerKey["switch"]().name));
      }
  }
  return attrs;
}
function accountIdtoAddress(accountId) {
  return StrKey.encodeEd25519PublicKey(accountId.ed25519());
}

// Attach all imported operations as static methods on the Operation class
Operation.accountMerge = accountMerge;
Operation.allowTrust = allowTrust;
Operation.bumpSequence = bumpSequence;
Operation.changeTrust = changeTrust;
Operation.createAccount = createAccount;
Operation.createClaimableBalance = createClaimableBalance;
Operation.claimClaimableBalance = claimClaimableBalance;
Operation.clawbackClaimableBalance = clawbackClaimableBalance;
Operation.createPassiveSellOffer = createPassiveSellOffer;
Operation.inflation = inflation;
Operation.manageData = manageData;
Operation.manageSellOffer = manageSellOffer;
Operation.manageBuyOffer = manageBuyOffer;
Operation.pathPaymentStrictReceive = pathPaymentStrictReceive;
Operation.pathPaymentStrictSend = pathPaymentStrictSend;
Operation.payment = payment;
Operation.setOptions = setOptions;
Operation.beginSponsoringFutureReserves = beginSponsoringFutureReserves;
Operation.endSponsoringFutureReserves = endSponsoringFutureReserves;
Operation.revokeAccountSponsorship = revokeAccountSponsorship;
Operation.revokeTrustlineSponsorship = revokeTrustlineSponsorship;
Operation.revokeOfferSponsorship = revokeOfferSponsorship;
Operation.revokeDataSponsorship = revokeDataSponsorship;
Operation.revokeClaimableBalanceSponsorship = revokeClaimableBalanceSponsorship;
Operation.revokeLiquidityPoolSponsorship = revokeLiquidityPoolSponsorship;
Operation.revokeSignerSponsorship = revokeSignerSponsorship;
Operation.clawback = clawback;
Operation.setTrustLineFlags = setTrustLineFlags;
Operation.liquidityPoolDeposit = liquidityPoolDeposit;
Operation.liquidityPoolWithdraw = liquidityPoolWithdraw;
;// CONCATENATED MODULE: ./src/memo.js
/* provided dependency */ var memo_Buffer = __webpack_require__(8764)["Buffer"];
function memo_typeof(obj) { "@babel/helpers - typeof"; return memo_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, memo_typeof(obj); }
function memo_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function memo_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, memo_toPropertyKey(descriptor.key), descriptor); } }
function memo_createClass(Constructor, protoProps, staticProps) { if (protoProps) memo_defineProperties(Constructor.prototype, protoProps); if (staticProps) memo_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function memo_toPropertyKey(arg) { var key = memo_toPrimitive(arg, "string"); return memo_typeof(key) === "symbol" ? key : String(key); }
function memo_toPrimitive(input, hint) { if (memo_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (memo_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/**
 * Type of {@link Memo}.
 */
var MemoNone = 'none';
/**
 * Type of {@link Memo}.
 */
var MemoID = 'id';
/**
 * Type of {@link Memo}.
 */
var MemoText = 'text';
/**
 * Type of {@link Memo}.
 */
var MemoHash = 'hash';
/**
 * Type of {@link Memo}.
 */
var MemoReturn = 'return';

/**
 * `Memo` represents memos attached to transactions.
 *
 * @param {string} type - `MemoNone`, `MemoID`, `MemoText`, `MemoHash` or `MemoReturn`
 * @param {*} value - `string` for `MemoID`, `MemoText`, buffer of hex string for `MemoHash` or `MemoReturn`
 * @see [Transactions concept](https://developers.stellar.org/docs/glossary/transactions/)
 * @class Memo
 */
var Memo = /*#__PURE__*/function () {
  function Memo(type) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    memo_classCallCheck(this, Memo);
    this._type = type;
    this._value = value;
    switch (this._type) {
      case MemoNone:
        break;
      case MemoID:
        Memo._validateIdValue(value);
        break;
      case MemoText:
        Memo._validateTextValue(value);
        break;
      case MemoHash:
      case MemoReturn:
        Memo._validateHashValue(value);
        // We want MemoHash and MemoReturn to have Buffer as a value
        if (typeof value === 'string') {
          this._value = memo_Buffer.from(value, 'hex');
        }
        break;
      default:
        throw new Error('Invalid memo type');
    }
  }

  /**
   * Contains memo type: `MemoNone`, `MemoID`, `MemoText`, `MemoHash` or `MemoReturn`
   */
  memo_createClass(Memo, [{
    key: "type",
    get: function get() {
      return this._type;
    },
    set: function set(type) {
      throw new Error('Memo is immutable');
    }

    /**
     * Contains memo value:
     * * `null` for `MemoNone`,
     * * `string` for `MemoID`,
     * * `Buffer` for `MemoText` after decoding using `fromXDRObject`, original value otherwise,
     * * `Buffer` for `MemoHash`, `MemoReturn`.
     */
  }, {
    key: "value",
    get: function get() {
      switch (this._type) {
        case MemoNone:
          return null;
        case MemoID:
        case MemoText:
          return this._value;
        case MemoHash:
        case MemoReturn:
          return memo_Buffer.from(this._value);
        default:
          throw new Error('Invalid memo type');
      }
    },
    set: function set(value) {
      throw new Error('Memo is immutable');
    }
  }, {
    key: "toXDRObject",
    value:
    /**
     * Returns XDR memo object.
     * @returns {xdr.Memo}
     */
    function toXDRObject() {
      switch (this._type) {
        case MemoNone:
          return src_xdr.Memo.memoNone();
        case MemoID:
          return src_xdr.Memo.memoId(xdr.UnsignedHyper.fromString(this._value));
        case MemoText:
          return src_xdr.Memo.memoText(this._value);
        case MemoHash:
          return src_xdr.Memo.memoHash(this._value);
        case MemoReturn:
          return src_xdr.Memo.memoReturn(this._value);
        default:
          return null;
      }
    }

    /**
     * Returns {@link Memo} from XDR memo object.
     * @param {xdr.Memo} object XDR memo object
     * @returns {Memo}
     */
  }], [{
    key: "_validateIdValue",
    value: function _validateIdValue(value) {
      var error = new Error("Expects a int64 as a string. Got ".concat(value));
      if (typeof value !== 'string') {
        throw error;
      }
      var number;
      try {
        number = new bignumber(value);
      } catch (e) {
        throw error;
      }

      // Infinity
      if (!number.isFinite()) {
        throw error;
      }

      // NaN
      if (number.isNaN()) {
        throw error;
      }
    }
  }, {
    key: "_validateTextValue",
    value: function _validateTextValue(value) {
      if (!src_xdr.Memo.armTypeForArm('text').isValid(value)) {
        throw new Error('Expects string, array or buffer, max 28 bytes');
      }
    }
  }, {
    key: "_validateHashValue",
    value: function _validateHashValue(value) {
      var error = new Error("Expects a 32 byte hash value or hex encoded string. Got ".concat(value));
      if (value === null || typeof value === 'undefined') {
        throw error;
      }
      var valueBuffer;
      if (typeof value === 'string') {
        if (!/^[0-9A-Fa-f]{64}$/g.test(value)) {
          throw error;
        }
        valueBuffer = memo_Buffer.from(value, 'hex');
      } else if (memo_Buffer.isBuffer(value)) {
        valueBuffer = memo_Buffer.from(value);
      } else {
        throw error;
      }
      if (!valueBuffer.length || valueBuffer.length !== 32) {
        throw error;
      }
    }

    /**
     * Returns an empty memo (`MemoNone`).
     * @returns {Memo}
     */
  }, {
    key: "none",
    value: function none() {
      return new Memo(MemoNone);
    }

    /**
     * Creates and returns a `MemoText` memo.
     * @param {string} text - memo text
     * @returns {Memo}
     */
  }, {
    key: "text",
    value: function text(_text) {
      return new Memo(MemoText, _text);
    }

    /**
     * Creates and returns a `MemoID` memo.
     * @param {string} id - 64-bit number represented as a string
     * @returns {Memo}
     */
  }, {
    key: "id",
    value: function id(_id) {
      return new Memo(MemoID, _id);
    }

    /**
     * Creates and returns a `MemoHash` memo.
     * @param {array|string} hash - 32 byte hash or hex encoded string
     * @returns {Memo}
     */
  }, {
    key: "hash",
    value: function hash(_hash) {
      return new Memo(MemoHash, _hash);
    }

    /**
     * Creates and returns a `MemoReturn` memo.
     * @param {array|string} hash - 32 byte hash or hex encoded string
     * @returns {Memo}
     */
  }, {
    key: "return",
    value: function _return(hash) {
      return new Memo(MemoReturn, hash);
    }
  }, {
    key: "fromXDRObject",
    value: function fromXDRObject(object) {
      switch (object.arm()) {
        case 'id':
          return Memo.id(object.value().toString());
        case 'text':
          return Memo.text(object.value());
        case 'hash':
          return Memo.hash(object.value());
        case 'retHash':
          return Memo["return"](object.value());
        default:
          break;
      }
      if (typeof object.value() === 'undefined') {
        return Memo.none();
      }
      throw new Error('Unknown type');
    }
  }]);
  return Memo;
}();
;// CONCATENATED MODULE: ./src/transaction.js
/* provided dependency */ var transaction_Buffer = __webpack_require__(8764)["Buffer"];
function transaction_typeof(obj) { "@babel/helpers - typeof"; return transaction_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, transaction_typeof(obj); }
function transaction_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function transaction_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, transaction_toPropertyKey(descriptor.key), descriptor); } }
function transaction_createClass(Constructor, protoProps, staticProps) { if (protoProps) transaction_defineProperties(Constructor.prototype, protoProps); if (staticProps) transaction_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function transaction_toPropertyKey(arg) { var key = transaction_toPrimitive(arg, "string"); return transaction_typeof(key) === "symbol" ? key : String(key); }
function transaction_toPrimitive(input, hint) { if (transaction_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (transaction_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (transaction_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








/**
 * Use {@link TransactionBuilder} to build a transaction object. If you have an
 * object or base64-encoded string of the transaction envelope XDR, use {@link
 * TransactionBuilder.fromXDR}.
 *
 * Once a Transaction has been created, its attributes and operations should not
 * be changed. You should only add signatures (using {@link Transaction#sign})
 * to a Transaction object before submitting to the network or forwarding on to
 * additional signers.
 *
 * @constructor
 *
 * @param {string|xdr.TransactionEnvelope} envelope - transaction envelope
 *     object or base64 encoded string
 * @param {string}  [networkPassphrase] - passphrase of the target stellar
 *     network (e.g. "Public Global Stellar Network ; September 2015")
 *
 * @extends TransactionBase
 */
var Transaction = /*#__PURE__*/function (_TransactionBase) {
  _inherits(Transaction, _TransactionBase);
  var _super = _createSuper(Transaction);
  function Transaction(envelope, networkPassphrase) {
    var _this;
    transaction_classCallCheck(this, Transaction);
    if (typeof envelope === 'string') {
      var buffer = transaction_Buffer.from(envelope, 'base64');
      envelope = src_xdr.TransactionEnvelope.fromXDR(buffer);
    }
    var envelopeType = envelope["switch"]();
    if (!(envelopeType === src_xdr.EnvelopeType.envelopeTypeTxV0() || envelopeType === src_xdr.EnvelopeType.envelopeTypeTx())) {
      throw new Error("Invalid TransactionEnvelope: expected an envelopeTypeTxV0 or envelopeTypeTx but received an ".concat(envelopeType.name, "."));
    }
    var txEnvelope = envelope.value();
    var tx = txEnvelope.tx();
    var fee = tx.fee().toString();
    var signatures = (txEnvelope.signatures() || []).slice();
    _this = _super.call(this, tx, signatures, fee, networkPassphrase);
    _this._envelopeType = envelopeType;
    _this._memo = tx.memo();
    _this._sequence = tx.seqNum().toString();
    switch (_this._envelopeType) {
      case src_xdr.EnvelopeType.envelopeTypeTxV0():
        _this._source = StrKey.encodeEd25519PublicKey(_this.tx.sourceAccountEd25519());
        break;
      default:
        _this._source = encodeMuxedAccountToAddress(_this.tx.sourceAccount());
        break;
    }
    var cond = null;
    var timeBounds = null;
    switch (_this._envelopeType) {
      case src_xdr.EnvelopeType.envelopeTypeTxV0():
        timeBounds = tx.timeBounds();
        break;
      case src_xdr.EnvelopeType.envelopeTypeTx():
        switch (tx.cond()["switch"]()) {
          case src_xdr.PreconditionType.precondTime():
            timeBounds = tx.cond().timeBounds();
            break;
          case src_xdr.PreconditionType.precondV2():
            cond = tx.cond().v2();
            timeBounds = cond.timeBounds();
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    if (timeBounds) {
      _this._timeBounds = {
        minTime: timeBounds.minTime().toString(),
        maxTime: timeBounds.maxTime().toString()
      };
    }
    if (cond) {
      var ledgerBounds = cond.ledgerBounds();
      if (ledgerBounds) {
        _this._ledgerBounds = {
          minLedger: ledgerBounds.minLedger(),
          maxLedger: ledgerBounds.maxLedger()
        };
      }
      var minSeq = cond.minSeqNum();
      if (minSeq) {
        _this._minAccountSequence = minSeq.toString();
      }
      _this._minAccountSequenceAge = cond.minSeqAge();
      _this._minAccountSequenceLedgerGap = cond.minSeqLedgerGap();
      _this._extraSigners = cond.extraSigners();
    }
    var operations = tx.operations() || [];
    _this._operations = operations.map(function (op) {
      return Operation.fromXDRObject(op);
    });
    return _this;
  }

  /**
   * @type {object}
   * @property {string} 64 bit unix timestamp
   * @property {string} 64 bit unix timestamp
   * @readonly
   */
  transaction_createClass(Transaction, [{
    key: "timeBounds",
    get: function get() {
      return this._timeBounds;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * @type {object}
     * @property {number} minLedger - smallest ledger bound (uint32)
     * @property {number} maxLedger - largest ledger bound (or 0 for inf)
     * @readonly
     */
  }, {
    key: "ledgerBounds",
    get: function get() {
      return this._ledgerBounds;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * @type {string} 64 bit account sequence
     * @readonly
     */
  }, {
    key: "minAccountSequence",
    get: function get() {
      return this._minAccountSequence;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * @type {number} 64 bit number of seconds
     * @readonly
     */
  }, {
    key: "minAccountSequenceAge",
    get: function get() {
      return this._minAccountSequenceAge;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * @type {number} 32 bit number of ledgers
     * @readonly
     */
  }, {
    key: "minAccountSequenceLedgerGap",
    get: function get() {
      return this._minAccountSequenceLedgerGap;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * @type {string[]}   array of extra signers (@{link StrKey}s)
     * @readonly
     */
  }, {
    key: "extraSigners",
    get: function get() {
      return this._extraSigners;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * @type {string}
     * @readonly
     */
  }, {
    key: "sequence",
    get: function get() {
      return this._sequence;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * @type {string}
     * @readonly
     */
  }, {
    key: "source",
    get: function get() {
      return this._source;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * @type {Array.<xdr.Operation>}
     * @readonly
     */
  }, {
    key: "operations",
    get: function get() {
      return this._operations;
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * @type {string}
     * @readonly
     */
  }, {
    key: "memo",
    get: function get() {
      return Memo.fromXDRObject(this._memo);
    },
    set: function set(value) {
      throw new Error('Transaction is immutable');
    }

    /**
     * Returns the "signature base" of this transaction, which is the value
     * that, when hashed, should be signed to create a signature that
     * validators on the Stellar Network will accept.
     *
     * It is composed of a 4 prefix bytes followed by the xdr-encoded form
     * of this transaction.
     * @returns {Buffer}
     */
  }, {
    key: "signatureBase",
    value: function signatureBase() {
      var tx = this.tx;

      // Backwards Compatibility: Use ENVELOPE_TYPE_TX to sign ENVELOPE_TYPE_TX_V0
      // we need a Transaction to generate the signature base
      if (this._envelopeType === src_xdr.EnvelopeType.envelopeTypeTxV0()) {
        tx = src_xdr.Transaction.fromXDR(transaction_Buffer.concat([
        // TransactionV0 is a transaction with the AccountID discriminant
        // stripped off, we need to put it back to build a valid transaction
        // which we can use to build a TransactionSignaturePayloadTaggedTransaction
        src_xdr.PublicKeyType.publicKeyTypeEd25519().toXDR(), tx.toXDR()]));
      }
      var taggedTransaction = new src_xdr.TransactionSignaturePayloadTaggedTransaction.envelopeTypeTx(tx);
      var txSignature = new src_xdr.TransactionSignaturePayload({
        networkId: src_xdr.Hash.fromXDR(hashing_hash(this.networkPassphrase)),
        taggedTransaction: taggedTransaction
      });
      return txSignature.toXDR();
    }

    /**
     * To envelope returns a xdr.TransactionEnvelope which can be submitted to the network.
     * @returns {xdr.TransactionEnvelope}
     */
  }, {
    key: "toEnvelope",
    value: function toEnvelope() {
      var rawTx = this.tx.toXDR();
      var signatures = this.signatures.slice(); // make a copy of the signatures

      var envelope;
      switch (this._envelopeType) {
        case src_xdr.EnvelopeType.envelopeTypeTxV0():
          envelope = new src_xdr.TransactionEnvelope.envelopeTypeTxV0(new src_xdr.TransactionV0Envelope({
            tx: src_xdr.TransactionV0.fromXDR(rawTx),
            // make a copy of tx
            signatures: signatures
          }));
          break;
        case src_xdr.EnvelopeType.envelopeTypeTx():
          envelope = new src_xdr.TransactionEnvelope.envelopeTypeTx(new src_xdr.TransactionV1Envelope({
            tx: src_xdr.Transaction.fromXDR(rawTx),
            // make a copy of tx
            signatures: signatures
          }));
          break;
        default:
          throw new Error("Invalid TransactionEnvelope: expected an envelopeTypeTxV0 or envelopeTypeTx but received an ".concat(this._envelopeType.name, "."));
      }
      return envelope;
    }

    /**
     * Calculate the claimable balance ID for an operation within the transaction.
     *
     * @param   {integer}  opIndex   the index of the CreateClaimableBalance op
     * @returns {string}   a hex string representing the claimable balance ID
     *
     * @throws {RangeError}   for invalid `opIndex` value
     * @throws {TypeError}    if op at `opIndex` is not `CreateClaimableBalance`
     * @throws for general XDR un/marshalling failures
     *
     * @see https://github.com/stellar/go/blob/d712346e61e288d450b0c08038c158f8848cc3e4/txnbuild/transaction.go#L392-L435
     *
     */
  }, {
    key: "getClaimableBalanceId",
    value: function getClaimableBalanceId(opIndex) {
      // Validate and then extract the operation from the transaction.
      if (!Number.isInteger(opIndex) || opIndex < 0 || opIndex >= this.operations.length) {
        throw new RangeError('invalid operation index');
      }
      var op = this.operations[opIndex];
      try {
        op = Operation.createClaimableBalance(op);
      } catch (err) {
        throw new TypeError("expected createClaimableBalance, got ".concat(op.type, ": ").concat(err));
      }

      // Always use the transaction's *unmuxed* source.
      var account = StrKey.decodeEd25519PublicKey(extractBaseAddress(this.source));
      var operationId = src_xdr.HashIdPreimage.envelopeTypeOpId(new src_xdr.HashIdPreimageOperationId({
        sourceAccount: src_xdr.AccountId.publicKeyTypeEd25519(account),
        seqNum: src_xdr.SequenceNumber.fromString(this.sequence),
        opNum: opIndex
      }));
      var opIdHash = hashing_hash(operationId.toXDR('raw'));
      var balanceId = src_xdr.ClaimableBalanceId.claimableBalanceIdTypeV0(opIdHash);
      return balanceId.toXDR('hex');
    }
  }]);
  return Transaction;
}(TransactionBase);
;// CONCATENATED MODULE: ./src/fee_bump_transaction.js
/* provided dependency */ var fee_bump_transaction_Buffer = __webpack_require__(8764)["Buffer"];
function fee_bump_transaction_typeof(obj) { "@babel/helpers - typeof"; return fee_bump_transaction_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, fee_bump_transaction_typeof(obj); }
function fee_bump_transaction_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function fee_bump_transaction_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, fee_bump_transaction_toPropertyKey(descriptor.key), descriptor); } }
function fee_bump_transaction_createClass(Constructor, protoProps, staticProps) { if (protoProps) fee_bump_transaction_defineProperties(Constructor.prototype, protoProps); if (staticProps) fee_bump_transaction_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function fee_bump_transaction_toPropertyKey(arg) { var key = fee_bump_transaction_toPrimitive(arg, "string"); return fee_bump_transaction_typeof(key) === "symbol" ? key : String(key); }
function fee_bump_transaction_toPrimitive(input, hint) { if (fee_bump_transaction_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (fee_bump_transaction_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function fee_bump_transaction_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) fee_bump_transaction_setPrototypeOf(subClass, superClass); }
function fee_bump_transaction_setPrototypeOf(o, p) { fee_bump_transaction_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return fee_bump_transaction_setPrototypeOf(o, p); }
function fee_bump_transaction_createSuper(Derived) { var hasNativeReflectConstruct = fee_bump_transaction_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = fee_bump_transaction_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = fee_bump_transaction_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return fee_bump_transaction_possibleConstructorReturn(this, result); }; }
function fee_bump_transaction_possibleConstructorReturn(self, call) { if (call && (fee_bump_transaction_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return fee_bump_transaction_assertThisInitialized(self); }
function fee_bump_transaction_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function fee_bump_transaction_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function fee_bump_transaction_getPrototypeOf(o) { fee_bump_transaction_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return fee_bump_transaction_getPrototypeOf(o); }






/**
 * Use {@link TransactionBuilder.buildFeeBumpTransaction} to build a
 * FeeBumpTransaction object. If you have an object or base64-encoded string of
 * the transaction envelope XDR use {@link TransactionBuilder.fromXDR}.
 *
 * Once a {@link FeeBumpTransaction} has been created, its attributes and operations
 * should not be changed. You should only add signatures (using {@link FeeBumpTransaction#sign}) before
 * submitting to the network or forwarding on to additional signers.
 *
 * @param {string|xdr.TransactionEnvelope} envelope - transaction envelope
 *     object or base64 encoded string.
 * @param {string} networkPassphrase - passphrase of the target Stellar network
 *     (e.g. "Public Global Stellar Network ; September 2015").
 *
 * @extends TransactionBase
 */
var FeeBumpTransaction = /*#__PURE__*/function (_TransactionBase) {
  fee_bump_transaction_inherits(FeeBumpTransaction, _TransactionBase);
  var _super = fee_bump_transaction_createSuper(FeeBumpTransaction);
  function FeeBumpTransaction(envelope, networkPassphrase) {
    var _this;
    fee_bump_transaction_classCallCheck(this, FeeBumpTransaction);
    if (typeof envelope === 'string') {
      var buffer = fee_bump_transaction_Buffer.from(envelope, 'base64');
      envelope = src_xdr.TransactionEnvelope.fromXDR(buffer);
    }
    var envelopeType = envelope["switch"]();
    if (envelopeType !== src_xdr.EnvelopeType.envelopeTypeTxFeeBump()) {
      throw new Error("Invalid TransactionEnvelope: expected an envelopeTypeTxFeeBump but received an ".concat(envelopeType.name, "."));
    }
    var txEnvelope = envelope.value();
    var tx = txEnvelope.tx();
    var fee = tx.fee().toString();
    // clone signatures
    var signatures = (txEnvelope.signatures() || []).slice();
    _this = _super.call(this, tx, signatures, fee, networkPassphrase);
    var innerTxEnvelope = src_xdr.TransactionEnvelope.envelopeTypeTx(tx.innerTx().v1());
    _this._feeSource = encodeMuxedAccountToAddress(_this.tx.feeSource());
    _this._innerTransaction = new Transaction(innerTxEnvelope, networkPassphrase);
    return _this;
  }

  /**
   * @type {Transaction}
   * @readonly
   */
  fee_bump_transaction_createClass(FeeBumpTransaction, [{
    key: "innerTransaction",
    get: function get() {
      return this._innerTransaction;
    }

    /**
     * @type {string}
     * @readonly
     */
  }, {
    key: "feeSource",
    get: function get() {
      return this._feeSource;
    }

    /**
     * Returns the "signature base" of this transaction, which is the value
     * that, when hashed, should be signed to create a signature that
     * validators on the Stellar Network will accept.
     *
     * It is composed of a 4 prefix bytes followed by the xdr-encoded form
     * of this transaction.
     * @returns {Buffer}
     */
  }, {
    key: "signatureBase",
    value: function signatureBase() {
      var taggedTransaction = new src_xdr.TransactionSignaturePayloadTaggedTransaction.envelopeTypeTxFeeBump(this.tx);
      var txSignature = new src_xdr.TransactionSignaturePayload({
        networkId: src_xdr.Hash.fromXDR(hashing_hash(this.networkPassphrase)),
        taggedTransaction: taggedTransaction
      });
      return txSignature.toXDR();
    }

    /**
     * To envelope returns a xdr.TransactionEnvelope which can be submitted to the network.
     * @returns {xdr.TransactionEnvelope}
     */
  }, {
    key: "toEnvelope",
    value: function toEnvelope() {
      var envelope = new src_xdr.FeeBumpTransactionEnvelope({
        tx: src_xdr.FeeBumpTransaction.fromXDR(this.tx.toXDR()),
        // make a copy of the tx
        signatures: this.signatures.slice() // make a copy of the signatures
      });

      return new src_xdr.TransactionEnvelope.envelopeTypeTxFeeBump(envelope);
    }
  }]);
  return FeeBumpTransaction;
}(TransactionBase);
;// CONCATENATED MODULE: ./src/signerkey.js
function signerkey_typeof(obj) { "@babel/helpers - typeof"; return signerkey_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, signerkey_typeof(obj); }
function signerkey_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function signerkey_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, signerkey_toPropertyKey(descriptor.key), descriptor); } }
function signerkey_createClass(Constructor, protoProps, staticProps) { if (protoProps) signerkey_defineProperties(Constructor.prototype, protoProps); if (staticProps) signerkey_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function signerkey_toPropertyKey(arg) { var key = signerkey_toPrimitive(arg, "string"); return signerkey_typeof(key) === "symbol" ? key : String(key); }
function signerkey_toPrimitive(input, hint) { if (signerkey_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (signerkey_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/**
 * A container class with helpers to convert between signer keys
 * (`xdr.SignerKey`) and {@link StrKey}s.
 *
 * It's primarly used for manipulating the `extraSigners` precondition on a
 * {@link Transaction}.
 *
 * @see {@link TransactionBuilder.setExtraSigners}
 */
var SignerKey = /*#__PURE__*/function () {
  function SignerKey() {
    signerkey_classCallCheck(this, SignerKey);
  }
  signerkey_createClass(SignerKey, null, [{
    key: "decodeAddress",
    value:
    /**
     * Decodes a StrKey address into an xdr.SignerKey instance.
     *
     * Only ED25519 public keys (G...), pre-auth transactions (T...), hashes
     * (H...), and signed payloads (P...) can be signer keys.
     *
     * @param   {string} address  a StrKey-encoded signer address
     * @returns {xdr.SignerKey}
     */
    function decodeAddress(address) {
      var signerKeyMap = {
        ed25519PublicKey: src_xdr.SignerKey.signerKeyTypeEd25519,
        preAuthTx: src_xdr.SignerKey.signerKeyTypePreAuthTx,
        sha256Hash: src_xdr.SignerKey.signerKeyTypeHashX,
        signedPayload: src_xdr.SignerKey.signerKeyTypeEd25519SignedPayload
      };
      var vb = StrKey.getVersionByteForPrefix(address);
      var encoder = signerKeyMap[vb];
      if (!encoder) {
        throw new Error("invalid signer key type (".concat(vb, ")"));
      }
      var raw = decodeCheck(vb, address);
      switch (vb) {
        case 'signedPayload':
          return encoder(new src_xdr.SignerKeyEd25519SignedPayload({
            ed25519: raw.slice(0, 32),
            payload: raw.slice(32 + 4)
          }));
        case 'ed25519PublicKey': // falls through
        case 'preAuthTx': // falls through
        case 'sha256Hash': // falls through
        default:
          return encoder(raw);
      }
    }

    /**
     * Encodes a signer key into its StrKey equivalent.
     *
     * @param   {xdr.SignerKey} signerKey   the signer
     * @returns {string} the StrKey representation of the signer
     */
  }, {
    key: "encodeSignerKey",
    value: function encodeSignerKey(signerKey) {
      var strkeyType;
      var raw;
      switch (signerKey["switch"]()) {
        case src_xdr.SignerKeyType.signerKeyTypeEd25519():
          strkeyType = 'ed25519PublicKey';
          raw = signerKey.value();
          break;
        case src_xdr.SignerKeyType.signerKeyTypePreAuthTx():
          strkeyType = 'preAuthTx';
          raw = signerKey.value();
          break;
        case src_xdr.SignerKeyType.signerKeyTypeHashX():
          strkeyType = 'sha256Hash';
          raw = signerKey.value();
          break;
        case src_xdr.SignerKeyType.signerKeyTypeEd25519SignedPayload():
          strkeyType = 'signedPayload';
          raw = signerKey.ed25519SignedPayload().toXDR('raw');
          break;
        default:
          throw new Error("invalid SignerKey (type: ".concat(signerKey["switch"](), ")"));
      }
      return encodeCheck(strkeyType, raw);
    }
  }]);
  return SignerKey;
}();
;// CONCATENATED MODULE: ./src/transaction_builder.js
function transaction_builder_typeof(obj) { "@babel/helpers - typeof"; return transaction_builder_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, transaction_builder_typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || transaction_builder_unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function transaction_builder_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return transaction_builder_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return transaction_builder_arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return transaction_builder_arrayLikeToArray(arr); }
function transaction_builder_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function transaction_builder_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function transaction_builder_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? transaction_builder_ownKeys(Object(source), !0).forEach(function (key) { transaction_builder_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : transaction_builder_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function transaction_builder_defineProperty(obj, key, value) { key = transaction_builder_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function transaction_builder_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function transaction_builder_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, transaction_builder_toPropertyKey(descriptor.key), descriptor); } }
function transaction_builder_createClass(Constructor, protoProps, staticProps) { if (protoProps) transaction_builder_defineProperties(Constructor.prototype, protoProps); if (staticProps) transaction_builder_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function transaction_builder_toPropertyKey(arg) { var key = transaction_builder_toPrimitive(arg, "string"); return transaction_builder_typeof(key) === "symbol" ? key : String(key); }
function transaction_builder_toPrimitive(input, hint) { if (transaction_builder_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (transaction_builder_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }









/**
 * Minimum base fee for transactions. If this fee is below the network
 * minimum, the transaction will fail. The more operations in the
 * transaction, the greater the required fee. Use {@link
 * Server#fetchBaseFee} to get an accurate value of minimum transaction
 * fee on the network.
 *
 * @constant
 * @see [Fees](https://developers.stellar.org/docs/glossary/fees/)
 */
var BASE_FEE = '100'; // Stroops

/**
 * @constant
 * @see {@link TransactionBuilder#setTimeout}
 * @see [Timeout](https://developers.stellar.org/api/resources/transactions/post/)
 */
var TimeoutInfinite = 0;

/**
 * <p>Transaction builder helps constructs a new `{@link Transaction}` using the
 * given {@link Account} as the transaction's "source account". The transaction
 * will use the current sequence number of the given account as its sequence
 * number and increment the given account's sequence number by one. The given
 * source account must include a private key for signing the transaction or an
 * error will be thrown.</p>
 *
 * <p>Operations can be added to the transaction via their corresponding builder
 * methods, and each returns the TransactionBuilder object so they can be
 * chained together. After adding the desired operations, call the `build()`
 * method on the `TransactionBuilder` to return a fully constructed `{@link
 * Transaction}` that can be signed. The returned transaction will contain the
 * sequence number of the source account and include the signature from the
 * source account.</p>
 *
 * <p><strong>Be careful about unsubmitted transactions!</strong> When you build
 * a transaction, stellar-sdk automatically increments the source account's
 * sequence number. If you end up not submitting this transaction and submitting
 * another one instead, it'll fail due to the sequence number being wrong. So if
 * you decide not to use a built transaction, make sure to update the source
 * account's sequence number with
 * [Server.loadAccount](https://stellar.github.io/js-stellar-sdk/Server.html#loadAccount)
 * before creating another transaction.</p>
 *
 * <p>The following code example creates a new transaction with {@link
 * Operation.createAccount} and {@link Operation.payment} operations. The
 * Transaction's source account first funds `destinationA`, then sends a payment
 * to `destinationB`. The built transaction is then signed by
 * `sourceKeypair`.</p>
 *
 * ```
 * var transaction = new TransactionBuilder(source, { fee, networkPassphrase: Networks.TESTNET })
 * .addOperation(Operation.createAccount({
 *     destination: destinationA,
 *     startingBalance: "20"
 * })) // <- funds and creates destinationA
 * .addOperation(Operation.payment({
 *     destination: destinationB,
 *     amount: "100",
 *     asset: Asset.native()
 * })) // <- sends 100 XLM to destinationB
 * .setTimeout(30)
 * .build();
 *
 * transaction.sign(sourceKeypair);
 * ```
 *
 * @constructor
 *
 * @param {Account} sourceAccount - source account for this transaction
 * @param {object}  opts          - Options object
 * @param {string}  opts.fee      - max fee you're willing to pay per
 *     operation in this transaction (**in stroops**)
 *
 * @param {object}              [opts.timebounds] - timebounds for the
 *     validity of this transaction
 * @param {number|string|Date}  [opts.timebounds.minTime] - 64-bit UNIX
 *     timestamp or Date object
 * @param {number|string|Date}  [opts.timebounds.maxTime] - 64-bit UNIX
 *     timestamp or Date object
 * @param {object}              [opts.ledgerbounds] - ledger bounds for the
 *     validity of this transaction
 * @param {number}              [opts.ledgerbounds.minLedger] - number of the minimum
 *     ledger sequence
 * @param {number}              [opts.ledgerbounds.maxLedger] - number of the maximum
 *     ledger sequence
 * @param {string}              [opts.minAccountSequence] - number for
 *     the minimum account sequence
 * @param {number}              [opts.minAccountSequenceAge] - number of
 *     seconds for the minimum account sequence age
 * @param {number}              [opts.minAccountSequenceLedgerGap] - number of
 *     ledgers for the minimum account sequence ledger gap
 * @param {string[]}            [opts.extraSigners] - list of the extra signers
 *     required for this transaction
 * @param {Memo}                [opts.memo] - memo for the transaction
 * @param {string}              [opts.networkPassphrase] passphrase of the
 *     target Stellar network (e.g. "Public Global Stellar Network ; September
 *     2015" for the pubnet)
 */
var TransactionBuilder = /*#__PURE__*/function () {
  function TransactionBuilder(sourceAccount) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    transaction_builder_classCallCheck(this, TransactionBuilder);
    if (!sourceAccount) {
      throw new Error('must specify source account for the transaction');
    }
    if (opts.fee === undefined) {
      throw new Error('must specify fee for the transaction (in stroops)');
    }
    this.source = sourceAccount;
    this.operations = [];
    this.baseFee = opts.fee;
    this.timebounds = opts.timebounds ? transaction_builder_objectSpread({}, opts.timebounds) : null;
    this.ledgerbounds = opts.ledgerbounds ? transaction_builder_objectSpread({}, opts.ledgerbounds) : null;
    this.minAccountSequence = opts.minAccountSequence || null;
    this.minAccountSequenceAge = opts.minAccountSequenceAge || null;
    this.minAccountSequenceLedgerGap = opts.minAccountSequenceLedgerGap || null;
    this.extraSigners = opts.extraSigners ? _toConsumableArray(opts.extraSigners) : null;
    this.memo = opts.memo || Memo.none();
    this.networkPassphrase = opts.networkPassphrase || null;
  }

  /**
   * Adds an operation to the transaction.
   *
   * @param {xdr.Operation} operation   The xdr operation object, use {@link
   *     Operation} static methods.
   *
   * @returns {TransactionBuilder}
   */
  transaction_builder_createClass(TransactionBuilder, [{
    key: "addOperation",
    value: function addOperation(operation) {
      this.operations.push(operation);
      return this;
    }

    /**
     * Adds a memo to the transaction.
     * @param {Memo} memo {@link Memo} object
     * @returns {TransactionBuilder}
     */
  }, {
    key: "addMemo",
    value: function addMemo(memo) {
      this.memo = memo;
      return this;
    }

    /**
     * Sets a timeout precondition on the transaction.
     *
     *  Because of the distributed nature of the Stellar network it is possible
     *  that the status of your transaction will be determined after a long time
     *  if the network is highly congested. If you want to be sure to receive the
     *  status of the transaction within a given period you should set the {@link
     *  TimeBounds} with `maxTime` on the transaction (this is what `setTimeout`
     *  does internally; if there's `minTime` set but no `maxTime` it will be
     *  added).
     *
     *  A call to `TransactionBuilder.setTimeout` is **required** if Transaction
     *  does not have `max_time` set. If you don't want to set timeout, use
     *  `{@link TimeoutInfinite}`. In general you should set `{@link
     *  TimeoutInfinite}` only in smart contracts.
     *
     *  Please note that Horizon may still return <code>504 Gateway Timeout</code>
     *  error, even for short timeouts. In such case you need to resubmit the same
     *  transaction again without making any changes to receive a status. This
     *  method is using the machine system time (UTC), make sure it is set
     *  correctly.
     *
     * @param {number} timeoutSeconds   Number of seconds the transaction is good.
     *     Can't be negative. If the value is {@link TimeoutInfinite}, the
     *     transaction is good indefinitely.
     *
     * @returns {TransactionBuilder}
     *
     * @see {@link TimeoutInfinite}
     * @see https://developers.stellar.org/docs/tutorials/handling-errors/
     */
  }, {
    key: "setTimeout",
    value: function setTimeout(timeoutSeconds) {
      if (this.timebounds !== null && this.timebounds.maxTime > 0) {
        throw new Error('TimeBounds.max_time has been already set - setting timeout would overwrite it.');
      }
      if (timeoutSeconds < 0) {
        throw new Error('timeout cannot be negative');
      }
      if (timeoutSeconds > 0) {
        var timeoutTimestamp = Math.floor(Date.now() / 1000) + timeoutSeconds;
        if (this.timebounds === null) {
          this.timebounds = {
            minTime: 0,
            maxTime: timeoutTimestamp
          };
        } else {
          this.timebounds = {
            minTime: this.timebounds.minTime,
            maxTime: timeoutTimestamp
          };
        }
      } else {
        this.timebounds = {
          minTime: 0,
          maxTime: 0
        };
      }
      return this;
    }

    /**
     * If you want to prepare a transaction which will become valid at some point
     * in the future, or be invalid after some time, you can set a timebounds
     * precondition. Internally this will set the `minTime`, and `maxTime`
     * preconditions. Conflicts with `setTimeout`, so use one or the other.
     *
     * @param {Date|number} minEpochOrDate  Either a JS Date object, or a number
     *     of UNIX epoch seconds. The transaction is valid after this timestamp.
     *     Can't be negative. If the value is `0`, the transaction is valid
     *     immediately.
     * @param {Date|number} maxEpochOrDate  Either a JS Date object, or a number
     *     of UNIX epoch seconds. The transaction is valid until this timestamp.
     *     Can't be negative. If the value is `0`, the transaction is valid
     *     indefinitely.
     *
     * @returns {TransactionBuilder}
     */
  }, {
    key: "setTimebounds",
    value: function setTimebounds(minEpochOrDate, maxEpochOrDate) {
      // Force it to a date type
      if (typeof minEpochOrDate === 'number') {
        minEpochOrDate = new Date(minEpochOrDate * 1000);
      }
      if (typeof maxEpochOrDate === 'number') {
        maxEpochOrDate = new Date(maxEpochOrDate * 1000);
      }
      if (this.timebounds !== null) {
        throw new Error('TimeBounds has been already set - setting timebounds would overwrite it.');
      }

      // Convert that date to the epoch seconds
      var minTime = Math.floor(minEpochOrDate.valueOf() / 1000);
      var maxTime = Math.floor(maxEpochOrDate.valueOf() / 1000);
      if (minTime < 0) {
        throw new Error('min_time cannot be negative');
      }
      if (maxTime < 0) {
        throw new Error('max_time cannot be negative');
      }
      if (maxTime > 0 && minTime > maxTime) {
        throw new Error('min_time cannot be greater than max_time');
      }
      this.timebounds = {
        minTime: minTime,
        maxTime: maxTime
      };
      return this;
    }

    /**
     * If you want to prepare a transaction which will only be valid within some
     * range of ledgers, you can set a ledgerbounds precondition.
     * Internally this will set the `minLedger` and `maxLedger` preconditions.
     *
     * @param {number} minLedger  The minimum ledger this transaction is valid at
     *     or after. Cannot be negative. If the value is `0` (the default), the
     *     transaction is valid immediately.
     *
     * @param {number} maxLedger  The maximum ledger this transaction is valid
     *     before. Cannot be negative. If the value is `0`, the transaction is
     *     valid indefinitely.
     *
     * @returns {TransactionBuilder}
     */
  }, {
    key: "setLedgerbounds",
    value: function setLedgerbounds(minLedger, maxLedger) {
      if (this.ledgerbounds !== null) {
        throw new Error('LedgerBounds has been already set - setting ledgerbounds would overwrite it.');
      }
      if (minLedger < 0) {
        throw new Error('min_ledger cannot be negative');
      }
      if (maxLedger < 0) {
        throw new Error('max_ledger cannot be negative');
      }
      if (maxLedger > 0 && minLedger > maxLedger) {
        throw new Error('min_ledger cannot be greater than max_ledger');
      }
      this.ledgerbounds = {
        minLedger: minLedger,
        maxLedger: maxLedger
      };
      return this;
    }

    /**
     * If you want to prepare a transaction which will be valid only while the
     * account sequence number is
     *
     *     minAccountSequence <= sourceAccountSequence < tx.seqNum
     *
     * Note that after execution the account's sequence number is always raised to
     * `tx.seqNum`. Internally this will set the `minAccountSequence`
     * precondition.
     *
     * @param {string} minAccountSequence   The minimum source account sequence
     *     number this transaction is valid for. If the value is `0` (the
     *     default), the transaction is valid when `sourceAccount's sequence
     *     number == tx.seqNum- 1`.
     *
     * @returns {TransactionBuilder}
     */
  }, {
    key: "setMinAccountSequence",
    value: function setMinAccountSequence(minAccountSequence) {
      if (this.minAccountSequence !== null) {
        throw new Error('min_account_sequence has been already set - setting min_account_sequence would overwrite it.');
      }
      this.minAccountSequence = minAccountSequence;
      return this;
    }

    /**
     * For the transaction to be valid, the current ledger time must be at least
     * `minAccountSequenceAge` greater than sourceAccount's `sequenceTime`.
     * Internally this will set the `minAccountSequenceAge` precondition.
     *
     * @param {number} durationInSeconds  The minimum amount of time between
     *     source account sequence time and the ledger time when this transaction
     *     will become valid. If the value is `0`, the transaction is unrestricted
     *     by the account sequence age. Cannot be negative.
     *
     * @returns {TransactionBuilder}
     */
  }, {
    key: "setMinAccountSequenceAge",
    value: function setMinAccountSequenceAge(durationInSeconds) {
      if (typeof durationInSeconds !== 'number') {
        throw new Error('min_account_sequence_age must be a number');
      }
      if (this.minAccountSequenceAge !== null) {
        throw new Error('min_account_sequence_age has been already set - setting min_account_sequence_age would overwrite it.');
      }
      if (durationInSeconds < 0) {
        throw new Error('min_account_sequence_age cannot be negative');
      }
      this.minAccountSequenceAge = durationInSeconds;
      return this;
    }

    /**
     * For the transaction to be valid, the current ledger number must be at least
     * `minAccountSequenceLedgerGap` greater than sourceAccount's ledger sequence.
     * Internally this will set the `minAccountSequenceLedgerGap` precondition.
     *
     * @param {number} gap  The minimum number of ledgers between source account
     *     sequence and the ledger number when this transaction will become valid.
     *     If the value is `0`, the transaction is unrestricted by the account
     *     sequence ledger. Cannot be negative.
     *
     * @returns {TransactionBuilder}
     */
  }, {
    key: "setMinAccountSequenceLedgerGap",
    value: function setMinAccountSequenceLedgerGap(gap) {
      if (this.minAccountSequenceLedgerGap !== null) {
        throw new Error('min_account_sequence_ledger_gap has been already set - setting min_account_sequence_ledger_gap would overwrite it.');
      }
      if (gap < 0) {
        throw new Error('min_account_sequence_ledger_gap cannot be negative');
      }
      this.minAccountSequenceLedgerGap = gap;
      return this;
    }

    /**
     * For the transaction to be valid, there must be a signature corresponding to
     * every Signer in this array, even if the signature is not otherwise required
     * by the sourceAccount or operations. Internally this will set the
     * `extraSigners` precondition.
     *
     * @param {string[]} extraSigners   required extra signers (as {@link StrKey}s)
     *
     * @returns {TransactionBuilder}
     */
  }, {
    key: "setExtraSigners",
    value: function setExtraSigners(extraSigners) {
      if (!Array.isArray(extraSigners)) {
        throw new Error('extra_signers must be an array of strings.');
      }
      if (this.extraSigners !== null) {
        throw new Error('extra_signers has been already set - setting extra_signers would overwrite it.');
      }
      if (extraSigners.length > 2) {
        throw new Error('extra_signers cannot be longer than 2 elements.');
      }
      this.extraSigners = _toConsumableArray(extraSigners);
      return this;
    }

    /**
     * Set network nassphrase for the Transaction that will be built.
     *
     * @param {string} networkPassphrase    passphrase of the target Stellar
     *     network (e.g. "Public Global Stellar Network ; September 2015").
     *
     * @returns {TransactionBuilder}
     */
  }, {
    key: "setNetworkPassphrase",
    value: function setNetworkPassphrase(networkPassphrase) {
      this.networkPassphrase = networkPassphrase;
      return this;
    }

    /**
     * This will build the transaction.
     * It will also increment the source account's sequence number by 1.
     * @returns {Transaction} This method will return the built {@link Transaction}.
     */
  }, {
    key: "build",
    value: function build() {
      var sequenceNumber = new bignumber(this.source.sequenceNumber()).plus(1);
      var fee = new bignumber(this.baseFee).times(this.operations.length).toNumber();
      var attrs = {
        fee: fee,
        seqNum: src_xdr.SequenceNumber.fromString(sequenceNumber.toString()),
        memo: this.memo ? this.memo.toXDRObject() : null
      };
      if (this.timebounds === null || typeof this.timebounds.minTime === 'undefined' || typeof this.timebounds.maxTime === 'undefined') {
        throw new Error('TimeBounds has to be set or you must call setTimeout(TimeoutInfinite).');
      }
      if (isValidDate(this.timebounds.minTime)) {
        this.timebounds.minTime = this.timebounds.minTime.getTime() / 1000;
      }
      if (isValidDate(this.timebounds.maxTime)) {
        this.timebounds.maxTime = this.timebounds.maxTime.getTime() / 1000;
      }
      this.timebounds.minTime = xdr.UnsignedHyper.fromString(this.timebounds.minTime.toString());
      this.timebounds.maxTime = xdr.UnsignedHyper.fromString(this.timebounds.maxTime.toString());
      var timeBounds = new src_xdr.TimeBounds(this.timebounds);
      if (this.hasV2Preconditions()) {
        var ledgerBounds = null;
        if (this.ledgerbounds !== null) {
          ledgerBounds = new src_xdr.LedgerBounds(this.ledgerbounds);
        }
        var minSeqNum = this.minAccountSequence || '0';
        minSeqNum = src_xdr.SequenceNumber.fromString(minSeqNum);
        var minSeqAge = xdr.UnsignedHyper.fromString(this.minAccountSequenceAge !== null ? this.minAccountSequenceAge.toString() : '0');
        var minSeqLedgerGap = this.minAccountSequenceLedgerGap || 0;
        var extraSigners = this.extraSigners !== null ? this.extraSigners.map(SignerKey.decodeAddress) : [];
        attrs.cond = src_xdr.Preconditions.precondV2(new src_xdr.PreconditionsV2({
          timeBounds: timeBounds,
          ledgerBounds: ledgerBounds,
          minSeqNum: minSeqNum,
          minSeqAge: minSeqAge,
          minSeqLedgerGap: minSeqLedgerGap,
          extraSigners: extraSigners
        }));
      } else {
        attrs.cond = src_xdr.Preconditions.precondTime(timeBounds);
      }
      attrs.sourceAccount = decodeAddressToMuxedAccount(this.source.accountId());
      attrs.ext = new src_xdr.TransactionExt(0);
      var xtx = new src_xdr.Transaction(attrs);
      xtx.operations(this.operations);
      var txEnvelope = new src_xdr.TransactionEnvelope.envelopeTypeTx(new src_xdr.TransactionV1Envelope({
        tx: xtx
      }));
      var tx = new Transaction(txEnvelope, this.networkPassphrase);
      this.source.incrementSequenceNumber();
      return tx;
    }
  }, {
    key: "hasV2Preconditions",
    value: function hasV2Preconditions() {
      return this.ledgerbounds !== null || this.minAccountSequence !== null || this.minAccountSequenceAge !== null || this.minAccountSequenceLedgerGap !== null || this.extraSigners !== null && this.extraSigners.length > 0;
    }

    /**
     * Builds a {@link FeeBumpTransaction}, enabling you to resubmit an existing
     * transaction with a higher fee.
     *
     * @param {Keypair|string}  feeSource - account paying for the transaction,
     *     in the form of either a Keypair (only the public key is used) or
     *     an account ID (in G... or M... form, but refer to `withMuxing`)
     * @param {string}          baseFee   - max fee willing to pay per operation
     *     in inner transaction (**in stroops**)
     * @param {Transaction}     innerTx   - {@link Transaction} to be bumped by
     *     the fee bump transaction
     * @param {string}          networkPassphrase - passphrase of the target
     *     Stellar network (e.g. "Public Global Stellar Network ; September 2015",
     *     see {@link Networks})
     *
     * @todo Alongside the next major version bump, this type signature can be
     *       changed to be less awkward: accept a MuxedAccount as the `feeSource`
     *       rather than a keypair or string.
     *
     * @note Your fee-bump amount should be >= 10x the original fee.
     * @see  https://developers.stellar.org/docs/glossary/fee-bumps/#replace-by-fee
     *
     * @returns {FeeBumpTransaction}
     */
  }], [{
    key: "buildFeeBumpTransaction",
    value: function buildFeeBumpTransaction(feeSource, baseFee, innerTx, networkPassphrase) {
      var innerOps = innerTx.operations.length;
      var innerBaseFeeRate = new bignumber(innerTx.fee).div(innerOps);
      var base = new bignumber(baseFee);

      // The fee rate for fee bump is at least the fee rate of the inner transaction
      if (base.lt(innerBaseFeeRate)) {
        throw new Error("Invalid baseFee, it should be at least ".concat(innerBaseFeeRate, " stroops."));
      }
      var minBaseFee = new bignumber(BASE_FEE);

      // The fee rate is at least the minimum fee
      if (base.lt(minBaseFee)) {
        throw new Error("Invalid baseFee, it should be at least ".concat(minBaseFee, " stroops."));
      }
      var innerTxEnvelope = innerTx.toEnvelope();
      if (innerTxEnvelope["switch"]() === src_xdr.EnvelopeType.envelopeTypeTxV0()) {
        var v0Tx = innerTxEnvelope.v0().tx();
        var v1Tx = new src_xdr.Transaction({
          sourceAccount: new src_xdr.MuxedAccount.keyTypeEd25519(v0Tx.sourceAccountEd25519()),
          fee: v0Tx.fee(),
          seqNum: v0Tx.seqNum(),
          cond: src_xdr.Preconditions.precondTime(v0Tx.timeBounds()),
          memo: v0Tx.memo(),
          operations: v0Tx.operations(),
          ext: new src_xdr.TransactionExt(0)
        });
        innerTxEnvelope = new src_xdr.TransactionEnvelope.envelopeTypeTx(new src_xdr.TransactionV1Envelope({
          tx: v1Tx,
          signatures: innerTxEnvelope.v0().signatures()
        }));
      }
      var feeSourceAccount;
      if (typeof feeSource === 'string') {
        feeSourceAccount = decodeAddressToMuxedAccount(feeSource);
      } else {
        feeSourceAccount = feeSource.xdrMuxedAccount();
      }
      var tx = new src_xdr.FeeBumpTransaction({
        feeSource: feeSourceAccount,
        fee: src_xdr.Int64.fromString(base.times(innerOps + 1).toString()),
        innerTx: src_xdr.FeeBumpTransactionInnerTx.envelopeTypeTx(innerTxEnvelope.v1()),
        ext: new src_xdr.FeeBumpTransactionExt(0)
      });
      var feeBumpTxEnvelope = new src_xdr.FeeBumpTransactionEnvelope({
        tx: tx,
        signatures: []
      });
      var envelope = new src_xdr.TransactionEnvelope.envelopeTypeTxFeeBump(feeBumpTxEnvelope);
      return new FeeBumpTransaction(envelope, networkPassphrase);
    }

    /**
     * Build a {@link Transaction} or {@link FeeBumpTransaction} from an
     * xdr.TransactionEnvelope.
     *
     * @param {string|xdr.TransactionEnvelope} envelope - The transaction envelope
     *     object or base64 encoded string.
     * @param {string} networkPassphrase - The network passphrase of the target
     *     Stellar network (e.g. "Public Global Stellar Network ; September
     *     2015"), see {@link Networks}.
     *
     * @returns {Transaction|FeeBumpTransaction}
     */
  }, {
    key: "fromXDR",
    value: function fromXDR(envelope, networkPassphrase) {
      if (typeof envelope === 'string') {
        envelope = src_xdr.TransactionEnvelope.fromXDR(envelope, 'base64');
      }
      if (envelope["switch"]() === src_xdr.EnvelopeType.envelopeTypeTxFeeBump()) {
        return new FeeBumpTransaction(envelope, networkPassphrase);
      }
      return new Transaction(envelope, networkPassphrase);
    }
  }]);
  return TransactionBuilder;
}();

/**
 * Checks whether a provided object is a valid Date.
 * @argument {Date} d date object
 * @returns {boolean}
 */
function isValidDate(d) {
  // isnan is okay here because it correctly checks for invalid date objects
  // eslint-disable-next-line no-restricted-globals
  return d instanceof Date && !isNaN(d);
}
;// CONCATENATED MODULE: ./src/account.js
function account_typeof(obj) { "@babel/helpers - typeof"; return account_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, account_typeof(obj); }
function account_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function account_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, account_toPropertyKey(descriptor.key), descriptor); } }
function account_createClass(Constructor, protoProps, staticProps) { if (protoProps) account_defineProperties(Constructor.prototype, protoProps); if (staticProps) account_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function account_toPropertyKey(arg) { var key = account_toPrimitive(arg, "string"); return account_typeof(key) === "symbol" ? key : String(key); }
function account_toPrimitive(input, hint) { if (account_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (account_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/**
 * Create a new Account object.
 *
 * `Account` represents a single account in the Stellar network and its sequence
 * number. Account tracks the sequence number as it is used by {@link
 * TransactionBuilder}. See
 * [Accounts](https://developers.stellar.org/docs/glossary/accounts/) for
 * more information about how accounts work in Stellar.
 *
 * @constructor
 *
 * @param {string} accountId - ID of the account (ex.
 *     `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`). If you
 *     provide a muxed account address, this will throw; use {@link
 *     MuxedAccount} instead.
 * @param {string} sequence  - current sequence number of the account
 */
var Account = /*#__PURE__*/function () {
  function Account(accountId, sequence) {
    account_classCallCheck(this, Account);
    if (StrKey.isValidMed25519PublicKey(accountId)) {
      throw new Error('accountId is an M-address; use MuxedAccount instead');
    }
    if (!StrKey.isValidEd25519PublicKey(accountId)) {
      throw new Error('accountId is invalid');
    }
    if (!(typeof sequence === 'string')) {
      throw new Error('sequence must be of type string');
    }
    this._accountId = accountId;
    this.sequence = new bignumber(sequence);
  }

  /**
   * Returns Stellar account ID, ex.
   * `GB3KJPLFUYN5VL6R3GU3EGCGVCKFDSD7BEDX42HWG5BWFKB3KQGJJRMA`.
   * @returns {string}
   */
  account_createClass(Account, [{
    key: "accountId",
    value: function accountId() {
      return this._accountId;
    }

    /**
     * @returns {string}  sequence number for the account as a string
     */
  }, {
    key: "sequenceNumber",
    value: function sequenceNumber() {
      return this.sequence.toString();
    }

    /**
     * Increments sequence number in this object by one.
     * @returns {void}
     */
  }, {
    key: "incrementSequenceNumber",
    value: function incrementSequenceNumber() {
      this.sequence = this.sequence.plus(1);
    }
  }]);
  return Account;
}();
;// CONCATENATED MODULE: ./src/muxed_account.js
function muxed_account_typeof(obj) { "@babel/helpers - typeof"; return muxed_account_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, muxed_account_typeof(obj); }
function muxed_account_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function muxed_account_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, muxed_account_toPropertyKey(descriptor.key), descriptor); } }
function muxed_account_createClass(Constructor, protoProps, staticProps) { if (protoProps) muxed_account_defineProperties(Constructor.prototype, protoProps); if (staticProps) muxed_account_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function muxed_account_toPropertyKey(arg) { var key = muxed_account_toPrimitive(arg, "string"); return muxed_account_typeof(key) === "symbol" ? key : String(key); }
function muxed_account_toPrimitive(input, hint) { if (muxed_account_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (muxed_account_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





/**
 * Represents a muxed account for transactions and operations.
 *
 * A muxed (or *multiplexed*) account (defined rigorously in
 * [CAP-27](https://stellar.org/protocol/cap-27) and briefly in
 * [SEP-23](https://stellar.org/protocol/sep-23)) is one that resolves a single
 * Stellar `G...`` account to many different underlying IDs.
 *
 * For example, you may have a single Stellar address for accounting purposes:
 *   GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVSGZ
 *
 * Yet would like to use it for 4 different family members:
 *   1: MA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUAAAAAAAAAAAAGZFQ
 *   2: MA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUAAAAAAAAAAAALIWQ
 *   3: MA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUAAAAAAAAAAAAPYHQ
 *   4: MA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUAAAAAAAAAAAAQLQQ
 *
 * This object makes it easy to create muxed accounts from regular accounts,
 * duplicate them, get/set the underlying IDs, etc. without mucking around with
 * the raw XDR.
 *
 * Because muxed accounts are purely an off-chain convention, they all share the
 * sequence number tied to their underlying G... account. Thus, this object
 * *requires* an {@link Account} instance to be passed in, so that muxed
 * instances of an account can collectively modify the sequence number whenever
 * a muxed account is used as the source of a @{link Transaction} with {@link
 * TransactionBuilder}.
 *
 * @constructor
 *
 * @param {Account}   account - the @{link Account} instance representing the
 *                              underlying G... address
 * @param {string}    id      - a stringified uint64 value that represents the
 *                              ID of the muxed account
 *
 * @link https://developers.stellar.org/docs/glossary/muxed-accounts/
 */
var MuxedAccount = /*#__PURE__*/function () {
  function MuxedAccount(baseAccount, id) {
    muxed_account_classCallCheck(this, MuxedAccount);
    var accountId = baseAccount.accountId();
    if (!StrKey.isValidEd25519PublicKey(accountId)) {
      throw new Error('accountId is invalid');
    }
    this.account = baseAccount;
    this._muxedXdr = encodeMuxedAccount(accountId, id);
    this._mAddress = encodeMuxedAccountToAddress(this._muxedXdr);
    this._id = id;
  }

  /**
   * Parses an M-address into a MuxedAccount object.
   *
   * @param  {string} mAddress    - an M-address to transform
   * @param  {string} sequenceNum - the sequence number of the underlying {@link
   *     Account}, to use for the underlying base account (@link
   *     MuxedAccount.baseAccount). If you're using the SDK, you can use
   *     `server.loadAccount` to fetch this if you don't know it.
   *
   * @return {MuxedAccount}
   */
  muxed_account_createClass(MuxedAccount, [{
    key: "baseAccount",
    value:
    /**
     * @return {Account} the underlying account object shared among all muxed
     *     accounts with this Stellar address
     */
    function baseAccount() {
      return this.account;
    }

    /**
     * @return {string} the M-address representing this account's (G-address, ID)
     */
  }, {
    key: "accountId",
    value: function accountId() {
      return this._mAddress;
    }
  }, {
    key: "id",
    value: function id() {
      return this._id;
    }
  }, {
    key: "setId",
    value: function setId(id) {
      if (typeof id !== 'string') {
        throw new Error('id should be a string representing a number (uint64)');
      }
      this._muxedXdr.med25519().id(src_xdr.Uint64.fromString(id));
      this._mAddress = encodeMuxedAccountToAddress(this._muxedXdr);
      this._id = id;
      return this;
    }

    /**
     * Accesses the underlying account's sequence number.
     * @return {string}  strigified sequence number for the underlying account
     */
  }, {
    key: "sequenceNumber",
    value: function sequenceNumber() {
      return this.account.sequenceNumber();
    }

    /**
     * Increments the underlying account's sequence number by one.
     * @return {void}
     */
  }, {
    key: "incrementSequenceNumber",
    value: function incrementSequenceNumber() {
      return this.account.incrementSequenceNumber();
    }

    /**
     * @return {xdr.MuxedAccount} the XDR object representing this muxed account's
     *     G-address and uint64 ID
     */
  }, {
    key: "toXDRObject",
    value: function toXDRObject() {
      return this._muxedXdr;
    }
  }, {
    key: "equals",
    value: function equals(otherMuxedAccount) {
      return this.accountId() === otherMuxedAccount.accountId();
    }
  }], [{
    key: "fromAddress",
    value: function fromAddress(mAddress, sequenceNum) {
      var muxedAccount = decodeAddressToMuxedAccount(mAddress);
      var gAddress = extractBaseAddress(mAddress);
      var id = muxedAccount.med25519().id().toString();
      return new MuxedAccount(new Account(gAddress, sequenceNum), id);
    }
  }]);
  return MuxedAccount;
}();
;// CONCATENATED MODULE: ./src/network.js
/**
 * Contains passphrases for common networks:
 * * `Networks.PUBLIC`: `Public Global Stellar Network ; September 2015`
 * * `Networks.TESTNET`: `Test SDF Network ; September 2015`
 * @type {{PUBLIC: string, TESTNET: string}}
 */
var Networks = {
  PUBLIC: 'Public Global Stellar Network ; September 2015',
  TESTNET: 'Test SDF Network ; September 2015'
};
;// CONCATENATED MODULE: ./src/index.js
/* module decorator */ module = __webpack_require__.hmd(module);
/* eslint-disable import/no-import-module-exports */


bignumber.DEBUG = true; // gives us exceptions on bad constructor values























/* harmony default export */ const src = (module.exports);

/***/ }),

/***/ 6906:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


/**
 * Generate a character map.
 * @param {string} alphabet e.g. "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
 * @param {object} mappings map overrides from key to value
 * @method
 */

var charmap = function (alphabet, mappings) {
  mappings || (mappings = {});
  alphabet.split("").forEach(function (c, i) {
    if (!(c in mappings)) mappings[c] = i;
  });
  return mappings;
}

/**
 * The RFC 4648 base 32 alphabet and character map.
 * @see {@link https://tools.ietf.org/html/rfc4648}
 */

var rfc4648 = {
  alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
  charmap: {
    0: 14,
    1: 8
  }
};

rfc4648.charmap = charmap(rfc4648.alphabet, rfc4648.charmap);

/**
 * The Crockford base 32 alphabet and character map.
 * @see {@link http://www.crockford.com/wrmg/base32.html}
 */

var crockford = {
  alphabet: "0123456789ABCDEFGHJKMNPQRSTVWXYZ",
  charmap: {
    O: 0,
    I: 1,
    L: 1
  }
};

crockford.charmap = charmap(crockford.alphabet, crockford.charmap);

/**
 * base32hex
 * @see {@link https://en.wikipedia.org/wiki/Base32#base32hex}
 */

var base32hex = {
  alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
  charmap: {}
};

base32hex.charmap = charmap(base32hex.alphabet, base32hex.charmap);

/**
 * Create a new `Decoder` with the given options.
 *
 * @param {object} [options]
 *   @param {string} [type] Supported Base-32 variants are "rfc4648" and
 *     "crockford".
 *   @param {object} [charmap] Override the character map used in decoding.
 * @constructor
 */

function Decoder (options) {
  this.buf = [];
  this.shift = 8;
  this.carry = 0;

  if (options) {

    switch (options.type) {
      case "rfc4648":
        this.charmap = exports.rfc4648.charmap;
        break;
      case "crockford":
        this.charmap = exports.crockford.charmap;
        break;
      case "base32hex":
        this.charmap = exports.base32hex.charmap;
        break;
      default:
        throw new Error("invalid type");
    }

    if (options.charmap) this.charmap = options.charmap;
  }
}

/**
 * The default character map coresponds to RFC4648.
 */

Decoder.prototype.charmap = rfc4648.charmap;

/**
 * Decode a string, continuing from the previous state.
 *
 * @param {string} str
 * @return {Decoder} this
 */

Decoder.prototype.write = function (str) {
  var charmap = this.charmap;
  var buf = this.buf;
  var shift = this.shift;
  var carry = this.carry;

  // decode string
  str.toUpperCase().split("").forEach(function (char) {

    // ignore padding
    if (char == "=") return;

    // lookup symbol
    var symbol = charmap[char] & 0xff;

    // 1: 00000 000
    // 2:          00 00000 0
    // 3:                    0000 0000
    // 4:                             0 00000 00
    // 5:                                       000 00000
    // 6:                                                00000 000
    // 7:                                                         00 00000 0

    shift -= 5;
    if (shift > 0) {
      carry |= symbol << shift;
    } else if (shift < 0) {
      buf.push(carry | (symbol >> -shift));
      shift += 8;
      carry = (symbol << shift) & 0xff;
    } else {
      buf.push(carry | symbol);
      shift = 8;
      carry = 0;
    }
  });

  // save state
  this.shift = shift;
  this.carry = carry;

  // for chaining
  return this;
};

/**
 * Finish decoding.
 *
 * @param {string} [str] The final string to decode.
 * @return {Array} Decoded byte array.
 */

Decoder.prototype.finalize = function (str) {
  if (str) {
    this.write(str);
  }
  if (this.shift !== 8 && this.carry !== 0) {
    this.buf.push(this.carry);
    this.shift = 8;
    this.carry = 0;
  }
  return this.buf;
};

/**
 * Create a new `Encoder` with the given options.
 *
 * @param {object} [options]
 *   @param {string} [type] Supported Base-32 variants are "rfc4648" and
 *     "crockford".
 *   @param {object} [alphabet] Override the alphabet used in encoding.
 * @constructor
 */

function Encoder (options) {
  this.buf = "";
  this.shift = 3;
  this.carry = 0;

  if (options) {

    switch (options.type) {
      case "rfc4648":
        this.alphabet = exports.rfc4648.alphabet;
        break;
      case "crockford":
        this.alphabet = exports.crockford.alphabet;
        break;
      case "base32hex":
        this.alphabet = exports.base32hex.alphabet;
        break;
      default:
        throw new Error("invalid type");
    }

    if (options.alphabet) this.alphabet = options.alphabet;
    else if (options.lc) this.alphabet = this.alphabet.toLowerCase();
  }
}

/**
 * The default alphabet coresponds to RFC4648.
 */

Encoder.prototype.alphabet = rfc4648.alphabet;

/**
 * Encode a byte array, continuing from the previous state.
 *
 * @param {byte[]} buf The byte array to encode.
 * @return {Encoder} this
 */

Encoder.prototype.write = function (buf) {
  var shift = this.shift;
  var carry = this.carry;
  var symbol;
  var byte;
  var i;

  // encode each byte in buf
  for (i = 0; i < buf.length; i++) {
    byte = buf[i];

    // 1: 00000 000
    // 2:          00 00000 0
    // 3:                    0000 0000
    // 4:                             0 00000 00
    // 5:                                       000 00000
    // 6:                                                00000 000
    // 7:                                                         00 00000 0

    symbol = carry | (byte >> shift);
    this.buf += this.alphabet[symbol & 0x1f];

    if (shift > 5) {
      shift -= 5;
      symbol = byte >> shift;
      this.buf += this.alphabet[symbol & 0x1f];
    }

    shift = 5 - shift;
    carry = byte << shift;
    shift = 8 - shift;
  }

  // save state
  this.shift = shift;
  this.carry = carry;

  // for chaining
  return this;
};

/**
 * Finish encoding.
 *
 * @param {byte[]} [buf] The final byte array to encode.
 * @return {string} The encoded byte array.
 */

Encoder.prototype.finalize = function (buf) {
  if (buf) {
    this.write(buf);
  }
  if (this.shift !== 3) {
    this.buf += this.alphabet[this.carry & 0x1f];
    this.shift = 3;
    this.carry = 0;
  }
  return this.buf;
};

/**
 * Convenience encoder.
 *
 * @param {byte[]} buf The byte array to encode.
 * @param {object} [options] Options to pass to the encoder.
 * @return {string} The encoded string.
 */

exports.encode = function (buf, options) {
  return new Encoder(options).finalize(buf);
};

/**
 * Convenience decoder.
 *
 * @param {string} str The string to decode.
 * @param {object} [options] Options to pass to the decoder.
 * @return {byte[]} The decoded byte array.
 */

exports.decode = function (str, options) {
  return new Decoder(options).finalize(str);
};

// Exports.
exports.Decoder = Decoder;
exports.Encoder = Encoder;
exports.charmap = charmap;
exports.crockford = crockford;
exports.rfc4648 = rfc4648;
exports.base32hex = base32hex;


/***/ }),

/***/ 9742:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 8764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var console = __webpack_require__(5108);
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(9742)
const ieee754 = __webpack_require__(645)
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ 1924:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(210);

var callBind = __webpack_require__(5559);

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ 5559:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(8612);
var GetIntrinsic = __webpack_require__(210);

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}


/***/ }),

/***/ 5108:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*global window, global*/
var util = __webpack_require__(9539)
var assert = __webpack_require__(9282)
function now() { return new Date().getTime() }

var slice = Array.prototype.slice
var console
var times = {}

if (typeof __webpack_require__.g !== "undefined" && __webpack_require__.g.console) {
    console = __webpack_require__.g.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    delete times[label]
    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}


/***/ }),

/***/ 4289:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keys = __webpack_require__(2215);
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = __webpack_require__(1044)();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value; // eslint-disable-line no-param-reassign
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ 8091:
/***/ ((module) => {

"use strict";
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */



function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};


/***/ }),

/***/ 4029:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isCallable = __webpack_require__(5320);

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;


/***/ }),

/***/ 7648:
/***/ ((module) => {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ 8612:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(7648);

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ 210:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__(1405)();
var hasProto = __webpack_require__(8185)();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = __webpack_require__(8612);
var hasOwn = __webpack_require__(7642);
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};


/***/ }),

/***/ 7296:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(210);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ 1044:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var GetIntrinsic = __webpack_require__(210);

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;


/***/ }),

/***/ 8185:
/***/ ((module) => {

"use strict";


var test = {
	foo: {}
};

var $Object = Object;

module.exports = function hasProto() {
	return { __proto__: test }.foo === test.foo && !({ __proto__: null } instanceof $Object);
};


/***/ }),

/***/ 1405:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __webpack_require__(5419);

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),

/***/ 5419:
/***/ ((module) => {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ 6410:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasSymbols = __webpack_require__(5419);

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};


/***/ }),

/***/ 7642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(8612);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ }),

/***/ 645:
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 5717:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 2584:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hasToStringTag = __webpack_require__(6410)();
var callBound = __webpack_require__(1924);

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ 5320:
/***/ ((module) => {

"use strict";


var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};


/***/ }),

/***/ 8662:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = __webpack_require__(6410)();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};


/***/ }),

/***/ 8611:
/***/ ((module) => {

"use strict";


/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function isNaN(value) {
	return value !== value;
};


/***/ }),

/***/ 360:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var callBind = __webpack_require__(5559);
var define = __webpack_require__(4289);

var implementation = __webpack_require__(8611);
var getPolyfill = __webpack_require__(9415);
var shim = __webpack_require__(3194);

var polyfill = callBind(getPolyfill(), Number);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ 9415:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(8611);

module.exports = function getPolyfill() {
	if (Number.isNaN && Number.isNaN(NaN) && !Number.isNaN('a')) {
		return Number.isNaN;
	}
	return implementation;
};


/***/ }),

/***/ 3194:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(4289);
var getPolyfill = __webpack_require__(9415);

/* http://www.ecma-international.org/ecma-262/6.0/#sec-number.isnan */

module.exports = function shimNumberIsNaN() {
	var polyfill = getPolyfill();
	define(Number, { isNaN: polyfill }, {
		isNaN: function testIsNaN() {
			return Number.isNaN !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ 5692:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(4029);
var availableTypedArrays = __webpack_require__(3083);
var callBound = __webpack_require__(1924);

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(6410)();
var gOPD = __webpack_require__(7296);

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};


/***/ }),

/***/ 6269:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* provided dependency */ var console = __webpack_require__(5108);
/*! For license information please see xdr.js.LICENSE.txt */
!function(t,e){ true?module.exports=e():0}(this,(()=>(()=>{var t={899:(t,e,r)=>{const n=r(221);t.exports=n},221:(t,e,r)=>{"use strict";r.r(e),r.d(e,{Array:()=>j,Bool:()=>S,Double:()=>O,Enum:()=>z,Float:()=>L,Hyper:()=>I,Int:()=>v,Opaque:()=>M,Option:()=>X,Quadruple:()=>$,Reference:()=>q,String:()=>V,Struct:()=>W,Union:()=>Y,UnsignedHyper:()=>R,UnsignedInt:()=>x,VarArray:()=>P,VarOpaque:()=>D,Void:()=>k,config:()=>nt});class n extends TypeError{constructor(t){super(`XDR Write Error: ${t}`)}}class i extends TypeError{constructor(t){super(`XDR Read Error: ${t}`)}}class o extends TypeError{constructor(t){super(`XDR Type Definition Error: ${t}`)}}class s extends o{constructor(){super("method not implemented, it should be overloaded in the descendant class.")}}var u=r(764).lW;class f{constructor(t){if(!u.isBuffer(t)){if(!(t instanceof Array))throw new i("source not specified");t=u.from(t)}this._buffer=t,this._length=t.length,this._index=0}_buffer;_length;_index;get eof(){return this._index===this._length}advance(t){const e=this._index;if(this._index+=t,this._length<this._index)throw new i("attempt to read outside the boundary of the buffer");const r=4-(t%4||4);if(r>0){for(let t=0;t<r;t++)if(0!==this._buffer[this._index+t])throw new i("invalid padding");this._index+=r}return e}rewind(){this._index=0}read(t){const e=this.advance(t);return this._buffer.subarray(e,e+t)}readInt32BE(){return this._buffer.readInt32BE(this.advance(4))}readUInt32BE(){return this._buffer.readUInt32BE(this.advance(4))}readBigInt64BE(){return this._buffer.readBigInt64BE(this.advance(8))}readBigUInt64BE(){return this._buffer.readBigUInt64BE(this.advance(8))}readFloatBE(){return this._buffer.readFloatBE(this.advance(4))}readDoubleBE(){return this._buffer.readDoubleBE(this.advance(8))}ensureInputConsumed(){if(this._index!==this._length)throw new i("invalid XDR contract typecast - source buffer not entirely consumed")}}var h=r(764).lW;const a=8192;class c{constructor(t){"number"==typeof t?t=h.allocUnsafe(t):t instanceof h||(t=h.allocUnsafe(a)),this._buffer=t,this._length=t.length}_buffer;_length;_index=0;alloc(t){const e=this._index;return this._index+=t,this._length<this._index&&this.resize(this._index),e}resize(t){const e=Math.ceil(t/a)*a,r=h.allocUnsafe(e);this._buffer.copy(r,0,0,this._length),this._buffer=r,this._length=e}finalize(){return this._buffer.subarray(0,this._index)}toArray(){return[...this.finalize()]}write(t,e){if("string"==typeof t){const r=this.alloc(e);this._buffer.write(t,r,"utf8")}else{t instanceof h||(t=h.from(t));const r=this.alloc(e);t.copy(this._buffer,r,0,e)}const r=4-(e%4||4);if(r>0){const t=this.alloc(r);this._buffer.fill(0,t,this._index)}}writeInt32BE(t){const e=this.alloc(4);this._buffer.writeInt32BE(t,e)}writeUInt32BE(t){const e=this.alloc(4);this._buffer.writeUInt32BE(t,e)}writeBigInt64BE(t){const e=this.alloc(8);this._buffer.writeBigInt64BE(t,e)}writeBigUInt64BE(t){const e=this.alloc(8);this._buffer.writeBigUInt64BE(t,e)}writeFloatBE(t){const e=this.alloc(4);this._buffer.writeFloatBE(t,e)}writeDoubleBE(t){const e=this.alloc(8);this._buffer.writeDoubleBE(t,e)}static bufferChunkSize=a}var l=r(764).lW;class p{toXDR(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"raw";if(!this.write)return this.constructor.toXDR(this,t);const e=new c;return this.write(this,e),y(e.finalize(),t)}fromXDR(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"raw";if(!this.read)return this.constructor.fromXDR(t,e);const r=new f(m(t,e)),n=this.read(r);return r.ensureInputConsumed(),n}validateXDR(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"raw";try{return this.fromXDR(t,e),!0}catch(t){return!1}}static toXDR(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"raw";const r=new c;return this.write(t,r),y(r.finalize(),e)}static fromXDR(t){const e=new f(m(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:"raw")),r=this.read(e);return e.ensureInputConsumed(),r}static validateXDR(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"raw";try{return this.fromXDR(t,e),!0}catch(t){return!1}}}class d extends p{static read(t){throw new s}static write(t,e){throw new s}static isValid(t){return!1}}class g extends p{isValid(t){return!1}}class w extends TypeError{constructor(t){super(`Invalid format ${t}, must be one of "raw", "hex", "base64"`)}}function y(t,e){switch(e){case"raw":return t;case"hex":return t.toString("hex");case"base64":return t.toString("base64");default:throw new w(e)}}function m(t,e){switch(e){case"raw":return t;case"hex":return l.from(t,"hex");case"base64":return l.from(t,"base64");default:throw new w(e)}}const b=2147483647,_=-2147483648;class v extends d{static read(t){return t.readInt32BE()}static write(t,e){if("number"!=typeof t)throw new n("not a number");if((0|t)!==t)throw new n("invalid i32 value");e.writeInt32BE(t)}static isValid(t){return"number"==typeof t&&(0|t)===t&&(t>=_&&t<=b)}}v.MAX_VALUE=b,v.MIN_VALUE=2147483648;const E=-9223372036854775808n,B=9223372036854775807n;class I extends d{constructor(t,e){if(super(),"bigint"==typeof t){if(t<E||t>B)throw new TypeError("Invalid i64 value");this._value=t}else{if((0|t)!==t||(0|e)!==e)throw new TypeError("Invalid i64 value");this._value=BigInt(e>>>0)<<32n|BigInt(t>>>0)}}get low(){return Number(0xFFFFFFFFn&this._value)<<0}get high(){return Number(this._value>>32n)>>0}get unsigned(){return!1}toString(){return this._value.toString()}toJSON(){return{_value:this._value.toString()}}static read(t){return new I(t.readBigInt64BE())}static write(t,e){if(!(t instanceof this))throw new n(`${t} is not a Hyper`);e.writeBigInt64BE(t._value)}static fromString(t){if(!/^-?\d{0,19}$/.test(t))throw new TypeError(`Invalid i64 string value: ${t}`);return new I(BigInt(t))}static fromBits(t,e){return new this(t,e)}static isValid(t){return t instanceof this}}I.MAX_VALUE=new I(B),I.MIN_VALUE=new I(E);const A=4294967295;class x extends d{static read(t){return t.readUInt32BE()}static write(t,e){if("number"!=typeof t||!(t>=0&&t<=A)||t%1!=0)throw new n("invalid u32 value");e.writeUInt32BE(t)}static isValid(t){return"number"==typeof t&&t%1==0&&(t>=0&&t<=A)}}x.MAX_VALUE=A,x.MIN_VALUE=0;const U=0n,T=0xFFFFFFFFFFFFFFFFn;class R extends d{constructor(t,e){if(super(),"bigint"==typeof t){if(t<U||t>T)throw new TypeError("Invalid u64 value");this._value=t}else{if((0|t)!==t||(0|e)!==e)throw new TypeError("Invalid u64 value");this._value=BigInt(e>>>0)<<32n|BigInt(t>>>0)}}get low(){return Number(0xFFFFFFFFn&this._value)<<0}get high(){return Number(this._value>>32n)>>0}get unsigned(){return!0}toString(){return this._value.toString()}toJSON(){return{_value:this._value.toString()}}static read(t){return new R(t.readBigUInt64BE())}static write(t,e){if(!(t instanceof this))throw new n(`${t} is not an UnsignedHyper`);e.writeBigUInt64BE(t._value)}static fromString(t){if(!/^\d{0,20}$/.test(t))throw new TypeError(`Invalid u64 string value: ${t}`);return new R(BigInt(t))}static fromBits(t,e){return new this(t,e)}static isValid(t){return t instanceof this}}R.MAX_VALUE=new R(T),R.MIN_VALUE=new R(U);class L extends d{static read(t){return t.readFloatBE()}static write(t,e){if("number"!=typeof t)throw new n("not a number");e.writeFloatBE(t)}static isValid(t){return"number"==typeof t}}class O extends d{static read(t){return t.readDoubleBE()}static write(t,e){if("number"!=typeof t)throw new n("not a number");e.writeDoubleBE(t)}static isValid(t){return"number"==typeof t}}class $ extends d{static read(){throw new o("quadruple not supported")}static write(){throw new o("quadruple not supported")}static isValid(){return!1}}class S extends d{static read(t){const e=v.read(t);switch(e){case 0:return!1;case 1:return!0;default:throw new i(`got ${e} when trying to read a bool`)}}static write(t,e){const r=t?1:0;v.write(r,e)}static isValid(t){return"boolean"==typeof t}}var F=r(764).lW;class V extends g{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x.MAX_VALUE;super(),this._maxLength=t}read(t){const e=x.read(t);if(e>this._maxLength)throw new i(`saw ${e} length String, max allowed is ${this._maxLength}`);return t.read(e)}readString(t){return this.read(t).toString("utf8")}write(t,e){const r="string"==typeof t?F.byteLength(t,"utf8"):t.length;if(r>this._maxLength)throw new n(`got ${t.length} bytes, max allowed is ${this._maxLength}`);x.write(r,e),e.write(t,r)}isValid(t){return"string"==typeof t?F.byteLength(t,"utf8")<=this._maxLength:!!(t instanceof Array||F.isBuffer(t))&&t.length<=this._maxLength}}var N=r(764).lW;class M extends g{constructor(t){super(),this._length=t}read(t){return t.read(this._length)}write(t,e){const{length:r}=t;if(r!==this._length)throw new n(`got ${t.length} bytes, expected ${this._length}`);e.write(t,r)}isValid(t){return N.isBuffer(t)&&t.length===this._length}}var C=r(764).lW;class D extends g{constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x.MAX_VALUE;super(),this._maxLength=t}read(t){const e=x.read(t);if(e>this._maxLength)throw new i(`saw ${e} length VarOpaque, max allowed is ${this._maxLength}`);return t.read(e)}write(t,e){const{length:r}=t;if(t.length>this._maxLength)throw new n(`got ${t.length} bytes, max allowed is ${this._maxLength}`);x.write(r,e),e.write(t,r)}isValid(t){return C.isBuffer(t)&&t.length<=this._maxLength}}class j extends g{constructor(t,e){super(),this._childType=t,this._length=e}read(t){const e=new r.g.Array(this._length);for(let r=0;r<this._length;r++)e[r]=this._childType.read(t);return e}write(t,e){if(!(t instanceof r.g.Array))throw new n("value is not array");if(t.length!==this._length)throw new n(`got array of size ${t.length}, expected ${this._length}`);for(const r of t)this._childType.write(r,e)}isValid(t){if(!(t instanceof r.g.Array)||t.length!==this._length)return!1;for(const e of t)if(!this._childType.isValid(e))return!1;return!0}}class P extends g{constructor(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:x.MAX_VALUE;super(),this._childType=t,this._maxLength=e}read(t){const e=x.read(t);if(e>this._maxLength)throw new i(`saw ${e} length VarArray, max allowed is ${this._maxLength}`);const r=new Array(e);for(let n=0;n<e;n++)r[n]=this._childType.read(t);return r}write(t,e){if(!(t instanceof Array))throw new n("value is not array");if(t.length>this._maxLength)throw new n(`got array of size ${t.length}, max allowed is ${this._maxLength}`);x.write(t.length,e);for(const r of t)this._childType.write(r,e)}isValid(t){if(!(t instanceof Array)||t.length>this._maxLength)return!1;for(const e of t)if(!this._childType.isValid(e))return!1;return!0}}class X extends d{constructor(t){super(),this._childType=t}read(t){if(S.read(t))return this._childType.read(t)}write(t,e){const r=null!=t;S.write(r,e),r&&this._childType.write(t,e)}isValid(t){return null==t||this._childType.isValid(t)}}class k extends d{static read(){}static write(t){if(void 0!==t)throw new n("trying to write value to a void slot")}static isValid(t){return void 0===t}}class z extends d{constructor(t,e){super(),this.name=t,this.value=e}static read(t){const e=v.read(t),r=this._byValue[e];if(void 0===r)throw new i(`unknown ${this.enumName} member for value ${e}`);return r}static write(t,e){if(!(t instanceof this))throw new n(`unknown ${t} is not a ${this.enumName}`);v.write(t.value,e)}static isValid(t){return t instanceof this}static members(){return this._members}static values(){return Object.values(this._members)}static fromName(t){const e=this._members[t];if(!e)throw new TypeError(`${t} is not a member of ${this.enumName}`);return e}static fromValue(t){const e=this._byValue[t];if(void 0===e)throw new TypeError(`${t} is not a value of any member of ${this.enumName}`);return e}static create(t,e,r){const n=class extends z{};n.enumName=e,t.results[e]=n,n._members={},n._byValue={};for(const[t,e]of Object.entries(r)){const r=new n(t,e);n._members[t]=r,n._byValue[e]=r,n[t]=()=>r}return n}}class q extends d{resolve(){throw new o('"resolve" method should be implemented in the descendant class')}}class W extends d{constructor(t){super(),this._attributes=t||{}}static read(t){const e={};for(const[r,n]of this._fields)e[r]=n.read(t);return new this(e)}static write(t,e){if(!(t instanceof this))throw new n(`${t} is not a ${this.structName}`);for(const[r,n]of this._fields){const i=t._attributes[r];n.write(i,e)}}static isValid(t){return t instanceof this}static create(t,e,r){const n=class extends W{};n.structName=e,t.results[e]=n;const i=new Array(r.length);for(let e=0;e<r.length;e++){const o=r[e],s=o[0];let u=o[1];u instanceof q&&(u=u.resolve(t)),i[e]=[s,u],n.prototype[s]=G(s)}return n._fields=i,n}}function G(t){return function(e){return void 0!==e&&(this._attributes[t]=e),this._attributes[t]}}class Y extends g{constructor(t,e){super(),this.set(t,e)}set(t,e){"string"==typeof t&&(t=this.constructor._switchOn.fromName(t)),this._switch=t;const r=this.constructor.armForSwitch(this._switch);this._arm=r,this._armType=r===k?k:this.constructor._arms[r],this._value=e}get(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._arm;if(this._arm!==k&&this._arm!==t)throw new TypeError(`${t} not set`);return this._value}switch(){return this._switch}arm(){return this._arm}armType(){return this._armType}value(){return this._value}static armForSwitch(t){const e=this._switches.get(t);if(void 0!==e)return e;if(this._defaultArm)return this._defaultArm;throw new TypeError(`Bad union switch: ${t}`)}static armTypeForArm(t){return t===k?k:this._arms[t]}static read(t){const e=this._switchOn.read(t),r=this.armForSwitch(e),n=r===k?k:this._arms[r];let i;return i=void 0!==n?n.read(t):r.read(t),new this(e,i)}static write(t,e){if(!(t instanceof this))throw new n(`${t} is not a ${this.unionName}`);this._switchOn.write(t.switch(),e),t.armType().write(t.value(),e)}static isValid(t){return t instanceof this}static create(t,e,r){const n=class extends Y{};n.unionName=e,t.results[e]=n,r.switchOn instanceof q?n._switchOn=r.switchOn.resolve(t):n._switchOn=r.switchOn,n._switches=new Map,n._arms={};let i=r.defaultArm;i instanceof q&&(i=i.resolve(t)),n._defaultArm=i;for(const[t,e]of r.switches){const r="string"==typeof t?n._switchOn.fromName(t):t;n._switches.set(r,e)}if(void 0!==n._switchOn.values)for(const t of n._switchOn.values())n[t.name]=function(e){return new n(t,e)},n.prototype[t.name]=function(e){return this.set(t,e)};if(r.arms)for(const[e,i]of Object.entries(r.arms))n._arms[e]=i instanceof q?i.resolve(t):i,i!==k&&(n.prototype[e]=function(){return this.get(e)});return n}}class H extends q{constructor(t){super(),this.name=t}resolve(t){return t.definitions[this.name].resolve(t)}}class J extends q{constructor(t,e){let r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];super(),this.childReference=t,this.length=e,this.variable=r}resolve(t){let e=this.childReference,r=this.length;return e instanceof q&&(e=e.resolve(t)),r instanceof q&&(r=r.resolve(t)),this.variable?new P(e,r):new j(e,r)}}class Q extends q{constructor(t){super(),this.childReference=t,this.name=t.name}resolve(t){let e=this.childReference;return e instanceof q&&(e=e.resolve(t)),new X(e)}}class Z extends q{constructor(t,e){super(),this.sizedType=t,this.length=e}resolve(t){let e=this.length;return e instanceof q&&(e=e.resolve(t)),new this.sizedType(e)}}class K{constructor(t,e,r){this.constructor=t,this.name=e,this.config=r}resolve(t){return this.name in t.results?t.results[this.name]:this.constructor(t,this.name,this.config)}}function tt(t,e,r){return r instanceof q&&(r=r.resolve(t)),t.results[e]=r,r}function et(t,e,r){return t.results[e]=r,r}class rt{constructor(t){this._destination=t,this._definitions={}}enum(t,e){const r=new K(z.create,t,e);this.define(t,r)}struct(t,e){const r=new K(W.create,t,e);this.define(t,r)}union(t,e){const r=new K(Y.create,t,e);this.define(t,r)}typedef(t,e){const r=new K(tt,t,e);this.define(t,r)}const(t,e){const r=new K(et,t,e);this.define(t,r)}void(){return k}bool(){return S}int(){return v}hyper(){return I}uint(){return x}uhyper(){return R}float(){return L}double(){return O}quadruple(){return $}string(t){return new Z(V,t)}opaque(t){return new Z(M,t)}varOpaque(t){return new Z(D,t)}array(t,e){return new J(t,e)}varArray(t,e){return new J(t,e,!0)}option(t){return new Q(t)}define(t,e){if(void 0!==this._destination[t])throw new o(`${t} is already defined`);this._definitions[t]=e}lookup(t){return new H(t)}resolve(){for(const t of Object.values(this._definitions))t.resolve({definitions:this._definitions,results:this._destination})}}function nt(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(t){const r=new rt(e);t(r),r.resolve()}return e}},742:(t,e)=>{"use strict";e.byteLength=function(t){var e=u(t),r=e[0],n=e[1];return 3*(r+n)/4-n},e.toByteArray=function(t){var e,r,o=u(t),s=o[0],f=o[1],h=new i(function(t,e,r){return 3*(e+r)/4-r}(0,s,f)),a=0,c=f>0?s-4:s;for(r=0;r<c;r+=4)e=n[t.charCodeAt(r)]<<18|n[t.charCodeAt(r+1)]<<12|n[t.charCodeAt(r+2)]<<6|n[t.charCodeAt(r+3)],h[a++]=e>>16&255,h[a++]=e>>8&255,h[a++]=255&e;2===f&&(e=n[t.charCodeAt(r)]<<2|n[t.charCodeAt(r+1)]>>4,h[a++]=255&e);1===f&&(e=n[t.charCodeAt(r)]<<10|n[t.charCodeAt(r+1)]<<4|n[t.charCodeAt(r+2)]>>2,h[a++]=e>>8&255,h[a++]=255&e);return h},e.fromByteArray=function(t){for(var e,n=t.length,i=n%3,o=[],s=16383,u=0,h=n-i;u<h;u+=s)o.push(f(t,u,u+s>h?h:u+s));1===i?(e=t[n-1],o.push(r[e>>2]+r[e<<4&63]+"==")):2===i&&(e=(t[n-2]<<8)+t[n-1],o.push(r[e>>10]+r[e>>4&63]+r[e<<2&63]+"="));return o.join("")};for(var r=[],n=[],i="undefined"!=typeof Uint8Array?Uint8Array:Array,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=0;s<64;++s)r[s]=o[s],n[o.charCodeAt(s)]=s;function u(t){var e=t.length;if(e%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=t.indexOf("=");return-1===r&&(r=e),[r,r===e?0:4-r%4]}function f(t,e,n){for(var i,o,s=[],u=e;u<n;u+=3)i=(t[u]<<16&16711680)+(t[u+1]<<8&65280)+(255&t[u+2]),s.push(r[(o=i)>>18&63]+r[o>>12&63]+r[o>>6&63]+r[63&o]);return s.join("")}n["-".charCodeAt(0)]=62,n["_".charCodeAt(0)]=63},764:(t,e,r)=>{"use strict";const n=r(742),i=r(645),o="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;e.lW=f,e.h2=50;const s=2147483647;function u(t){if(t>s)throw new RangeError('The value "'+t+'" is invalid for option "size"');const e=new Uint8Array(t);return Object.setPrototypeOf(e,f.prototype),e}function f(t,e,r){if("number"==typeof t){if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return c(t)}return h(t,e,r)}function h(t,e,r){if("string"==typeof t)return function(t,e){"string"==typeof e&&""!==e||(e="utf8");if(!f.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const r=0|g(t,e);let n=u(r);const i=n.write(t,e);i!==r&&(n=n.slice(0,i));return n}(t,e);if(ArrayBuffer.isView(t))return function(t){if(H(t,Uint8Array)){const e=new Uint8Array(t);return p(e.buffer,e.byteOffset,e.byteLength)}return l(t)}(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(H(t,ArrayBuffer)||t&&H(t.buffer,ArrayBuffer))return p(t,e,r);if("undefined"!=typeof SharedArrayBuffer&&(H(t,SharedArrayBuffer)||t&&H(t.buffer,SharedArrayBuffer)))return p(t,e,r);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');const n=t.valueOf&&t.valueOf();if(null!=n&&n!==t)return f.from(n,e,r);const i=function(t){if(f.isBuffer(t)){const e=0|d(t.length),r=u(e);return 0===r.length||t.copy(r,0,0,e),r}if(void 0!==t.length)return"number"!=typeof t.length||J(t.length)?u(0):l(t);if("Buffer"===t.type&&Array.isArray(t.data))return l(t.data)}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return f.from(t[Symbol.toPrimitive]("string"),e,r);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function a(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function c(t){return a(t),u(t<0?0:0|d(t))}function l(t){const e=t.length<0?0:0|d(t.length),r=u(e);for(let n=0;n<e;n+=1)r[n]=255&t[n];return r}function p(t,e,r){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(r||0))throw new RangeError('"length" is outside of buffer bounds');let n;return n=void 0===e&&void 0===r?new Uint8Array(t):void 0===r?new Uint8Array(t,e):new Uint8Array(t,e,r),Object.setPrototypeOf(n,f.prototype),n}function d(t){if(t>=s)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s.toString(16)+" bytes");return 0|t}function g(t,e){if(f.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||H(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);const r=t.length,n=arguments.length>2&&!0===arguments[2];if(!n&&0===r)return 0;let i=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":return W(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return G(t).length;default:if(i)return n?-1:W(t).length;e=(""+e).toLowerCase(),i=!0}}function w(t,e,r){let n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return L(this,e,r);case"utf8":case"utf-8":return x(this,e,r);case"ascii":return T(this,e,r);case"latin1":case"binary":return R(this,e,r);case"base64":return A(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return O(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function y(t,e,r){const n=t[e];t[e]=t[r],t[r]=n}function m(t,e,r,n,i){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),J(r=+r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof e&&(e=f.from(e,n)),f.isBuffer(e))return 0===e.length?-1:b(t,e,r,n,i);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):b(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function b(t,e,r,n,i){let o,s=1,u=t.length,f=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;s=2,u/=2,f/=2,r/=2}function h(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(i){let n=-1;for(o=r;o<u;o++)if(h(t,o)===h(e,-1===n?0:o-n)){if(-1===n&&(n=o),o-n+1===f)return n*s}else-1!==n&&(o-=o-n),n=-1}else for(r+f>u&&(r=u-f),o=r;o>=0;o--){let r=!0;for(let n=0;n<f;n++)if(h(t,o+n)!==h(e,n)){r=!1;break}if(r)return o}return-1}function _(t,e,r,n){r=Number(r)||0;const i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;const o=e.length;let s;for(n>o/2&&(n=o/2),s=0;s<n;++s){const n=parseInt(e.substr(2*s,2),16);if(J(n))return s;t[r+s]=n}return s}function v(t,e,r,n){return Y(W(e,t.length-r),t,r,n)}function E(t,e,r,n){return Y(function(t){const e=[];for(let r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function B(t,e,r,n){return Y(G(e),t,r,n)}function I(t,e,r,n){return Y(function(t,e){let r,n,i;const o=[];for(let s=0;s<t.length&&!((e-=2)<0);++s)r=t.charCodeAt(s),n=r>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function A(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function x(t,e,r){r=Math.min(t.length,r);const n=[];let i=e;for(;i<r;){const e=t[i];let o=null,s=e>239?4:e>223?3:e>191?2:1;if(i+s<=r){let r,n,u,f;switch(s){case 1:e<128&&(o=e);break;case 2:r=t[i+1],128==(192&r)&&(f=(31&e)<<6|63&r,f>127&&(o=f));break;case 3:r=t[i+1],n=t[i+2],128==(192&r)&&128==(192&n)&&(f=(15&e)<<12|(63&r)<<6|63&n,f>2047&&(f<55296||f>57343)&&(o=f));break;case 4:r=t[i+1],n=t[i+2],u=t[i+3],128==(192&r)&&128==(192&n)&&128==(192&u)&&(f=(15&e)<<18|(63&r)<<12|(63&n)<<6|63&u,f>65535&&f<1114112&&(o=f))}}null===o?(o=65533,s=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|1023&o),n.push(o),i+=s}return function(t){const e=t.length;if(e<=U)return String.fromCharCode.apply(String,t);let r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=U));return r}(n)}f.TYPED_ARRAY_SUPPORT=function(){try{const t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return!1}}(),f.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(f.prototype,"parent",{enumerable:!0,get:function(){if(f.isBuffer(this))return this.buffer}}),Object.defineProperty(f.prototype,"offset",{enumerable:!0,get:function(){if(f.isBuffer(this))return this.byteOffset}}),f.poolSize=8192,f.from=function(t,e,r){return h(t,e,r)},Object.setPrototypeOf(f.prototype,Uint8Array.prototype),Object.setPrototypeOf(f,Uint8Array),f.alloc=function(t,e,r){return function(t,e,r){return a(t),t<=0?u(t):void 0!==e?"string"==typeof r?u(t).fill(e,r):u(t).fill(e):u(t)}(t,e,r)},f.allocUnsafe=function(t){return c(t)},f.allocUnsafeSlow=function(t){return c(t)},f.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==f.prototype},f.compare=function(t,e){if(H(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),H(e,Uint8Array)&&(e=f.from(e,e.offset,e.byteLength)),!f.isBuffer(t)||!f.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let r=t.length,n=e.length;for(let i=0,o=Math.min(r,n);i<o;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},f.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},f.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return f.alloc(0);let r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;const n=f.allocUnsafe(e);let i=0;for(r=0;r<t.length;++r){let e=t[r];if(H(e,Uint8Array))i+e.length>n.length?(f.isBuffer(e)||(e=f.from(e)),e.copy(n,i)):Uint8Array.prototype.set.call(n,e,i);else{if(!f.isBuffer(e))throw new TypeError('"list" argument must be an Array of Buffers');e.copy(n,i)}i+=e.length}return n},f.byteLength=g,f.prototype._isBuffer=!0,f.prototype.swap16=function(){const t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)y(this,e,e+1);return this},f.prototype.swap32=function(){const t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)y(this,e,e+3),y(this,e+1,e+2);return this},f.prototype.swap64=function(){const t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)y(this,e,e+7),y(this,e+1,e+6),y(this,e+2,e+5),y(this,e+3,e+4);return this},f.prototype.toString=function(){const t=this.length;return 0===t?"":0===arguments.length?x(this,0,t):w.apply(this,arguments)},f.prototype.toLocaleString=f.prototype.toString,f.prototype.equals=function(t){if(!f.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===f.compare(this,t)},f.prototype.inspect=function(){let t="";const r=e.h2;return t=this.toString("hex",0,r).replace(/(.{2})/g,"$1 ").trim(),this.length>r&&(t+=" ... "),"<Buffer "+t+">"},o&&(f.prototype[o]=f.prototype.inspect),f.prototype.compare=function(t,e,r,n,i){if(H(t,Uint8Array)&&(t=f.from(t,t.offset,t.byteLength)),!f.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&e>=r)return 0;if(n>=i)return-1;if(e>=r)return 1;if(this===t)return 0;let o=(i>>>=0)-(n>>>=0),s=(r>>>=0)-(e>>>=0);const u=Math.min(o,s),h=this.slice(n,i),a=t.slice(e,r);for(let t=0;t<u;++t)if(h[t]!==a[t]){o=h[t],s=a[t];break}return o<s?-1:s<o?1:0},f.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},f.prototype.indexOf=function(t,e,r){return m(this,t,e,r,!0)},f.prototype.lastIndexOf=function(t,e,r){return m(this,t,e,r,!1)},f.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(r)?(r>>>=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}const i=this.length-e;if((void 0===r||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");let o=!1;for(;;)switch(n){case"hex":return _(this,t,e,r);case"utf8":case"utf-8":return v(this,t,e,r);case"ascii":case"latin1":case"binary":return E(this,t,e,r);case"base64":return B(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return I(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},f.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};const U=4096;function T(t,e,r){let n="";r=Math.min(t.length,r);for(let i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function R(t,e,r){let n="";r=Math.min(t.length,r);for(let i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function L(t,e,r){const n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);let i="";for(let n=e;n<r;++n)i+=Q[t[n]];return i}function O(t,e,r){const n=t.slice(e,r);let i="";for(let t=0;t<n.length-1;t+=2)i+=String.fromCharCode(n[t]+256*n[t+1]);return i}function $(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function S(t,e,r,n,i,o){if(!f.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function F(t,e,r,n,i){X(e,n,i,t,r,7);let o=Number(e&BigInt(4294967295));t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o,o>>=8,t[r++]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[r++]=s,s>>=8,t[r++]=s,s>>=8,t[r++]=s,s>>=8,t[r++]=s,r}function V(t,e,r,n,i){X(e,n,i,t,r,7);let o=Number(e&BigInt(4294967295));t[r+7]=o,o>>=8,t[r+6]=o,o>>=8,t[r+5]=o,o>>=8,t[r+4]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[r+3]=s,s>>=8,t[r+2]=s,s>>=8,t[r+1]=s,s>>=8,t[r]=s,r+8}function N(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function M(t,e,r,n,o){return e=+e,r>>>=0,o||N(t,0,r,4),i.write(t,e,r,n,23,4),r+4}function C(t,e,r,n,o){return e=+e,r>>>=0,o||N(t,0,r,8),i.write(t,e,r,n,52,8),r+8}f.prototype.slice=function(t,e){const r=this.length;(t=~~t)<0?(t+=r)<0&&(t=0):t>r&&(t=r),(e=void 0===e?r:~~e)<0?(e+=r)<0&&(e=0):e>r&&(e=r),e<t&&(e=t);const n=this.subarray(t,e);return Object.setPrototypeOf(n,f.prototype),n},f.prototype.readUintLE=f.prototype.readUIntLE=function(t,e,r){t>>>=0,e>>>=0,r||$(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return n},f.prototype.readUintBE=f.prototype.readUIntBE=function(t,e,r){t>>>=0,e>>>=0,r||$(t,e,this.length);let n=this[t+--e],i=1;for(;e>0&&(i*=256);)n+=this[t+--e]*i;return n},f.prototype.readUint8=f.prototype.readUInt8=function(t,e){return t>>>=0,e||$(t,1,this.length),this[t]},f.prototype.readUint16LE=f.prototype.readUInt16LE=function(t,e){return t>>>=0,e||$(t,2,this.length),this[t]|this[t+1]<<8},f.prototype.readUint16BE=f.prototype.readUInt16BE=function(t,e){return t>>>=0,e||$(t,2,this.length),this[t]<<8|this[t+1]},f.prototype.readUint32LE=f.prototype.readUInt32LE=function(t,e){return t>>>=0,e||$(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},f.prototype.readUint32BE=f.prototype.readUInt32BE=function(t,e){return t>>>=0,e||$(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},f.prototype.readBigUInt64LE=Z((function(t){k(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||z(t,this.length-8);const n=e+256*this[++t]+65536*this[++t]+this[++t]*2**24,i=this[++t]+256*this[++t]+65536*this[++t]+r*2**24;return BigInt(n)+(BigInt(i)<<BigInt(32))})),f.prototype.readBigUInt64BE=Z((function(t){k(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||z(t,this.length-8);const n=e*2**24+65536*this[++t]+256*this[++t]+this[++t],i=this[++t]*2**24+65536*this[++t]+256*this[++t]+r;return(BigInt(n)<<BigInt(32))+BigInt(i)})),f.prototype.readIntLE=function(t,e,r){t>>>=0,e>>>=0,r||$(t,e,this.length);let n=this[t],i=1,o=0;for(;++o<e&&(i*=256);)n+=this[t+o]*i;return i*=128,n>=i&&(n-=Math.pow(2,8*e)),n},f.prototype.readIntBE=function(t,e,r){t>>>=0,e>>>=0,r||$(t,e,this.length);let n=e,i=1,o=this[t+--n];for(;n>0&&(i*=256);)o+=this[t+--n]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*e)),o},f.prototype.readInt8=function(t,e){return t>>>=0,e||$(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},f.prototype.readInt16LE=function(t,e){t>>>=0,e||$(t,2,this.length);const r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},f.prototype.readInt16BE=function(t,e){t>>>=0,e||$(t,2,this.length);const r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},f.prototype.readInt32LE=function(t,e){return t>>>=0,e||$(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},f.prototype.readInt32BE=function(t,e){return t>>>=0,e||$(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},f.prototype.readBigInt64LE=Z((function(t){k(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||z(t,this.length-8);const n=this[t+4]+256*this[t+5]+65536*this[t+6]+(r<<24);return(BigInt(n)<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+this[++t]*2**24)})),f.prototype.readBigInt64BE=Z((function(t){k(t>>>=0,"offset");const e=this[t],r=this[t+7];void 0!==e&&void 0!==r||z(t,this.length-8);const n=(e<<24)+65536*this[++t]+256*this[++t]+this[++t];return(BigInt(n)<<BigInt(32))+BigInt(this[++t]*2**24+65536*this[++t]+256*this[++t]+r)})),f.prototype.readFloatLE=function(t,e){return t>>>=0,e||$(t,4,this.length),i.read(this,t,!0,23,4)},f.prototype.readFloatBE=function(t,e){return t>>>=0,e||$(t,4,this.length),i.read(this,t,!1,23,4)},f.prototype.readDoubleLE=function(t,e){return t>>>=0,e||$(t,8,this.length),i.read(this,t,!0,52,8)},f.prototype.readDoubleBE=function(t,e){return t>>>=0,e||$(t,8,this.length),i.read(this,t,!1,52,8)},f.prototype.writeUintLE=f.prototype.writeUIntLE=function(t,e,r,n){if(t=+t,e>>>=0,r>>>=0,!n){S(this,t,e,r,Math.pow(2,8*r)-1,0)}let i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},f.prototype.writeUintBE=f.prototype.writeUIntBE=function(t,e,r,n){if(t=+t,e>>>=0,r>>>=0,!n){S(this,t,e,r,Math.pow(2,8*r)-1,0)}let i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},f.prototype.writeUint8=f.prototype.writeUInt8=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,1,255,0),this[e]=255&t,e+1},f.prototype.writeUint16LE=f.prototype.writeUInt16LE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},f.prototype.writeUint16BE=f.prototype.writeUInt16BE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},f.prototype.writeUint32LE=f.prototype.writeUInt32LE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},f.prototype.writeUint32BE=f.prototype.writeUInt32BE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},f.prototype.writeBigUInt64LE=Z((function(t,e=0){return F(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),f.prototype.writeBigUInt64BE=Z((function(t,e=0){return V(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),f.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);S(this,t,e,r,n-1,-n)}let i=0,o=1,s=0;for(this[e]=255&t;++i<r&&(o*=256);)t<0&&0===s&&0!==this[e+i-1]&&(s=1),this[e+i]=(t/o>>0)-s&255;return e+r},f.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e>>>=0,!n){const n=Math.pow(2,8*r-1);S(this,t,e,r,n-1,-n)}let i=r-1,o=1,s=0;for(this[e+i]=255&t;--i>=0&&(o*=256);)t<0&&0===s&&0!==this[e+i+1]&&(s=1),this[e+i]=(t/o>>0)-s&255;return e+r},f.prototype.writeInt8=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},f.prototype.writeInt16LE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},f.prototype.writeInt16BE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},f.prototype.writeInt32LE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},f.prototype.writeInt32BE=function(t,e,r){return t=+t,e>>>=0,r||S(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},f.prototype.writeBigInt64LE=Z((function(t,e=0){return F(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),f.prototype.writeBigInt64BE=Z((function(t,e=0){return V(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),f.prototype.writeFloatLE=function(t,e,r){return M(this,t,e,!0,r)},f.prototype.writeFloatBE=function(t,e,r){return M(this,t,e,!1,r)},f.prototype.writeDoubleLE=function(t,e,r){return C(this,t,e,!0,r)},f.prototype.writeDoubleBE=function(t,e,r){return C(this,t,e,!1,r)},f.prototype.copy=function(t,e,r,n){if(!f.isBuffer(t))throw new TypeError("argument should be a Buffer");if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);const i=n-r;return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,r,n):Uint8Array.prototype.set.call(t,this.subarray(r,n),e),i},f.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!f.isEncoding(n))throw new TypeError("Unknown encoding: "+n);if(1===t.length){const e=t.charCodeAt(0);("utf8"===n&&e<128||"latin1"===n)&&(t=e)}}else"number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;let i;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(i=e;i<r;++i)this[i]=t;else{const o=f.isBuffer(t)?t:f.from(t,n),s=o.length;if(0===s)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(i=0;i<r-e;++i)this[i+e]=o[i%s]}return this};const D={};function j(t,e,r){D[t]=class extends r{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(t){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:t,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}function P(t){let e="",r=t.length;const n="-"===t[0]?1:0;for(;r>=n+4;r-=3)e=`_${t.slice(r-3,r)}${e}`;return`${t.slice(0,r)}${e}`}function X(t,e,r,n,i,o){if(t>r||t<e){const n="bigint"==typeof e?"n":"";let i;throw i=o>3?0===e||e===BigInt(0)?`>= 0${n} and < 2${n} ** ${8*(o+1)}${n}`:`>= -(2${n} ** ${8*(o+1)-1}${n}) and < 2 ** ${8*(o+1)-1}${n}`:`>= ${e}${n} and <= ${r}${n}`,new D.ERR_OUT_OF_RANGE("value",i,t)}!function(t,e,r){k(e,"offset"),void 0!==t[e]&&void 0!==t[e+r]||z(e,t.length-(r+1))}(n,i,o)}function k(t,e){if("number"!=typeof t)throw new D.ERR_INVALID_ARG_TYPE(e,"number",t)}function z(t,e,r){if(Math.floor(t)!==t)throw k(t,r),new D.ERR_OUT_OF_RANGE(r||"offset","an integer",t);if(e<0)throw new D.ERR_BUFFER_OUT_OF_BOUNDS;throw new D.ERR_OUT_OF_RANGE(r||"offset",`>= ${r?1:0} and <= ${e}`,t)}j("ERR_BUFFER_OUT_OF_BOUNDS",(function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"}),RangeError),j("ERR_INVALID_ARG_TYPE",(function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`}),TypeError),j("ERR_OUT_OF_RANGE",(function(t,e,r){let n=`The value of "${t}" is out of range.`,i=r;return Number.isInteger(r)&&Math.abs(r)>2**32?i=P(String(r)):"bigint"==typeof r&&(i=String(r),(r>BigInt(2)**BigInt(32)||r<-(BigInt(2)**BigInt(32)))&&(i=P(i)),i+="n"),n+=` It must be ${e}. Received ${i}`,n}),RangeError);const q=/[^+/0-9A-Za-z-_]/g;function W(t,e){let r;e=e||1/0;const n=t.length;let i=null;const o=[];for(let s=0;s<n;++s){if(r=t.charCodeAt(s),r>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function G(t){return n.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(q,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function Y(t,e,r,n){let i;for(i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}function H(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function J(t){return t!=t}const Q=function(){const t="0123456789abcdef",e=new Array(256);for(let r=0;r<16;++r){const n=16*r;for(let i=0;i<16;++i)e[n+i]=t[r]+t[i]}return e}();function Z(t){return"undefined"==typeof BigInt?K:t}function K(){throw new Error("BigInt not supported")}},645:(t,e)=>{e.read=function(t,e,r,n,i){var o,s,u=8*i-n-1,f=(1<<u)-1,h=f>>1,a=-7,c=r?i-1:0,l=r?-1:1,p=t[e+c];for(c+=l,o=p&(1<<-a)-1,p>>=-a,a+=u;a>0;o=256*o+t[e+c],c+=l,a-=8);for(s=o&(1<<-a)-1,o>>=-a,a+=n;a>0;s=256*s+t[e+c],c+=l,a-=8);if(0===o)o=1-h;else{if(o===f)return s?NaN:1/0*(p?-1:1);s+=Math.pow(2,n),o-=h}return(p?-1:1)*s*Math.pow(2,o-n)},e.write=function(t,e,r,n,i,o){var s,u,f,h=8*o-i-1,a=(1<<h)-1,c=a>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=n?0:o-1,d=n?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(u=isNaN(e)?1:0,s=a):(s=Math.floor(Math.log(e)/Math.LN2),e*(f=Math.pow(2,-s))<1&&(s--,f*=2),(e+=s+c>=1?l/f:l*Math.pow(2,1-c))*f>=2&&(s++,f/=2),s+c>=a?(u=0,s=a):s+c>=1?(u=(e*f-1)*Math.pow(2,i),s+=c):(u=e*Math.pow(2,c-1)*Math.pow(2,i),s=0));i>=8;t[r+p]=255&u,p+=d,u/=256,i-=8);for(s=s<<i|u,h+=i;h>0;t[r+p]=255&s,p+=d,s/=256,h-=8);t[r+p-d]|=128*g}}},e={};function r(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}return r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r(899)})()));
//# sourceMappingURL=xdr.js.map

/***/ }),

/***/ 4244:
/***/ ((module) => {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ 609:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var define = __webpack_require__(4289);
var callBind = __webpack_require__(5559);

var implementation = __webpack_require__(4244);
var getPolyfill = __webpack_require__(5624);
var shim = __webpack_require__(2281);

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ 5624:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var implementation = __webpack_require__(4244);

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ 2281:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var getPolyfill = __webpack_require__(5624);
var define = __webpack_require__(4289);

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ 8987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(1414); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ 2215:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(1414);

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(8987);

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ 1414:
/***/ ((module) => {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ 4155:
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 9509:
/***/ ((module, exports, __webpack_require__) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(8764)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ 4189:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Buffer = (__webpack_require__(9509).Buffer)

// prototype class for hash functions
function Hash (blockSize, finalSize) {
  this._block = Buffer.alloc(blockSize)
  this._finalSize = finalSize
  this._blockSize = blockSize
  this._len = 0
}

Hash.prototype.update = function (data, enc) {
  if (typeof data === 'string') {
    enc = enc || 'utf8'
    data = Buffer.from(data, enc)
  }

  var block = this._block
  var blockSize = this._blockSize
  var length = data.length
  var accum = this._len

  for (var offset = 0; offset < length;) {
    var assigned = accum % blockSize
    var remainder = Math.min(length - offset, blockSize - assigned)

    for (var i = 0; i < remainder; i++) {
      block[assigned + i] = data[offset + i]
    }

    accum += remainder
    offset += remainder

    if ((accum % blockSize) === 0) {
      this._update(block)
    }
  }

  this._len += length
  return this
}

Hash.prototype.digest = function (enc) {
  var rem = this._len % this._blockSize

  this._block[rem] = 0x80

  // zero (rem + 1) trailing bits, where (rem + 1) is the smallest
  // non-negative solution to the equation (length + 1 + (rem + 1)) === finalSize mod blockSize
  this._block.fill(0, rem + 1)

  if (rem >= this._finalSize) {
    this._update(this._block)
    this._block.fill(0)
  }

  var bits = this._len * 8

  // uint32
  if (bits <= 0xffffffff) {
    this._block.writeUInt32BE(bits, this._blockSize - 4)

  // uint64
  } else {
    var lowBits = (bits & 0xffffffff) >>> 0
    var highBits = (bits - lowBits) / 0x100000000

    this._block.writeUInt32BE(highBits, this._blockSize - 8)
    this._block.writeUInt32BE(lowBits, this._blockSize - 4)
  }

  this._update(this._block)
  var hash = this._hash()

  return enc ? hash.toString(enc) : hash
}

Hash.prototype._update = function () {
  throw new Error('_update must be implemented by subclass')
}

module.exports = Hash


/***/ }),

/***/ 9072:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var exports = module.exports = function SHA (algorithm) {
  algorithm = algorithm.toLowerCase()

  var Algorithm = exports[algorithm]
  if (!Algorithm) throw new Error(algorithm + ' is not supported (we accept pull requests)')

  return new Algorithm()
}

exports.sha = __webpack_require__(4448)
exports.sha1 = __webpack_require__(8336)
exports.sha224 = __webpack_require__(8432)
exports.sha256 = __webpack_require__(7499)
exports.sha384 = __webpack_require__(1686)
exports.sha512 = __webpack_require__(7816)


/***/ }),

/***/ 4448:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-0, as defined
 * in FIPS PUB 180-1
 * This source code is derived from sha1.js of the same repository.
 * The difference between SHA-0 and SHA-1 is just a bitwise rotate left
 * operation was added.
 */

var inherits = __webpack_require__(5717)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var K = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
]

var W = new Array(80)

function Sha () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}

inherits(Sha, Hash)

Sha.prototype.init = function () {
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0

  return this
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 80; ++i) W[i] = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20)
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

    e = d
    d = c
    c = rotl30(b)
    b = a
    a = t
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
}

Sha.prototype._hash = function () {
  var H = Buffer.allocUnsafe(20)

  H.writeInt32BE(this._a | 0, 0)
  H.writeInt32BE(this._b | 0, 4)
  H.writeInt32BE(this._c | 0, 8)
  H.writeInt32BE(this._d | 0, 12)
  H.writeInt32BE(this._e | 0, 16)

  return H
}

module.exports = Sha


/***/ }),

/***/ 8336:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var inherits = __webpack_require__(5717)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var K = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
]

var W = new Array(80)

function Sha1 () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}

inherits(Sha1, Hash)

Sha1.prototype.init = function () {
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0

  return this
}

function rotl1 (num) {
  return (num << 1) | (num >>> 31)
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha1.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16])

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20)
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

    e = d
    d = c
    c = rotl30(b)
    b = a
    a = t
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
}

Sha1.prototype._hash = function () {
  var H = Buffer.allocUnsafe(20)

  H.writeInt32BE(this._a | 0, 0)
  H.writeInt32BE(this._b | 0, 4)
  H.writeInt32BE(this._c | 0, 8)
  H.writeInt32BE(this._d | 0, 12)
  H.writeInt32BE(this._e | 0, 16)

  return H
}

module.exports = Sha1


/***/ }),

/***/ 8432:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits = __webpack_require__(5717)
var Sha256 = __webpack_require__(7499)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var W = new Array(64)

function Sha224 () {
  this.init()

  this._w = W // new Array(64)

  Hash.call(this, 64, 56)
}

inherits(Sha224, Sha256)

Sha224.prototype.init = function () {
  this._a = 0xc1059ed8
  this._b = 0x367cd507
  this._c = 0x3070dd17
  this._d = 0xf70e5939
  this._e = 0xffc00b31
  this._f = 0x68581511
  this._g = 0x64f98fa7
  this._h = 0xbefa4fa4

  return this
}

Sha224.prototype._hash = function () {
  var H = Buffer.allocUnsafe(28)

  H.writeInt32BE(this._a, 0)
  H.writeInt32BE(this._b, 4)
  H.writeInt32BE(this._c, 8)
  H.writeInt32BE(this._d, 12)
  H.writeInt32BE(this._e, 16)
  H.writeInt32BE(this._f, 20)
  H.writeInt32BE(this._g, 24)

  return H
}

module.exports = Sha224


/***/ }),

/***/ 7499:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits = __webpack_require__(5717)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var K = [
  0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
  0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
  0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
  0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
  0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
  0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
  0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
  0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
  0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
  0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
  0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
  0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
  0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
  0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
  0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
  0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
]

var W = new Array(64)

function Sha256 () {
  this.init()

  this._w = W // new Array(64)

  Hash.call(this, 64, 56)
}

inherits(Sha256, Hash)

Sha256.prototype.init = function () {
  this._a = 0x6a09e667
  this._b = 0xbb67ae85
  this._c = 0x3c6ef372
  this._d = 0xa54ff53a
  this._e = 0x510e527f
  this._f = 0x9b05688c
  this._g = 0x1f83d9ab
  this._h = 0x5be0cd19

  return this
}

function ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0 (x) {
  return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10)
}

function sigma1 (x) {
  return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7)
}

function gamma0 (x) {
  return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ (x >>> 3)
}

function gamma1 (x) {
  return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ (x >>> 10)
}

Sha256.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0
  var f = this._f | 0
  var g = this._g | 0
  var h = this._h | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 64; ++i) W[i] = (gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16]) | 0

  for (var j = 0; j < 64; ++j) {
    var T1 = (h + sigma1(e) + ch(e, f, g) + K[j] + W[j]) | 0
    var T2 = (sigma0(a) + maj(a, b, c)) | 0

    h = g
    g = f
    f = e
    e = (d + T1) | 0
    d = c
    c = b
    b = a
    a = (T1 + T2) | 0
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
  this._f = (f + this._f) | 0
  this._g = (g + this._g) | 0
  this._h = (h + this._h) | 0
}

Sha256.prototype._hash = function () {
  var H = Buffer.allocUnsafe(32)

  H.writeInt32BE(this._a, 0)
  H.writeInt32BE(this._b, 4)
  H.writeInt32BE(this._c, 8)
  H.writeInt32BE(this._d, 12)
  H.writeInt32BE(this._e, 16)
  H.writeInt32BE(this._f, 20)
  H.writeInt32BE(this._g, 24)
  H.writeInt32BE(this._h, 28)

  return H
}

module.exports = Sha256


/***/ }),

/***/ 1686:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var inherits = __webpack_require__(5717)
var SHA512 = __webpack_require__(7816)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var W = new Array(160)

function Sha384 () {
  this.init()
  this._w = W

  Hash.call(this, 128, 112)
}

inherits(Sha384, SHA512)

Sha384.prototype.init = function () {
  this._ah = 0xcbbb9d5d
  this._bh = 0x629a292a
  this._ch = 0x9159015a
  this._dh = 0x152fecd8
  this._eh = 0x67332667
  this._fh = 0x8eb44a87
  this._gh = 0xdb0c2e0d
  this._hh = 0x47b5481d

  this._al = 0xc1059ed8
  this._bl = 0x367cd507
  this._cl = 0x3070dd17
  this._dl = 0xf70e5939
  this._el = 0xffc00b31
  this._fl = 0x68581511
  this._gl = 0x64f98fa7
  this._hl = 0xbefa4fa4

  return this
}

Sha384.prototype._hash = function () {
  var H = Buffer.allocUnsafe(48)

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset)
    H.writeInt32BE(l, offset + 4)
  }

  writeInt64BE(this._ah, this._al, 0)
  writeInt64BE(this._bh, this._bl, 8)
  writeInt64BE(this._ch, this._cl, 16)
  writeInt64BE(this._dh, this._dl, 24)
  writeInt64BE(this._eh, this._el, 32)
  writeInt64BE(this._fh, this._fl, 40)

  return H
}

module.exports = Sha384


/***/ }),

/***/ 7816:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var inherits = __webpack_require__(5717)
var Hash = __webpack_require__(4189)
var Buffer = (__webpack_require__(9509).Buffer)

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
]

var W = new Array(160)

function Sha512 () {
  this.init()
  this._w = W

  Hash.call(this, 128, 112)
}

inherits(Sha512, Hash)

Sha512.prototype.init = function () {
  this._ah = 0x6a09e667
  this._bh = 0xbb67ae85
  this._ch = 0x3c6ef372
  this._dh = 0xa54ff53a
  this._eh = 0x510e527f
  this._fh = 0x9b05688c
  this._gh = 0x1f83d9ab
  this._hh = 0x5be0cd19

  this._al = 0xf3bcc908
  this._bl = 0x84caa73b
  this._cl = 0xfe94f82b
  this._dl = 0x5f1d36f1
  this._el = 0xade682d1
  this._fl = 0x2b3e6c1f
  this._gl = 0xfb41bd6b
  this._hl = 0x137e2179

  return this
}

function Ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0 (x, xl) {
  return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25)
}

function sigma1 (x, xl) {
  return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23)
}

function Gamma0 (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7)
}

function Gamma0l (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25)
}

function Gamma1 (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6)
}

function Gamma1l (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26)
}

function getCarry (a, b) {
  return (a >>> 0) < (b >>> 0) ? 1 : 0
}

Sha512.prototype._update = function (M) {
  var W = this._w

  var ah = this._ah | 0
  var bh = this._bh | 0
  var ch = this._ch | 0
  var dh = this._dh | 0
  var eh = this._eh | 0
  var fh = this._fh | 0
  var gh = this._gh | 0
  var hh = this._hh | 0

  var al = this._al | 0
  var bl = this._bl | 0
  var cl = this._cl | 0
  var dl = this._dl | 0
  var el = this._el | 0
  var fl = this._fl | 0
  var gl = this._gl | 0
  var hl = this._hl | 0

  for (var i = 0; i < 32; i += 2) {
    W[i] = M.readInt32BE(i * 4)
    W[i + 1] = M.readInt32BE(i * 4 + 4)
  }
  for (; i < 160; i += 2) {
    var xh = W[i - 15 * 2]
    var xl = W[i - 15 * 2 + 1]
    var gamma0 = Gamma0(xh, xl)
    var gamma0l = Gamma0l(xl, xh)

    xh = W[i - 2 * 2]
    xl = W[i - 2 * 2 + 1]
    var gamma1 = Gamma1(xh, xl)
    var gamma1l = Gamma1l(xl, xh)

    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
    var Wi7h = W[i - 7 * 2]
    var Wi7l = W[i - 7 * 2 + 1]

    var Wi16h = W[i - 16 * 2]
    var Wi16l = W[i - 16 * 2 + 1]

    var Wil = (gamma0l + Wi7l) | 0
    var Wih = (gamma0 + Wi7h + getCarry(Wil, gamma0l)) | 0
    Wil = (Wil + gamma1l) | 0
    Wih = (Wih + gamma1 + getCarry(Wil, gamma1l)) | 0
    Wil = (Wil + Wi16l) | 0
    Wih = (Wih + Wi16h + getCarry(Wil, Wi16l)) | 0

    W[i] = Wih
    W[i + 1] = Wil
  }

  for (var j = 0; j < 160; j += 2) {
    Wih = W[j]
    Wil = W[j + 1]

    var majh = maj(ah, bh, ch)
    var majl = maj(al, bl, cl)

    var sigma0h = sigma0(ah, al)
    var sigma0l = sigma0(al, ah)
    var sigma1h = sigma1(eh, el)
    var sigma1l = sigma1(el, eh)

    // t1 = h + sigma1 + ch + K[j] + W[j]
    var Kih = K[j]
    var Kil = K[j + 1]

    var chh = Ch(eh, fh, gh)
    var chl = Ch(el, fl, gl)

    var t1l = (hl + sigma1l) | 0
    var t1h = (hh + sigma1h + getCarry(t1l, hl)) | 0
    t1l = (t1l + chl) | 0
    t1h = (t1h + chh + getCarry(t1l, chl)) | 0
    t1l = (t1l + Kil) | 0
    t1h = (t1h + Kih + getCarry(t1l, Kil)) | 0
    t1l = (t1l + Wil) | 0
    t1h = (t1h + Wih + getCarry(t1l, Wil)) | 0

    // t2 = sigma0 + maj
    var t2l = (sigma0l + majl) | 0
    var t2h = (sigma0h + majh + getCarry(t2l, sigma0l)) | 0

    hh = gh
    hl = gl
    gh = fh
    gl = fl
    fh = eh
    fl = el
    el = (dl + t1l) | 0
    eh = (dh + t1h + getCarry(el, dl)) | 0
    dh = ch
    dl = cl
    ch = bh
    cl = bl
    bh = ah
    bl = al
    al = (t1l + t2l) | 0
    ah = (t1h + t2h + getCarry(al, t1l)) | 0
  }

  this._al = (this._al + al) | 0
  this._bl = (this._bl + bl) | 0
  this._cl = (this._cl + cl) | 0
  this._dl = (this._dl + dl) | 0
  this._el = (this._el + el) | 0
  this._fl = (this._fl + fl) | 0
  this._gl = (this._gl + gl) | 0
  this._hl = (this._hl + hl) | 0

  this._ah = (this._ah + ah + getCarry(this._al, al)) | 0
  this._bh = (this._bh + bh + getCarry(this._bl, bl)) | 0
  this._ch = (this._ch + ch + getCarry(this._cl, cl)) | 0
  this._dh = (this._dh + dh + getCarry(this._dl, dl)) | 0
  this._eh = (this._eh + eh + getCarry(this._el, el)) | 0
  this._fh = (this._fh + fh + getCarry(this._fl, fl)) | 0
  this._gh = (this._gh + gh + getCarry(this._gl, gl)) | 0
  this._hh = (this._hh + hh + getCarry(this._hl, hl)) | 0
}

Sha512.prototype._hash = function () {
  var H = Buffer.allocUnsafe(64)

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset)
    H.writeInt32BE(l, offset + 4)
  }

  writeInt64BE(this._ah, this._al, 0)
  writeInt64BE(this._bh, this._bl, 8)
  writeInt64BE(this._ch, this._cl, 16)
  writeInt64BE(this._dh, this._dl, 24)
  writeInt64BE(this._eh, this._el, 32)
  writeInt64BE(this._fh, this._fl, 40)
  writeInt64BE(this._gh, this._gl, 48)
  writeInt64BE(this._hh, this._hl, 56)

  return H
}

module.exports = Sha512


/***/ }),

/***/ 780:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function(nacl) {
'use strict';

// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
// Public domain.
//
// Implementation derived from TweetNaCl version 20140427.
// See for details: http://tweetnacl.cr.yp.to/

var gf = function(init) {
  var i, r = new Float64Array(16);
  if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
  return r;
};

//  Pluggable, initialized in high-level API below.
var randombytes = function(/* x, n */) { throw new Error('no PRNG'); };

var _0 = new Uint8Array(16);
var _9 = new Uint8Array(32); _9[0] = 9;

var gf0 = gf(),
    gf1 = gf([1]),
    _121665 = gf([0xdb41, 1]),
    D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
    D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
    X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
    Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
    I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

function ts64(x, i, h, l) {
  x[i]   = (h >> 24) & 0xff;
  x[i+1] = (h >> 16) & 0xff;
  x[i+2] = (h >>  8) & 0xff;
  x[i+3] = h & 0xff;
  x[i+4] = (l >> 24)  & 0xff;
  x[i+5] = (l >> 16)  & 0xff;
  x[i+6] = (l >>  8)  & 0xff;
  x[i+7] = l & 0xff;
}

function vn(x, xi, y, yi, n) {
  var i,d = 0;
  for (i = 0; i < n; i++) d |= x[xi+i]^y[yi+i];
  return (1 & ((d - 1) >>> 8)) - 1;
}

function crypto_verify_16(x, xi, y, yi) {
  return vn(x,xi,y,yi,16);
}

function crypto_verify_32(x, xi, y, yi) {
  return vn(x,xi,y,yi,32);
}

function core_salsa20(o, p, k, c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }
   x0 =  x0 +  j0 | 0;
   x1 =  x1 +  j1 | 0;
   x2 =  x2 +  j2 | 0;
   x3 =  x3 +  j3 | 0;
   x4 =  x4 +  j4 | 0;
   x5 =  x5 +  j5 | 0;
   x6 =  x6 +  j6 | 0;
   x7 =  x7 +  j7 | 0;
   x8 =  x8 +  j8 | 0;
   x9 =  x9 +  j9 | 0;
  x10 = x10 + j10 | 0;
  x11 = x11 + j11 | 0;
  x12 = x12 + j12 | 0;
  x13 = x13 + j13 | 0;
  x14 = x14 + j14 | 0;
  x15 = x15 + j15 | 0;

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x1 >>>  0 & 0xff;
  o[ 5] = x1 >>>  8 & 0xff;
  o[ 6] = x1 >>> 16 & 0xff;
  o[ 7] = x1 >>> 24 & 0xff;

  o[ 8] = x2 >>>  0 & 0xff;
  o[ 9] = x2 >>>  8 & 0xff;
  o[10] = x2 >>> 16 & 0xff;
  o[11] = x2 >>> 24 & 0xff;

  o[12] = x3 >>>  0 & 0xff;
  o[13] = x3 >>>  8 & 0xff;
  o[14] = x3 >>> 16 & 0xff;
  o[15] = x3 >>> 24 & 0xff;

  o[16] = x4 >>>  0 & 0xff;
  o[17] = x4 >>>  8 & 0xff;
  o[18] = x4 >>> 16 & 0xff;
  o[19] = x4 >>> 24 & 0xff;

  o[20] = x5 >>>  0 & 0xff;
  o[21] = x5 >>>  8 & 0xff;
  o[22] = x5 >>> 16 & 0xff;
  o[23] = x5 >>> 24 & 0xff;

  o[24] = x6 >>>  0 & 0xff;
  o[25] = x6 >>>  8 & 0xff;
  o[26] = x6 >>> 16 & 0xff;
  o[27] = x6 >>> 24 & 0xff;

  o[28] = x7 >>>  0 & 0xff;
  o[29] = x7 >>>  8 & 0xff;
  o[30] = x7 >>> 16 & 0xff;
  o[31] = x7 >>> 24 & 0xff;

  o[32] = x8 >>>  0 & 0xff;
  o[33] = x8 >>>  8 & 0xff;
  o[34] = x8 >>> 16 & 0xff;
  o[35] = x8 >>> 24 & 0xff;

  o[36] = x9 >>>  0 & 0xff;
  o[37] = x9 >>>  8 & 0xff;
  o[38] = x9 >>> 16 & 0xff;
  o[39] = x9 >>> 24 & 0xff;

  o[40] = x10 >>>  0 & 0xff;
  o[41] = x10 >>>  8 & 0xff;
  o[42] = x10 >>> 16 & 0xff;
  o[43] = x10 >>> 24 & 0xff;

  o[44] = x11 >>>  0 & 0xff;
  o[45] = x11 >>>  8 & 0xff;
  o[46] = x11 >>> 16 & 0xff;
  o[47] = x11 >>> 24 & 0xff;

  o[48] = x12 >>>  0 & 0xff;
  o[49] = x12 >>>  8 & 0xff;
  o[50] = x12 >>> 16 & 0xff;
  o[51] = x12 >>> 24 & 0xff;

  o[52] = x13 >>>  0 & 0xff;
  o[53] = x13 >>>  8 & 0xff;
  o[54] = x13 >>> 16 & 0xff;
  o[55] = x13 >>> 24 & 0xff;

  o[56] = x14 >>>  0 & 0xff;
  o[57] = x14 >>>  8 & 0xff;
  o[58] = x14 >>> 16 & 0xff;
  o[59] = x14 >>> 24 & 0xff;

  o[60] = x15 >>>  0 & 0xff;
  o[61] = x15 >>>  8 & 0xff;
  o[62] = x15 >>> 16 & 0xff;
  o[63] = x15 >>> 24 & 0xff;
}

function core_hsalsa20(o,p,k,c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x5 >>>  0 & 0xff;
  o[ 5] = x5 >>>  8 & 0xff;
  o[ 6] = x5 >>> 16 & 0xff;
  o[ 7] = x5 >>> 24 & 0xff;

  o[ 8] = x10 >>>  0 & 0xff;
  o[ 9] = x10 >>>  8 & 0xff;
  o[10] = x10 >>> 16 & 0xff;
  o[11] = x10 >>> 24 & 0xff;

  o[12] = x15 >>>  0 & 0xff;
  o[13] = x15 >>>  8 & 0xff;
  o[14] = x15 >>> 16 & 0xff;
  o[15] = x15 >>> 24 & 0xff;

  o[16] = x6 >>>  0 & 0xff;
  o[17] = x6 >>>  8 & 0xff;
  o[18] = x6 >>> 16 & 0xff;
  o[19] = x6 >>> 24 & 0xff;

  o[20] = x7 >>>  0 & 0xff;
  o[21] = x7 >>>  8 & 0xff;
  o[22] = x7 >>> 16 & 0xff;
  o[23] = x7 >>> 24 & 0xff;

  o[24] = x8 >>>  0 & 0xff;
  o[25] = x8 >>>  8 & 0xff;
  o[26] = x8 >>> 16 & 0xff;
  o[27] = x8 >>> 24 & 0xff;

  o[28] = x9 >>>  0 & 0xff;
  o[29] = x9 >>>  8 & 0xff;
  o[30] = x9 >>> 16 & 0xff;
  o[31] = x9 >>> 24 & 0xff;
}

function crypto_core_salsa20(out,inp,k,c) {
  core_salsa20(out,inp,k,c);
}

function crypto_core_hsalsa20(out,inp,k,c) {
  core_hsalsa20(out,inp,k,c);
}

var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
            // "expand 32-byte k"

function crypto_stream_salsa20_xor(c,cpos,m,mpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = m[mpos+i] ^ x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
    mpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = m[mpos+i] ^ x[i];
  }
  return 0;
}

function crypto_stream_salsa20(c,cpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = x[i];
  }
  return 0;
}

function crypto_stream(c,cpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20(c,cpos,d,sn,s);
}

function crypto_stream_xor(c,cpos,m,mpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20_xor(c,cpos,m,mpos,d,sn,s);
}

/*
* Port of Andrew Moon's Poly1305-donna-16. Public domain.
* https://github.com/floodyberry/poly1305-donna
*/

var poly1305 = function(key) {
  this.buffer = new Uint8Array(16);
  this.r = new Uint16Array(10);
  this.h = new Uint16Array(10);
  this.pad = new Uint16Array(8);
  this.leftover = 0;
  this.fin = 0;

  var t0, t1, t2, t3, t4, t5, t6, t7;

  t0 = key[ 0] & 0xff | (key[ 1] & 0xff) << 8; this.r[0] = ( t0                     ) & 0x1fff;
  t1 = key[ 2] & 0xff | (key[ 3] & 0xff) << 8; this.r[1] = ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
  t2 = key[ 4] & 0xff | (key[ 5] & 0xff) << 8; this.r[2] = ((t1 >>> 10) | (t2 <<  6)) & 0x1f03;
  t3 = key[ 6] & 0xff | (key[ 7] & 0xff) << 8; this.r[3] = ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
  t4 = key[ 8] & 0xff | (key[ 9] & 0xff) << 8; this.r[4] = ((t3 >>>  4) | (t4 << 12)) & 0x00ff;
  this.r[5] = ((t4 >>>  1)) & 0x1ffe;
  t5 = key[10] & 0xff | (key[11] & 0xff) << 8; this.r[6] = ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
  t6 = key[12] & 0xff | (key[13] & 0xff) << 8; this.r[7] = ((t5 >>> 11) | (t6 <<  5)) & 0x1f81;
  t7 = key[14] & 0xff | (key[15] & 0xff) << 8; this.r[8] = ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
  this.r[9] = ((t7 >>>  5)) & 0x007f;

  this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
  this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
  this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
  this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
  this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
  this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
  this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
  this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
};

poly1305.prototype.blocks = function(m, mpos, bytes) {
  var hibit = this.fin ? 0 : (1 << 11);
  var t0, t1, t2, t3, t4, t5, t6, t7, c;
  var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

  var h0 = this.h[0],
      h1 = this.h[1],
      h2 = this.h[2],
      h3 = this.h[3],
      h4 = this.h[4],
      h5 = this.h[5],
      h6 = this.h[6],
      h7 = this.h[7],
      h8 = this.h[8],
      h9 = this.h[9];

  var r0 = this.r[0],
      r1 = this.r[1],
      r2 = this.r[2],
      r3 = this.r[3],
      r4 = this.r[4],
      r5 = this.r[5],
      r6 = this.r[6],
      r7 = this.r[7],
      r8 = this.r[8],
      r9 = this.r[9];

  while (bytes >= 16) {
    t0 = m[mpos+ 0] & 0xff | (m[mpos+ 1] & 0xff) << 8; h0 += ( t0                     ) & 0x1fff;
    t1 = m[mpos+ 2] & 0xff | (m[mpos+ 3] & 0xff) << 8; h1 += ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
    t2 = m[mpos+ 4] & 0xff | (m[mpos+ 5] & 0xff) << 8; h2 += ((t1 >>> 10) | (t2 <<  6)) & 0x1fff;
    t3 = m[mpos+ 6] & 0xff | (m[mpos+ 7] & 0xff) << 8; h3 += ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
    t4 = m[mpos+ 8] & 0xff | (m[mpos+ 9] & 0xff) << 8; h4 += ((t3 >>>  4) | (t4 << 12)) & 0x1fff;
    h5 += ((t4 >>>  1)) & 0x1fff;
    t5 = m[mpos+10] & 0xff | (m[mpos+11] & 0xff) << 8; h6 += ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
    t6 = m[mpos+12] & 0xff | (m[mpos+13] & 0xff) << 8; h7 += ((t5 >>> 11) | (t6 <<  5)) & 0x1fff;
    t7 = m[mpos+14] & 0xff | (m[mpos+15] & 0xff) << 8; h8 += ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
    h9 += ((t7 >>> 5)) | hibit;

    c = 0;

    d0 = c;
    d0 += h0 * r0;
    d0 += h1 * (5 * r9);
    d0 += h2 * (5 * r8);
    d0 += h3 * (5 * r7);
    d0 += h4 * (5 * r6);
    c = (d0 >>> 13); d0 &= 0x1fff;
    d0 += h5 * (5 * r5);
    d0 += h6 * (5 * r4);
    d0 += h7 * (5 * r3);
    d0 += h8 * (5 * r2);
    d0 += h9 * (5 * r1);
    c += (d0 >>> 13); d0 &= 0x1fff;

    d1 = c;
    d1 += h0 * r1;
    d1 += h1 * r0;
    d1 += h2 * (5 * r9);
    d1 += h3 * (5 * r8);
    d1 += h4 * (5 * r7);
    c = (d1 >>> 13); d1 &= 0x1fff;
    d1 += h5 * (5 * r6);
    d1 += h6 * (5 * r5);
    d1 += h7 * (5 * r4);
    d1 += h8 * (5 * r3);
    d1 += h9 * (5 * r2);
    c += (d1 >>> 13); d1 &= 0x1fff;

    d2 = c;
    d2 += h0 * r2;
    d2 += h1 * r1;
    d2 += h2 * r0;
    d2 += h3 * (5 * r9);
    d2 += h4 * (5 * r8);
    c = (d2 >>> 13); d2 &= 0x1fff;
    d2 += h5 * (5 * r7);
    d2 += h6 * (5 * r6);
    d2 += h7 * (5 * r5);
    d2 += h8 * (5 * r4);
    d2 += h9 * (5 * r3);
    c += (d2 >>> 13); d2 &= 0x1fff;

    d3 = c;
    d3 += h0 * r3;
    d3 += h1 * r2;
    d3 += h2 * r1;
    d3 += h3 * r0;
    d3 += h4 * (5 * r9);
    c = (d3 >>> 13); d3 &= 0x1fff;
    d3 += h5 * (5 * r8);
    d3 += h6 * (5 * r7);
    d3 += h7 * (5 * r6);
    d3 += h8 * (5 * r5);
    d3 += h9 * (5 * r4);
    c += (d3 >>> 13); d3 &= 0x1fff;

    d4 = c;
    d4 += h0 * r4;
    d4 += h1 * r3;
    d4 += h2 * r2;
    d4 += h3 * r1;
    d4 += h4 * r0;
    c = (d4 >>> 13); d4 &= 0x1fff;
    d4 += h5 * (5 * r9);
    d4 += h6 * (5 * r8);
    d4 += h7 * (5 * r7);
    d4 += h8 * (5 * r6);
    d4 += h9 * (5 * r5);
    c += (d4 >>> 13); d4 &= 0x1fff;

    d5 = c;
    d5 += h0 * r5;
    d5 += h1 * r4;
    d5 += h2 * r3;
    d5 += h3 * r2;
    d5 += h4 * r1;
    c = (d5 >>> 13); d5 &= 0x1fff;
    d5 += h5 * r0;
    d5 += h6 * (5 * r9);
    d5 += h7 * (5 * r8);
    d5 += h8 * (5 * r7);
    d5 += h9 * (5 * r6);
    c += (d5 >>> 13); d5 &= 0x1fff;

    d6 = c;
    d6 += h0 * r6;
    d6 += h1 * r5;
    d6 += h2 * r4;
    d6 += h3 * r3;
    d6 += h4 * r2;
    c = (d6 >>> 13); d6 &= 0x1fff;
    d6 += h5 * r1;
    d6 += h6 * r0;
    d6 += h7 * (5 * r9);
    d6 += h8 * (5 * r8);
    d6 += h9 * (5 * r7);
    c += (d6 >>> 13); d6 &= 0x1fff;

    d7 = c;
    d7 += h0 * r7;
    d7 += h1 * r6;
    d7 += h2 * r5;
    d7 += h3 * r4;
    d7 += h4 * r3;
    c = (d7 >>> 13); d7 &= 0x1fff;
    d7 += h5 * r2;
    d7 += h6 * r1;
    d7 += h7 * r0;
    d7 += h8 * (5 * r9);
    d7 += h9 * (5 * r8);
    c += (d7 >>> 13); d7 &= 0x1fff;

    d8 = c;
    d8 += h0 * r8;
    d8 += h1 * r7;
    d8 += h2 * r6;
    d8 += h3 * r5;
    d8 += h4 * r4;
    c = (d8 >>> 13); d8 &= 0x1fff;
    d8 += h5 * r3;
    d8 += h6 * r2;
    d8 += h7 * r1;
    d8 += h8 * r0;
    d8 += h9 * (5 * r9);
    c += (d8 >>> 13); d8 &= 0x1fff;

    d9 = c;
    d9 += h0 * r9;
    d9 += h1 * r8;
    d9 += h2 * r7;
    d9 += h3 * r6;
    d9 += h4 * r5;
    c = (d9 >>> 13); d9 &= 0x1fff;
    d9 += h5 * r4;
    d9 += h6 * r3;
    d9 += h7 * r2;
    d9 += h8 * r1;
    d9 += h9 * r0;
    c += (d9 >>> 13); d9 &= 0x1fff;

    c = (((c << 2) + c)) | 0;
    c = (c + d0) | 0;
    d0 = c & 0x1fff;
    c = (c >>> 13);
    d1 += c;

    h0 = d0;
    h1 = d1;
    h2 = d2;
    h3 = d3;
    h4 = d4;
    h5 = d5;
    h6 = d6;
    h7 = d7;
    h8 = d8;
    h9 = d9;

    mpos += 16;
    bytes -= 16;
  }
  this.h[0] = h0;
  this.h[1] = h1;
  this.h[2] = h2;
  this.h[3] = h3;
  this.h[4] = h4;
  this.h[5] = h5;
  this.h[6] = h6;
  this.h[7] = h7;
  this.h[8] = h8;
  this.h[9] = h9;
};

poly1305.prototype.finish = function(mac, macpos) {
  var g = new Uint16Array(10);
  var c, mask, f, i;

  if (this.leftover) {
    i = this.leftover;
    this.buffer[i++] = 1;
    for (; i < 16; i++) this.buffer[i] = 0;
    this.fin = 1;
    this.blocks(this.buffer, 0, 16);
  }

  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  for (i = 2; i < 10; i++) {
    this.h[i] += c;
    c = this.h[i] >>> 13;
    this.h[i] &= 0x1fff;
  }
  this.h[0] += (c * 5);
  c = this.h[0] >>> 13;
  this.h[0] &= 0x1fff;
  this.h[1] += c;
  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  this.h[2] += c;

  g[0] = this.h[0] + 5;
  c = g[0] >>> 13;
  g[0] &= 0x1fff;
  for (i = 1; i < 10; i++) {
    g[i] = this.h[i] + c;
    c = g[i] >>> 13;
    g[i] &= 0x1fff;
  }
  g[9] -= (1 << 13);

  mask = (c ^ 1) - 1;
  for (i = 0; i < 10; i++) g[i] &= mask;
  mask = ~mask;
  for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i];

  this.h[0] = ((this.h[0]       ) | (this.h[1] << 13)                    ) & 0xffff;
  this.h[1] = ((this.h[1] >>>  3) | (this.h[2] << 10)                    ) & 0xffff;
  this.h[2] = ((this.h[2] >>>  6) | (this.h[3] <<  7)                    ) & 0xffff;
  this.h[3] = ((this.h[3] >>>  9) | (this.h[4] <<  4)                    ) & 0xffff;
  this.h[4] = ((this.h[4] >>> 12) | (this.h[5] <<  1) | (this.h[6] << 14)) & 0xffff;
  this.h[5] = ((this.h[6] >>>  2) | (this.h[7] << 11)                    ) & 0xffff;
  this.h[6] = ((this.h[7] >>>  5) | (this.h[8] <<  8)                    ) & 0xffff;
  this.h[7] = ((this.h[8] >>>  8) | (this.h[9] <<  5)                    ) & 0xffff;

  f = this.h[0] + this.pad[0];
  this.h[0] = f & 0xffff;
  for (i = 1; i < 8; i++) {
    f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0;
    this.h[i] = f & 0xffff;
  }

  mac[macpos+ 0] = (this.h[0] >>> 0) & 0xff;
  mac[macpos+ 1] = (this.h[0] >>> 8) & 0xff;
  mac[macpos+ 2] = (this.h[1] >>> 0) & 0xff;
  mac[macpos+ 3] = (this.h[1] >>> 8) & 0xff;
  mac[macpos+ 4] = (this.h[2] >>> 0) & 0xff;
  mac[macpos+ 5] = (this.h[2] >>> 8) & 0xff;
  mac[macpos+ 6] = (this.h[3] >>> 0) & 0xff;
  mac[macpos+ 7] = (this.h[3] >>> 8) & 0xff;
  mac[macpos+ 8] = (this.h[4] >>> 0) & 0xff;
  mac[macpos+ 9] = (this.h[4] >>> 8) & 0xff;
  mac[macpos+10] = (this.h[5] >>> 0) & 0xff;
  mac[macpos+11] = (this.h[5] >>> 8) & 0xff;
  mac[macpos+12] = (this.h[6] >>> 0) & 0xff;
  mac[macpos+13] = (this.h[6] >>> 8) & 0xff;
  mac[macpos+14] = (this.h[7] >>> 0) & 0xff;
  mac[macpos+15] = (this.h[7] >>> 8) & 0xff;
};

poly1305.prototype.update = function(m, mpos, bytes) {
  var i, want;

  if (this.leftover) {
    want = (16 - this.leftover);
    if (want > bytes)
      want = bytes;
    for (i = 0; i < want; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    bytes -= want;
    mpos += want;
    this.leftover += want;
    if (this.leftover < 16)
      return;
    this.blocks(this.buffer, 0, 16);
    this.leftover = 0;
  }

  if (bytes >= 16) {
    want = bytes - (bytes % 16);
    this.blocks(m, mpos, want);
    mpos += want;
    bytes -= want;
  }

  if (bytes) {
    for (i = 0; i < bytes; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    this.leftover += bytes;
  }
};

function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
  var s = new poly1305(k);
  s.update(m, mpos, n);
  s.finish(out, outpos);
  return 0;
}

function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
  var x = new Uint8Array(16);
  crypto_onetimeauth(x,0,m,mpos,n,k);
  return crypto_verify_16(h,hpos,x,0);
}

function crypto_secretbox(c,m,d,n,k) {
  var i;
  if (d < 32) return -1;
  crypto_stream_xor(c,0,m,0,d,n,k);
  crypto_onetimeauth(c, 16, c, 32, d - 32, c);
  for (i = 0; i < 16; i++) c[i] = 0;
  return 0;
}

function crypto_secretbox_open(m,c,d,n,k) {
  var i;
  var x = new Uint8Array(32);
  if (d < 32) return -1;
  crypto_stream(x,0,32,n,k);
  if (crypto_onetimeauth_verify(c, 16,c, 32,d - 32,x) !== 0) return -1;
  crypto_stream_xor(m,0,c,0,d,n,k);
  for (i = 0; i < 32; i++) m[i] = 0;
  return 0;
}

function set25519(r, a) {
  var i;
  for (i = 0; i < 16; i++) r[i] = a[i]|0;
}

function car25519(o) {
  var i, v, c = 1;
  for (i = 0; i < 16; i++) {
    v = o[i] + c + 65535;
    c = Math.floor(v / 65536);
    o[i] = v - c * 65536;
  }
  o[0] += c-1 + 37 * (c-1);
}

function sel25519(p, q, b) {
  var t, c = ~(b-1);
  for (var i = 0; i < 16; i++) {
    t = c & (p[i] ^ q[i]);
    p[i] ^= t;
    q[i] ^= t;
  }
}

function pack25519(o, n) {
  var i, j, b;
  var m = gf(), t = gf();
  for (i = 0; i < 16; i++) t[i] = n[i];
  car25519(t);
  car25519(t);
  car25519(t);
  for (j = 0; j < 2; j++) {
    m[0] = t[0] - 0xffed;
    for (i = 1; i < 15; i++) {
      m[i] = t[i] - 0xffff - ((m[i-1]>>16) & 1);
      m[i-1] &= 0xffff;
    }
    m[15] = t[15] - 0x7fff - ((m[14]>>16) & 1);
    b = (m[15]>>16) & 1;
    m[14] &= 0xffff;
    sel25519(t, m, 1-b);
  }
  for (i = 0; i < 16; i++) {
    o[2*i] = t[i] & 0xff;
    o[2*i+1] = t[i]>>8;
  }
}

function neq25519(a, b) {
  var c = new Uint8Array(32), d = new Uint8Array(32);
  pack25519(c, a);
  pack25519(d, b);
  return crypto_verify_32(c, 0, d, 0);
}

function par25519(a) {
  var d = new Uint8Array(32);
  pack25519(d, a);
  return d[0] & 1;
}

function unpack25519(o, n) {
  var i;
  for (i = 0; i < 16; i++) o[i] = n[2*i] + (n[2*i+1] << 8);
  o[15] &= 0x7fff;
}

function A(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
}

function Z(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
}

function M(o, a, b) {
  var v, c,
     t0 = 0,  t1 = 0,  t2 = 0,  t3 = 0,  t4 = 0,  t5 = 0,  t6 = 0,  t7 = 0,
     t8 = 0,  t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0,
    t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0,
    t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0,
    b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3],
    b4 = b[4],
    b5 = b[5],
    b6 = b[6],
    b7 = b[7],
    b8 = b[8],
    b9 = b[9],
    b10 = b[10],
    b11 = b[11],
    b12 = b[12],
    b13 = b[13],
    b14 = b[14],
    b15 = b[15];

  v = a[0];
  t0 += v * b0;
  t1 += v * b1;
  t2 += v * b2;
  t3 += v * b3;
  t4 += v * b4;
  t5 += v * b5;
  t6 += v * b6;
  t7 += v * b7;
  t8 += v * b8;
  t9 += v * b9;
  t10 += v * b10;
  t11 += v * b11;
  t12 += v * b12;
  t13 += v * b13;
  t14 += v * b14;
  t15 += v * b15;
  v = a[1];
  t1 += v * b0;
  t2 += v * b1;
  t3 += v * b2;
  t4 += v * b3;
  t5 += v * b4;
  t6 += v * b5;
  t7 += v * b6;
  t8 += v * b7;
  t9 += v * b8;
  t10 += v * b9;
  t11 += v * b10;
  t12 += v * b11;
  t13 += v * b12;
  t14 += v * b13;
  t15 += v * b14;
  t16 += v * b15;
  v = a[2];
  t2 += v * b0;
  t3 += v * b1;
  t4 += v * b2;
  t5 += v * b3;
  t6 += v * b4;
  t7 += v * b5;
  t8 += v * b6;
  t9 += v * b7;
  t10 += v * b8;
  t11 += v * b9;
  t12 += v * b10;
  t13 += v * b11;
  t14 += v * b12;
  t15 += v * b13;
  t16 += v * b14;
  t17 += v * b15;
  v = a[3];
  t3 += v * b0;
  t4 += v * b1;
  t5 += v * b2;
  t6 += v * b3;
  t7 += v * b4;
  t8 += v * b5;
  t9 += v * b6;
  t10 += v * b7;
  t11 += v * b8;
  t12 += v * b9;
  t13 += v * b10;
  t14 += v * b11;
  t15 += v * b12;
  t16 += v * b13;
  t17 += v * b14;
  t18 += v * b15;
  v = a[4];
  t4 += v * b0;
  t5 += v * b1;
  t6 += v * b2;
  t7 += v * b3;
  t8 += v * b4;
  t9 += v * b5;
  t10 += v * b6;
  t11 += v * b7;
  t12 += v * b8;
  t13 += v * b9;
  t14 += v * b10;
  t15 += v * b11;
  t16 += v * b12;
  t17 += v * b13;
  t18 += v * b14;
  t19 += v * b15;
  v = a[5];
  t5 += v * b0;
  t6 += v * b1;
  t7 += v * b2;
  t8 += v * b3;
  t9 += v * b4;
  t10 += v * b5;
  t11 += v * b6;
  t12 += v * b7;
  t13 += v * b8;
  t14 += v * b9;
  t15 += v * b10;
  t16 += v * b11;
  t17 += v * b12;
  t18 += v * b13;
  t19 += v * b14;
  t20 += v * b15;
  v = a[6];
  t6 += v * b0;
  t7 += v * b1;
  t8 += v * b2;
  t9 += v * b3;
  t10 += v * b4;
  t11 += v * b5;
  t12 += v * b6;
  t13 += v * b7;
  t14 += v * b8;
  t15 += v * b9;
  t16 += v * b10;
  t17 += v * b11;
  t18 += v * b12;
  t19 += v * b13;
  t20 += v * b14;
  t21 += v * b15;
  v = a[7];
  t7 += v * b0;
  t8 += v * b1;
  t9 += v * b2;
  t10 += v * b3;
  t11 += v * b4;
  t12 += v * b5;
  t13 += v * b6;
  t14 += v * b7;
  t15 += v * b8;
  t16 += v * b9;
  t17 += v * b10;
  t18 += v * b11;
  t19 += v * b12;
  t20 += v * b13;
  t21 += v * b14;
  t22 += v * b15;
  v = a[8];
  t8 += v * b0;
  t9 += v * b1;
  t10 += v * b2;
  t11 += v * b3;
  t12 += v * b4;
  t13 += v * b5;
  t14 += v * b6;
  t15 += v * b7;
  t16 += v * b8;
  t17 += v * b9;
  t18 += v * b10;
  t19 += v * b11;
  t20 += v * b12;
  t21 += v * b13;
  t22 += v * b14;
  t23 += v * b15;
  v = a[9];
  t9 += v * b0;
  t10 += v * b1;
  t11 += v * b2;
  t12 += v * b3;
  t13 += v * b4;
  t14 += v * b5;
  t15 += v * b6;
  t16 += v * b7;
  t17 += v * b8;
  t18 += v * b9;
  t19 += v * b10;
  t20 += v * b11;
  t21 += v * b12;
  t22 += v * b13;
  t23 += v * b14;
  t24 += v * b15;
  v = a[10];
  t10 += v * b0;
  t11 += v * b1;
  t12 += v * b2;
  t13 += v * b3;
  t14 += v * b4;
  t15 += v * b5;
  t16 += v * b6;
  t17 += v * b7;
  t18 += v * b8;
  t19 += v * b9;
  t20 += v * b10;
  t21 += v * b11;
  t22 += v * b12;
  t23 += v * b13;
  t24 += v * b14;
  t25 += v * b15;
  v = a[11];
  t11 += v * b0;
  t12 += v * b1;
  t13 += v * b2;
  t14 += v * b3;
  t15 += v * b4;
  t16 += v * b5;
  t17 += v * b6;
  t18 += v * b7;
  t19 += v * b8;
  t20 += v * b9;
  t21 += v * b10;
  t22 += v * b11;
  t23 += v * b12;
  t24 += v * b13;
  t25 += v * b14;
  t26 += v * b15;
  v = a[12];
  t12 += v * b0;
  t13 += v * b1;
  t14 += v * b2;
  t15 += v * b3;
  t16 += v * b4;
  t17 += v * b5;
  t18 += v * b6;
  t19 += v * b7;
  t20 += v * b8;
  t21 += v * b9;
  t22 += v * b10;
  t23 += v * b11;
  t24 += v * b12;
  t25 += v * b13;
  t26 += v * b14;
  t27 += v * b15;
  v = a[13];
  t13 += v * b0;
  t14 += v * b1;
  t15 += v * b2;
  t16 += v * b3;
  t17 += v * b4;
  t18 += v * b5;
  t19 += v * b6;
  t20 += v * b7;
  t21 += v * b8;
  t22 += v * b9;
  t23 += v * b10;
  t24 += v * b11;
  t25 += v * b12;
  t26 += v * b13;
  t27 += v * b14;
  t28 += v * b15;
  v = a[14];
  t14 += v * b0;
  t15 += v * b1;
  t16 += v * b2;
  t17 += v * b3;
  t18 += v * b4;
  t19 += v * b5;
  t20 += v * b6;
  t21 += v * b7;
  t22 += v * b8;
  t23 += v * b9;
  t24 += v * b10;
  t25 += v * b11;
  t26 += v * b12;
  t27 += v * b13;
  t28 += v * b14;
  t29 += v * b15;
  v = a[15];
  t15 += v * b0;
  t16 += v * b1;
  t17 += v * b2;
  t18 += v * b3;
  t19 += v * b4;
  t20 += v * b5;
  t21 += v * b6;
  t22 += v * b7;
  t23 += v * b8;
  t24 += v * b9;
  t25 += v * b10;
  t26 += v * b11;
  t27 += v * b12;
  t28 += v * b13;
  t29 += v * b14;
  t30 += v * b15;

  t0  += 38 * t16;
  t1  += 38 * t17;
  t2  += 38 * t18;
  t3  += 38 * t19;
  t4  += 38 * t20;
  t5  += 38 * t21;
  t6  += 38 * t22;
  t7  += 38 * t23;
  t8  += 38 * t24;
  t9  += 38 * t25;
  t10 += 38 * t26;
  t11 += 38 * t27;
  t12 += 38 * t28;
  t13 += 38 * t29;
  t14 += 38 * t30;
  // t15 left as is

  // first car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  // second car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  o[ 0] = t0;
  o[ 1] = t1;
  o[ 2] = t2;
  o[ 3] = t3;
  o[ 4] = t4;
  o[ 5] = t5;
  o[ 6] = t6;
  o[ 7] = t7;
  o[ 8] = t8;
  o[ 9] = t9;
  o[10] = t10;
  o[11] = t11;
  o[12] = t12;
  o[13] = t13;
  o[14] = t14;
  o[15] = t15;
}

function S(o, a) {
  M(o, a, a);
}

function inv25519(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 253; a >= 0; a--) {
    S(c, c);
    if(a !== 2 && a !== 4) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function pow2523(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 250; a >= 0; a--) {
      S(c, c);
      if(a !== 1) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function crypto_scalarmult(q, n, p) {
  var z = new Uint8Array(32);
  var x = new Float64Array(80), r, i;
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf();
  for (i = 0; i < 31; i++) z[i] = n[i];
  z[31]=(n[31]&127)|64;
  z[0]&=248;
  unpack25519(x,p);
  for (i = 0; i < 16; i++) {
    b[i]=x[i];
    d[i]=a[i]=c[i]=0;
  }
  a[0]=d[0]=1;
  for (i=254; i>=0; --i) {
    r=(z[i>>>3]>>>(i&7))&1;
    sel25519(a,b,r);
    sel25519(c,d,r);
    A(e,a,c);
    Z(a,a,c);
    A(c,b,d);
    Z(b,b,d);
    S(d,e);
    S(f,a);
    M(a,c,a);
    M(c,b,e);
    A(e,a,c);
    Z(a,a,c);
    S(b,a);
    Z(c,d,f);
    M(a,c,_121665);
    A(a,a,d);
    M(c,c,a);
    M(a,d,f);
    M(d,b,x);
    S(b,e);
    sel25519(a,b,r);
    sel25519(c,d,r);
  }
  for (i = 0; i < 16; i++) {
    x[i+16]=a[i];
    x[i+32]=c[i];
    x[i+48]=b[i];
    x[i+64]=d[i];
  }
  var x32 = x.subarray(32);
  var x16 = x.subarray(16);
  inv25519(x32,x32);
  M(x16,x16,x32);
  pack25519(q,x16);
  return 0;
}

function crypto_scalarmult_base(q, n) {
  return crypto_scalarmult(q, n, _9);
}

function crypto_box_keypair(y, x) {
  randombytes(x, 32);
  return crypto_scalarmult_base(y, x);
}

function crypto_box_beforenm(k, y, x) {
  var s = new Uint8Array(32);
  crypto_scalarmult(s, x, y);
  return crypto_core_hsalsa20(k, _0, s, sigma);
}

var crypto_box_afternm = crypto_secretbox;
var crypto_box_open_afternm = crypto_secretbox_open;

function crypto_box(c, m, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_afternm(c, m, d, n, k);
}

function crypto_box_open(m, c, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_open_afternm(m, c, d, n, k);
}

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function crypto_hashblocks_hl(hh, hl, m, n) {
  var wh = new Int32Array(16), wl = new Int32Array(16),
      bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7,
      bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7,
      th, tl, i, j, h, l, a, b, c, d;

  var ah0 = hh[0],
      ah1 = hh[1],
      ah2 = hh[2],
      ah3 = hh[3],
      ah4 = hh[4],
      ah5 = hh[5],
      ah6 = hh[6],
      ah7 = hh[7],

      al0 = hl[0],
      al1 = hl[1],
      al2 = hl[2],
      al3 = hl[3],
      al4 = hl[4],
      al5 = hl[5],
      al6 = hl[6],
      al7 = hl[7];

  var pos = 0;
  while (n >= 128) {
    for (i = 0; i < 16; i++) {
      j = 8 * i + pos;
      wh[i] = (m[j+0] << 24) | (m[j+1] << 16) | (m[j+2] << 8) | m[j+3];
      wl[i] = (m[j+4] << 24) | (m[j+5] << 16) | (m[j+6] << 8) | m[j+7];
    }
    for (i = 0; i < 80; i++) {
      bh0 = ah0;
      bh1 = ah1;
      bh2 = ah2;
      bh3 = ah3;
      bh4 = ah4;
      bh5 = ah5;
      bh6 = ah6;
      bh7 = ah7;

      bl0 = al0;
      bl1 = al1;
      bl2 = al2;
      bl3 = al3;
      bl4 = al4;
      bl5 = al5;
      bl6 = al6;
      bl7 = al7;

      // add
      h = ah7;
      l = al7;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma1
      h = ((ah4 >>> 14) | (al4 << (32-14))) ^ ((ah4 >>> 18) | (al4 << (32-18))) ^ ((al4 >>> (41-32)) | (ah4 << (32-(41-32))));
      l = ((al4 >>> 14) | (ah4 << (32-14))) ^ ((al4 >>> 18) | (ah4 << (32-18))) ^ ((ah4 >>> (41-32)) | (al4 << (32-(41-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Ch
      h = (ah4 & ah5) ^ (~ah4 & ah6);
      l = (al4 & al5) ^ (~al4 & al6);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // K
      h = K[i*2];
      l = K[i*2+1];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // w
      h = wh[i%16];
      l = wl[i%16];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      th = c & 0xffff | d << 16;
      tl = a & 0xffff | b << 16;

      // add
      h = th;
      l = tl;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma0
      h = ((ah0 >>> 28) | (al0 << (32-28))) ^ ((al0 >>> (34-32)) | (ah0 << (32-(34-32)))) ^ ((al0 >>> (39-32)) | (ah0 << (32-(39-32))));
      l = ((al0 >>> 28) | (ah0 << (32-28))) ^ ((ah0 >>> (34-32)) | (al0 << (32-(34-32)))) ^ ((ah0 >>> (39-32)) | (al0 << (32-(39-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Maj
      h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
      l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh7 = (c & 0xffff) | (d << 16);
      bl7 = (a & 0xffff) | (b << 16);

      // add
      h = bh3;
      l = bl3;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = th;
      l = tl;

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh3 = (c & 0xffff) | (d << 16);
      bl3 = (a & 0xffff) | (b << 16);

      ah1 = bh0;
      ah2 = bh1;
      ah3 = bh2;
      ah4 = bh3;
      ah5 = bh4;
      ah6 = bh5;
      ah7 = bh6;
      ah0 = bh7;

      al1 = bl0;
      al2 = bl1;
      al3 = bl2;
      al4 = bl3;
      al5 = bl4;
      al6 = bl5;
      al7 = bl6;
      al0 = bl7;

      if (i%16 === 15) {
        for (j = 0; j < 16; j++) {
          // add
          h = wh[j];
          l = wl[j];

          a = l & 0xffff; b = l >>> 16;
          c = h & 0xffff; d = h >>> 16;

          h = wh[(j+9)%16];
          l = wl[(j+9)%16];

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma0
          th = wh[(j+1)%16];
          tl = wl[(j+1)%16];
          h = ((th >>> 1) | (tl << (32-1))) ^ ((th >>> 8) | (tl << (32-8))) ^ (th >>> 7);
          l = ((tl >>> 1) | (th << (32-1))) ^ ((tl >>> 8) | (th << (32-8))) ^ ((tl >>> 7) | (th << (32-7)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma1
          th = wh[(j+14)%16];
          tl = wl[(j+14)%16];
          h = ((th >>> 19) | (tl << (32-19))) ^ ((tl >>> (61-32)) | (th << (32-(61-32)))) ^ (th >>> 6);
          l = ((tl >>> 19) | (th << (32-19))) ^ ((th >>> (61-32)) | (tl << (32-(61-32)))) ^ ((tl >>> 6) | (th << (32-6)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;

          wh[j] = (c & 0xffff) | (d << 16);
          wl[j] = (a & 0xffff) | (b << 16);
        }
      }
    }

    // add
    h = ah0;
    l = al0;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[0];
    l = hl[0];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[0] = ah0 = (c & 0xffff) | (d << 16);
    hl[0] = al0 = (a & 0xffff) | (b << 16);

    h = ah1;
    l = al1;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[1];
    l = hl[1];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[1] = ah1 = (c & 0xffff) | (d << 16);
    hl[1] = al1 = (a & 0xffff) | (b << 16);

    h = ah2;
    l = al2;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[2];
    l = hl[2];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[2] = ah2 = (c & 0xffff) | (d << 16);
    hl[2] = al2 = (a & 0xffff) | (b << 16);

    h = ah3;
    l = al3;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[3];
    l = hl[3];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[3] = ah3 = (c & 0xffff) | (d << 16);
    hl[3] = al3 = (a & 0xffff) | (b << 16);

    h = ah4;
    l = al4;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[4];
    l = hl[4];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[4] = ah4 = (c & 0xffff) | (d << 16);
    hl[4] = al4 = (a & 0xffff) | (b << 16);

    h = ah5;
    l = al5;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[5];
    l = hl[5];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[5] = ah5 = (c & 0xffff) | (d << 16);
    hl[5] = al5 = (a & 0xffff) | (b << 16);

    h = ah6;
    l = al6;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[6];
    l = hl[6];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[6] = ah6 = (c & 0xffff) | (d << 16);
    hl[6] = al6 = (a & 0xffff) | (b << 16);

    h = ah7;
    l = al7;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[7];
    l = hl[7];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[7] = ah7 = (c & 0xffff) | (d << 16);
    hl[7] = al7 = (a & 0xffff) | (b << 16);

    pos += 128;
    n -= 128;
  }

  return n;
}

function crypto_hash(out, m, n) {
  var hh = new Int32Array(8),
      hl = new Int32Array(8),
      x = new Uint8Array(256),
      i, b = n;

  hh[0] = 0x6a09e667;
  hh[1] = 0xbb67ae85;
  hh[2] = 0x3c6ef372;
  hh[3] = 0xa54ff53a;
  hh[4] = 0x510e527f;
  hh[5] = 0x9b05688c;
  hh[6] = 0x1f83d9ab;
  hh[7] = 0x5be0cd19;

  hl[0] = 0xf3bcc908;
  hl[1] = 0x84caa73b;
  hl[2] = 0xfe94f82b;
  hl[3] = 0x5f1d36f1;
  hl[4] = 0xade682d1;
  hl[5] = 0x2b3e6c1f;
  hl[6] = 0xfb41bd6b;
  hl[7] = 0x137e2179;

  crypto_hashblocks_hl(hh, hl, m, n);
  n %= 128;

  for (i = 0; i < n; i++) x[i] = m[b-n+i];
  x[n] = 128;

  n = 256-128*(n<112?1:0);
  x[n-9] = 0;
  ts64(x, n-8,  (b / 0x20000000) | 0, b << 3);
  crypto_hashblocks_hl(hh, hl, x, n);

  for (i = 0; i < 8; i++) ts64(out, 8*i, hh[i], hl[i]);

  return 0;
}

function add(p, q) {
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf(),
      g = gf(), h = gf(), t = gf();

  Z(a, p[1], p[0]);
  Z(t, q[1], q[0]);
  M(a, a, t);
  A(b, p[0], p[1]);
  A(t, q[0], q[1]);
  M(b, b, t);
  M(c, p[3], q[3]);
  M(c, c, D2);
  M(d, p[2], q[2]);
  A(d, d, d);
  Z(e, b, a);
  Z(f, d, c);
  A(g, d, c);
  A(h, b, a);

  M(p[0], e, f);
  M(p[1], h, g);
  M(p[2], g, f);
  M(p[3], e, h);
}

function cswap(p, q, b) {
  var i;
  for (i = 0; i < 4; i++) {
    sel25519(p[i], q[i], b);
  }
}

function pack(r, p) {
  var tx = gf(), ty = gf(), zi = gf();
  inv25519(zi, p[2]);
  M(tx, p[0], zi);
  M(ty, p[1], zi);
  pack25519(r, ty);
  r[31] ^= par25519(tx) << 7;
}

function scalarmult(p, q, s) {
  var b, i;
  set25519(p[0], gf0);
  set25519(p[1], gf1);
  set25519(p[2], gf1);
  set25519(p[3], gf0);
  for (i = 255; i >= 0; --i) {
    b = (s[(i/8)|0] >> (i&7)) & 1;
    cswap(p, q, b);
    add(q, p);
    add(p, p);
    cswap(p, q, b);
  }
}

function scalarbase(p, s) {
  var q = [gf(), gf(), gf(), gf()];
  set25519(q[0], X);
  set25519(q[1], Y);
  set25519(q[2], gf1);
  M(q[3], X, Y);
  scalarmult(p, q, s);
}

function crypto_sign_keypair(pk, sk, seeded) {
  var d = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()];
  var i;

  if (!seeded) randombytes(sk, 32);
  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  scalarbase(p, d);
  pack(pk, p);

  for (i = 0; i < 32; i++) sk[i+32] = pk[i];
  return 0;
}

var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);

function modL(r, x) {
  var carry, i, j, k;
  for (i = 63; i >= 32; --i) {
    carry = 0;
    for (j = i - 32, k = i - 12; j < k; ++j) {
      x[j] += carry - 16 * x[i] * L[j - (i - 32)];
      carry = Math.floor((x[j] + 128) / 256);
      x[j] -= carry * 256;
    }
    x[j] += carry;
    x[i] = 0;
  }
  carry = 0;
  for (j = 0; j < 32; j++) {
    x[j] += carry - (x[31] >> 4) * L[j];
    carry = x[j] >> 8;
    x[j] &= 255;
  }
  for (j = 0; j < 32; j++) x[j] -= carry * L[j];
  for (i = 0; i < 32; i++) {
    x[i+1] += x[i] >> 8;
    r[i] = x[i] & 255;
  }
}

function reduce(r) {
  var x = new Float64Array(64), i;
  for (i = 0; i < 64; i++) x[i] = r[i];
  for (i = 0; i < 64; i++) r[i] = 0;
  modL(r, x);
}

// Note: difference from C - smlen returned, not passed as argument.
function crypto_sign(sm, m, n, sk) {
  var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
  var i, j, x = new Float64Array(64);
  var p = [gf(), gf(), gf(), gf()];

  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  var smlen = n + 64;
  for (i = 0; i < n; i++) sm[64 + i] = m[i];
  for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

  crypto_hash(r, sm.subarray(32), n+32);
  reduce(r);
  scalarbase(p, r);
  pack(sm, p);

  for (i = 32; i < 64; i++) sm[i] = sk[i];
  crypto_hash(h, sm, n + 64);
  reduce(h);

  for (i = 0; i < 64; i++) x[i] = 0;
  for (i = 0; i < 32; i++) x[i] = r[i];
  for (i = 0; i < 32; i++) {
    for (j = 0; j < 32; j++) {
      x[i+j] += h[i] * d[j];
    }
  }

  modL(sm.subarray(32), x);
  return smlen;
}

function unpackneg(r, p) {
  var t = gf(), chk = gf(), num = gf(),
      den = gf(), den2 = gf(), den4 = gf(),
      den6 = gf();

  set25519(r[2], gf1);
  unpack25519(r[1], p);
  S(num, r[1]);
  M(den, num, D);
  Z(num, num, r[2]);
  A(den, r[2], den);

  S(den2, den);
  S(den4, den2);
  M(den6, den4, den2);
  M(t, den6, num);
  M(t, t, den);

  pow2523(t, t);
  M(t, t, num);
  M(t, t, den);
  M(t, t, den);
  M(r[0], t, den);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) M(r[0], r[0], I);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) return -1;

  if (par25519(r[0]) === (p[31]>>7)) Z(r[0], gf0, r[0]);

  M(r[3], r[0], r[1]);
  return 0;
}

function crypto_sign_open(m, sm, n, pk) {
  var i;
  var t = new Uint8Array(32), h = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()],
      q = [gf(), gf(), gf(), gf()];

  if (n < 64) return -1;

  if (unpackneg(q, pk)) return -1;

  for (i = 0; i < n; i++) m[i] = sm[i];
  for (i = 0; i < 32; i++) m[i+32] = pk[i];
  crypto_hash(h, m, n);
  reduce(h);
  scalarmult(p, q, h);

  scalarbase(q, sm.subarray(32));
  add(p, q);
  pack(t, p);

  n -= 64;
  if (crypto_verify_32(sm, 0, t, 0)) {
    for (i = 0; i < n; i++) m[i] = 0;
    return -1;
  }

  for (i = 0; i < n; i++) m[i] = sm[i + 64];
  return n;
}

var crypto_secretbox_KEYBYTES = 32,
    crypto_secretbox_NONCEBYTES = 24,
    crypto_secretbox_ZEROBYTES = 32,
    crypto_secretbox_BOXZEROBYTES = 16,
    crypto_scalarmult_BYTES = 32,
    crypto_scalarmult_SCALARBYTES = 32,
    crypto_box_PUBLICKEYBYTES = 32,
    crypto_box_SECRETKEYBYTES = 32,
    crypto_box_BEFORENMBYTES = 32,
    crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
    crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
    crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
    crypto_sign_BYTES = 64,
    crypto_sign_PUBLICKEYBYTES = 32,
    crypto_sign_SECRETKEYBYTES = 64,
    crypto_sign_SEEDBYTES = 32,
    crypto_hash_BYTES = 64;

nacl.lowlevel = {
  crypto_core_hsalsa20: crypto_core_hsalsa20,
  crypto_stream_xor: crypto_stream_xor,
  crypto_stream: crypto_stream,
  crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
  crypto_stream_salsa20: crypto_stream_salsa20,
  crypto_onetimeauth: crypto_onetimeauth,
  crypto_onetimeauth_verify: crypto_onetimeauth_verify,
  crypto_verify_16: crypto_verify_16,
  crypto_verify_32: crypto_verify_32,
  crypto_secretbox: crypto_secretbox,
  crypto_secretbox_open: crypto_secretbox_open,
  crypto_scalarmult: crypto_scalarmult,
  crypto_scalarmult_base: crypto_scalarmult_base,
  crypto_box_beforenm: crypto_box_beforenm,
  crypto_box_afternm: crypto_box_afternm,
  crypto_box: crypto_box,
  crypto_box_open: crypto_box_open,
  crypto_box_keypair: crypto_box_keypair,
  crypto_hash: crypto_hash,
  crypto_sign: crypto_sign,
  crypto_sign_keypair: crypto_sign_keypair,
  crypto_sign_open: crypto_sign_open,

  crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
  crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
  crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
  crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
  crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
  crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
  crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
  crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
  crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
  crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
  crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
  crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
  crypto_sign_BYTES: crypto_sign_BYTES,
  crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
  crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
  crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
  crypto_hash_BYTES: crypto_hash_BYTES,

  gf: gf,
  D: D,
  L: L,
  pack25519: pack25519,
  unpack25519: unpack25519,
  M: M,
  A: A,
  S: S,
  Z: Z,
  pow2523: pow2523,
  add: add,
  set25519: set25519,
  modL: modL,
  scalarmult: scalarmult,
  scalarbase: scalarbase,
};

/* High-level API */

function checkLengths(k, n) {
  if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
  if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
}

function checkBoxLengths(pk, sk) {
  if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
  if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
}

function checkArrayTypes() {
  for (var i = 0; i < arguments.length; i++) {
    if (!(arguments[i] instanceof Uint8Array))
      throw new TypeError('unexpected type, use Uint8Array');
  }
}

function cleanup(arr) {
  for (var i = 0; i < arr.length; i++) arr[i] = 0;
}

nacl.randomBytes = function(n) {
  var b = new Uint8Array(n);
  randombytes(b, n);
  return b;
};

nacl.secretbox = function(msg, nonce, key) {
  checkArrayTypes(msg, nonce, key);
  checkLengths(key, nonce);
  var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
  var c = new Uint8Array(m.length);
  for (var i = 0; i < msg.length; i++) m[i+crypto_secretbox_ZEROBYTES] = msg[i];
  crypto_secretbox(c, m, m.length, nonce, key);
  return c.subarray(crypto_secretbox_BOXZEROBYTES);
};

nacl.secretbox.open = function(box, nonce, key) {
  checkArrayTypes(box, nonce, key);
  checkLengths(key, nonce);
  var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
  var m = new Uint8Array(c.length);
  for (var i = 0; i < box.length; i++) c[i+crypto_secretbox_BOXZEROBYTES] = box[i];
  if (c.length < 32) return null;
  if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
  return m.subarray(crypto_secretbox_ZEROBYTES);
};

nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

nacl.scalarMult = function(n, p) {
  checkArrayTypes(n, p);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult(q, n, p);
  return q;
};

nacl.scalarMult.base = function(n) {
  checkArrayTypes(n);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult_base(q, n);
  return q;
};

nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

nacl.box = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox(msg, nonce, k);
};

nacl.box.before = function(publicKey, secretKey) {
  checkArrayTypes(publicKey, secretKey);
  checkBoxLengths(publicKey, secretKey);
  var k = new Uint8Array(crypto_box_BEFORENMBYTES);
  crypto_box_beforenm(k, publicKey, secretKey);
  return k;
};

nacl.box.after = nacl.secretbox;

nacl.box.open = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox.open(msg, nonce, k);
};

nacl.box.open.after = nacl.secretbox.open;

nacl.box.keyPair = function() {
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
  crypto_box_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.box.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_box_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  crypto_scalarmult_base(pk, secretKey);
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
nacl.box.nonceLength = crypto_box_NONCEBYTES;
nacl.box.overheadLength = nacl.secretbox.overheadLength;

nacl.sign = function(msg, secretKey) {
  checkArrayTypes(msg, secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var signedMsg = new Uint8Array(crypto_sign_BYTES+msg.length);
  crypto_sign(signedMsg, msg, msg.length, secretKey);
  return signedMsg;
};

nacl.sign.open = function(signedMsg, publicKey) {
  checkArrayTypes(signedMsg, publicKey);
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var tmp = new Uint8Array(signedMsg.length);
  var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
  if (mlen < 0) return null;
  var m = new Uint8Array(mlen);
  for (var i = 0; i < m.length; i++) m[i] = tmp[i];
  return m;
};

nacl.sign.detached = function(msg, secretKey) {
  var signedMsg = nacl.sign(msg, secretKey);
  var sig = new Uint8Array(crypto_sign_BYTES);
  for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
  return sig;
};

nacl.sign.detached.verify = function(msg, sig, publicKey) {
  checkArrayTypes(msg, sig, publicKey);
  if (sig.length !== crypto_sign_BYTES)
    throw new Error('bad signature size');
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
  var m = new Uint8Array(crypto_sign_BYTES + msg.length);
  var i;
  for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
  for (i = 0; i < msg.length; i++) sm[i+crypto_sign_BYTES] = msg[i];
  return (crypto_sign_open(m, sm, sm.length, publicKey) >= 0);
};

nacl.sign.keyPair = function() {
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  crypto_sign_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32+i];
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.sign.keyPair.fromSeed = function(seed) {
  checkArrayTypes(seed);
  if (seed.length !== crypto_sign_SEEDBYTES)
    throw new Error('bad seed size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  for (var i = 0; i < 32; i++) sk[i] = seed[i];
  crypto_sign_keypair(pk, sk, true);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
nacl.sign.seedLength = crypto_sign_SEEDBYTES;
nacl.sign.signatureLength = crypto_sign_BYTES;

nacl.hash = function(msg) {
  checkArrayTypes(msg);
  var h = new Uint8Array(crypto_hash_BYTES);
  crypto_hash(h, msg, msg.length);
  return h;
};

nacl.hash.hashLength = crypto_hash_BYTES;

nacl.verify = function(x, y) {
  checkArrayTypes(x, y);
  // Zero length arguments are considered not equal.
  if (x.length === 0 || y.length === 0) return false;
  if (x.length !== y.length) return false;
  return (vn(x, 0, y, 0, x.length) === 0) ? true : false;
};

nacl.setPRNG = function(fn) {
  randombytes = fn;
};

(function() {
  // Initialize PRNG if environment provides CSPRNG.
  // If not, methods calling randombytes will throw.
  var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;
  if (crypto && crypto.getRandomValues) {
    // Browsers.
    var QUOTA = 65536;
    nacl.setPRNG(function(x, n) {
      var i, v = new Uint8Array(n);
      for (i = 0; i < n; i += QUOTA) {
        crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
      }
      for (i = 0; i < n; i++) x[i] = v[i];
      cleanup(v);
    });
  } else if (true) {
    // Node.js.
    crypto = __webpack_require__(5024);
    if (crypto && crypto.randomBytes) {
      nacl.setPRNG(function(x, n) {
        var i, v = crypto.randomBytes(n);
        for (i = 0; i < n; i++) x[i] = v[i];
        cleanup(v);
      });
    }
  }
})();

})( true && module.exports ? module.exports : (self.nacl = self.nacl || {}));


/***/ }),

/***/ 384:
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ 5955:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9



var isArgumentsObject = __webpack_require__(2584);
var isGeneratorFunction = __webpack_require__(8662);
var whichTypedArray = __webpack_require__(6430);
var isTypedArray = __webpack_require__(5692);

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});


/***/ }),

/***/ 9539:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(4155);
/* provided dependency */ var console = __webpack_require__(5108);
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __webpack_require__(5955);

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(384);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(5717);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;


/***/ }),

/***/ 6430:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var forEach = __webpack_require__(4029);
var availableTypedArrays = __webpack_require__(3083);
var callBound = __webpack_require__(1924);
var gOPD = __webpack_require__(7296);

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __webpack_require__(6410)();

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof g[typedArray] === 'function') {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = __webpack_require__(5692);

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};


/***/ }),

/***/ 5024:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 3083:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? __webpack_require__.g : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(6594);
/******/ 	StellarBase = __webpack_exports__;
/******/ 	
/******/ })()
;