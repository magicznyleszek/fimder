describe('httpRetrier', () => {
    let httpRetrier = null;
    let $httpBackend = null;
    let $rootScope = null;
    const testUrl = 'http://foo.api/bar?q=fum+baz';

    const resolvePromises = () => {
        // Digesting to resolve async promises
        $rootScope.$digest();
    };

    beforeEach(() => {
        module('testApp');
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
});
