// -----------------------------------------------------------------------------
// searchResultsRepository is a service that fetches new search results whenever
// searchPhrase change. It also can load further response pages from API, when
// a response has over 10 results.
// -----------------------------------------------------------------------------

class SearchResultsRepositoryService {
    static initClass() {
        SearchResultsRepositoryService.minSearchChars = 3;
        SearchResultsRepositoryService.resultsPerPage = 10;

        SearchResultsRepositoryService.$inject = [
            'SearchResult',
            'currentRoute',
            'routesConfig',
            'moviesFetcher',
            'moviesFetcherConfig',
            'assert',
            'listenersManager'
        ];
    }

    constructor(
        SearchResult,
        currentRoute,
        routesConfig,
        moviesFetcher,
        moviesFetcherConfig,
        assert,
        listenersManager
    ) {
        this._SearchResult = SearchResult;
        this._currentRoute = currentRoute;
        this._routesConfig = routesConfig;
        this._moviesFetcher = moviesFetcher;
        this._moviesFetcherConfig = moviesFetcherConfig;
        this._assert = assert;

        this._currentSearchPhrase = null;
        this._results = [];
        this._totalResults = 0;
        this._error = null;
        this._isFetchPending = false;

        this._currentRoute.registerRouteListener(
            this._onRouteChange.bind(this)
        );

        this._dataListenersManager = listenersManager.getManager();
    }

    // -------------------------------------------------------------------------
    // getting more data
    // -------------------------------------------------------------------------

    loadMoreResults() {
        this._fetchNextPageData();
    }

    // -------------------------------------------------------------------------
    // notifying listeners
    // -------------------------------------------------------------------------

    _notifyDataChange() {
        this._dataListenersManager.callListeners({
            results: this._results,
            totalResults: this._totalResults,
            isFetchPending: this._isFetchPending,
            error: this._error
        });
    }

    registerDataListener(listener) {
        return this._dataListenersManager.addListener(listener);
    }

    // -------------------------------------------------------------------------
    // handle route changes
    // -------------------------------------------------------------------------

    _onRouteChange() {
        const route = this._currentRoute.get();
        if (route.routeId === this._routesConfig.routes.search) {
            // make sure it exists and is different than previous one
            if (
                typeof route.params.searchPhrase === 'string' &&
                this._currentSearchPhrase !== route.params.searchPhrase
            ) {
                // memorize current search phrase
                this._currentSearchPhrase = route.params.searchPhrase;

                // clear obsolete data
                this._stopAndResetData();

                // we don't want to star search for short strings
                if (
                    this._currentSearchPhrase.length >=
                    SearchResultsRepositoryService.minSearchChars
                ) {
                    this._fetchNextPageData();
                }
            }
        }
    }

    // -------------------------------------------------------------------------
    // handle fetching data from API
    // -------------------------------------------------------------------------

    _stopAndResetData() {
        this._results = [];
        this._totalResults = 0;
        this._removeError();
        this._cancelPendingFetch();
        this._notifyDataChange();
    }

    _fetchNextPageData() {
        this._isFetchPending = true;
        this._retrier = this._moviesFetcher.fetchMoviesBySearch(
            this._currentSearchPhrase,
            this._getCurrentSearchPage()
        );
        this._retrier.promise.then(
            this._fetchMoviesSuccess.bind(this),
            this._fetchMoviesError.bind(this),
            this._fetchMoviesNotify.bind(this)
        );
        this._notifyDataChange();
    }

    _cancelPendingFetch() {
        this._isFetchPending = false;
        if (typeof this._retrier !== 'undefined') {
            this._retrier.cancel();
            delete this._retrier;
        }
    }

    _fetchMoviesSuccess(response) {
        this._isFetchPending = false;
        this._interpretResults(response.data);
        this._notifyDataChange();
    }

    _fetchMoviesError(errorReason) {
        this._isFetchPending = false;
        if (errorReason === 1) {
            this._setError(this._moviesFetcherConfig.messages.overLimit);
        }
        this._notifyDataChange();
    }

    _fetchMoviesNotify() {
        console.warn(this._moviesFetcherConfig.messages.retrying);
    }

    _getCurrentSearchPage() {
        const currentPage = this._results.length / SearchResultsRepositoryService.resultsPerPage;
        return currentPage + 1;
    }

    // -------------------------------------------------------------------------
    // interpreting fetched data
    // -------------------------------------------------------------------------

    _interpretResults(resultsData) {
        switch (resultsData.Response) {
            // True means we have responses
            case 'True':
                this._addMoreResults(resultsData.Search, resultsData.totalResults);
                this._removeError();
                break;
            // False means that API was not able to return movies
            case 'False':
                this._setError(resultsData.Error);
                break;
            default:
                this._setError(this._moviesFetcherConfig.messages.unknownApiResponse);
        }
    }

    _addMoreResults(moviesArray, totalResults) {
        this._assert.isArray(moviesArray);
        for (const movie of moviesArray) {
            this._results.push(new this._SearchResult(movie));
        }

        const totalResultsNumber = parseInt(totalResults, 10);
        this._assert.isInteger(totalResultsNumber);
        this._totalResults = totalResultsNumber;
    }

    _setError(errorMessage) {
        this._error = errorMessage;
    }

    _removeError() {
        this._error = null;
    }
}

SearchResultsRepositoryService.initClass();

angular.module('searchResultsModule').service(
    'searchResultsRepository',
    SearchResultsRepositoryService
);
