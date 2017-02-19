// -----------------------------------------------------------------------------
// addressBarModule -- reads location parameters on load and allows setting them
// during application lifetime (so user actions will reflect in url)
// -----------------------------------------------------------------------------

angular.module('addressBarModule', [
    'ngRoute',
    'assertModule',
    'listenersManagerModule'
]);
