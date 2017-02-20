// -----------------------------------------------------------------------------
// movieDetailsCtrl -- displays a details of given movie. It expects a valid
// movieId in the route. Also can switch to search.
// -----------------------------------------------------------------------------

class MovieDetailsController {
    static initClass() {
        MovieDetailsController.$inject = [
            'Movie',
            'currentRoute',
            'routesConfig',
            'moviesFetcher',
            'moviesFetcherConfig',
            'assert'
        ];
    }

    constructor(
        Movie,
        currentRoute,
        routesConfig,
        moviesFetcher,
        moviesFetcherConfig,
        assert
    ) {
        this._Movie = Movie;
        this._currentRoute = currentRoute;
        this._routesConfig = routesConfig;
        this._moviesFetcher = moviesFetcher;
        this._moviesFetcherConfig = moviesFetcherConfig;
        this._assert = assert;

        this.movie = {};
        this.message = null;
        this.isDetailsVisible = false;
        this.isSpinnerVisible = false;
        this.isMessageVisible = false;

        this._currentRoute.registerRouteChangeListener(
            this._onRouteChange.bind(this)
        );
    }

    // -------------------------------------------------------------------------
    // opening search again
    // -------------------------------------------------------------------------

    openSearch() {
        this._currentRoute.setToSearch();
    }

    // -------------------------------------------------------------------------
    // handle route changes
    // -------------------------------------------------------------------------

    _onRouteChange() {
        const route = this._currentRoute.get();
        if (route.routeId === this._routesConfig.routes.movie) {
            if (typeof route.params.movieId === 'string') {
                this._fetchMovieData(route.params.movieId);
            }
            // movieId is required param of movie route so else not needed
        }
    }

    // -------------------------------------------------------------------------
    // handle fetching data from API
    // -------------------------------------------------------------------------

    _fetchMovieData(movieId) {
        this._cancelRetrierIfNecessary();
        this._retrier = this._moviesFetcher.fetchMovieById(movieId);
        this._retrier.promise.then(
            this._fetchMoviesSuccess.bind(this),
            this._fetchMoviesError.bind(this),
            this._fetchMoviesNotify.bind(this)
        );
        this._showSpinner();
    }

    _fetchMoviesSuccess(response) {
        this._interpretMovieData(response.data);
    }

    _fetchMoviesError(errorReason) {
        if (errorReason === 1) {
            this._showMessage(MovieDetailsController.messages.overLimit);
        }
    }

    _fetchMoviesNotify() {
        console.warn(MovieDetailsController.messages.retrying);
    }

    _cancelRetrierIfNecessary() {
        if (typeof this._retrier !== 'undefined') {
            this._retrier.cancel();
            delete this._retrier;
        }
    }

    // -------------------------------------------------------------------------
    // interpreting fetched data
    // -------------------------------------------------------------------------

    _interpretMovieData(movieData) {
        switch (movieData.Response) {
            // True means we have responses
            case 'True':
                this.movie = new this._Movie(movieData);
                this._showDetails();
                break;
            // True means that API was not able to return movies
            case 'False':
                this._showMessage(movieData.Error);
                break;
            default:
                this._showMessage(
                    MovieDetailsController.messages.unknownApiResponse
                );
        }
    }

    _clearMovie() {
        this.results = [];
    }

    // -------------------------------------------------------------------------
    // displaying partials
    // -------------------------------------------------------------------------

    _hideAll() {
        this.isDetailsVisible = false;
        this.isSpinnerVisible = false;
        this.isMessageVisible = false;
        this.message = null;
    }

    _showDetails() {
        this._hideAll();
        this.isDetailsVisible = true;
    }

    _showSpinner() {
        this._hideAll();
        this.isSpinnerVisible = true;
    }

    _showMessage(message) {
        this._assert.isString(message);
        this._hideAll();
        this.message = message;
        this.isMessageVisible = true;
    }
}

MovieDetailsController.initClass();

angular.module('movieDetailsModule').controller(
    'movieDetailsCtrl',
    MovieDetailsController
);
