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
            'Observable'
        ];
    }

    constructor(
        SearchResult,
        currentRoute,
        routesConfig,
        moviesFetcher,
        moviesFetcherConfig,
        assert,
        Observable
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

        this._currentRoute.registerRouteObserver(
            this._onRouteChange.bind(this)
        );

        this._dataObservable = new Observable();
    }

    // -------------------------------------------------------------------------
    // getting more data
    // -------------------------------------------------------------------------

    loadMoreResults() {
        this._fetchMoreData();
    }

    // -------------------------------------------------------------------------
    // notifying observers
    // -------------------------------------------------------------------------

    _notifyDataChange() {
        this._dataObservable.notify({
            results: this._results,
            totalResults: this._totalResults,
            isFetchPending: this._isFetchPending,
            error: this._error
        });
    }

    registerDataObserver(observer) {
        return this._dataObservable.register(observer);
    }

    // -------------------------------------------------------------------------
    // handle route changes
    // -------------------------------------------------------------------------

    _onRouteChange() {
        const route = this._currentRoute.get();
        if (route.routeId === this._routesConfig.routes.search) {
            if (this._currentSearchPhrase !== route.params.searchPhrase) {
                // memorize current search phrase
                this._currentSearchPhrase = route.params.searchPhrase;

                // clear obsolete data
                this._stopAndResetData();

                // we want to start a new search, but only for actual search
                // phrases that are not too short (as this would end up in
                // getting "too many results" message from API)
                if (
                    typeof route.params.searchPhrase === 'string' &&
                    this._currentSearchPhrase.length >= SearchResultsRepositoryService.minSearchChars
                ) {
                    this._fetchMoreData();
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

    _fetchMoreData() {
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
