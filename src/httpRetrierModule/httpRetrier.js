// -----------------------------------------------------------------------------
// httpRetrier is a service that does http request until first success, up
// to 10 times with some time (incrementing) between each retry -- and it is
// silent, i.e. it doesn't throw anything by itself
// -----------------------------------------------------------------------------

class HttpRetrierService {
    static initClass() {
        HttpRetrierService.intervalTime = 2000;
        HttpRetrierService.limit = 10;

        HttpRetrierService.$inject = ['$q', '$http', '$timeout'];
    }

    constructor($q, $http, $timeout) {
        this._$q = $q;
        this._$http = $http;
        this._$timeout = $timeout;
        this._retriers = {};
        this.rejectReasons = Object.freeze({
            cancel: 0,
            overLimit: 1
        });
    }

    runGet(url) {
        return this._run('get', url);
    }

    _run(method, url) {
        const retrier = this._createRetrier({method, url});
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
    _createRetrier(httpConfig) {
        const retrierId = Math.floor((Math.random()) * 0x1000000).toString(16);
        this._retriers[retrierId] = {
            id: retrierId,
            httpConfig,
            count: 0,
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
        if (retrier.count > HttpRetrierService.limit) {
            retrier.deferred.reject(this.rejectReasons.overLimit);
            this._destroyRetrier(retrier.id);
        } else {
            this._retry(retrier);
        }
    }
}

HttpRetrierService.initClass();

angular.module('httpRetrierModule').service('httpRetrier', HttpRetrierService);
