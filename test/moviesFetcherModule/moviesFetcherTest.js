describe('moviesFetcher', () => {
    let moviesFetcher = null;

    const conanPhrase = 'Conan the Barbarian';
    const conanSearchUrl = 'http://www.omdbapi.com/?r=json&type=movie&s=Conan%20the%20Barbarian';
    const conanMovieId = 'tt0082198';
    const conanMovieUrl = 'http://www.omdbapi.com/?r=json&type=movie&i=tt0082198';

    beforeEach(() => {
        module('testApp');
        module('assertModule');
        module('httpRetrierModule');
        module('moviesFetcherModule');
        inject(($injector) => {
            moviesFetcher = $injector.get('moviesFetcher');
        });
    });

    it('should return a retrier object for fetchMoviesBySearch', () => {
        const retrier = moviesFetcher.fetchMoviesBySearch(conanPhrase);
        expect(retrier.promise).toBeDefined();
        expect(retrier.cancel).toBeDefined();
    });

    it('should return a retrier object for fetchMovieById', () => {
        const retrier = moviesFetcher.fetchMovieById(conanMovieId);
        expect(retrier.promise).toBeDefined();
        expect(retrier.cancel).toBeDefined();
    });

    it('should create proper search url for OMDb API', () => {
        const url = moviesFetcher._getSearchUrl(conanPhrase);
        expect(url).toBe(conanSearchUrl);
    });

    it('should create proper movie url for OMDb API', () => {
        const url = moviesFetcher._getMovieIdUrl(conanMovieId);
        expect(url).toBe(conanMovieUrl);
    });
});
