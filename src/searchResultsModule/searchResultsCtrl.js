// -----------------------------------------------------------------------------
// searchResultsCtrl -- displays a list of search results based on current
// search route searchPhrase param. Also allows for opening movie view.
// -----------------------------------------------------------------------------

class SearchResultsController {
    static initClass() {
        SearchResultsController.$inject = [
            'SearchResult',
            'currentRoute',
            'routesConfig'
        ];
    }

    constructor(
        SearchResult,
        currentRoute,
        routesConfig
    ) {
        this._SearchResult = SearchResult;
        this._currentRoute = currentRoute;
        this._routesConfig = routesConfig;

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
    }
}

SearchResultsController.initClass();

angular.module('searchResultsModule').controller(
    'searchResultsCtrl',
    SearchResultsController
);
