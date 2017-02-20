// -----------------------------------------------------------------------------
// searchResultsCtrl -- displays a list of search results based on current
// search route searchPhrase param. Also allows for opening movie view.
// -----------------------------------------------------------------------------

class SearchResultsController {
    static initClass() {
        SearchResultsController.$inject = [
            'SearchResult',
            'currentRoute',
            'routesConfig',
            'moviesFetcher'
        ];
    }

    constructor(
        SearchResult,
        currentRoute,
        routesConfig,
        moviesFetcher
    ) {
        this._SearchResult = SearchResult;
        this._currentRoute = currentRoute;
        this._routesConfig = routesConfig;
        this._moviesFetcher = moviesFetcher;

        this.results = [];
        this.isListVisible = false;
        this.isSpinnerVisible = false;
        this.isNoFoundMessageVisible = false;
        this.isTooManyMessageVisible = false;

        this._currentRoute.registerRouteChangeListener(
            this._onRouteChange.bind(this)
        );
    }

    _onRouteChange() {
        const route = this._currentRoute.get();
        if (route.routeId === this._routesConfig.routes.search) {
            this._startNewSearch(route.params.searchPhrase);
        }
    }

    _startNewSearch(searchPhrase) {
        console.log('_startNewSearch', searchPhrase);
        this._cancelRetrierIfNecessary();
        this._retrier = this._moviesFetcher.fetchMoviesBySearch(searchPhrase);
        this._retrier.promise.then(
            this._fetchMoviesSuccess.bind(this),
            this._fetchMoviesError.bind(this),
            this._fetchMoviesNotify.bind(this)
        );
    }

    _fetchMoviesSuccess(responseData) {
        console.log('_fetchMoviesSuccess', responseData);
    }

    _fetchMoviesError(responseData) {
        console.log('_fetchMoviesError', responseData);
    }

    _fetchMoviesNotify(responseData) {
        console.log('_fetchMoviesNotify', responseData);
    }

    _cancelRetrierIfNecessary() {
        if (typeof this._retrier !== 'undefined') {
            this._retrier.cancel();
            delete this._retrier;
        }
    }
}

SearchResultsController.initClass();

angular.module('searchResultsModule').controller(
    'searchResultsCtrl',
    SearchResultsController
);
