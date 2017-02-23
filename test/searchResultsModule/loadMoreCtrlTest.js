describe('loadMoreCtrl', () => {
    let testData = null;
    let loadMoreCtrl = null;

    beforeEach(() => {
        module('testAppModule');
        module('assertModule');
        module('routesModule');
        module('moviesFetcherModule');
        module('listenersManagerModule');
        module('searchResultsModule');
        inject(($injector, $controller) => {
            testData = $injector.get('testData');
            loadMoreCtrl = $controller('loadMoreCtrl', {
                searchResultsRepository: $injector.get('searchResultsRepository')
            });
        });
    });

    it('should not be visible when pending', () => {
        loadMoreCtrl._onSearchResultsDataChange({
            results: [],
            totalResults: 0,
            isFetchPending: true,
            error: null
        });
        expect(loadMoreCtrl.isVisible).toBeFalsy();
    });

    it('should be visible when more results than shown', () => {
        loadMoreCtrl._onSearchResultsDataChange({
            results: [
                {movieId: '1'},
                {movieId: '2'},
                {movieId: '3'},
                {movieId: '4'},
                {movieId: '5'},
                {movieId: '6'},
                {movieId: '7'},
                {movieId: '8'},
                {movieId: '9'},
                {movieId: '0'}
            ],
            totalResults: 26,
            isFetchPending: true,
            error: null
        });
        expect(loadMoreCtrl.isVisible).toBeFalsy();
    });
});
