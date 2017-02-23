'use strict';

// -----------------------------------------------------------------------------
// fimderAppModule is our single ngApp module for whole web application
// -----------------------------------------------------------------------------

angular.module('fimderAppModule', ['viewsModule', 'searchBoxModule', 'searchResultsModule', 'movieDetailsModule', 'cachingModule']);
'use strict';

// -----------------------------------------------------------------------------
// tweak default angular configuration
// -----------------------------------------------------------------------------

angular.module('fimderAppModule').config(['$interpolateProvider', '$compileProvider', function ($interpolateProvider, $compileProvider) {
    // unfortunately we can't use "{{ symbols }}" because Jekyll uses them
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    // We're disabling angular debug info - significant performance boost
    $compileProvider.debugInfoEnabled(false);
    // Don't look for directives in comments and classes (~10% boost)
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
}]);
'use strict';

// -----------------------------------------------------------------------------
// assertModule for common assertions.
// -----------------------------------------------------------------------------

angular.module('assertModule', []);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// assert is a service for assertion with all provided functions throwing an
// error when the assertion fails and returning no value.
// -----------------------------------------------------------------------------

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

// -----------------------------------------------------------------------------
// cachingModule makes $http calls be cached in localStorage.
// -----------------------------------------------------------------------------

angular.module('cachingModule', ['angular-cache']);

