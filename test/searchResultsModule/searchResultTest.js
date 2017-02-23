describe('SearchResult', () => {
    let testData = null;
    let $rootScope = null;
    let SearchResult = null;
    let currentRoute = null;
    let routesConfig = null;

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
            SearchResult = $injector.get('SearchResult');
            currentRoute = $injector.get('currentRoute');
            routesConfig = $injector.get('routesConfig');
        });
    });

    it('should throw for bad input data', () => {
        expect(() => {return new SearchResult();}).toThrow();
        // not enough data
        expect(() => {return new SearchResult({Title: 'Conan'});}).toThrow();
    });

    it('should return a beautiful object for valid input data', () => {
        const validData = testData.responses.searchSuccess.Search[0];
        const result = new SearchResult(validData);
        expect(result.title).toBe(validData.Title);
        expect(result.year).toBe(validData.Year);
        expect(result.movieId).toBe(validData.imdbID);
    });

    it('should set route to movie on open', () => {
        const result = new SearchResult(
            testData.responses.searchSuccess.Search[0]
        );
        result.open();
        resolvePromises();
        expect(currentRoute.get().routeId).toBe(routesConfig.routes.movie);
    });
});
