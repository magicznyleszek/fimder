describe('SearchResult', () => {
    let SearchResult = null;
    let testData = null;

    beforeEach(() => {
        module('testApp');
        module('assertModule');
        module('routesModule');
        module('moviesFetcherModule');
        module('searchResultsModule');
        inject(($injector) => {
            testData = $injector.get('testData');
            SearchResult = $injector.get('SearchResult');
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
});
