describe('searchResultsCtrl', () => {
    let testData = null;
    let searchResultsCtrl = null;

    beforeEach(() => {
        module('testAppModule');
        module('assertModule');
        module('routesModule');
        module('moviesFetcherModule');
        module('observableModule');
        module('searchResultsModule');
        inject(($injector, $controller) => {
            testData = $injector.get('testData');
            searchResultsCtrl = $controller('searchResultsCtrl', {
                searchResultsRepository: $injector.get('searchResultsRepository')
            });
        });
    });

    it('should display empty message for empty non-pending data', () => {
        searchResultsCtrl._onSearchResultsDataChange({
            results: [],
            totalResults: null,
            isFetchPending: false,
            error: null
        });
        expect(searchResultsCtrl.message).toBe(
            searchResultsCtrl.constructor.emptyMessage
        );
    });

    it('should not display duplicate entries', () => {
        searchResultsCtrl._searchResultsRepository._fetchMoviesSuccess({
            data: testData.responses.searchSuccessDupes
        });
        expect(searchResultsCtrl.results.length).toBe(1);
    });
});
