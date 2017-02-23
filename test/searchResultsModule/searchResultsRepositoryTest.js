describe('searchResultsRepository', () => {
    let testData = null;
    let $rootScope = null;
    let searchResultsRepository = null;

    const resolvePromises = () => {
        // Digesting to resolve async promises
        $rootScope.$digest();
    };

    beforeEach(() => {
        module('testApp');
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
});
