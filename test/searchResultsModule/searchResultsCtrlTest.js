describe('searchResultsCtrl', () => {
    let searchResultsCtrl = null;
    let $rootScope = null;

    const omdbApiResponseTooMany = {
        Response: 'False',
        Error: 'Too many results.'
    };

    const omdbApiResponseNotFound = {
        Response: 'False',
        Error: 'Movie not found!'
    };

    const omdbApiResponseFound = {
        Search: [
            {
                Title: 'Conan the Barbarian',
                Year: '1982',
                imdbID: 'tt0082198',
                Type: 'movie',
                Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMWIxMzQxZjAtMGFkNC00NzYwLWFiMGEtNzZhZjE5MmFiMmMyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
            }
        ],
        totalResults: '1',
        Response: 'True'
    };

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
            data: omdbApiResponseTooMany
        });
        expect(searchResultsCtrl.isMessageVisible).toBeTruthy();
    });

    it('should show message for not found', () => {
        searchResultsCtrl._fetchMoviesSuccess({
            data: omdbApiResponseNotFound
        });
        expect(searchResultsCtrl.isMessageVisible).toBeTruthy();
    });

    it('should show list for found', () => {
        searchResultsCtrl._fetchMoviesSuccess({
            data: omdbApiResponseFound
        });
        expect(searchResultsCtrl.isListVisible).toBeTruthy();
    });
});
