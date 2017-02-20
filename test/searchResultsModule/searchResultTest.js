describe('SearchResult', () => {
    let SearchResult = null;

    beforeEach(() => {
        module('testApp');
        module('assertModule');
        module('routesModule');
        module('moviesFetcherModule');
        module('searchResultsModule');
        inject(($injector) => {
            SearchResult = $injector.get('SearchResult');
        });
    });

    it('should throw for bad input data', () => {
        expect(() => {return new SearchResult();}).toThrow();
        // not enough data
        expect(() => {return new SearchResult({Title: 'Conan'});}).toThrow();
        // year is a number
        expect(() => {
            return new SearchResult({
                Title: 'Conan the Barbarian',
                Year: 1982,
                imdbID: 'tt0082198'
            });
        }).toThrow();
    });

    it('should return a beautiful object for valid input data', () => {
        const validData = {
            Title: 'Conan the Barbarian',
            Year: '1982',
            imdbID: 'tt0082198'
        };
        const result = new SearchResult(validData);
        expect(result.title).toBe(validData.Title);
        expect(result.year).toBe(validData.Year);
        expect(result.movieId).toBe(validData.imdbID);
    });
});