angular.module('cachingModule').run([
// we only need to initialize it
'cachingEnabler', angular.noop]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// cachingEnabler is a service that enables caching for all $http requests
// -----------------------------------------------------------------------------

var CachingEnablerService = function () {
    _createClass(CachingEnablerService, null, [{
        key: 'initClass',
        value: function initClass() {
            CachingEnablerService.$inject = ['$http', 'CacheFactory'];
        }
    }]);

    function CachingEnablerService($http, CacheFactory) {
        _classCallCheck(this, CachingEnablerService);

        $http.defaults.cache = CacheFactory('defaultCache', {
            deleteOnExpire: 'passive',
            storageMode: 'localStorage',
            storagePrefix: 'fimder.',
            // 1 hour
            maxAge: 1 * 60 * 60 * 1000
        });
        console.info('localStorage cache enabled');
        this.isEnabled = true;
    }

    return CachingEnablerService;
}();

CachingEnablerService.initClass();

angular.module('cachingModule').service('cachingEnabler', CachingEnablerService);
'use strict';

// -----------------------------------------------------------------------------
// httpRetrierModule for auto-retrying http calls.
// -----------------------------------------------------------------------------

angular.module('httpRetrierModule', ['assertModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// httpRetrier is a service that does http request until first success, up
// to 10 times with some time (incrementing) between each retry -- and it is
// silent, i.e. it doesn't throw anything by itself.
// -----------------------------------------------------------------------------

var HttpRetrierService = function () {
    _createClass(HttpRetrierService, null, [{
        key: 'initClass',
        value: function initClass() {
            HttpRetrierService.intervalTime = 2000;
            HttpRetrierService.defaultLimit = 10;

            HttpRetrierService.$inject = ['$q', '$http', '$timeout', 'assert'];
        }
    }]);

    function HttpRetrierService($q, $http, $timeout, assert) {
        _classCallCheck(this, HttpRetrierService);

        this._$q = $q;
        this._$http = $http;
        this._$timeout = $timeout;
        this._assert = assert;
        this._retriers = {};
        this.rejectReasons = Object.freeze({
            cancel: 0,
            overLimit: 1
        });
    }

    _createClass(HttpRetrierService, [{
        key: 'runGet',
        value: function runGet(url) {
            var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : HttpRetrierService.defaultLimit;

            this._assert.isString(url);
            this._assert.isInteger(limit);
            return this._run('get', url, limit);
        }
    }, {
        key: '_run',
        value: function _run(method, url, limit) {
            var retrier = this._createRetrier({ method: method, url: url, cache: true }, limit);
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
        value: function _createRetrier(httpConfig, limit) {
            // we don't want to ddos anyone, so we will keep the limit in sane range
            if (limit <= 0 || limit >= 16) {
                console.warn('You want limit to be ' + limit + ', really? Lmftfy.');
                limit = HttpRetrierService.defaultLimit;
            }

            var retrierId = Math.floor(Math.random() * 0x1000000).toString(16);
            this._retriers[retrierId] = {
                id: retrierId,
                httpConfig: httpConfig,
                count: 0,
                limit: limit,
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
            if (retrier.count >= retrier.limit) {
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
// listenersManagerModule is for managing a list of listeners.
// -----------------------------------------------------------------------------

angular.module('listenersManagerModule', []);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// listenersManager is a factory that creates new instance of listeners manager.
// A listener manager object is an implementation of logic pattern that manages
// list of listeners. It handles adding listeners, running them and removing.
// Any service that would like to keep list of listeners of some kind, can
// easily use this object for handling common logic of keeping and controlling
// sets of callback (listeners) functions.
// -----------------------------------------------------------------------------

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
// movieDetailsModule display details of given movie
// -----------------------------------------------------------------------------

angular.module('movieDetailsModule', ['assertModule', 'routesModule', 'moviesFetcherModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// Movie model that expects data to follow omdbapi.com format.
// -----------------------------------------------------------------------------

angular.module('movieDetailsModule').factory('Movie', ['assert', 'votesHumanizer', function (assert, votesHumanizer) {
    var MovieModel = function () {
        _createClass(MovieModel, null, [{
            key: 'initClass',
            value: function initClass() {
                MovieModel.notAvailableProprety = 'N/A';
                MovieModel.requiredType = 'movie';
                MovieModel.requiredProperties = ['imdbID', 'Title'];
            }
        }]);

        function MovieModel(movieData) {
            _classCallCheck(this, MovieModel);

            this._verifyAllRequiredProperties(movieData);

            this.id = movieData.imdbID;
            this.title = movieData.Title;
            // we want all optional properties to be defined only if their
            // content makes sense, i.e. no "N/A" visible for user
            this._setOptionalText('releaseDate', movieData.Released);
            this._setOptionalText('runtime', movieData.Runtime);
            this._setOptionalText('plot', movieData.Plot);
            this._setOptionalText('awards', movieData.Awards);
            this._setOptionalText('poster', movieData.Poster);
            this._setOptionalText('rating', movieData.imdbRating);
            this._setOptionalText('ratingVotes', movieData.imdbVotes);
            this._setOptionalArray('genres', movieData.Genre);
            this._setOptionalArray('directors', movieData.Director);
            this._setOptionalArray('writers', movieData.Writer);
            this._setOptionalArray('actors', movieData.Actors);
            this._setOptionalArray('languages', movieData.Language);
            this._setOptionalArray('countries', movieData.Country);

            if (this.ratingVotes) {
                this.ratingVotes = votesHumanizer.getHumanized(this.ratingVotes);
            }
        }

        _createClass(MovieModel, [{
            key: '_isUsefulData',
            value: function _isUsefulData(data) {
                return data && data !== MovieModel.notAvailableProprety;
            }
        }, {
            key: '_setOptionalText',
            value: function _setOptionalText(propertyName, data) {
                if (this._isUsefulData(data)) {
                    this[propertyName] = data;
                }
            }
        }, {
            key: '_setOptionalArray',
            value: function _setOptionalArray(propertyName, data) {
                if (this._isUsefulData(data)) {
                    // we split string with commas to array, but we also want to
                    // make sure we avoid duplicates, so we go through Set
                    this[propertyName] = Array.from(new Set(data.split(', ')));
                }
            }
        }, {
            key: '_verifyAllRequiredProperties',
            value: function _verifyAllRequiredProperties(movieData) {
                // checks if all the necessary strings are there
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = MovieModel.requiredProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var propertyName = _step.value;

                        assert.isString(movieData[propertyName]);
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

                assert.isTrue(movieData.Type === MovieModel.requiredType);
            }
        }]);

        return MovieModel;
    }();

    MovieModel.initClass();

    return MovieModel;
}]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// movieDetailsCtrl -- displays a details of given movie. It expects a valid
// movieId in the route. Also can switch to search.
// -----------------------------------------------------------------------------

var MovieDetailsController = function () {
    _createClass(MovieDetailsController, null, [{
        key: 'initClass',
        value: function initClass() {
            MovieDetailsController.$inject = ['Movie', 'currentRoute', 'routesConfig', 'moviesFetcher', 'moviesFetcherConfig', 'assert'];
        }
    }]);

    function MovieDetailsController(Movie, currentRoute, routesConfig, moviesFetcher, moviesFetcherConfig, assert) {
        _classCallCheck(this, MovieDetailsController);

        this._Movie = Movie;
        this._currentRoute = currentRoute;
        this._routesConfig = routesConfig;
        this._moviesFetcher = moviesFetcher;
        this._moviesFetcherConfig = moviesFetcherConfig;
        this._assert = assert;

        this._lastSearchPhrase = '';

        this.movie = {};
        this.message = null;
        this.isDetailsVisible = false;
        this.isSpinnerVisible = false;
        this.isMessageVisible = false;

        this._currentRoute.registerRouteListener(this._onRouteChange.bind(this));
    }

    // -------------------------------------------------------------------------
    // opening search again
    // -------------------------------------------------------------------------

    _createClass(MovieDetailsController, [{
        key: 'openSearch',
        value: function openSearch() {
            this._clearMovie();
            this._hideAll();
            this._currentRoute.setToSearch(this._lastSearchPhrase);
        }

        // -------------------------------------------------------------------------
        // handle route changes
        // -------------------------------------------------------------------------

    }, {
        key: '_onRouteChange',
        value: function _onRouteChange() {
            var route = this._currentRoute.get();

            switch (route.routeId) {
                case this._routesConfig.routes.movie:
                    if (typeof route.params.movieId === 'string') {
                        this._fetchMovieData(route.params.movieId);
                    }
                    // movieId is required param of movie route so else not needed,
                    //  as it will redirect itself to default route
                    break;
                case this._routesConfig.routes.search:
                    if (typeof route.params.searchPhrase === 'string') {
                        this._lastSearchPhrase = route.params.searchPhrase;
                    }
                    break;
                default:
                    console.warn('Unknown route "' + route.routeId + '"!');
            }
        }

        // -------------------------------------------------------------------------
        // handle fetching data from API
        // -------------------------------------------------------------------------

    }, {
        key: '_fetchMovieData',
        value: function _fetchMovieData(movieId) {
            this._clearMovie();
            this._showSpinner();
            this._cancelRetrierIfNecessary();
            this._retrier = this._moviesFetcher.fetchMovieById(movieId);
            this._retrier.promise.then(this._fetchMoviesSuccess.bind(this), this._fetchMoviesError.bind(this), this._fetchMoviesNotify.bind(this));
        }
    }, {
        key: '_fetchMoviesSuccess',
        value: function _fetchMoviesSuccess(response) {
            this._interpretMovieData(response.data);
        }
    }, {
        key: '_fetchMoviesError',
        value: function _fetchMoviesError(errorReason) {
            if (errorReason === 1) {
                this._showMessage(this._moviesFetcherConfig.messages.overLimit);
            }
        }
    }, {
        key: '_fetchMoviesNotify',
        value: function _fetchMoviesNotify() {
            console.warn(this._moviesFetcherConfig.messages.retrying);
        }
    }, {
        key: '_cancelRetrierIfNecessary',
        value: function _cancelRetrierIfNecessary() {
            if (typeof this._retrier !== 'undefined') {
                this._retrier.cancel();
                delete this._retrier;
            }
        }

        // -------------------------------------------------------------------------
        // interpreting fetched data
        // -------------------------------------------------------------------------

    }, {
        key: '_interpretMovieData',
        value: function _interpretMovieData(movieData) {
            switch (movieData.Response) {
                // True means we have responses
                case 'True':
                    this.movie = new this._Movie(movieData);
                    this._showDetails();
                    break;
                // True means that API was not able to return movies
                case 'False':
                    this._showMessage(movieData.Error);
                    break;
                default:
                    this._showMessage(this._moviesFetcherConfig.unknownApiResponse);
            }
        }
    }, {
        key: '_clearMovie',
        value: function _clearMovie() {
            this.movie = {};
        }

        // -------------------------------------------------------------------------
        // displaying partials
        // -------------------------------------------------------------------------

    }, {
        key: '_hideAll',
        value: function _hideAll() {
            this.isDetailsVisible = false;
            this.isSpinnerVisible = false;
            this.isMessageVisible = false;
            this.message = null;
        }
    }, {
        key: '_showDetails',
        value: function _showDetails() {
            this._hideAll();
            this.isDetailsVisible = true;
        }
    }, {
        key: '_showSpinner',
        value: function _showSpinner() {
            this._hideAll();
            this.isSpinnerVisible = true;
        }
    }, {
        key: '_showMessage',
        value: function _showMessage(message) {
            this._assert.isString(message);
            this._hideAll();
            this.message = message;
            this.isMessageVisible = true;
        }
    }]);

    return MovieDetailsController;
}();

MovieDetailsController.initClass();

angular.module('movieDetailsModule').controller('movieDetailsCtrl', MovieDetailsController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// votesHumanizer is a service that turns OMDb RatingVotes strings into even
// more human friendly ones (especially if you're into gaming)
// -----------------------------------------------------------------------------

var VotesHumanizerService = function () {
    _createClass(VotesHumanizerService, null, [{
        key: 'initClass',
        value: function initClass() {
            VotesHumanizerService.$inject = ['assert'];
        }
    }]);

    function VotesHumanizerService(assert) {
        _classCallCheck(this, VotesHumanizerService);

        this._assert = assert;
    }

    _createClass(VotesHumanizerService, [{
        key: 'getHumanized',
        value: function getHumanized(votes) {
            // check if received a non-empty string
            this._assert.isString(votes);
            this._assert.isTrue(votes.length !== 0);

            // check if after removing all commas it is a valid integer
            var votesNumber = parseInt(votes.split(',').join(''), 10);
            this._assert.isInteger(votesNumber);

            // check how many thousands are there and slim down the marginal data
            var kCount = 0;
            while (votesNumber >= 1000) {
                votesNumber /= 1000;
                kCount++;
            }

            // create and return a final string
            var votesString = parseFloat(votesNumber.toFixed(1)).toString();
            votesString += 'k'.repeat(kCount);
            return votesString;
        }
    }]);

    return VotesHumanizerService;
}();

VotesHumanizerService.initClass();

angular.module('movieDetailsModule').service('votesHumanizer', VotesHumanizerService);
'use strict';

// -----------------------------------------------------------------------------
// moviesFetcherModule for getting movies information from internets.
// -----------------------------------------------------------------------------

angular.module('moviesFetcherModule', ['httpRetrierModule', 'assertModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// moviesFetcher is a service that promises and fetches data from OMDb API.
// You can get two types of data here:
// - fetchMoviesBySearch() returns a list of movies
// - fetchMovieById() returns a detailed data for a single movie
// NOTE: all above methods returns a retrier object (see httpRetrierModule)
// -----------------------------------------------------------------------------

var MoviesFetcherService = function () {
    _createClass(MoviesFetcherService, null, [{
        key: 'initClass',
        value: function initClass() {
            MoviesFetcherService.apiUrl = 'http://www.omdbapi.com/?r=json&type=movie';
            MoviesFetcherService.retryLimit = 3;

            MoviesFetcherService.$inject = ['httpRetrier', 'assert', '$window'];
        }
    }]);

    function MoviesFetcherService(httpRetrier, assert, $window) {
        _classCallCheck(this, MoviesFetcherService);

        this._httpRetrier = httpRetrier;
        this._assert = assert;
        this._$window = $window;
    }

    // -------------------------------------------------------------------------
    // getting a list of movies
    // -------------------------------------------------------------------------

    _createClass(MoviesFetcherService, [{
        key: 'fetchMoviesBySearch',
        value: function fetchMoviesBySearch(searchPhrase) {
            var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            this._assert.isString(searchPhrase);
            return this._httpRetrier.runGet(this._getSearchUrl(searchPhrase, page), MoviesFetcherService.retryLimit);
        }
    }, {
        key: '_getSearchUrl',
        value: function _getSearchUrl(searchPhrase, page) {
            var searchUrl = MoviesFetcherService.apiUrl;
            searchUrl += '&s=' + this._$window.encodeURIComponent(searchPhrase);
            searchUrl += '&page=' + page;
            return searchUrl;
        }

        // -------------------------------------------------------------------------
        // getting a single movie
        // -------------------------------------------------------------------------

    }, {
        key: 'fetchMovieById',
        value: function fetchMovieById(movieId) {
            this._assert.isString(movieId);
            return this._httpRetrier.runGet(this._getMovieIdUrl(movieId), MoviesFetcherService.retryLimit);
        }
    }, {
        key: '_getMovieIdUrl',
        value: function _getMovieIdUrl(movieId) {
            var searchUrl = MoviesFetcherService.apiUrl;
            searchUrl += '&plot=full&i=';
            searchUrl += this._$window.encodeURIComponent(movieId);
            return searchUrl;
        }
    }]);

    return MoviesFetcherService;
}();

MoviesFetcherService.initClass();

angular.module('moviesFetcherModule').service('moviesFetcher', MoviesFetcherService);
'use strict';

// -----------------------------------------------------------------------------
// moviesFetcherConfig has some common messages.
// -----------------------------------------------------------------------------

angular.module('moviesFetcherModule').constant('moviesFetcherConfig', {
    messages: {
        unknownApiResponse: 'Unknown API response, sorry!',
        overLimit: 'Tried multiple times, but could not connect to API, sorry!',
        retrying: 'Some problems with getting data, retrying!'
    }
});
'use strict';

// -----------------------------------------------------------------------------
// routesModule for reading location parameters on load and allowing setting
// them during application lifetime (so user actions will reflect in url).
// -----------------------------------------------------------------------------

angular.module('routesModule', ['ngRoute', 'assertModule', 'listenersManagerModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// currentRoute is a service that allows for getting and setting current route.
// -----------------------------------------------------------------------------

var CurrentRouteService = function () {
    _createClass(CurrentRouteService, null, [{
        key: 'initClass',
        value: function initClass() {
            CurrentRouteService.$inject = ['$rootScope', '$route', '$location', 'assert', 'routesConfig', 'listenersManager'];
        }
    }]);

    function CurrentRouteService($rootScope, $route, $location, assert, routesConfig, listenersManager) {
        _classCallCheck(this, CurrentRouteService);

        this._$route = $route;
        this._$location = $location;
        this._assert = assert;
        this._routesConfig = routesConfig;
        this._RouteListenersManager = listenersManager.getManager();
        $rootScope.$on('$routeChangeSuccess', this._onRouteChange.bind(this));
    }

    // -------------------------------------------------------------------------
    // handling listeners
    // -------------------------------------------------------------------------

    _createClass(CurrentRouteService, [{
        key: '_onRouteChange',
        value: function _onRouteChange() {
            this._RouteListenersManager.callListeners();
        }
    }, {
        key: 'registerRouteListener',
        value: function registerRouteListener(listener) {
            return this._RouteListenersManager.addListener(listener);
        }

        // -------------------------------------------------------------------------
        // public methods for setting and getting route
        // -------------------------------------------------------------------------

    }, {
        key: 'setToMovie',
        value: function setToMovie(movieId) {
            this._assert.isString(movieId);
            this._$location.path(this._routesConfig.routes.movie + '/' + movieId);
        }
    }, {
        key: 'setToSearch',
        value: function setToSearch() {
            var searchPhrase = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            this._assert.isString(searchPhrase);
            this._$location.path(this._routesConfig.routes.search + '/' + searchPhrase);
        }
    }, {
        key: 'get',
        value: function get() {
            return this._getRouteFromRouteData(this._$route.current);
        }
    }, {
        key: '_getRouteFromRouteData',
        value: function _getRouteFromRouteData(routeData) {
            if (typeof routeData === 'undefined') {
                console.warn('Tried to get route before it was set!');
                return {
                    routeId: null,
                    params: null
                };
            } else {
                return {
                    routeId: routeData.locals.routeId,
                    params: routeData.params
                };
            }
        }
    }]);

    return CurrentRouteService;
}();

CurrentRouteService.initClass();

angular.module('routesModule').service('currentRoute', CurrentRouteService);
'use strict';

// -----------------------------------------------------------------------------
// routesConfig has names of all routes to ensure all scripts use proper ones.
// -----------------------------------------------------------------------------

angular.module('routesModule').constant('routesConfig', {
    routes: {
        movie: 'movie',
        search: 'search'
    }
});
'use strict';

// -----------------------------------------------------------------------------
// routesModule routes initialization.
// -----------------------------------------------------------------------------

angular.module('routesModule').config(['$routeProvider', '$locationProvider', 'routesConfig', function ($routeProvider, $locationProvider, routesConfig) {
    $routeProvider.when('/' + routesConfig.routes.movie + '/:movieId', {
        resolve: {
            routeId: [function () {
                return routesConfig.routes.movie;
            }]
        }
    }).when('/' + routesConfig.routes.search + '/:searchPhrase?', {
        resolve: {
            routeId: [function () {
                return routesConfig.routes.search;
            }]
        }
    }).otherwise({
        redirectTo: '/' + routesConfig.routes.search + '/'
    });

    $locationProvider.html5Mode(false);
}]);
'use strict';

// -----------------------------------------------------------------------------
// searchBoxModule -- displays a search box input and applies search phrase to
// address bar.
// -----------------------------------------------------------------------------

angular.module('searchBoxModule', ['listenersManagerModule', 'routesModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// searchBoxCtrl -- handles input changes with a small debounce or immediate
// trigger on enter key.
// -----------------------------------------------------------------------------

var SearchBoxController = function () {
    _createClass(SearchBoxController, null, [{
        key: 'initClass',
        value: function initClass() {
            SearchBoxController.debounceTime = 500;
            SearchBoxController.enterKey = 13;
            SearchBoxController.inputSelector = '[js-searchBox-input]';
            SearchBoxController.$inject = ['$scope', '$element', '$timeout', 'currentRoute', 'routesConfig'];
        }
    }]);

    function SearchBoxController($scope, $element, $timeout, currentRoute, routesConfig) {
        _classCallCheck(this, SearchBoxController);

        this._$scope = $scope;
        this._$timeout = $timeout;
        this._currentRoute = currentRoute;
        this._routesConfig = routesConfig;
        this._inputEl = $element[0].querySelector(SearchBoxController.inputSelector);
        this.inputValue = '';
        this._lastAppliedInputValue = null;
        this._isVirgin = true;

        this._applyInputValueDebounced = _.debounce(this._applyInputValue.bind(this), SearchBoxController.debounceTime);

        this._cancelRouteListener = this._currentRoute.registerRouteListener(this._onRouteChange.bind(this));
    }

    _createClass(SearchBoxController, [{
        key: '_onRouteChange',
        value: function _onRouteChange() {
            var route = this._currentRoute.get();
            if (route.routeId === this._routesConfig.routes.search) {
                // first time we want to apply route parameter to input value
                if (this._isVirgin) {
                    this.inputValue = route.params.searchPhrase;
                }

                // we want to focus on input
                this._focusOnInput();
            }

            // wheter we used it or not, we no longer care
            if (this._isVirgin) {
                this._isVirgin = false;
            }
        }
    }, {
        key: '_applyInputValue',
        value: function _applyInputValue() {
            this._applyInputValueDebounced.cancel();
            if (this._lastAppliedInputValue !== this.inputValue) {
                this._lastAppliedInputValue = this.inputValue;
                this._$scope.$applyAsync(this._currentRoute.setToSearch.bind(this._currentRoute, this.inputValue));
            }
        }
    }, {
        key: '_focusOnInput',
        value: function _focusOnInput() {
            var _this = this;

            // sorry this is so ugly, but we need timeout to make sure it will apply
            // when switching routes already happened
            this._$timeout(function () {
                _this._inputEl.focus();
            }, 1, false);
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
            this._focusOnInput();
        }
    }]);

    return SearchBoxController;
}();

SearchBoxController.initClass();

angular.module('searchBoxModule').controller('searchBoxCtrl', SearchBoxController);
'use strict';

// -----------------------------------------------------------------------------
// searchResultsModule for displaying a clickable list of search results.
// -----------------------------------------------------------------------------

angular.module('searchResultsModule', ['assertModule', 'routesModule', 'moviesFetcherModule', 'listenersManagerModule']);

angular.module('searchResultsModule').run(['searchResultsRepository', angular.noop]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// loadMoreCtrl -- displays a button for loading more results
// -----------------------------------------------------------------------------

var LoadMoreController = function () {
    _createClass(LoadMoreController, null, [{
        key: 'initClass',
        value: function initClass() {
            LoadMoreController.$inject = ['searchResultsRepository'];
        }
    }]);

    function LoadMoreController(searchResultsRepository) {
        _classCallCheck(this, LoadMoreController);

        this._searchResultsRepository = searchResultsRepository;

        this.isVisible = false;

        this._searchResultsRepository.registerDataListener(this._onSearchResultsDataChange.bind(this));
    }

    _createClass(LoadMoreController, [{
        key: 'trigger',
        value: function trigger() {
            this._searchResultsRepository.loadMoreResults();
        }
    }, {
        key: '_onSearchResultsDataChange',
        value: function _onSearchResultsDataChange(data) {
            this.isVisible = data.totalResults > data.results.length && !data.isFetchPending;
        }
    }]);

    return LoadMoreController;
}();

LoadMoreController.initClass();

angular.module('searchResultsModule').controller('loadMoreCtrl', LoadMoreController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// SearchResult model that expects data to follow omdbapi.com format.
// -----------------------------------------------------------------------------

angular.module('searchResultsModule').factory('SearchResult', ['assert', 'currentRoute', function (assert, currentRoute) {
    var SearchResultModel = function () {
        function SearchResultModel(movieData) {
            _classCallCheck(this, SearchResultModel);

            assert.isString(movieData.Title);
            assert.isString(movieData.Year);
            assert.isString(movieData.imdbID);
            this.title = movieData.Title;
            this.year = movieData.Year;
            this.movieId = movieData.imdbID;
        }

        _createClass(SearchResultModel, [{
            key: 'open',
            value: function open() {
                currentRoute.setToMovie(this.movieId);
            }
        }]);

        return SearchResultModel;
    }();

    return SearchResultModel;
}]);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// searchResultsCtrl -- displays a list of search results based on current
// search route searchPhrase param. Also allows for opening movie view.
// -----------------------------------------------------------------------------

var SearchResultsController = function () {
    _createClass(SearchResultsController, null, [{
        key: 'initClass',
        value: function initClass() {
            SearchResultsController.emptyMessage = 'Hi! Please type movie title above :-)';

            SearchResultsController.$inject = ['searchResultsRepository'];
        }
    }]);

    function SearchResultsController(searchResultsRepository) {
        _classCallCheck(this, SearchResultsController);

        this._searchResultsRepository = searchResultsRepository;

        this.results = [];
        this.message = null;
        this.isListVisible = false;
        this.isSpinnerVisible = false;
        this.isMessageVisible = false;

        this._searchResultsRepository.registerDataListener(this._onSearchResultsDataChange.bind(this));
    }

    _createClass(SearchResultsController, [{
        key: 'openMovie',
        value: function openMovie(result) {
            result.open();
        }
    }, {
        key: '_onSearchResultsDataChange',
        value: function _onSearchResultsDataChange(data) {
            this.results = data.results;
            this.isSpinnerVisible = data.isFetchPending;

            if (data.error) {
                this.message = data.error;
            } else if (this.results.length === 0 && !data.isFetchPending) {
                this.message = SearchResultsController.emptyMessage;
            } else {
                delete this.message;
            }
        }
    }]);

    return SearchResultsController;
}();

SearchResultsController.initClass();

angular.module('searchResultsModule').controller('searchResultsCtrl', SearchResultsController);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// searchResultsRepository is a service that fetches new search results whenever
// searchPhrase change. It also can load further response pages from API, when
// a response has over 10 results.
// -----------------------------------------------------------------------------

var SearchResultsRepositoryService = function () {
    _createClass(SearchResultsRepositoryService, null, [{
        key: 'initClass',
        value: function initClass() {
            SearchResultsRepositoryService.minSearchChars = 3;
            SearchResultsRepositoryService.resultsPerPage = 10;

            SearchResultsRepositoryService.$inject = ['SearchResult', 'currentRoute', 'routesConfig', 'moviesFetcher', 'moviesFetcherConfig', 'assert', 'listenersManager'];
        }
    }]);

    function SearchResultsRepositoryService(SearchResult, currentRoute, routesConfig, moviesFetcher, moviesFetcherConfig, assert, listenersManager) {
        _classCallCheck(this, SearchResultsRepositoryService);

        this._SearchResult = SearchResult;
        this._currentRoute = currentRoute;
        this._routesConfig = routesConfig;
        this._moviesFetcher = moviesFetcher;
        this._moviesFetcherConfig = moviesFetcherConfig;
        this._assert = assert;

        this._currentSearchPhrase = null;
        this._results = [];
        this._totalResults = 0;
        this._error = null;
        this._isFetchPending = false;

        this._currentRoute.registerRouteListener(this._onRouteChange.bind(this));

        this._dataListenersManager = listenersManager.getManager();
    }

    // -------------------------------------------------------------------------
    // getting more data
    // -------------------------------------------------------------------------

    _createClass(SearchResultsRepositoryService, [{
        key: 'loadMoreResults',
        value: function loadMoreResults() {
            this._fetchNextPageData();
        }

        // -------------------------------------------------------------------------
        // notifying listeners
        // -------------------------------------------------------------------------

    }, {
        key: '_notifyDataChange',
        value: function _notifyDataChange() {
            this._dataListenersManager.callListeners({
                results: this._results,
                totalResults: this._totalResults,
                isFetchPending: this._isFetchPending,
                error: this._error
            });
        }
    }, {
        key: 'registerDataListener',
        value: function registerDataListener(listener) {
            return this._dataListenersManager.addListener(listener);
        }

        // -------------------------------------------------------------------------
        // handle route changes
        // -------------------------------------------------------------------------

    }, {
        key: '_onRouteChange',
        value: function _onRouteChange() {
            var route = this._currentRoute.get();
            if (route.routeId === this._routesConfig.routes.search) {
                // make sure it exists and is different than previous one
                if (typeof route.params.searchPhrase === 'string' && this._currentSearchPhrase !== route.params.searchPhrase) {
                    // memorize current search phrase
                    this._currentSearchPhrase = route.params.searchPhrase;

                    // clear obsolete data
                    this._stopAndResetData();

                    // we don't want to star search for short strings
                    if (this._currentSearchPhrase.length >= SearchResultsRepositoryService.minSearchChars) {
                        this._fetchNextPageData();
                    }
                }
            }
        }

        // -------------------------------------------------------------------------
        // handle fetching data from API
        // -------------------------------------------------------------------------

    }, {
        key: '_stopAndResetData',
        value: function _stopAndResetData() {
            this._results = [];
            this._totalResults = 0;
            this._removeError();
            this._cancelPendingFetch();
            this._notifyDataChange();
        }
    }, {
        key: '_fetchNextPageData',
        value: function _fetchNextPageData() {
            this._isFetchPending = true;
            this._retrier = this._moviesFetcher.fetchMoviesBySearch(this._currentSearchPhrase, this._getCurrentSearchPage());
            this._retrier.promise.then(this._fetchMoviesSuccess.bind(this), this._fetchMoviesError.bind(this), this._fetchMoviesNotify.bind(this));
            this._notifyDataChange();
        }
    }, {
        key: '_cancelPendingFetch',
        value: function _cancelPendingFetch() {
            this._isFetchPending = false;
            if (typeof this._retrier !== 'undefined') {
                this._retrier.cancel();
                delete this._retrier;
            }
        }
    }, {
        key: '_fetchMoviesSuccess',
        value: function _fetchMoviesSuccess(response) {
            this._isFetchPending = false;
            this._interpretResults(response.data);
            this._notifyDataChange();
        }
    }, {
        key: '_fetchMoviesError',
        value: function _fetchMoviesError(errorReason) {
            this._isFetchPending = false;
            if (errorReason === 1) {
                this._setError(this._moviesFetcherConfig.messages.overLimit);
            }
            this._notifyDataChange();
        }
    }, {
        key: '_fetchMoviesNotify',
        value: function _fetchMoviesNotify() {
            console.warn(this._moviesFetcherConfig.messages.retrying);
        }
    }, {
        key: '_getCurrentSearchPage',
        value: function _getCurrentSearchPage() {
            var currentPage = this._results.length / SearchResultsRepositoryService.resultsPerPage;
            return currentPage + 1;
        }

        // -------------------------------------------------------------------------
        // interpreting fetched data
        // -------------------------------------------------------------------------

    }, {
        key: '_interpretResults',
        value: function _interpretResults(resultsData) {
            switch (resultsData.Response) {
                // True means we have responses
                case 'True':
                    this._addMoreResults(resultsData.Search, resultsData.totalResults);
                    this._removeError();
                    break;
                // False means that API was not able to return movies
                case 'False':
                    this._setError(resultsData.Error);
                    break;
                default:
                    this._setError(this._moviesFetcherConfig.messages.unknownApiResponse);
            }
        }
    }, {
        key: '_addMoreResults',
        value: function _addMoreResults(moviesArray, totalResults) {
            this._assert.isArray(moviesArray);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = moviesArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var movie = _step.value;

                    this._results.push(new this._SearchResult(movie));
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

            var totalResultsNumber = parseInt(totalResults, 10);
            this._assert.isInteger(totalResultsNumber);
            this._totalResults = totalResultsNumber;
        }
    }, {
        key: '_setError',
        value: function _setError(errorMessage) {
            this._error = errorMessage;
        }
    }, {
        key: '_removeError',
        value: function _removeError() {
            this._error = null;
        }
    }]);

    return SearchResultsRepositoryService;
}();

SearchResultsRepositoryService.initClass();

angular.module('searchResultsModule').service('searchResultsRepository', SearchResultsRepositoryService);
'use strict';

// -----------------------------------------------------------------------------
// viewsModule -- handles switching between different app views.
// -----------------------------------------------------------------------------

angular.module('viewsModule', ['routesModule']);
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// viewsCtrl -- manages displaying different views depending on route.
// -----------------------------------------------------------------------------

var ViewsController = function () {
    _createClass(ViewsController, null, [{
        key: 'initClass',
        value: function initClass() {
            ViewsController.$inject = ['currentRoute', 'routesConfig'];
        }
    }]);

    function ViewsController(currentRoute, routesConfig) {
        _classCallCheck(this, ViewsController);

        this._currentRoute = currentRoute;
        this._routesConfig = routesConfig;
        this.isSearchViewVisible = false;
        this.isMovieViewVisible = false;
        this._currentRoute.registerRouteListener(this._onRouteChange.bind(this));
    }

    _createClass(ViewsController, [{
        key: '_onRouteChange',
        value: function _onRouteChange() {
            var route = this._currentRoute.get();
            this._hideAllViews();
            switch (route.routeId) {
                case this._routesConfig.routes.search:
                    this.isSearchViewVisible = true;
                    break;
                case this._routesConfig.routes.movie:
                    this.isMovieViewVisible = true;
                    break;
                default:
                    console.error('Unknown route: ' + route.routeId);
            }
        }
    }, {
        key: '_hideAllViews',
        value: function _hideAllViews() {
            this.isSearchViewVisible = false;
            this.isMovieViewVisible = false;
        }
    }]);

    return ViewsController;
}();

ViewsController.initClass();

angular.module('viewsModule').controller('viewsCtrl', ViewsController);
