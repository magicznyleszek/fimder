// -----------------------------------------------------------------------------
// httpRetrier is a service that does http request until first success, up
// to 10 times with some time (incrementing) between each retry -- and it is
// silent, i.e. it doesn't throw anything by itself.
// -----------------------------------------------------------------------------

class HttpRetrierService {
    static initClass() {
        HttpRetrierService.intervalTime = 2000;
        HttpRetrierService.defaultLimit = 10;

        HttpRetrierService.$inject = ['$q', '$http', '$timeout', 'assert'];
    }

    constructor($q, $http, $timeout, assert) {
        this._$q = $q;
        this._$http = $http;
        this._$timeout = $timeout;
        this._assert = assert;
        this._retriers = {};
        this.rejectReasons = Object.freeze({
            cancel: 0,
            overLimit: 1
        });
        this._uniqueIdCounter = 0;
    }

    runGet(url, limit = HttpRetrierService.defaultLimit) {
        this._assert.isString(url);
        this._assert.isInteger(limit);
        return this._run('get', url, limit);
    }

    _run(method, url, limit) {
        const retrier = this._createRetrier({method, url, cache: true}, limit);
        this._retry(retrier);
        return {
            promise: retrier.deferred.promise,
            cancel: this._cancelRetrier.bind(this, retrier.id)
        };
    }

    // -------------------------------------------------------------------------
    // managing retriers
    // -------------------------------------------------------------------------

    _destroyRetrier(retrierId) {
        delete this._retriers[retrierId];
    }

    // @param {object} httpConfig - a http config object:
    // https://docs.angularjs.org/api/ng/service/$http#usage
    _createRetrier(httpConfig, limit) {
        // we don't want to ddos anyone, so we will keep the limit in sane range
        if (limit <= 0 || limit >= 16) {
            console.warn(`You want limit to be ${limit}, really? Lmftfy.`);
            limit = HttpRetrierService.defaultLimit;
        }

        const retrierId = this._getUniqueId();
        this._retriers[retrierId] = {
            id: retrierId,
            httpConfig,
            count: 0,
            limit,
            deferred: this._$q.defer(),
            timeoutId: null
        };
        return this._retriers[retrierId];
    }

    _cancelRetrier(retrierId) {
        if (this._retriers[retrierId]) {
            this._retriers[retrierId].deferred.reject(
                this.rejectReasons.cancel
            );
            this._destroyRetrier(retrierId);
        }
    }

    // generates unique id (a non-numerical string) for retrier
    // call me crazy, but I don't like numbers or stringified numbers as ids
    _getUniqueId() {
        this._uniqueIdCounter ++;
        return `rtrr-${this._uniqueIdCounter.toString(36)}`;
    }

    // -------------------------------------------------------------------------
    // managing http request and retrying
    // -------------------------------------------------------------------------

    _retry(retrier) {
        retrier.timeoutId = this._$timeout(
            this._doHttpRequest.bind(this, retrier),
            HttpRetrierService.intervalTime * retrier.count,
            false
        );
        // we start with 0, as we want the first call to be immediate
        retrier.count++;
    }

    _doHttpRequest(retrier) {
        this._$http(retrier.httpConfig).then(
            this._onHttpRequestSuccess.bind(this, retrier),
            this._onHttpRequestError.bind(this, retrier)
        );
    }

    _onHttpRequestSuccess(retrier, response) {
        retrier.deferred.resolve(response);
        this._destroyRetrier(retrier.id);
    }

    _onHttpRequestError(retrier, response) {
        // if someone canceled retrier, we no longer care about anything
        if (typeof this._retriers[retrier.id] === 'undefined') {
            return;
        }

        // inform about this error
        retrier.deferred.notify({
            response,
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
}

HttpRetrierService.initClass();

angular.module('httpRetrierModule').service('httpRetrier', HttpRetrierService);
