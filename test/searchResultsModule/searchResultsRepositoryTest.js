describe('searchResultsRepository', () => {
    let testData = null;
    let $rootScope = null;
    let searchResultsRepository = null;

    const resolvePromises = () => {
        // Digesting to resolve async promises
        $rootScope.$digest();
    };

    beforeEach(() => {
        module('testAppModule');
        module('assertModule');
        module('routesModule');
        module('moviesFetcherModule');
        module('listenersManagerModule');
        module('searchResultsModule');
        inject(($injector) => {
            testData = $injector.get('testData');
            $rootScope = $injector.get('$rootScope');
            searchResultsRepository = $injector.get('searchResultsRepository');
        });
    });

    it('should start new search for valid search phrase', () => {
        const someSearchParam = 'salem';
        spyOn(searchResultsRepository, '_fetchNewData').and.callThrough();
        searchResultsRepository._currentRoute.setToSearch(someSearchParam);
        resolvePromises();
        expect(searchResultsRepository._fetchNewData).toHaveBeenCalled();
        expect(searchResultsRepository._retrier).toBeDefined();
    });

    it('should not start new search for empty search phrase', () => {
        const someSearchParam = '';
        spyOn(searchResultsRepository, '_fetchNewData').and.callThrough();
        searchResultsRepository._currentRoute.setToSearch(someSearchParam);
        resolvePromises();
        expect(searchResultsRepository._fetchNewData).not.toHaveBeenCalled();
    });

    it('should not start new search for too short search phrase', () => {
        const someSearchParam = 'sa';
        spyOn(searchResultsRepository, '_fetchNewData').and.callThrough();
        searchResultsRepository._currentRoute.setToSearch(someSearchParam);
        resolvePromises();
        expect(searchResultsRepository._fetchNewData).not.toHaveBeenCalled();
    });

    it('should clear current data when route changes', () => {
        // set initial search param value
        searchResultsRepository._currentRoute.setToSearch('salem');
        resolvePromises();
        searchResultsRepository._interpretResults(
            testData.responses.searchSuccess
        );

        // change route
        searchResultsRepository._currentRoute.setToSearch('jesus');
        resolvePromises();

        expect(searchResultsRepository._results.length).toBe(0);
        expect(searchResultsRepository._totalResults).toBe(null);
        expect(searchResultsRepository._error).toBe(null);
        expect(searchResultsRepository._isFetchPending).toBe(false);
    });
});
