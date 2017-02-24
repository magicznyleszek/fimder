// TODO: test nested promises somehow -- try:
// $httpBackend.expectGET().respond()
// // resolve $timeout
// $timeout.flush()
// // resolve $http
// $httpBackend.flush()
// // resolve $q
// $rootScope.$apply()

describe('httpRetrier', () => {
    let httpRetrier = null;
    let $httpBackend = null;
    let $rootScope = null;
    const testUrl = 'http://foo.api/bar?q=fum+baz';
    const httpConfig = {url: testUrl, method: 'get'};

    const resolvePromises = () => {
        // Digesting to resolve async promises
        $rootScope.$digest();
    };

    beforeEach(() => {
        module('testAppModule');
        module('httpRetrierModule');
        inject(($injector) => {
            httpRetrier = $injector.get('httpRetrier');
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
        });
        resolvePromises();
    });

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.resetExpectations();
    });

    it('should reject a promise after cancel is called', () => {
        // $httpBackend.expectGET(testUrl).respond(200, {year: 1492});

        const spiedObject = {
            successCallback: () => {
                console.log('succcess');
            },
            errorCallback: () => {
                console.log('error');
            },
            notifyCallback: () => {
                console.log('notify');
            }
        };

        spyOn(spiedObject, 'errorCallback');
        const retrier = httpRetrier.runGet(testUrl);
        retrier.promise.then(
            spiedObject.successCallback,
            spiedObject.errorCallback,
            spiedObject.notifyCallback
        );
        retrier.cancel();
        // $httpBackend.flush();
        resolvePromises();

        expect(spiedObject.errorCallback).toHaveBeenCalled();
    });

    it('should pacify limit when creating retrier', () => {
        const badLimits = [0, -1, -42, 17, 19, 99, 168];
        for (const badLimit of badLimits) {
            const retrier = httpRetrier._createRetrier(httpConfig, badLimit);
            expect(retrier.limit).toBe(httpRetrier.constructor.defaultLimit);
        }
    });

    it('should not retry when canceled', () => {
        spyOn(httpRetrier, '_retry');
        const retrier = httpRetrier.runGet(testUrl);
        retrier.promise.then(angular.noop, angular.noop, angular.noop);
        retrier.cancel();
        httpRetrier._onHttpRequestError(retrier, null);
        expect(httpRetrier._retry.calls.count()).toBe(1);
    });
});
