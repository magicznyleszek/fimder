'use strict';

// -----------------------------------------------------------------------------
// addressBarModule -- reads location parameters on load and allows setting them
// during application lifetime (so user actions will reflect in url)
// -----------------------------------------------------------------------------

angular.module('addressBarModule', ['ngRoute', 'assertModule']);
'use strict';

// -----------------------------------------------------------------------------
// addressBarConfig -- has names of all routes to make sure all scripts use
// the proper ones
// -----------------------------------------------------------------------------

angular.module('addressBarModule').constant('addressBarConfig', {
    routes: {
        movies: 'movies',
        search: 'search'
    }
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// addressBarInterface -- a service that allows for updating current url without
// reloading application
// -----------------------------------------------------------------------------

var AddressBarInterfaceService = function () {
    _createClass(AddressBarInterfaceService, null, [{
        key: 'initClass',
        value: function initClass() {
            AddressBarInterfaceService.$inject = ['$route', '$location', 'assert', 'addressBarConfig'];
        }
    }]);

    function AddressBarInterfaceService($route, $location, assert, addressBarConfig) {
        _classCallCheck(this, AddressBarInterfaceService);

        this._$route = $route;
        this._$location = $location;
        this._assert = assert;
        this._addressBarConfig = addressBarConfig;
    }

    _createClass(AddressBarInterfaceService, [{
        key: 'getCurrent',
        value: function getCurrent() {
            var currentRoute = this._$route.current;
            if (typeof currentRoute === 'undefined') {
                console.warn('Tried to get current route before it was set!');
                return {
                    routeId: null,
                    params: null
                };
            } else {
                return {
                    routeId: currentRoute.locals.routeId,
                    params: currentRoute.params
                };
            }
        }
    }, {
        key: 'setMovies',
        value: function setMovies(movieId) {
            this._assert.isString(movieId);
            this._$location.path(this._addressBarConfig.routes.movies + '/' + movieId);
        }
    }, {
        key: 'setSearch',
        value: function setSearch() {
            var searchPhrase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            this._assert.isString(searchPhrase);
            this._$location.path(this._addressBarConfig.routes.search + '/' + searchPhrase);
        }
    }]);

    return AddressBarInterfaceService;
}();

AddressBarInterfaceService.initClass();

angular.module('addressBarModule').service('addressBarInterface', AddressBarInterfaceService);
'use strict';

angular.module('addressBarModule').config(['$routeProvider', '$locationProvider', 'addressBarConfig', function ($routeProvider, $locationProvider, addressBarConfig) {
    $routeProvider.when('/' + addressBarConfig.routes.movies + '/:movieId', {
        resolve: {
            routeId: [function () {
                return addressBarConfig.routes.movies;
            }]
        }
    }).when('/' + addressBarConfig.routes.search + '/:searchPhrase?', {
        resolve: {
            routeId: [function () {
                return addressBarConfig.routes.search;
            }]
        }
    }).otherwise({
        redirectTo: '/' + addressBarConfig.routes.search + '/'
    });

    $locationProvider.html5Mode(false);
}]);
'use strict';

// -----------------------------------------------------------------------------
// akabuskAppModule is our single ngApp module for whole web application
// -----------------------------------------------------------------------------

angular.module('akabuskAppModule', ['assertModule', 'httpRetrierModule', 'searchBoxModule']);

// -----------------------------------------------------------------------------
// tweak default angular configuration
// -----------------------------------------------------------------------------

angular.module('akabuskAppModule').config(['$interpolateProvider', '$compileProvider', function ($interpolateProvider, $compileProvider) {
    // unfortunately we can't use "{{ symbols }}" because Jekyll uses them
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    // We're disabling angular debug info - significant performance boost
    $compileProvider.debugInfoEnabled(false);
    // Don't look for directives in comments and classes (~10% boost)
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
}]);

angular.module('akabuskAppModule').run([
// '',
function () {
    console.debug('app initialized');
}]);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// assertModule -- a module with a service that provides functions for common
// assertions. All provided functions do not return a value, and will throw an
// error when the assertion fails.
// -----------------------------------------------------------------------------

angular.module('assertModule', []);

var AssertService = function () {
    function AssertService() {
        _classCallCheck(this, AssertService);
    }

    _createClass(AssertService, [{
        key: 'isTrue',
        value: function isTrue(expression) {
            if (expression !== true) {
                throw new Error(this._getText('true expression'));
            }
        }
    }, {
        key: 'isFalse',
        value: function isFalse(expression) {
            if (expression !== false) {
                throw new Error(this._getText('false expression'));
            }
        }
    }, {
        key: 'isDefined',
        value: function isDefined(value) {
            if (typeof value === 'undefined') {
                throw new Error(this._getText('defined value'));
            }
        }
    }, {
        key: 'isNull',
        value: function isNull(value) {
            if (value !== null) {
                throw new Error(this._getTextWithValue('null', value));
            }
        }
    }, {
        key: 'isBool',
        value: function isBool(value) {
            if (!_.isBoolean(value)) {
                throw new Error(this._getTextWithValue('boolean', value));
            }
        }
    }, {
        key: 'isNumber',
        value: function isNumber(value) {
            if (!_.isNumber(value)) {
                throw new Error(this._getTextWithValue('number', value));
            }
        }
    }, {
        key: 'isInteger',
        value: function isInteger(value) {
            if (!Number.isInteger(value)) {
                throw new Error(this._getTextWithValue('integer', value));
            }
        }
    }, {
        key: 'isString',
        value: function isString(value) {
            if (!_.isString(value)) {
                throw new Error(this._getTextWithValue('string', value));
            }
        }
    }, {
        key: 'isPlainObject',
        value: function isPlainObject(value) {
            if (!_.isPlainObject(value)) {
                throw new Error(this._getTextWithValue('plain object', value));
            }
        }
    }, {
        key: 'isArray',
        value: function isArray(value) {
            if (!_.isArray(value)) {
                throw new Error(this._getTextWithValue('array', value));
            }
        }
    }, {
        key: 'isFunction',
        value: function isFunction(value) {
            if (!_.isFunction(value)) {
                throw new Error(this._getTextWithValue('function', value));
            }
        }

        // -------------------------------------------------------------------------
        // helper functions for producing text of error messages
        // -------------------------------------------------------------------------

    }, {
        key: '_getText',
        value: function _getText(expectedText) {
            return 'Assertion failed: expected ' + expectedText;
        }
    }, {
        key: '_getTextWithValue',
        value: function _getTextWithValue(expectedText, value) {
            var simpleMessage = this._getText(expectedText);
            return simpleMessage + ', but got {' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + '} ' + value + ' instead';
        }
    }]);

    return AssertService;
}();

angular.module('assertModule').service('assert', AssertService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// httpRetrier is a service that does http request until first success, up
// to 10 times with some time (incrementing) between each retry -- and it is
// silent, i.e. it doesn't throw anything by itself
// -----------------------------------------------------------------------------

angular.module('httpRetrierModule', []);

var HttpRetrierService = function () {
    _createClass(HttpRetrierService, null, [{
        key: 'initClass',
        value: function initClass() {
            HttpRetrierService.intervalTime = 2000;
            HttpRetrierService.limit = 10;

            HttpRetrierService.$inject = ['$q', '$http', '$timeout'];
        }
    }]);

    function HttpRetrierService($q, $http, $timeout) {
        _classCallCheck(this, HttpRetrierService);

        this._$q = $q;
        this._$http = $http;
        this._$timeout = $timeout;
        this._retriers = {};
        this.rejectReasons = Object.freeze({
            cancel: 0,
            overLimit: 1
        });
    }

    _createClass(HttpRetrierService, [{
        key: 'runGet',
        value: function runGet(url) {
            return this._run('get', url);
        }
    }, {
        key: '_run',
        value: function _run(method, url) {
            var retrier = this._createRetrier({ method: method, url: url });
            this._retry(retrier);
            return {
                promise: retrier.deferred.promise,
                cancel: this._cancelRetrier.bind(this, retrier.id)
            };
        }

        // -------------------------------------------------------------------------
        // managing retriers
        // -------------------------------------------------------------------------

    }, {
        key: '_destroyRetrier',
        value: function _destroyRetrier(retrierId) {
            delete this._retriers[retrierId];
        }

        // @param {object} httpConfig - a http config object:
        // https://docs.angularjs.org/api/ng/service/$http#usage

    }, {
        key: '_createRetrier',
        value: function _createRetrier(httpConfig) {
            var retrierId = Math.floor(Math.random() * 0x1000000).toString(16);
            this._retriers[retrierId] = {
                id: retrierId,
                httpConfig: httpConfig,
                count: 0,
                deferred: this._$q.defer(),
                timeoutId: null
            };
            return this._retriers[retrierId];
        }
    }, {
        key: '_cancelRetrier',
        value: function _cancelRetrier(retrierId) {
            if (this._retriers[retrierId]) {
                this._retriers[retrierId].deferred.reject(this.rejectReasons.cancel);
                this._destroyRetrier(retrierId);
            }
        }

        // -------------------------------------------------------------------------
        // managing http request and retrying
        // -------------------------------------------------------------------------

    }, {
        key: '_retry',
        value: function _retry(retrier) {
            retrier.timeoutId = this._$timeout(this._doHttpRequest.bind(this, retrier), HttpRetrierService.intervalTime * retrier.count, false);
            // we start with 0, as we want the first call to be immediate
            retrier.count++;
        }
    }, {
        key: '_doHttpRequest',
        value: function _doHttpRequest(retrier) {
            this._$http(retrier.httpConfig).then(this._onHttpRequestSuccess.bind(this, retrier), this._onHttpRequestError.bind(this, retrier));
        }
    }, {
        key: '_onHttpRequestSuccess',
        value: function _onHttpRequestSuccess(retrier, response) {
            retrier.deferred.resolve(response);
            this._destroyRetrier(retrier.id);
        }
    }, {
        key: '_onHttpRequestError',
        value: function _onHttpRequestError(retrier, response) {
            // if someone canceled retrier, we no longer care about anything
            if (typeof this._retriers[retrier.id] === 'undefined') {
                return;
            }

            // inform about this error
            retrier.deferred.notify({
                response: response,
                count: retrier.count
            });

            // do not try too many times, just give up
            if (retrier.count > HttpRetrierService.limit) {
                retrier.deferred.reject(this.rejectReasons.overLimit);
                this._destroyRetrier(retrier.id);
            } else {
                this._retry(retrier);
            }
        }
    }]);

    return HttpRetrierService;
}();

HttpRetrierService.initClass();

angular.module('httpRetrierModule').service('httpRetrier', HttpRetrierService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// listenersManager -- a factory that creates new instance of listeners manager.
// A listener manager object is an implementation of logic pattern that manages
// list of listeners. It handles adding listeners, running them and removing.
// Any service that would like to keep list of listeners of some kind, can
// easily use this object for handling common logic of keeping and controlling
// sets of callback (listeners) functions.
// -----------------------------------------------------------------------------

angular.module('listenersManagerModule', []);

var ListenerManager = function () {
    function ListenerManager() {
        _classCallCheck(this, ListenerManager);

        this._listeners = [];
        this._amountOfListeners = 0;
        this._listenersToRemove = [];
        this._amountToRemove = 0;
        this._stateListeners = [];
        this._isActive = false;
    }

    _createClass(ListenerManager, [{
        key: '_createCancelFunction',
        value: function _createCancelFunction(listenerToCancel, afterCancelCallback) {
            return function () {
                afterCancelCallback(listenerToCancel);
                listenerToCancel = null;
                afterCancelCallback = null;
            };
        }
    }, {
        key: '_afterCancel',
        value: function _afterCancel(listenerToRemove) {
            this._amountToRemove = this._listenersToRemove.push(listenerToRemove);
        }
    }, {
        key: '_cleanRemovedListeners',
        value: function _cleanRemovedListeners() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._listenersToRemove[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var listenerToRemove = _step.value;

                    var indexOf = this._listeners.indexOf(listenerToRemove);
                    if (indexOf !== -1) {
                        this._listeners.splice(indexOf, 1);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this._amountOfListeners = this._listeners.length;
            this._amountToRemove = 0;
            this._listenersToRemove.length = 0;
            this._updateState(this._amountOfListeners > 0);
        }
    }, {
        key: '_updateState',
        value: function _updateState(newActiveState) {
            if (this._isActive === newActiveState) {
                return;
            }

            this._isActive = newActiveState;

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._stateListeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var stateListener = _step2.value;

                    stateListener(this._isActive);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'addListener',
        value: function addListener(newListener) {
            this._amountOfListeners = this._listeners.push(newListener);
            this._updateState(true);
            return this._createCancelFunction(newListener, this._afterCancel.bind(this));
        }
    }, {
        key: 'callListeners',
        value: function callListeners() {
            if (this._amountToRemove !== 0) {
                this._cleanRemovedListeners();
            }

            if (!this._isActive) {
                return;
            }

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if (this._amountOfListeners === 1) {
                this._listeners[0].apply(null, args);
                return;
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._listeners[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var listener = _step3.value;

                    listener.apply(null, args);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'onStateChange',
        value: function onStateChange(stateListener) {
            return this._stateListeners.push(stateListener);
        }
    }]);

    return ListenerManager;
}();

angular.module('listenersManagerModule').factory('listenersManager', function () {
    return {
        getManager: function getManager() {
            return new ListenerManager();
        }
    };
});
'use strict';

// -----------------------------------------------------------------------------
// searchBoxModule -- displays a search box input and has a service for
// listening to searchphrase changes
// -----------------------------------------------------------------------------

angular.module('searchBoxModule', ['listenersManagerModule', 'addressBarModule']);

angular.module('searchBoxModule').run([
// we want to initialize addressBarHandler
'addressBarHandler', angular.noop]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// addressBarHandler is a service gluing together search box and address bar
// -----------------------------------------------------------------------------

var AddressBarHandlerService = function () {
    _createClass(AddressBarHandlerService, null, [{
        key: 'initClass',
        value: function initClass() {
            AddressBarHandlerService.$inject = ['currentSearch', 'addressBarInterface', 'addressBarConfig'];
        }
    }]);

    function AddressBarHandlerService(currentSearch, addressBarInterface, addressBarConfig) {
        _classCallCheck(this, AddressBarHandlerService);

        this._addressBarInterface = addressBarInterface;
        this._addressBarConfig = addressBarConfig;
        currentSearch.registerSearchPhraseListener(this._onSearchPhraseChange.bind(this));
    }

    _createClass(AddressBarHandlerService, [{
        key: '_onSearchPhraseChange',
        value: function _onSearchPhraseChange(searchPhrase) {
            var currentRoute = this._addressBarInterface.getCurrent();
            if (currentRoute.routeId === this._addressBarConfig.routes.search) {
                this._addressBarInterface.setSearch(searchPhrase);
            }
        }
    }]);

    return AddressBarHandlerService;
}();

AddressBarHandlerService.initClass();

angular.module('searchBoxModule').service('addressBarHandler', AddressBarHandlerService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// currentSearch is a service that keeps current value of search phrase from the
// searchBoxCtrl and allows listening to it being changed
// -----------------------------------------------------------------------------

var CurrentSearchService = function () {
    _createClass(CurrentSearchService, null, [{
        key: 'initClass',
        value: function initClass() {
            CurrentSearchService.$inject = ['listenersManager'];
        }
    }]);

    function CurrentSearchService(listenersManager) {
        _classCallCheck(this, CurrentSearchService);

        this._searchPhrase = null;
        this._searchPhraseListenersManager = listenersManager.getManager();
    }

    _createClass(CurrentSearchService, [{
        key: 'registerSearchPhraseListener',
        value: function registerSearchPhraseListener(listener) {
            return this._searchPhraseListenersManager.addListener(listener);
        }
    }, {
        key: 'get',
        value: function get() {
            return this._searchPhrase;
        }
    }, {
        key: 'set',
        value: function set(searchPhrase) {
            this._searchPhrase = searchPhrase;
            this._searchPhraseListenersManager.callListeners(this._searchPhrase);
        }
    }]);

    return CurrentSearchService;
}();

CurrentSearchService.initClass();

angular.module('searchBoxModule').service('currentSearch', CurrentSearchService);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// searchBoxCtrl -- handles input changes with a small debounce or immediate
// trigger on enter key
// -----------------------------------------------------------------------------

var SearchBoxController = function () {
    _createClass(SearchBoxController, null, [{
        key: 'initClass',
        value: function initClass() {
            SearchBoxController.debounceTime = 500;
            SearchBoxController.enterKey = 13;
            SearchBoxController.inputSelector = '[js-searchBox-input]';
            SearchBoxController.$inject = ['$scope', '$element', '$timeout', 'currentSearch', 'addressBarInterface', 'addressBarConfig'];
        }
    }]);

    function SearchBoxController($scope, $element, $timeout, currentSearch, addressBarInterface, addressBarConfig) {
        _classCallCheck(this, SearchBoxController);

        this._$scope = $scope;
        this._$timeout = $timeout;
        this._currentSearch = currentSearch;
        this._addressBarInterface = addressBarInterface;
        this._addressBarConfig = addressBarConfig;
        this._inputEl = $element[0].querySelector(SearchBoxController.inputSelector);
        this.inputValue = '';
        this._lastAppliedInputValue = null;

        this._applyInputValueDebounced = _.debounce(this._applyInputValue.bind(this), SearchBoxController.debounceTime);

        // we want to start with input focused
        this._focusOnInput();
        this._$timeout(this._loadInitialValueFromAddressBar.bind(this), 0);
    }

    _createClass(SearchBoxController, [{
        key: '_loadInitialValueFromAddressBar',
        value: function _loadInitialValueFromAddressBar() {
            var currentRoute = this._addressBarInterface.getCurrent();
            if (currentRoute.routeId === this._addressBarConfig.routes.search) {
                this.inputValue = currentRoute.params.searchPhrase;
            }
        }
    }, {
        key: '_applyInputValue',
        value: function _applyInputValue() {
            this._applyInputValueDebounced.cancel();
            if (this._lastAppliedInputValue !== this.inputValue) {
                this._lastAppliedInputValue = this.inputValue;
                this._$scope.$applyAsync(this._currentSearch.set.bind(this._currentSearch, this.inputValue));
            }
        }
    }, {
        key: '_focusOnInput',
        value: function _focusOnInput() {
            this._inputEl.focus();
        }
    }, {
        key: 'onInputValueChange',
        value: function onInputValueChange() {
            this._applyInputValueDebounced();
        }
    }, {
        key: 'onInputKeypress',
        value: function onInputKeypress(e) {
            if (e.which === SearchBoxController.enterKey) {
                this._applyInputValue();
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.inputValue = '';
            this._applyInputValue();
        }
    }]);

    return SearchBoxController;
}();

SearchBoxController.initClass();

angular.module('searchBoxModule').controller('searchBoxCtrl', SearchBoxController);
