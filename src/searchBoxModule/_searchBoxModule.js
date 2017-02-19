// -----------------------------------------------------------------------------
// searchBoxModule -- displays a search box input and has a service for
// listening to searchphrase changes
// -----------------------------------------------------------------------------

angular.module('searchBoxModule', [
    'listenersManagerModule',
    'addressBarModule'
]);

angular.module('searchBoxModule').run([
    // we want to initialize addressBarHandler
    'addressBarHandler',
    angular.noop
]);
