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
})({"select/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;

var _index = require("../index");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var getTemplate = function getTemplate() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var placeholder = arguments.length > 1 ? arguments[1] : undefined;
  var items = data.map(function (item) {
    return "\n      <li class=\"select__item\" data-type=\"item\" data-id=".concat(item.id, ">").concat(item.value, " </li>\n    ");
  });
  var text = placeholder !== null && placeholder !== void 0 ? placeholder : 'Сделайте выбор';
  return " \n  <div class=\"select__input\" data-type=\"input\">\n    <span data-type=\"value\" id=\"placeholder\">".concat(text, "</span>\n    <i class=\"fa fa-chevron-down\" data-type=\"arrow\"></i>\n  </div>\n  <div class=\"select__dropdown\">\n    <ul class=\"select__list\">\n      ").concat(items.join(''), "\n    </ul>\n  </div>\n  ");
};

var _render = /*#__PURE__*/new WeakSet();

var _setup = /*#__PURE__*/new WeakSet();

var Select = /*#__PURE__*/function () {
  function Select(selector, options) {
    _classCallCheck(this, Select);

    _setup.add(this);

    _render.add(this);

    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = null;

    _classPrivateMethodGet(this, _render, _render2).call(this);

    _classPrivateMethodGet(this, _setup, _setup2).call(this);
  }

  _createClass(Select, [{
    key: "clickHandler",
    value: function clickHandler(event) {
      var type = event.target.dataset.type;

      if (type === 'input' || type === 'value' || type === 'arrow') {
        this.toggle();
      } else if (type === 'item') {
        var id = event.target.dataset.id;
        this.select(id);
      } else if (type === 'backdrop') {
        this.close();
      }
    }
  }, {
    key: "isOpen",
    get: function get() {
      return this.$el.classList.contains('open');
    }
  }, {
    key: "current",
    get: function get() {
      var _this = this;

      return this.options.data.find(function (item) {
        return item.id === _this.selectedId;
      });
    }
  }, {
    key: "select",
    value: function select(id) {
      this.selectedId = id;
      this.$value.textContent = this.current.value;
      this.$el.querySelectorAll('[data-type="item"]').forEach(function (el) {
        el.classList.remove('selected');
      });
      this.$el.querySelector("[data-id=\"".concat(id, "\"]")).classList.add('selected');
      this.options.onSelect ? this.options.onSelect(this.current) : null;
      this.close();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.isOpen ? this.close() : this.open();
    }
  }, {
    key: "open",
    value: function open() {
      this.$el.classList.add('open');
      this.$arrow.classList.remove('fa-chevron-down');
      this.$arrow.classList.add('fa-chevron-up');
    }
  }, {
    key: "close",
    value: function close() {
      this.$el.classList.remove('open');
      this.$arrow.classList.remove('fa-chevron-up');
      this.$arrow.classList.add('fa-chevron-down');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$el.removeEventListener('click', this.clickHandler);
    }
  }]);

  return Select;
}();

exports.Select = Select;

function _render2() {
  var _this$options = this.options,
      placeholder = _this$options.placeholder,
      data = _this$options.data;
  this.$el.classList.add('select');
  this.$el.innerHTML = getTemplate(data, placeholder);
}

function _setup2() {
  this.clickHandler = this.clickHandler.bind(this);
  this.$el.addEventListener('click', this.clickHandler);
  this.$arrow = this.$el.querySelector('[data-type="arrow"]');
  this.$value = this.$el.querySelector('[data-type="value"]');
}
},{"../index":"index.js"}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"select/style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectedSous = exports.selectedSize = exports.selectedValue = void 0;

var _select = require("./select/select");

require("./select/style.scss");

