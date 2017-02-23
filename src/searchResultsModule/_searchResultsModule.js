// -----------------------------------------------------------------------------
// searchResultsModule for displaying a clickable list of search results.
// -----------------------------------------------------------------------------

angular.module('searchResultsModule', [
    'assertModule',
    'routesModule',
    'moviesFetcherModule',
    'listenersManagerModule'
]);

angular.module('searchResultsModule').run([
    'searchResultsRepository',
    angular.noop
]);
