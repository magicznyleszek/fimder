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
            AddressBarInterfaceService.$inject = ['$route', '$rootScope', '$location', 'assert', 'addressBarConfig'];
        }
    }]);

    function AddressBarInterfaceService($route, $rootScope, $location, assert, addressBarConfig) {
        _classCallCheck(this, AddressBarInterfaceService);

        this._$route = $route;
        this._$rootScope = $rootScope;
        this._$location = $location;
        this._assert = assert;
        this._addressBarConfig = addressBarConfig;
    }

    _createClass(AddressBarInterfaceService, [{
        key: 'getCurrent',
        value: function getCurrent() {
            return {
                routeId: this._$route.current.locals.routeId,
                params: this._$route.current.params
            };
        }
    }, {
        key: 'setMovies',
        value: function setMovies(movieId) {
            this._assert.isString(movieId);
            this._$location.path(this._addressBarConfig.routes.movies + '/' + movieId);
            this._$rootScope.$apply();
        }
    }, {
        key: 'setSearch',
        value: function setSearch() {
            var searchPhrase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            this._assert.isString(searchPhrase);
            this._$location.path(this._addressBarConfig.routes.search + '/' + searchPhrase);
            this._$rootScope.$apply();
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

angular.module('akabuskAppModule', ['assertModule', 'httpRetrierModule', 'addressBarModule', 'searchBoxModule']);

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

// angular.module('akabuskAppModule').config(['$sceProvider', ($sceProvider) => {
//     $sceProvider.enabled(false);
// }]);

angular.module('akabuskAppModule').run(['addressBarInterface', function (addressBarInterface) {
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

// -----------------------------------------------------------------------------
// searchBoxModule -- displays a search box input and has a service for
// listening to searchphrase changes
// -----------------------------------------------------------------------------

angular.module('searchBoxModule', ['listenersManagerModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchBoxController = function () {
    _createClass(SearchBoxController, null, [{
        key: 'initClass',
        value: function initClass() {
            SearchBoxController.$inject = ['$scope', '$element'];
        }
    }]);

    function SearchBoxController($scope, $element) {
        _classCallCheck(this, SearchBoxController);

        this._$scope = $scope;
        this._$element = $element;
        this.keyCodes = Object.freeze({
            escape: 27,
            enter: 13
        });
        this._inputSelector = '#sidebarSearchInput';

        this.phrase = '';
        this.isClearButtonVisible = false;
    }

    _createClass(SearchBoxController, [{
        key: '_onKeyPress',
        value: function _onKeyPress(e) {
            switch (e.keyCode) {
                case this.keyCodes.escape:
                    this._forceCancel();
                    break;
                case this.keyCodes.enter:
                    this._openStoreSearch();
                    this._forceCancel();
                    break;
                default:
                    break;
            }
        }
    }, {
        key: '_callChanged',
        value: function _callChanged() {
            console.log(this._getSearchPhrase());
        }
    }, {
        key: '_forceCancel',
        value: function _forceCancel() {
            this.clearPhrase();
            // force blur on current element
            document.activeElement.blur();
        }
    }, {
        key: '_getSearchPhrase',
        value: function _getSearchPhrase() {
            if (this.phrase.length > 0) {
                return this.phrase;
            } else {
                return null;
            }
        }
    }, {
        key: '_refresh',
        value: function _refresh() {
            this.isClearButtonVisible = this.phrase.length > 0;
            this._$scope.$applyAsync();
        }

        // -----------------------------------------------------------------------------
        // Template functions
        // -----------------------------------------------------------------------------

    }, {
        key: 'onSearchPhraseChanged',
        value: function onSearchPhraseChanged() {
            this._callChanged();
            this._refresh();
        }
    }, {
        key: 'onFocus',
        value: function onFocus() {
            this._onKeyPressBound = this._onKeyPress.bind(this);
            this._$element[0].addEventListener('keyup', this._onKeyPressBound);
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this._$element[0].removeEventListener('keyup', this._onKeyPressBound);
            delete this._onKeyPressBound;
        }
    }, {
        key: 'clearPhrase',
        value: function clearPhrase() {
            this.phrase = '';
            this._refresh();
            this._callChanged();
        }
    }]);

    return SearchBoxController;
}();

SearchBoxController.initClass();

angular.module('searchBoxModule').controller('searchBoxCtrl', SearchBoxController);