var selectedValue = {};
exports.selectedValue = selectedValue;
var selectedSize = {};
exports.selectedSize = selectedSize;
var selectedSous = {};
exports.selectedSous = selectedSous;
var price = 10;
var finishPrice = 0;
var select = new _select.Select('#select', {
  placeholder: 'Выбери пожалуйста вид пиццы',
  data: [{
    id: '1',
    value: 'Пепперони',
    price: price
  }, {
    id: '2',
    value: 'Прошуто',
    price: price
  }, {
    id: '3',
    value: 'Куриная',
    price: price
  }, {
    id: '4',
    value: 'Деревенская',
    price: price
  }],
  onSelect: function onSelect(item) {
    selectedValue.pizza = {
      value: item.value,
      price: item.price
    };
    disabledSize.removeAttribute("disabled", "disabled");
    finishPrice += item.price;
  }
});
var selectSize = new _select.Select('#selectSize', {
  placeholder: 'Выбери пожалуйста размер пиццы',
  data: [{
    id: '1',
    value: '16 cm ',
    price: 0
  }, {
    id: '2',
    value: '24 cm ',
    price: 3
  }, {
    id: '3',
    value: '30 cm ',
    price: 6
  }, {
    id: '4',
    value: '35 cm ',
    price: 10
  }],
  onSelect: function onSelect(item) {
    selectedSize.size = {
      value: item.value,
      price: item.price
    };
    disabledSous.removeAttribute("disabled", "disabled");
    finishPrice += item.price;
  }
});
var selectSous = new _select.Select('#selectSous', {
  placeholder: 'Выбери пожалуйста вид соуса',
  data: [{
    id: '1',
    value: 'Сырный',
    price: 1
  }, {
    id: '2',
    value: 'Кисло-сладкий',
    price: 1
  }, {
    id: '3',
    value: 'Барбекю',
    price: 1
  }, {
    id: '4',
    value: 'Чесночный',
    price: 1
  }],
  onSelect: function onSelect(item) {
    selectedSous.sous = {
      value: item.value,
      price: item.price
    };
    finishPrice += item.price;
  }
});
var btn = document.getElementById('btn');

btn.onclick = function () {
  var pizza = document.getElementById('pizza');
  pizza.innerHTML = "\u0412\u0430\u0448\u0430 \u043F\u0438\u0446\u0446\u0430 - \" ".concat(selectedValue.pizza.value, " \" (\u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u043F\u0438\u0446\u0446\u044B - ").concat(selectedValue.pizza.price, " BYN)");
  var size = document.getElementById('size');
  size.innerHTML = "\u0412\u0430\u0448 \u0440\u0430\u0437\u043C\u0435\u0440 - \" ".concat(selectedSize.size.value, " \" (\u0434\u043E\u043F\u043B\u0430\u0442\u0430 \u0437\u0430 \u0440\u0430\u0437\u043C\u0435\u0440 + ").concat(selectedSize.size.price, " BYN)");
  var sous = document.getElementById('sous');
  sous.innerHTML = "\u0412\u0430\u0448 \u0441\u043E\u0443\u0441 - \" ".concat(selectedSous.sous.value, " \" (\u0434\u043E\u043F\u043B\u0430\u0442\u0430 \u0437\u0430 \u0441\u043E\u0443\u0441 + ").concat(selectedSous.sous.price, " BYN)");
  var sum = document.getElementById('sum');
  sum.innerHTML = "\u0421\u0443\u043C\u043C\u0430 \u0412\u0430\u0448\u0435\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u0430 - \" ".concat(finishPrice, " BYN \"");
  finishPrice = 0;
};

var disabledSous = document.getElementById('selectSous');
var disabledSize = document.getElementById('selectSize');
var selectedPlaceholder = document.getElementById('placeholder');

if (selectedPlaceholder.innerHTML === 'Выбери пожалуйста вид пиццы') {
  disabledSize.setAttribute("disabled", "disabled");
  disabledSous.setAttribute("disabled", "disabled");
}
},{"./select/select":"select/select.js","./select/style.scss":"select/style.scss"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62361" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/pizza.e31bb0bc.js.map