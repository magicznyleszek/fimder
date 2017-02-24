describe('httpRetrier', () => {
    let httpRetrier = null;
    let $httpBackend = null;
    let $timeout = null;
    let $rootScope = null;
    const testUrl = 'http://foo.api/bar?q=fum+baz';
    const httpConfig = {url: testUrl, method: 'get'};

    class PromiseWatcher {
        successCallback() {
            console.log('succcess');
        }
        errorCallback() {
            console.log('error');
        }
        notifyCallback() {
            console.log('notify');
        }
    }

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
            $timeout = $injector.get('$timeout');
            $rootScope = $injector.get('$rootScope');
        });
        resolvePromises();
    });

    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.resetExpectations();
    });

    it('should resolve promise after success', () => {
        // STEP 1 we expect http request
        $httpBackend.expectGET(testUrl).respond(200, {year: 1492});

        // STEP 2 we create a promise watcher with a spy on callbacks
        const spiedObject = new PromiseWatcher();
        spyOn(spiedObject, 'successCallback');
        spyOn(spiedObject, 'errorCallback');
        spyOn(spiedObject, 'notifyCallback');

        // STEP 3 we start new retrier process
        const retrier = httpRetrier.runGet(testUrl);
        retrier.promise.then(
            spiedObject.successCallback,
            spiedObject.errorCallback,
            spiedObject.notifyCallback
        );

        // STEP 4 we make the timeout go now
        $timeout.flush();

        // STEP 5 we make http request to respond with fake data
        $httpBackend.flush();

        // STEP 6 we make the retrier final promise to resolve
        resolvePromises();

        expect(spiedObject.successCallback).toHaveBeenCalled();
        expect(spiedObject.errorCallback).not.toHaveBeenCalled();
        expect(spiedObject.notifyCallback).not.toHaveBeenCalled();
    });

    it('should notify and reject promise after too many retries', () => {
        // STEP 1 we expect http request
        $httpBackend.expectGET(testUrl).respond(500, 'some error');

        // STEP 2 we create a promise watcher with a spy on callbacks
        const spiedObject = new PromiseWatcher();
        spyOn(spiedObject, 'successCallback');
        spyOn(spiedObject, 'errorCallback');
        spyOn(spiedObject, 'notifyCallback');

        // STEP 3 we start new retrier process
        const retrier = httpRetrier.runGet(testUrl, 1);
        retrier.promise.then(
            spiedObject.successCallback,
            spiedObject.errorCallback,
            spiedObject.notifyCallback
        );

        // STEP 4 we make the timeout go now
        $timeout.flush();

        // STEP 5 we make http request to respond with fake error data
        $httpBackend.flush();

        // STEP 6 we make the retrier final promise to resolve
        resolvePromises();

        expect(spiedObject.successCallback).not.toHaveBeenCalled();
        expect(spiedObject.errorCallback).toHaveBeenCalled();
        expect(spiedObject.notifyCallback).toHaveBeenCalled();
    });

    it('should reject a promise after cancel is called', () => {
        // STEP 1 we create a promise watcher with a spy on callbacks
        const spiedObject = new PromiseWatcher();
        spyOn(spiedObject, 'successCallback');
        spyOn(spiedObject, 'errorCallback');
        spyOn(spiedObject, 'notifyCallback');

        // STEP 2 we start new retrier process
        const retrier = httpRetrier.runGet(testUrl);
        retrier.promise.then(
            spiedObject.successCallback,
            spiedObject.errorCallback,
            spiedObject.notifyCallback
        );

        // STEP 3 we cancel retrier
        retrier.cancel();

        // STEP 4 make the promise resolve
        resolvePromises();

        expect(spiedObject.successCallback).not.toHaveBeenCalled();
        expect(spiedObject.errorCallback).toHaveBeenCalled();
        expect(spiedObject.notifyCallback).not.toHaveBeenCalled();
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

    it('should create unique ids', () => {
        const idsArray = [];
        // one million operations :-D
        for (let i = 0; i < 1000000; i++) {
            idsArray.push(httpRetrier._getUniqueId());
        }
        const arrayWithoutDupes = Array.from(new Set(idsArray));
        expect(idsArray.length).toBe(arrayWithoutDupes.length);
    });
});
