describe('searchResultsCtrl', () => {
    let testData = null;
    let searchResultsCtrl = null;
    let $rootScope = null;

    const resolvePromises = () => {
        // Digesting to resolve async promises
        $rootScope.$digest();
    };

    beforeEach(() => {
        module('testApp');
        module('assertModule');
        module('routesModule');
        module('moviesFetcherModule');
        module('searchResultsModule');
        inject(($injector, $controller) => {
            testData = $injector.get('testData');
            $rootScope = $injector.get('$rootScope');
            searchResultsCtrl = $controller('searchResultsCtrl', {
                SearchResult: $injector.get('SearchResult'),
                currentRoute: $injector.get('currentRoute'),
                routesConfig: $injector.get('routesConfig'),
                moviesFetcher: $injector.get('moviesFetcher'),
                moviesFetcherConfig: $injector.get('moviesFetcherConfig'),
                assert: $injector.get('assert')
            });
        });
    });

    it('should start new search for valid search phrase', () => {
        const someSearchParam = 'salem';
        spyOn(searchResultsCtrl, '_startNewSearch').and.callThrough();
        searchResultsCtrl._currentRoute.setToSearch(someSearchParam);
        resolvePromises();
        expect(searchResultsCtrl._startNewSearch).toHaveBeenCalled();
        expect(searchResultsCtrl._retrier).toBeDefined();
    });

    it('should not start new search for empty search phrase', () => {
        const someSearchParam = '';
        spyOn(searchResultsCtrl, '_startNewSearch').and.callThrough();
        searchResultsCtrl._currentRoute.setToSearch(someSearchParam);
        resolvePromises();
        expect(searchResultsCtrl._startNewSearch).not.toHaveBeenCalled();
    });

    it('should not start new search for too short search phrase', () => {
        const someSearchParam = 'sa';
        spyOn(searchResultsCtrl, '_startNewSearch').and.callThrough();
        searchResultsCtrl._currentRoute.setToSearch(someSearchParam);
        resolvePromises();
        expect(searchResultsCtrl._startNewSearch).not.toHaveBeenCalled();
    });

    it('should show message for too many found', () => {
        searchResultsCtrl._fetchMoviesSuccess({
            data: testData.responses.searchErrorTooMany
        });
        expect(searchResultsCtrl.isMessageVisible).toBeTruthy();
    });

    it('should show message for not found', () => {
        searchResultsCtrl._fetchMoviesSuccess({
            data: testData.responses.searchErrorNotFound
        });
        expect(searchResultsCtrl.isMessageVisible).toBeTruthy();
    });

    it('should show list for found', () => {
        searchResultsCtrl._fetchMoviesSuccess({
            data: testData.responses.searchSuccess
        });
        expect(searchResultsCtrl.isListVisible).toBeTruthy();
    });
});
