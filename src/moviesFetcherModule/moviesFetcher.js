// -----------------------------------------------------------------------------
// moviesFetcher is a service that promises and fetches data from OMDb API.
// You can get two types of data here:
// - fetchMoviesBySearch() returns a list of movies
// - fetchMovieById() returns a detailed data for a single movie
// NOTE: all above methods returns a retrier object (see httpRetrierModule)
// -----------------------------------------------------------------------------

class MoviesFetcherService {
    static initClass() {
        MoviesFetcherService.apiUrl = 'http://www.omdbapi.com/?r=json&type=movie';
        MoviesFetcherService.retryLimit = 3;

        MoviesFetcherService.$inject = ['httpRetrier', 'assert', '$window'];
    }

    constructor(httpRetrier, assert, $window) {
        this._httpRetrier = httpRetrier;
        this._assert = assert;
        this._$window = $window;
    }

    // -------------------------------------------------------------------------
    // getting a list of movies
    // -------------------------------------------------------------------------

    fetchMoviesBySearch(searchPhrase) {
        this._assert.isString(searchPhrase);
        return this._httpRetrier.runGet(
            this._getSearchUrl(searchPhrase),
            MoviesFetcherService.retryLimit
        );
    }

    _getSearchUrl(searchPhrase) {
        let searchUrl = MoviesFetcherService.apiUrl;
        searchUrl += '&s=';
        searchUrl += this._$window.encodeURIComponent(searchPhrase);
        return searchUrl;
    }

    // -------------------------------------------------------------------------
    // getting a single movie
    // -------------------------------------------------------------------------

    fetchMovieById(movieId) {
        this._assert.isString(movieId);
        return this._httpRetrier.runGet(
            this._getMovieIdUrl(movieId),
            MoviesFetcherService.retryLimit
        );
    }

    _getMovieIdUrl(movieId) {
        let searchUrl = MoviesFetcherService.apiUrl;
        searchUrl += '&i=';
        searchUrl += this._$window.encodeURIComponent(movieId);
        return searchUrl;
    }
}

MoviesFetcherService.initClass();

angular.module('moviesFetcherModule').service(
    'moviesFetcher',
    MoviesFetcherService
);
